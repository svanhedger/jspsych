/**
 * jsPsych plugin for pavlovia.org
 *
 * This plugin handles communications with the pavlovia.org server: it opens and closes sessions,
 * and uploads data to the server.
 *
 * @author Alain Pitiot
 * @version 2020.5
 * @copyright (c) 2020 Ilixa Ltd. ({@link http://ilixa.com})
 * @license Distributed under the terms of the MIT License
 */


var jsPsychPavlovia = (function(jspsych) {
	/**
	 * The version number.
	 *
	 * @type {string}
	 * @public
	 */
	"use strict";
	const version = '2021.12';


	/**
	 * The default error callback function.
	 *
	 * Error messages are displayed in the body of the document and in the browser's console.
	 *
	 * @param {Object} error - the error json object to be displayed.
	 * @public
	 */
	const defaultErrorCallback = function(error)
	{
		// output the error to the console:
		console.error('[pavlovia ' + version + ']', error);

		// output the error to the html body:
		let htmlCode = '<h3>[jspsych-pavlovia plugin ' + version + '] Error</h3><ul>';
		while (true) {
			if (typeof error === 'object' && 'context' in error) {
				htmlCode += '<li>' + error.context + '</li>';
				error = error.error;
			} else {
				htmlCode += '<li><b>' + error  + '</b></li>';
				break;
			}
		}
		htmlCode += '</ul>';
		document.querySelector('body').innerHTML = htmlCode;
	};

	const defaultCompletedCallback = function()
	{
		alert('data successfully submitted!');
	};


	/**
	 * The default data filter, applied to the data gathered by jsPsych, before they are
	 * uploaded to the server.
	 *
	 * The filter typically prunes and reformat jsPsych.data.get().csv().
	 *
	 * @param {Object} data - input data, typically from jsPsych.data.get().csv()
   * @returns filtered data, ready for upload to the server
	 * @public
	 */
	const defaultDataFilter = function(data)
	{
    return data;
	};


	/**
	 * Plugin information.
	 * @public
	 */
	const info = {
		name: 'pavlovia',
		description: 'communication with pavlovia.org',
		parameters: {
			command: {
				type: jspsych.ParameterType.STRING,
				pretty_name: 'Command',
				default: 'init',
				description: 'The pavlovia command: "init" (default) or "finish"'
			},
			participantId: {
				type: jspsych.ParameterType.STRING,
				pretty_name: 'Participant Id',
				default: 'PARTICIPANT',
				description: 'The participant Id: "PARTICIPANT" (default) or any string'
			},
			errorCallback: {
				type: jspsych.ParameterType.FUNCTION,
				pretty_name: 'ErrorCallback',
				default: defaultErrorCallback,
				description: 'The callback function called whenever an error has occurred'
			},
			completedCallback: {
				type: jspsych.ParameterType.FUNCTION,
				pretty_name: 'CompletedCallback',
				default: defaultCompletedCallback,
				description: 'The callback function called when the experiment completed and reception of the data has been confirmed by Pavlovia'
			},
      dataFilter: {
				type: jspsych.ParameterType.FUNCTION,
				pretty_name: 'DataFilter',
				default: defaultDataFilter,
				description: 'The filter applied to the data gathered by jsPsych before upload to the server'
      }, 
      setPavloviaInfo: {
				type: jspsych.ParameterType.FUNCTION,
				pretty_name: 'SetPavloviaInfo',
				default: function() {},
				description: 'This function receives Pavlovia configuration info.'
      }
		}
	};


	/**
	 * Run the plugin.
	 *
	 * @param {HTMLElement} display_element - the HTML DOM element where jsPsych content is rendered
	 * @param {Object} trial - the jsPsych trial
	 * @public
	 */
	class PavloviaPlugin {
		constructor(jsPsych) {
			this.jsPsych = jsPsych;
		}
		async trial(display_element, trial) {
			// data saving
			var trial_data = {
			};

			// execute the command:
			switch (trial.command.toLowerCase()) {
				case 'init':
					await _init(trial);
					break;

				case 'finish':
					const data = jsPsych.data.get().csv();
					await _finish(trial, data);
					break;

				default:
					trial.errorCallback('unknown command: ' + trial.command);
			};
 
			// end trial
			this.jsPsych.finishTrial(trial_data); 
 		};
	};
	PavloviaPlugin.info = info;

	/**
	 * The pavlovia.org configuration (usually read from the config.json configuration file).
	 *
	 * @type {Object}
	 * @private
	 */
	let _config = {};


	/**
	 * The callback for the beforeunload event, which is triggered when the participant tries to leave the
	 * experiment by closing the tab or browser.
	 *
	 * @type {null}
	 * @private
	 */
	let _beforeunloadCallback = null;


	/**
	 * The server paramaters (those starting with a double underscore).
	 * @type {Object}
	 * @private
	 */
	let _serverMsg = new Map();


	/**
	 * Initialise the connection with pavlovia.org: configure the plugin and open a new session.
	 *
	 * @param {Object} trial - the jsPsych trial
	 * @param {string} [configURL= "config.json"] - the URL of the pavlovia.org json configuration file
	 * @returns {Promise<void>}
	 * @private
	 */
	const _init = async function(trial, configURL = 'config.json')
	{
		try {
			// configure:
			let response = await _configure(configURL);
			_config = response.config;
			_log('init | _configure.response=', response);

			// open a new session:
			response = await _openSession();
			// _config.experiment.token = response.token;
			_log('init | _openSession.response=', response);

      trial.setPavloviaInfo({
        config: _config,
        session: response
      });

			// warn the user when they attempt to close the tab or browser:
			_beforeunloadCallback = (event) =>
			{
				// preventDefault should ensure that the user gets prompted:
				event.preventDefault();

				// Chrome requires returnValue to be set:
				event.returnValue = '';
			};
			window.addEventListener('beforeunload', _beforeunloadCallback);


			// when the user closes the tab or browser, we attempt to close the session
			// and optionally save the results
			// note: we communicate with the server using the Beacon API
			window.addEventListener('unload', (event) =>
			{
				if (_config.session.status === 'OPEN')
				{
					// get and save the incomplete results if need be:
					if (_config.experiment.saveIncompleteResults)
					{
						const data = jsPsych.data.get().csv();
						_save(trial, data, true);
					}

					// close the session:
					_closeSession(false, true);
				}
			});
		}
		catch (error)
		{
			trial.errorCallback(error);
		}
	};


	/**
	 * Finish the connection with pavlovia.org: upload the collected data and close the session.
	 *
	 * @param {Object} trial - the jsPsych trial
	 * @param {Object} data - the experiment data to be uploaded
	 * @returns {Promise<void>}
	 * @private
	 */
	const _finish = async function(trial, data)
	{
		try
		{
			// remove the beforeunload listener:
			window.removeEventListener('beforeunload', _beforeunloadCallback);

			// tell the participant that the data is being uploaded:
			const msg = "Please wait a moment while the data are uploaded to the pavlovia.org server...";
			const displayElement = jsPsych.getDisplayElement();
			displayElement.innerHTML = '<pre id="pavlovia-data-upload"></pre>';
			document.getElementById('pavlovia-data-upload').textContent = msg;

			// upload the data to pavlovia.org:
			const sync = (typeof trial.sync !== 'undefined') ? trial.sync : false;
			let response = await _save(trial, data, sync);
			_log('finish | _save.response=', response);

			// close the session:
			response = await _closeSession(true, false);
			_log('finish | _closeSession.response=', response);

      // Call completedCallback
      trial.completedCallback();
		}
		catch (error)
		{
			trial.errorCallback(error);
		}
	};


	/**
	 * Configure the plugin by reading the configuration file created upon activation of the experiment.
	 *
	 * @param {string} [configURL= "config.json"] - the URL of the pavlovia.org json configuration file
	 * @returns {Promise<any>}
	 * @private
	 */
	const _configure = async function(configURL)
	{
		let response = { origin: '_configure', context: 'when configuring the plugin' };

		try {
			const configurationResponse = await _getConfiguration(configURL);

			// legacy experiments had a psychoJsManager block instead of a pavlovia block, and the URL
			// pointed to https://pavlovia.org/server
			if ('psychoJsManager' in configurationResponse.config) {
				delete configurationResponse.config.psychoJsManager;
				configurationResponse.config.pavlovia = {
					URL: 'https://pavlovia.org'
				};
			}

			// tests for the presence of essential blocks in the configuration:
			if (!('experiment' in configurationResponse.config))
				throw 'missing experiment block in configuration';
			if (!('name' in configurationResponse.config.experiment))
				throw 'missing name in experiment block in configuration';
			if (!('fullpath' in configurationResponse.config.experiment))
				throw 'missing fullpath in experiment block in configuration';
			if (!('pavlovia' in configurationResponse.config))
				throw 'missing pavlovia block in configuration';
			if (!('URL' in configurationResponse.config.pavlovia))
				throw 'missing URL in pavlovia block in configuration';

			// get the server parameters (those starting with a double underscore):
			const urlQuery = window.location.search.slice(1);
			const urlParameters = new URLSearchParams(urlQuery);
			urlParameters.forEach((value, key) => {
				if (key.indexOf('__') === 0)
					_serverMsg.set(key, value);
			});

			return configurationResponse;
		}
		catch (error)
		{
			throw { ...response, error };
		}
	};


	/**
	 * Get the pavlovia.org json configuration file.
	 *
	 * @param {string} configURL - the URL of the pavlovia.org json configuration file
	 * @returns {Promise<any>}
	 * @private
	 */
	const _getConfiguration = function(configURL)
	{
		let response = {
			origin: '_getConfiguration',
			context: 'when reading the configuration file: ' + configURL
		};

		return new Promise((resolve, reject) =>
		{
			$.get(configURL, 'json')
				.done((config, textStatus) =>
				{
					resolve({ ...response, config });
				})
				.fail((jqXHR, textStatus, errorThrown) =>
				{
					reject({ ...response, error: errorThrown });
				});
		});
	};


	/**
	 * Open a new session for this experiment on pavlovia.org.
	 *
	 * @returns {Promise<any>}
	 * @private
	 */
	const _openSession = function()
	{
		let response = {
			origin: '_openSession',
			context: 'when opening a session for experiment: ' + _config.experiment.fullpath
		};

		// prepare POST query:
		let data = {};
		if (_serverMsg.has('__pilotToken'))
			data.pilotToken = _serverMsg.get('__pilotToken');

		// query pavlovia server:
		return new Promise((resolve, reject) =>
		{
			const url = _config.pavlovia.URL + '/api/v2/experiments/' + encodeURIComponent(_config.experiment.fullpath) + '/sessions';
			$.post(url, data, null, 'json').done((data, textStatus) =>
			{
				// check for required attributes:
				if (!('token' in data)) {
					reject(Object.assign(response, { error: 'unexpected answer from server: no token'}));
				}
				if (!('experiment' in data)) {
					reject(Object.assign(response, { error: 'unexpected answer from server: no experiment'}));
				}

				// update the configuration:
				_config.session = { token: data.token, status: 'OPEN' };
				_config.experiment.status = data.experiment.status2;
				_config.experiment.saveFormat = Symbol.for(data.experiment.saveFormat);
				_config.experiment.saveIncompleteResults = data.experiment.saveIncompleteResults;
				_config.experiment.license = data.experiment.license;
				_config.runMode = data.experiment.runMode;

				resolve( Object.assign(response, { 
          token: data.token, 
          status: data.experiment.status2,
          nbSessions: data.experiment.nbSessions
        }) );
			})
			.fail((jqXHR, textStatus, errorThrown) =>
			{
				console.error('error:', jqXHR.responseText);
				reject(Object.assign(response, { error: jqXHR.responseJSON }));
			});
		});

	};


	/**
	 * Close the previously opened session on pavlovia.org.
	 *
	 * @param {boolean} isCompleted - whether or not the participant completed the experiment
	 * @param {boolean} [sync = false] - whether or not to use the Beacon API to comminucate with the server
	 * @private
	 */
	const _closeSession = function(isCompleted = true, sync = false)
	{
		let response = {
			origin: '_closeSession',
			context: 'when closing the session for experiment: ' + _config.experiment.fullpath
		};

		// prepare DELETE query:
		const url = _config.pavlovia.URL + '/api/v2/experiments/' + encodeURIComponent(_config.experiment.fullpath) + '/sessions/' + _config.session.token;

		// synchronous query the pavlovia server:
		if (sync)
		{
			const formData = new FormData();
			formData.append('isCompleted', isCompleted);
			navigator.sendBeacon(url + '/delete', formData);
			_config.session.status = 'CLOSED';
		}
		else
		{
			// asynchronously query the pavlovia server:
			return new Promise((resolve, reject) =>
			{
				$.ajax({
					url,
					type: 'delete',
					data: { isCompleted },
					dataType: 'json'
				})
					.done((data, textStatus) =>
					{
						_config.session.status = 'CLOSED';
						resolve(Object.assign(response, {data}));
					})
					.fail((jqXHR, textStatus, errorThrown) =>
					{
						console.error('error:', jqXHR.responseText);
						reject(Object.assign(response, {error: jqXHR.responseJSON}));
					});
			});
		}
	};


	/**
	 * Upload data to the pavlovia.org server.
	 *
	 * @param {Object} trial - the jsPsych trial
	 * @param {string} data - the experiment data to be uploaded
	 * @param {boolean} [sync = false] - whether or not to use the Beacon API to communicate with the server
	 * @return {Promise<any>}
	 * @private
	 */
	const _save = async function(trial, data, sync = false)
	{
		const date = new Date();
		let dateString = date.getFullYear() + '-' + ('0'+(1+date.getMonth())).slice(-2) + '-' + ('0'+date.getDate()).slice(-2) + '_';
		dateString += ('0'+date.getHours()).slice(-2) + 'h' + ('0'+date.getMinutes()).slice(-2) + '.' + ('0'+date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();

		const key = _config.experiment.name + '_' + trial.participantId + '_' + 'SESSION' + '_' + dateString + '.csv';
		const filteredData = trial.dataFilter(data);

		if (_config.experiment.status === 'RUNNING' && !_serverMsg.has('__pilotToken'))
		{
			return await _uploadData(key, filteredData, sync);
		}
		else
		{
			_offerDataForDownload(key, filteredData, 'text/csv');
			return {
				origin: '_save',
				context: 'when saving results for experiment: ' + _config.experiment.fullpath,
				message: 'offered the .csv file for download'
			};
		}
	};


	/**
	 * Upload data (a key/value pair) to pavlovia.org.
	 *
	 * @param {string} key - the key
	 * @param {string} value - the value
	 * @param {boolean} [sync = false] - whether or not to upload the data using the Beacon API
	 * @returns {Promise<any>}
	 * @private
	 */
	const _uploadData = function(key, value, sync = false)
	{
		let response = {
			origin: '_uploadData',
			context: 'when uploading participant\' results for experiment: ' + _config.experiment.fullpath
		};

		const url = _config.pavlovia.URL + '/api/v2/experiments/' + encodeURIComponent(_config.experiment.fullpath) + '/sessions/' + _config.session.token + '/results';

		// synchronous query the pavlovia server:
		if (sync)
		{
			const formData = new FormData();
			formData.append('key', key);
			formData.append('value', value);
			navigator.sendBeacon(url, formData);
		}
		// asynchronously query the pavlovia server:
		else
		{
			return new Promise((resolve, reject) =>
			{
				const data = {
					key,
					value
				};

				$.post(url, data, null, 'json').done((serverData, textStatus) =>
				{
					resolve(Object.assign(response, {serverData}));
				})
				.fail((jqXHR, textStatus, errorThrown) =>
				{
					console.error('error:', textStatus);
					reject(Object.assign(response, {error: textStatus}));
				});
			});
		}
	};


	/**
	 * Log messages to the browser's console.
	 *
	 * @param {...*} messages - the messages to be displayed in the browser's console
	 * @private
	 */
	const _log = function(...messages) {
		console.log('[pavlovia ' + version + ']', ...messages);
	};


	/**
	 * Offer data as download in the browser.
	 *
	 * @param {string} filename - the name of the file to be downloaded
	 * @param {*} data - the data
	 * @param {string} type - the MIME type of the data, e.g. 'text/csv' or 'application/json'
	 * @private
	 */
	const _offerDataForDownload = function (filename, data, type)
	{
		const blob = new Blob([data], { type });

		if (window.navigator.msSaveOrOpenBlob)
		{
			window.navigator.msSaveBlob(blob, filename);
		}
		else
		{
			const elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(blob);
			elem.download = filename;
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
		}
	};

	return PavloviaPlugin;
})(jsPsychModule);

