

/**************************/
/** FORWARD DIGIT SPAN **/
/**************************/
/*
This module consists of an adaptive forward digit span (BDS)
task, commonly used as a measure of short-term memory.

On each trial, participant hear or see a string of digits.
Then, participants have to click on buttons to report these
digits in sequential order.

The script is easily customizable (e.g., audio or visual
digit presentation, starting span, number of trials, etc.)
The task is adaptive based on a 1:2 staircase procedure -
that is, a correct answer will increase the span by one,
whereas two incorrect answers in a row will decrease the
span by one.

The script outputs two important variables. The first is
'fds_adaptive' which should be added to the experiment timeline
in the main html file -- e.g., timeline.push(fds_adaptive);

The second is 'return_fds_adaptive_folder' which should be pushed or
concatenated with other audio files for preloading purposes.
This is a function, so users can specify a different folder
name in the main html file

-- e.g., var foldername = return_fds_adaptive_folder();

The folder is not applicable if you are planning
on running a visual version of the task as no additional
files are needed.

Stephen Van Hedger, April 2020

*/


/**********************************/
/** Main Variables and Functions **/
/**********************************/

var useAudio = true; // change to false if you want this to be a visual task!

var currentDigitList; //current digit list
var totalCorrect = 0; //counter for total correct
var totalTrials = 0; //counter for total trials
var maxSpan; //value that will reflect a participant's maximum span (e.g., 6)
var folder = "digits/"; //folder name for storing the audio files
var fdsTrialNum = 1; //counter for trials
var fdsTotalTrials = 12; //total number of desired trials
var response = []; //for storing partcipants' responses
var fds_correct_ans; //for storing the correct answer on a given trial
var staircaseChecker = []; //for assessing whether the span should move up/down/stay
var staircaseIndex = 0; //index for the current staircase
var digit_list = [1,2,3,4,5,6,7,8,9]; //digits to be used (unlikely you will want to change this)

var startingSpan = 3; //where we begin in terms of span
var currentSpan; //to reference where participants currently are
var spanHistory = []; //easy logging of the participant's trajectory
var stimList; //this is going to house the ordering of the stimuli for each trial
var idx = 0; //for indexing the current letter to be presented
var exitLetters; //for exiting the letter loop

const arrSum = arr => arr.reduce((a,b) => a + b, 0) //simple variable for calculating sum of an array
var aud_digits = ['digits/one.wav', 'digits/two.wav', 'digits/three.wav', 'digits/four.wav', 'digits/five.wav', 'digits/six.wav', 'digits/seven.wav', 'digits/eight.wav', 'digits/nine.wav']; //the digits

//add to the dataframe whether the BDS was auditory or visual
jsPsych.data.addProperties({
BDS_modality: (useAudio ? 'auditory' : 'visual')
});

//file map for use in the auditory implementation
var fileMap = {
1: "one.wav",
2: "two.wav",
3: "three.wav",
4: "four.wav",
5: "five.wav",
6: "six.wav",
7: "seven.wav",
8: "eight.wav",
9: "nine.wav"
};

//function to push button responses to array
var recordClick = function(elm) {
		response.push(Number($(elm).text()))
		document.getElementById("echoed_txt").innerHTML = response;
	}

//function to clear the response array
var clearResponse = function() {
		response = [];
		document.getElementById("echoed_txt").innerHTML = response;
	}

//function to map digit names to audio files (for auditory BDS)
var digitToFile = function (digit) {
		return folder + fileMap[digit];
	};


//function to shuffle an array (Fisher-Yates)
function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

//function to get digit list for a trial
function getDigitList(len) {
	var shuff_final = [];
	//shuffle the digit list
	if(len <= digit_list.length) {
		shuff_final = shuffle(digit_list);
	} else {
		//this is overkill (generating too many digits) but it works and we slice it later anyway
		for (var j=0; j<len; j++){
			var interim_digits = shuffle(digit_list);
			shuff_final = [...shuff_final, ...interim_digits];
		}
	}
	var digitList = shuff_final.slice(0,len); //array to hold the final digits
	return digitList;
}

//function to push the stimuli to an array
function getStimuli(numDigits) {
	var digit;
	var stimList = [];
	currentDigitList = getDigitList(numDigits);
	for (var i = 0; i < currentDigitList.length; i += 1) {
		if (useAudio) {
			digit = currentDigitList[i];
			stimList.push(digitToFile(digit));
		} else {
			digit = currentDigitList[i].toString();
			stimList.push('<p style="font-size:60px;font-weight:600;">' + digit + '</p>');
		}
	}
	fds_correct_ans = currentDigitList; //this is the reversed array for assessing performance
	return stimList;
}

//function to update the span as appropriate (using a 1:2 staircase procedure)
function updateSpan() {
	//if they got the last trial correct, increase the span.
	if (arrSum(staircaseChecker) == 1) {
		currentSpan += 1; //add to the span if last trial was correct
		staircaseChecker = []; //reset the staircase checker
		staircaseIndex = 0; //reset the staircase index
		//if they got the last two trials incorrect, decrease the span
	} else if (arrSum(staircaseChecker) == 0) {
		if(staircaseChecker.length == 2) {
			currentSpan -= 1; //lower the span if last two trials were incorrect
			if (currentSpan == 0) {
				currentSpan = 1; //make sure the experiment cannot break with exceptionally poor performance (floor of 1 digit)
			}
			staircaseChecker = []; //reset the staircase checker
			staircaseIndex = 0; //reset the staircase index
		}
	} else {
		return false;
	}
};


/******************/
/** Main Screens **/
/******************/

//From the Experiment Factory Repository
var response_grid =
'<div class = numbox>' +
'<p>What were the numbers <b>in order</b>?<br>(When you are ready to lock in your answer, press ENTER)</p>' +
'<button id = button_1 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>1</div></div></button>' +
'<button id = button_2 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>2</div></div></button>' +
'<button id = button_3 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>3</div></div></button>' +
'<button id = button_4 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>4</div></div></button>' +
'<button id = button_5 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>5</div></div></button>' +
'<button id = button_6 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>6</div></div></button>' +
'<button id = button_7 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>7</div></div></button>' +
'<button id = button_8 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>8</div></div></button>' +
'<button id = button_9 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>9</div></div></button>' +
'<button class = clear_button id = "ClearButton" onclick = "clearResponse()">Clear</button>'+
'<p><u><b>Current Answer:</b></u></p><div id=echoed_txt style="font-size: 30px; color:blue;"><b></b></div></div>'

//preload audio
var preload_digits = {
	type: 'preload',
	audio: aud_digits
};


//Dynamic instructions based on whether it is an auditory or visual task
var instructions;
if (useAudio) {
	instructions = '<p>On each trial, you will hear a sequence of digits and be asked to type them back in the same order in which they were heard.</p>'+
				   '<p>For example, if you heard the digits <b style="color:blue;">one</b>, <b style="color:blue;">two</b>, '+
				   '<b style="color:blue;">three</b>, you would respond with <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b></p>';
} else {
	instructions = '<p>On each trial, you will see a sequence of digits and be asked to type them back in the same order in which they were seen.</p>'+
				   '<p>For example, if you saw the digits <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, '+
				   '<b style="color:blue;">3</b>, you would respond with <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b></p>';
}

var fds_welcome = {
type: "html-button-response",
stimulus: '<p>Welcome to the <b>digit span task.</b></p>' +instructions +
	'<p>To ensure high quality data, it is very important that you do not use any memory aid (e.g., pen and paper).<br>Please do the task solely in your head.</p>' +
	'<p>There will be '+fdsTotalTrials+' total trials. Participation takes around 10 minutes.</p>',
choices: ['Continue']
};


//set-up screen
var setup_fds = {
type: 'html-button-response',
stimulus: function(){return '<p>Trial '+fdsTrialNum+' of '+fdsTotalTrials+'</p>';},
choices: ['Begin'],
	post_trial_gap: 500,
	on_finish: function(){
		if(fdsTrialNum == 1) {
			currentSpan = startingSpan;
		}
		stimList = getStimuli(currentSpan); //get the current stimuli for the trial
		spanHistory[fdsTrialNum-1]=currentSpan; //log the current span in an array
		fdsTrialNum += 1; //add 1 to the total trial count
		idx = 0; //reset the index prior to the letter presentation
		exitLetters = 0; //reset the exit letter variable
	}
};

//letter presentation
var letter_fds = {
	type: 'audio-keyboard-response',
	stimulus: function(){return stimList[idx];},
	choices: jsPsych.NO_KEYS,
	post_trial_gap: 250,
	trial_ends_after_audio: true,
	on_finish: function(){
		idx += 1; //update the index
		//check to see if we are at the end of the letter array
		if (idx == stimList.length) {
			exitLetters = 1;
		} else	{
			exitLetters = 0;
		}
	}
};

//visual letter presentation
var letter_fds_vis = {
	type: 'html-keyboard-response',
	stimulus: function(){return stimList[idx];},
	choices: jsPsych.NO_KEYS,
	trial_duration: 500,
	post_trial_gap: 250,
	on_finish: function(){
		idx += 1; //update the index
		//check to see if we are at the end of the letter array
		if (idx == stimList.length) {
			exitLetters = 1;
		} else	{
			exitLetters = 0;
		}
	}
};

//conditional loop of letters for the length of stimList...different procedures for visual and audio
if(useAudio){
	var letter_proc = {
		timeline: [letter_fds],
		loop_function: function(){
			if(exitLetters == 0){
				return true;
			} else {
				return false;
			}
		}
	}
} else {
	var letter_proc = {
		timeline: [letter_fds_vis],
		loop_function: function(){
			if(exitLetters == 0){
				return true;
			} else {
				return false;
			}
		}
	}
};

//response screen
var fds_response_screen = {
type: 'html-keyboard-response',
stimulus: response_grid,
choices: ['Enter'],
	on_finish: function(data){
		var curans = response;
		var corans = fds_correct_ans;
		if(JSON.stringify(curans) === JSON.stringify(corans)) {
			var gotItRight = 1;
			console.log("correct");
			staircaseChecker[staircaseIndex] = 1;
		} else {
			var gotItRight = 0;
			console.log("incorrect");
			staircaseChecker[staircaseIndex] = 0;
		}
		response = []; //clear the response for the next trial
		staircaseIndex += 1; //update the staircase index
		console.log(staircaseChecker);

		jsPsych.data.addDataToLastTrial({
			designation: 'FDS-RESPONSE',
			span: currentSpan,
			answer: curans,
			correct: corans,
			was_correct: gotItRight,
			spanHistory: spanHistory
		});
	}
};


/*********************/
/** Main Procedures **/
/*********************/

//call function to update the span if necessary
var staircase_assess = {
type: 'call-function',
func: updateSpan
}

//the core procedure
var staircase = {
timeline: [setup_fds, letter_proc, fds_response_screen, staircase_assess]
}

//main procedure
var fds_mainproc = {
	timeline: [staircase],
	loop_function: function(){
		//if we haev reached the specified total trial amount, exit
		if(fdsTrialNum > fdsTotalTrials) {
			return false;
		} else {
			return true;
		}
	}
};

/*************/
/** Wrap-Up **/
/*************/

var fds_wrapup = {
type: 'html-button-response',
stimulus: '<p>Thank you for your participation. This concludes the digit span.</p>',
choices: ['Exit']
};

/////////////////////////
// 1. final procedure //
////////////////////////
/*
Simply push this to your timeline
variable in your main html files -
e.g., timeline.push(fds_adaptive)
*/

var fds_adaptive = {
	timeline: [preload_digits, fds_welcome, fds_mainproc, fds_wrapup]
};
