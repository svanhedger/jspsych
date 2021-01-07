/*

//////////////////////////////
// Multiple Object Tracking //
//////////////////////////////

Stephen Van Hedger & Stacey Reyes, 2020

Multiple Object Tracking (MOT) adapted for online testing.

This is a short MOT. After completing dynamic instructions
and some practice trials, participants complete 20 MOT trials.
Each trial is approximately 30 seconds in duration. For two-
target trials, participants must track two (of eight) moving 
dots. For three-target trials, participants must track three
(of eight) moving dots. Each participant completes 10 trials
with both two and three targets

TO USE: Reference this js script in your html file,
make sure the jspsych dependencies are also referenced
in your html file, then push 'mot' to your timeline

timeline.push(mot)

You should also preload the stimuli (videos and images)
You can specify folder names in your html file by using the
functions return_motvid_folder() and return_motimg_folder().
For example, if you wanted to name the video folder 'sprinkles'
simply write this in your html:

var sprinkles = return_motvid_folder();

Then you can reference sprinkles in the preload_video command
for jspsych.init.


December 2020


*/

//Variables
var identifier = jsPsych.randomization.randomID(15); //random alphanumeric identifier
var broswerHeight = screen.height; //for calibrating the stimuli
var stimHeight = screen.height * 0.75; //for presenting the stimuli
var curMOT_RESP; //for storing the current MOT response
var counterACC = 0; //for counting consecutive correct answers
var curTrial = 0; //for counting the current trials for exiting
var audIndex = 0; //update the counter 
var gotoThree; //for determining whether one should move up

jsPsych.data.addProperties({ParticipantID: identifier}); //random participant id to data


var vid_preload = [
'MOT/videos/MOT_02_01.mp4', 'MOT/videos/MOT_02_02.mp4', 'MOT/videos/MOT_02_03.mp4', 'MOT/videos/MOT_02_04.mp4',
'MOT/videos/MOT_02_05.mp4', 'MOT/videos/MOT_02_06.mp4', 'MOT/videos/MOT_02_08.mp4',
'MOT/videos/MOT_02_09.mp4', 'MOT/videos/MOT_02_10.mp4', 'MOT/videos/MOT_02_11.mp4',
'MOT/videos/MOT_03_01.mp4', 'MOT/videos/MOT_03_02.mp4', 'MOT/videos/MOT_03_03.mp4', 
'MOT/videos/MOT_03_05.mp4', 'MOT/videos/MOT_03_06.mp4', 'MOT/videos/MOT_03_07.mp4', 'MOT/videos/MOT_03_08.mp4',
'MOT/videos/MOT_03_09.mp4', 'MOT/videos/MOT_03_10.mp4', 'MOT/videos/MOT_03_11.mp4', 
'MOT/practice/P04.mp4', 'MOT/practice/P07.mp4', 'MOT/practice/P09.mp4'
];

var img_preload = [
'MOT/resp_img/MOT_02_01.jpg', 'MOT/resp_img/MOT_02_02.jpg', 'MOT/resp_img/MOT_02_03.jpg', 'MOT/resp_img/MOT_02_04.jpg',
'MOT/resp_img/MOT_02_05.jpg', 'MOT/resp_img/MOT_02_06.jpg', 'MOT/resp_img/MOT_02_08.jpg',
'MOT/resp_img/MOT_02_09.jpg', 'MOT/resp_img/MOT_02_10.jpg', 'MOT/resp_img/MOT_02_11.jpg',
'MOT/resp_img/MOT_03_01.jpg', 'MOT/resp_img/MOT_03_02.jpg', 'MOT/resp_img/MOT_03_03.jpg', 
'MOT/resp_img/MOT_03_05.jpg', 'MOT/resp_img/MOT_03_06.jpg', 'MOT/resp_img/MOT_03_07.jpg', 'MOT/resp_img/MOT_03_08.jpg',
'MOT/resp_img/MOT_03_09.jpg', 'MOT/resp_img/MOT_03_10.jpg', 'MOT/resp_img/MOT_03_11.jpg',
'MOT/practice/P01.jpg', 'MOT/practice/P02.jpg', 'MOT/practice/P03.jpg', 'MOT/practice/P05.jpg', 'MOT/practice/P06.jpg', 
'MOT/practice/P08.jpg', 'MOT/practice/P10.jpg'
];


/*************************/
/** Important Functions **/
/*************************/

//Search the input text box and store the response for data logging
function search(ele) {
    if(event.key === "Enter") {
		curMOT_RESP = ele.value; //set the value to curMOT_RESP	
    }
}

//limit responses to numeric values
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//compare two arrays (for determining correct answer)
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


/*******************/
/** INSTRUCTIONS **/
/*******************/

var basic_intro = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-family: arial; size: 16px;"><p>Welcome.</p><p>This is an object-tracking study. You will be asked to track some objects while ignoring others.</p><p><b>Press F to receive further instructions when you are ready</b></p></div>',
	choices: ['F']
};


var train_01 = {
	type: 'image-keyboard-response',
	stimulus: 'MOT/practice/P01.jpg',
	stimulus_height: stimHeight,
	choices: ['F']
};

var train_02 = {
	type: 'image-keyboard-response',
	stimulus: 'MOT/practice/P02.jpg',
	stimulus_height: stimHeight,
	choices: ['F']
};

var train_03 = {
	type: 'image-keyboard-response',
	stimulus: 'MOT/practice/P03.jpg',
	stimulus_height: stimHeight,
	choices: ['F']
};

var train_04 = {
	type: 'video-keyboard-response',
	sources: ['MOT/practice/P04.mp4', 'MOT/practice/P04.mp4'],
	height: stimHeight,
	trial_ends_after_video: true,
	choices: jsPsych.NO_KEYS
};


var train_05 = {
	type: 'image-keyboard-response',
	stimulus: 'MOT/practice/P05.jpg',
	stimulus_height: stimHeight,
	prompt: '<div class="wrapper"><p style="font-size:12px; color: black;">Type your answer in the ANSWER BOX. Do not put spaces between numbers. Order does not matter. <b>Press ENTER to submit your answer</b><input class="mot" id="mot" type="text" placeholder="ANSWER BOX" onkeydown="search(this)" onkeypress="return isNumber(event)"></input></p>',
	choices: ['Enter'],
	data: {designation: "guide-mot-resp", correct: ["2","8"]},
	on_finish: function(data){
		var ansArray = curMOT_RESP.split('');
		ansArray = ansArray.sort(); //sorted answer (from 1-8)
		if(arraysEqual(ansArray, data.correct)){
			var wasCorrect = 1;
			counterACC += 1;
			} else {
			var wasCorrect = 0;
			}
		
		jsPsych.data.addDataToLastTrial({
			MOT_RESP: ansArray,
			WAS_CORRECT: wasCorrect		
		});	
		
	}
};

var train_06 = {
	type: 'image-keyboard-response',
	stimulus: 'MOT/practice/P06.jpg',
	stimulus_height: stimHeight,
	choices: ['F']
};

var train_07 = {
	type: 'video-keyboard-response',
	sources: ['MOT/practice/P07.mp4', 'MOT/practice/P07.mp4'],
	height: stimHeight,
	trial_ends_after_video: true,
	choices: jsPsych.NO_KEYS
};

var train_08 = {
	type: 'image-keyboard-response',
	stimulus: 'MOT/practice/P08.jpg',
	stimulus_height: stimHeight,
	prompt: '<div class="wrapper"><p style="font-size:12px; color: 	#E0FFFF;"><strong>Type your answer in the ANSWER BOX. Do not put spaces between numbers. Order does not matter.</strong><input class="mot" id="mot" type="text" placeholder="ANSWER BOX" onkeydown="search(this)" onkeypress="return isNumber(event)"></input>(Press ENTER to submit your answer)</p>',
	choices: ['Enter'],
	data: {designation: "practice-mot-resp", correct: ["4","7"]},
	on_finish: function(data){
		var ansArray = curMOT_RESP.split('');
		ansArray = ansArray.sort(); //sorted answer (from 1-8)
		if(arraysEqual(ansArray, data.correct)){
			var wasCorrect = 1;
			counterACC += 1; 
			} else {
			var wasCorrect = 0;
			}
		
		jsPsych.data.addDataToLastTrial({
			MOT_RESP: ansArray,
			WAS_CORRECT: wasCorrect		
		});	
		
	}
};

var train_09 = {
	type: 'video-keyboard-response',
	sources: ['MOT/practice/P09.mp4', 'MOT/practice/P09.mp4'],
	height: stimHeight,
	trial_ends_after_video: true,
	choices: jsPsych.NO_KEYS
};

var train_10 = {
	type: 'image-keyboard-response',
	stimulus: 'MOT/practice/P10.jpg',
	stimulus_height: stimHeight,
	prompt: '<div class="wrapper"><p style="font-size:12px; color: 	#E0FFFF;"><strong>Type your answer in the ANSWER BOX. Do not put spaces between numbers. Order does not matter.</strong><input class="mot" id="mot" type="text" placeholder="ANSWER BOX" onkeydown="search(this)" onkeypress="return isNumber(event)"></input>(Press ENTER to submit your answer)</p>',
	choices: ['Enter'],
	data: {designation: "practice-mot-resp", correct: ["2","3"]},
	on_finish: function(data){
		var ansArray = curMOT_RESP.split('');
		ansArray = ansArray.sort(); //sorted answer (from 1-8)
		if(arraysEqual(ansArray, data.correct)){
			var wasCorrect = 1;
			counterACC += 1;
			} else {
			var wasCorrect = 0;
			}	
		jsPsych.data.addDataToLastTrial({
			MOT_RESP: ansArray,
			WAS_CORRECT: wasCorrect		
		});	
		
	}
};

//set-up screen for the main task
var train_11 = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-family: arial; size: 16px;"><p>The practice is now over. You will now begin the real experiment. </p>'+
				'<p>There will be two parts to this task. Each part consists of 10 videos of moving dots, similar to what you just saw.</br>In the first part, you must track 2 targets just as you did in the practice. Remember to submit your result by pressing the <b>ENTER key</b>.'+
				'</br>Be as quick and accurate as you can.</p><p><b>Press F to begin</b></p></div>',
	choices: ['F']
};


var training_proc = {
	timeline: [basic_intro, train_01, train_02, train_03, train_04, train_05, train_06, train_07, train_08, train_09, train_10, train_11]
};

/*******************/
/** MAIN MOT TASK **/
/*******************/

//Two-tracking timeline variables
var MOTVARS_TWO = [
{vid: ['MOT/videos/MOT_02_01.mp4'], resp_img: 'MOT/resp_img/MOT_02_01.jpg', corANS: ["2","8"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_02.mp4'], resp_img: 'MOT/resp_img/MOT_02_02.jpg', corANS: ["1","8"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_03.mp4'], resp_img: 'MOT/resp_img/MOT_02_03.jpg', corANS: ["4","8"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_04.mp4'], resp_img: 'MOT/resp_img/MOT_02_04.jpg', corANS: ["7","8"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_05.mp4'], resp_img: 'MOT/resp_img/MOT_02_05.jpg', corANS: ["6","7"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_06.mp4'], resp_img: 'MOT/resp_img/MOT_02_06.jpg', corANS: ["2","5"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_08.mp4'], resp_img: 'MOT/resp_img/MOT_02_08.jpg', corANS: ["4","7"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_09.mp4'], resp_img: 'MOT/resp_img/MOT_02_09.jpg', corANS: ["6","7"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_10.mp4'], resp_img: 'MOT/resp_img/MOT_02_10.jpg', corANS: ["1","4"], type: "MOT_02"},
{vid: ['MOT/videos/MOT_02_11.mp4'], resp_img: 'MOT/resp_img/MOT_02_11.jpg', corANS: ["7","8"], type: "MOT_02"}
];

MOTVARS_TWO = jsPsych.randomization.repeat(MOTVARS_TWO, 1); //shuffle the trials
var MOTVARS_TWO_01 = MOTVARS_TWO.slice(0,10);

//Three-tracking timeline variables
var MOTVARS_THREE = [
{vid: ['MOT/videos/MOT_03_01.mp4'], resp_img: 'MOT/resp_img/MOT_03_01.jpg', corANS: ["1","5","7"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_02.mp4'], resp_img: 'MOT/resp_img/MOT_03_02.jpg', corANS: ["2","5","6"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_03.mp4'], resp_img: 'MOT/resp_img/MOT_03_03.jpg', corANS: ["1","2","7"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_05.mp4'], resp_img: 'MOT/resp_img/MOT_03_05.jpg', corANS: ["2","5","6"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_06.mp4'], resp_img: 'MOT/resp_img/MOT_03_06.jpg', corANS: ["2","4","7"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_07.mp4'], resp_img: 'MOT/resp_img/MOT_03_07.jpg', corANS: ["2","5","8"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_08.mp4'], resp_img: 'MOT/resp_img/MOT_03_08.jpg', corANS: ["2","4","7"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_09.mp4'], resp_img: 'MOT/resp_img/MOT_03_09.jpg', corANS: ["5","6","8"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_10.mp4'], resp_img: 'MOT/resp_img/MOT_03_10.jpg', corANS: ["1","3","7"], type: "MOT_03"},
{vid: ['MOT/videos/MOT_03_11.mp4'], resp_img: 'MOT/resp_img/MOT_03_11.jpg', corANS: ["2","4","8"], type: "MOT_03"}
];

MOTVARS_THREE = jsPsych.randomization.repeat(MOTVARS_THREE, 1); //shuffle the trials
var MOTVARS_THREE_01 = MOTVARS_THREE.slice(0,10);


//Create the General Procedure
var MOT_VID_MAIN = {
	type: 'video-keyboard-response',
	sources: jsPsych.timelineVariable('vid'),
	height: stimHeight,
	trial_ends_after_video: true,
	choices: jsPsych.NO_KEYS
};


var MOT_RESP_MAIN = {
	type: 'image-keyboard-response',
	stimulus: jsPsych.timelineVariable('resp_img'),
	stimulus_height: stimHeight,
	prompt: '<div class="wrapper"><p style="font-size:12px; color: 	#E0FFFF;"><strong>Type your answer in the ANSWER BOX. Do not put spaces between numbers. Order does not matter.</strong><input class="mot" id="mot" type="text" placeholder="ANSWER BOX" onkeydown="search(this)" onkeypress="return isNumber(event)"></input>(Press ENTER to submit your answer)</p>',
	choices: ['Enter'],
	data: {designation: jsPsych.timelineVariable('type'), correct: jsPsych.timelineVariable('corANS')},
	on_finish: function(data){
		var ansArray = curMOT_RESP.split('');
		ansArray = ansArray.sort(); //sorted answer (from 1-8)
		if(arraysEqual(ansArray, data.correct)){
			var wasCorrect = 1;
			counterACC += 1;
			} else {
			var wasCorrect = 0;
			}
		jsPsych.data.addDataToLastTrial({
			MOT_RESP: ansArray,
			WAS_CORRECT: wasCorrect		
		});			
	}
};

var block_break = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-family: arial; size: 16px;"><p>You may take a short break if you wish. </p>'+
				'<p>In the next part, you will be asked to track 3 targets. Otherwise, everything will be the same. Remember to submit your result by pressing the <b>ENTER key</b>.'+
				'</br>Be as quick and accurate as you can.</p><p><b>Press F to begin</b></p></div>',
	choices: ['F']
};



///////////////////////////////////////////////

var MOT2_PROC = {
	timeline: [MOT_VID_MAIN, MOT_RESP_MAIN],
	timeline_variables: MOTVARS_TWO_01
};


var MOT3_PROC = {
	timeline: [MOT_VID_MAIN, MOT_RESP_MAIN],
	timeline_variables: MOTVARS_THREE_01
};



//Define the main MOT Procedure
var MOT_MAIN_PROC = {
	timeline: [MOT2_PROC, block_break, MOT3_PROC] 
};

///////////////////////////////////////////////////////////////////
// Final Important Variables to be referenced in your html file! //
///////////////////////////////////////////////////////////////////

var mot = {
	timeline: [training_proc, MOT_MAIN_PROC]
};

function return_motvid_folder(){
	return vid_preload;
};

function return_motimg_folder(){
	return img_preload;
}

