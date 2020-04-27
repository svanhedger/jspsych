
/**************************/
/** PITCH ADJUSTMENT **/
/**************************/
/*
This module consists of an auditory adjustment / recreation
task. It has been used as a measure of auditory workingal
memory precision. It has been used with sine tones, button
really any continuum of sounds can be used.

Van Hedger et al. (2015) Auditory working memory predicts
individual differences in absolute pitch learning. Cognition,
140, 95-110.

On each trial, participant hear a target sound. This is then
masked by noise. Participants then hear a starting tone and 
have to try to recreate the target tone as accurately as
possible.

The script outputs two important variables. The first is 
'pitchadjust' which should be added to the experiment timeline
in the main html file -- e.g., timeline.push(pitchadjust);

The second is 'return_pitchadjust_folder' which should be pushed or
concatenated with other audio files for preloading purposes.
This is a function, so users can specify a different folder
name in the main html file
-- e.g., var foldername = return_pitchadjust_folder();

Stephen Van Hedger, April 2020

*/


////////////////////
// DATA VARIABLES //
////////////////////

var allClicks = []; //this array will store ALL button clicks (up, down, play current) for a trials/blocks
var allMoves = []; //this array will store all MOVES (i.e., just when someone changes the pitch via up/down buttons)
var trialCount = 1; //this will serve as a trial counter
var practiceTrialCount = 1; //this will serve as a trial counter for practice
var currentPosition; //this will log the current position in the tone array
var targetPosition; //this will log the correct position of the tone
var quickAssessment = 1; //0 = 64 trials (2x each target/probe combo), 1 = 32 trials (1x each target/probe combo)
var targetPlayed = 0; //to ensure participants have to hear the target before anything else
var delayPeriod = 2000; //the minimum time in ms between clicking on the target sound and being able to play the starting sound

///////////////
// TONE LIST //
///////////////

//full list of the tones plus pink noise
var toneList = [
"PA/01.wav","PA/02.wav", "PA/03.wav", "PA/04.wav", "PA/05.wav", 
"PA/06.wav","PA/07.wav", "PA/08.wav", "PA/09.wav", "PA/10.wav", 
"PA/11.wav","PA/12.wav", "PA/13.wav", "PA/14.wav", "PA/15.wav", 
"PA/16.wav","PA/17.wav", "PA/18.wav", "PA/19.wav", "PA/20.wav", 
"PA/21.wav","PA/22.wav", "PA/23.wav", "PA/24.wav", "PA/25.wav", 
"PA/26.wav","PA/27.wav", "PA/28.wav", "PA/29.wav", "PA/30.wav", 
"PA/31.wav","PA/32.wav", "PA/33.wav", "PA/34.wav", "noise/pinknoise.wav"]; 

//////////////////////
// BUTTON FUNCTIONS //
//////////////////////

// Functions to execute when the primary buttons are pressed (UP, DOWN, START/CURRENT, and TARGET) 
function goUP() {
	if (currentPosition == (toneList.length-1)){
		currentPosition;
		} else {
		currentPosition += 1;
		}		
	var playTone = toneList[currentPosition];
	var audio = document.getElementById('playerUp');
	document.getElementById('playerUp').src = playTone;	
	//don't allow playing of the current tone unless target has been played
	if(targetPlayed == 1){
		audio.play(); //this actually plays the file
	} else {
		document.getElementById('warning').innerHTML = "Please play the target sound first!";
		setTimeout(function(){
			document.getElementById('warning').innerHTML = "&nbsp;";
		}, 2000)
	}
	//Log the button press in an ongoing array for the trial
	allClicks[clickindex] = 1;	
	allMoves[moveindex] = 1;
	clickindex += 1;
	moveindex += 1;
};

function goDOWN() {
	if (currentPosition == 0){
		currentPosition;
		} else {
		currentPosition -= 1;
		}		
	var playTone = toneList[currentPosition];
	var audio = document.getElementById('playerDown');
	document.getElementById('playerDown').src = playTone;	
	//don't allow playing of the current tone unless target has been played
	if(targetPlayed == 1){
		audio.play(); //this actually plays the file
	} else {
		document.getElementById('warning').innerHTML = "Please play the target sound first!";
		setTimeout(function(){
			document.getElementById('warning').innerHTML = "&nbsp;";
		}, 2000)
	}
	//Log the button press in an ongoing array for the trial
	allClicks[clickindex] = -1;	
	allMoves[moveindex] = -1;
	clickindex += 1;
	moveindex += 1;
};

function playCURRENT() {
	var playTone = toneList[currentPosition];
	var audio = document.getElementById('playerCurrent');
	document.getElementById('playerCurrent').src = playTone;	
	//don't allow playing of the current tone unless target has been played
	if(targetPlayed == 1){
		audio.play(); //this actually plays the file
	} else {
		document.getElementById('warning').innerHTML = "Please play the target sound first!";
		setTimeout(function(){
			document.getElementById('warning').innerHTML = "&nbsp;";
		}, 2000)
	}	
	//Log the button press in an ongoing array for the trial
	allClicks[clickindex] = 0;	
	clickindex += 1;
};

//This function plays the initial target tone, followed by noise
function playTARGET() {
	var playTone = toneList[targetPosition];
	var audio = document.getElementById('playerTarget');
	var targetbutton = document.getElementById('TBUTTON');
	document.getElementById('playerTarget').src = playTone;	
	audio.play(); //this actually plays the file
	targetbutton.style.display = 'none'; //this hides the input, preventing future plays of the target
		
	//Play noise file 500ms after the onset of the target tone
	setTimeout(function(){
		var noise = document.getElementById('playerTarget');
		document.getElementById('playerTarget').src = 'noise/pinknoise.wav';
		noise.play(); //this actually plays the file
		}, 500)
	//Set the duration of the delay before participants are able to click on the other buttons.
	setTimeout(function(){	
		targetPlayed = 1;
	}, delayPeriod)

};
////////////////////
// MAIN VARIABLES //
////////////////////

//This houses all of the trial combinations (i.e., starting tone/target tone combos)
//As done in Van Hedger et al. (2015) Cognition, targets are tones 13,16,19,22 in the
//array. Starting tones are 1,4,7,10 / 25,28,31,34. All combinations occur 2x for a 
//total of 64 trials. Because javascript does zero-indexing, the locations are n-1.

var PA_VARS = [
{targetTone: toneList[12], probeTone: toneList[0], distance: 12, correctIndex: 12, initialPosition: 0},
{targetTone: toneList[12], probeTone: toneList[0], distance: 12, correctIndex: 12, initialPosition: 0},
{targetTone: toneList[12], probeTone: toneList[3], distance: 9, correctIndex: 12, initialPosition: 3},
{targetTone: toneList[12], probeTone: toneList[3], distance: 9, correctIndex: 12, initialPosition: 3},
{targetTone: toneList[12], probeTone: toneList[6], distance: 6, correctIndex: 12, initialPosition: 6},
{targetTone: toneList[12], probeTone: toneList[6], distance: 6, correctIndex: 12, initialPosition: 6},
{targetTone: toneList[12], probeTone: toneList[9], distance: 3, correctIndex: 12, initialPosition: 9},
{targetTone: toneList[12], probeTone: toneList[9], distance: 3, correctIndex: 12, initialPosition: 9},
{targetTone: toneList[15], probeTone: toneList[0], distance: 15, correctIndex: 15, initialPosition: 0},
{targetTone: toneList[15], probeTone: toneList[0], distance: 15, correctIndex: 15, initialPosition: 0},
{targetTone: toneList[15], probeTone: toneList[3], distance: 12, correctIndex: 15, initialPosition: 3},
{targetTone: toneList[15], probeTone: toneList[3], distance: 12, correctIndex: 15, initialPosition: 3},
{targetTone: toneList[15], probeTone: toneList[6], distance: 9, correctIndex: 15, initialPosition: 6},
{targetTone: toneList[15], probeTone: toneList[6], distance: 9, correctIndex: 15, initialPosition: 6},
{targetTone: toneList[15], probeTone: toneList[9], distance: 6, correctIndex: 15, initialPosition: 9},
{targetTone: toneList[15], probeTone: toneList[9], distance: 6, correctIndex: 15, initialPosition: 9},
{targetTone: toneList[18], probeTone: toneList[0], distance: 18, correctIndex: 18, initialPosition: 0},
{targetTone: toneList[18], probeTone: toneList[0], distance: 18, correctIndex: 18, initialPosition: 0},
{targetTone: toneList[18], probeTone: toneList[3], distance: 15, correctIndex: 18, initialPosition: 3},
{targetTone: toneList[18], probeTone: toneList[3], distance: 15, correctIndex: 18, initialPosition: 3},
{targetTone: toneList[18], probeTone: toneList[6], distance: 12, correctIndex: 18, initialPosition: 6},
{targetTone: toneList[18], probeTone: toneList[6], distance: 12, correctIndex: 18, initialPosition: 6},
{targetTone: toneList[18], probeTone: toneList[9], distance: 9, correctIndex: 18, initialPosition: 9},
{targetTone: toneList[18], probeTone: toneList[9], distance: 9, correctIndex: 18, initialPosition: 9},
{targetTone: toneList[21], probeTone: toneList[0], distance: 21, correctIndex: 21, initialPosition: 0},
{targetTone: toneList[21], probeTone: toneList[0], distance: 21, correctIndex: 21, initialPosition: 0},
{targetTone: toneList[21], probeTone: toneList[3], distance: 18, correctIndex: 21, initialPosition: 3},
{targetTone: toneList[21], probeTone: toneList[3], distance: 18, correctIndex: 21, initialPosition: 3},
{targetTone: toneList[21], probeTone: toneList[6], distance: 15, correctIndex: 21, initialPosition: 6},
{targetTone: toneList[21], probeTone: toneList[6], distance: 15, correctIndex: 21, initialPosition: 6},
{targetTone: toneList[21], probeTone: toneList[9], distance: 12, correctIndex: 21, initialPosition: 9},
{targetTone: toneList[21], probeTone: toneList[9], distance: 12, correctIndex: 21, initialPosition: 9},
{targetTone: toneList[12], probeTone: toneList[24], distance: 12, correctIndex: 12, initialPosition: 24},
{targetTone: toneList[12], probeTone: toneList[24], distance: 12, correctIndex: 12, initialPosition: 24},
{targetTone: toneList[12], probeTone: toneList[27], distance: 15, correctIndex: 12, initialPosition: 27},
{targetTone: toneList[12], probeTone: toneList[27], distance: 15, correctIndex: 12, initialPosition: 27},
{targetTone: toneList[12], probeTone: toneList[30], distance: 18, correctIndex: 12, initialPosition: 30},
{targetTone: toneList[12], probeTone: toneList[30], distance: 18, correctIndex: 12, initialPosition: 30},
{targetTone: toneList[12], probeTone: toneList[33], distance: 21, correctIndex: 12, initialPosition: 33},
{targetTone: toneList[12], probeTone: toneList[33], distance: 21, correctIndex: 12, initialPosition: 33},
{targetTone: toneList[15], probeTone: toneList[24], distance: 9, correctIndex: 15, initialPosition: 24},
{targetTone: toneList[15], probeTone: toneList[24], distance: 9, correctIndex: 15, initialPosition: 24},
{targetTone: toneList[15], probeTone: toneList[27], distance: 12, correctIndex: 15, initialPosition: 27},
{targetTone: toneList[15], probeTone: toneList[27], distance: 12, correctIndex: 15, initialPosition: 27},
{targetTone: toneList[15], probeTone: toneList[30], distance: 15, correctIndex: 15, initialPosition: 30},
{targetTone: toneList[15], probeTone: toneList[30], distance: 15, correctIndex: 15, initialPosition: 30},
{targetTone: toneList[15], probeTone: toneList[33], distance: 18, correctIndex: 15, initialPosition: 33},
{targetTone: toneList[15], probeTone: toneList[33], distance: 18, correctIndex: 15, initialPosition: 33},
{targetTone: toneList[18], probeTone: toneList[24], distance: 6, correctIndex: 18, initialPosition: 24},
{targetTone: toneList[18], probeTone: toneList[24], distance: 6, correctIndex: 18, initialPosition: 24},
{targetTone: toneList[18], probeTone: toneList[27], distance: 9, correctIndex: 18, initialPosition: 27},
{targetTone: toneList[18], probeTone: toneList[27], distance: 9, correctIndex: 18, initialPosition: 27},
{targetTone: toneList[18], probeTone: toneList[30], distance: 12, correctIndex: 18, initialPosition: 30},
{targetTone: toneList[18], probeTone: toneList[30], distance: 12, correctIndex: 18, initialPosition: 30},
{targetTone: toneList[18], probeTone: toneList[33], distance: 15, correctIndex: 18, initialPosition: 33},
{targetTone: toneList[18], probeTone: toneList[33], distance: 15, correctIndex: 18, initialPosition: 33},
{targetTone: toneList[21], probeTone: toneList[24], distance: 3, correctIndex: 21, initialPosition: 24},
{targetTone: toneList[21], probeTone: toneList[24], distance: 3, correctIndex: 21, initialPosition: 24},
{targetTone: toneList[21], probeTone: toneList[27], distance: 6, correctIndex: 21, initialPosition: 27},
{targetTone: toneList[21], probeTone: toneList[27], distance: 6, correctIndex: 21, initialPosition: 27},
{targetTone: toneList[21], probeTone: toneList[30], distance: 9, correctIndex: 21, initialPosition: 30},
{targetTone: toneList[21], probeTone: toneList[30], distance: 9, correctIndex: 21, initialPosition: 30},
{targetTone: toneList[21], probeTone: toneList[33], distance: 12, correctIndex: 21, initialPosition: 33},
{targetTone: toneList[21], probeTone: toneList[33], distance: 12, correctIndex: 21, initialPosition: 33}
];

//function to cut the trials in half for short-form version
function shortForm(array) {
    var evenOnes = [];
    for(var i=0; i<array.length; i++) {
        if(i % 2 == 0) {
			evenOnes.push(array[i]);
		}	
	}	
    return evenOnes;
};

if(quickAssessment == 1) {
	PA_VARS = shortForm(PA_VARS);
	PA_VARS = jsPsych.randomization.repeat(PA_VARS, 1); //shuffle the array;
} else {
	PA_VARS = jsPsych.randomization.repeat(PA_VARS, 1); //shuffle the array;
}

var PA_VARS_PRACTICE = PA_VARS.slice(0,2); //select two for practice trials (similar to the Matlab script)

//////////////////
// MAIN SCREENS //
//////////////////

//Main Instructions
var mainInstruct = {
	type: 'html-button-response',
	stimulus: '<p><b>Welcome to the study.</b></p><p>This is a <b>tone reproduction task</b>. We are interested in how well you are able to recreate a briefy presented tone.</p>' +
			  'At the beginning of each trial, you will play a <b>Target Tone</b> by clicking on a button labeled "T". <u>Listen carefully to this tone.</u>' +
			  '</br>This Target Tone will be followed immediately by noise, and you will not be able to replay it.</p>' +
			  '<p>You will then click on a button labeled "S" to hear the <b>Starting Tone</b>.</br>Your task is to adjust this Starting Tone to recreate the Target Tone.</p>' +
			  '<p>To do this, you will click on "up" and "down" arrows on the screen to move the Starting Tone up and down, respectively.</p>' +
			  '<p>Once you think you have successfully reached the Target Tone, you will press ENTER.</p><p>You will now have the opportunity to practice the task.</p>',
	choices: ['Begin Practice']		  
};

//Interim Screen
var interimScreen = {
	type: 'html-button-response',
	stimulus: '<p>This concludes the practice trials.</br>Please continue onto the main task when you are ready.</p>',
	choices: ['Begin Main Task'],
	on_finish: function(){
		trialCount = 1; //replace 'practice' with 1
	}
};


//Setup
var setupScreen = {
	type: 'html-button-response',
	stimulus: function(){return '<p>Trial ' +trialCount+ ' of '+PA_VARS.length+'</p>';},
	choices: ['Begin'],
	post_trial_gap: 250,
	data: {designation: 'SETUP', start_pos: jsPsych.timelineVariable('initialPosition'), cor_pos: jsPsych.timelineVariable('correctIndex')},
	on_finish: function(data){
		clickindex = 0; //reset the click index for the upcoming trial
		moveindex = 0; //reset the move index for the upcoming trial
		allClicks = []; //reset the click array for the upcoming trial
		allMoves = []; //reset the move array for the upcoming trial
		currentPosition = data.start_pos; //this will make sure the response screen is properly set up
		targetPosition = data.cor_pos; //this will make sure the response screen is properly set to play the target
	}
};

//Setup Practice
var setupScreenPractice = {
	type: 'html-button-response',
	stimulus: function(){return '<p>Practice Trial ' +practiceTrialCount+ ' of '+PA_VARS_PRACTICE.length+'</p>';},
	choices: ['Begin'],
	post_trial_gap: 250,
	data: {designation: 'SETUP', start_pos: jsPsych.timelineVariable('initialPosition'), cor_pos: jsPsych.timelineVariable('correctIndex')},
	on_finish: function(data){
		clickindex = 0; //reset the click index for the upcoming trial
		moveindex = 0; //reset the move index for the upcoming trial
		allClicks = []; //reset the click array for the upcoming trial
		allMoves = []; //reset the move array for the upcoming trial
		practiceTrialCount += 1; //update trial counter	
		currentPosition = data.start_pos; //this will make sure the response screen is properly set up
		targetPosition = data.cor_pos; //this will make sure the response screen is properly set up
	}
};


//Main Screen
var testScreen = {
	type: 'html-keyboard-response',
	data: {designation: 'RESPONSE', start_pos: jsPsych.timelineVariable('initialPosition'), cor_pos: jsPsych.timelineVariable('correctIndex')},
	stimulus: '<div class="triple column"><p><input class="filler" value="&#8593;" type="button"></p><p><input class="TBUTTON" id="TBUTTON" type="button" value="T" onclick="playTARGET()"><audio id="playerTarget" src=""></audio></p></div>'+
			  '<div class="triple column"><p><input class="UBUTTON" id="UBUTTON" type="button" value="&#8593;" onclick="goUP()"><audio id="playerUp" src=""></audio></p>'+
			  '<p><input class="SBUTTON" id="SBUTTON" type="button" value="S" onclick="playCURRENT()"><audio id="playerCurrent" src=""></audio></p>'+
			  '<p><input class="DBUTTON" id="DBUTTON" type="button" value="&#8595;" onclick="goDOWN()"><audio id="playerDown" src=""></audio></p></div>',			  
	choices: [13], //this is the code for ENTER
	prompt: '<div class="w3-container"><b>Instructions</b></br>1.Click the "T" button to hear the TARGET tone. Listen carefully - you only get to hear this tone once.</br>'+
			'2. Click on the "S" button to hear the STARTING tone. </br>3. Click on the up and down arrows to move this STARTING tone to match the TARGET tone.</br></br>'+
			'You can check your current location at any time by clicking on the "S" button.</br>When you think you have successfully reached the target tone, press ENTER.</div><div id="warning" style="color:red">&nbsp;</div>',
	on_finish: function(data){
		var finalLOC = currentPosition; //where the participants ended up in the array
		var finalClicks = allClicks;
		var finalMoves = allMoves;
		var numClicks = allClicks.length;
		var numMoves = allMoves.length;
		var deviation = Math.abs(finalLOC - data.cor_pos);
		
		jsPsych.data.addDataToLastTrial({
			trial_count: trialCount,
			final_loc: finalLOC,
			clickTracker: finalClicks,
			moveTracker: finalMoves,
			num_clicks: numClicks,
			num_moves: numMoves,
			abs_deviation: deviation
			});	
		
		if(trialCount == 'practice'){
			trialCount = trialCount
		} else {
			trialCount += 1; //update trial counter	for main task only
		}
		targetPlayed = 0; //reset target played before next trial commences	
	}
};

//Wrap-Up  
    var pa_finish = {
        type: "html-button-response",
        stimulus: "<p>Thank you for your responses. This concludes the tone reproduction task.</p>",
		choices: ['Continue']
      };
	  
	  
///////////////////////////
// DEFINE THE PROCEDURES //
///////////////////////////

var practiceProcedure = {
	timeline: [setupScreenPractice, testScreen],
	timeline_variables: PA_VARS_PRACTICE,
	randomize_order:true
}


var mainProcedure = {
	timeline: [setupScreen, testScreen],
	timeline_variables: PA_VARS,
	randomize_order:true	
}

//final procedure to push to the timeline
var pitchadjust = {
	timeline: [mainInstruct, practiceProcedure, interimScreen, mainProcedure, pa_finish]
}

//function to return the audio folder for preloading
function return_pitchadjust_folder() {
	return toneList
}
      
