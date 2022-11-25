/*
Auditory Calibration Script

This short module allows participants
to adjust their volume to a comfortable
level (same RMS as the sounds in the study)
and then provides a short headphone
assessment. The headphone assessment takes
advantage of Huggins pitches and is described
in detail in the following paper:

Milne, A.E., Bianco, R., Poole, K.C. et al.
An online headphone screening test based on dichotic pitch.
Behav Res 53, 1551–1562 (2021).
https://doi.org/10.3758/s13428-020-01514-0

On each trial, participants hear three samples of
noise. One of the noise samples has a faint
tone embedded in it, but this is only perceptible
when there is clear channel separation (i.e., a
dichotic listening situation). Thus, performance
is expected to be dichotomous, with near-chance
(2/6) performance for participants not wearing
headphones and near-perfect (5+/6) performance
for participants wearing headphones.

Thank you to Milne and colleagues for providing
these materials on GitHub!

Stephen Van Hedger, July 2022

*/

var reported_headphones; //for storing the self-report headphone use
var noisecount = 1; //to be updated with each trial
var headphoneTally = 0; //for summing the total number of correct responses

var calib_instruct = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p><b>Soud Calibration</b></p>
               <p>Before we begin, let's make sure that your volume is adjusted to hear the sounds.</p>
               <p>After this, you'll complete a mini-task that checks if you are wearing headphones.</br>
               (Headphone use is not required but is strongly recommended for the best experience)</p>
               <p>In total, this part should take about 5 minutes.</p>`,
    choices: ['Continue']
};

//Generate new audio constant to use throughout
const allSounds = new Audio();
allSounds.autoplay = true;

var numCalib = 0; //for tracking the times playing the calibration
var numHP = 0; //for tracking the times playing the Huggins pitch example

function playCalib() {
    	allSounds.src = 'hp/hp_calibration.mp3';
    	allSounds.play(); //this actually plays the file
    	//Log the button press in an ongoing array for the trial
    	numCalib +=1;
    };

    function playHP() {
    	allSounds.src = 'hp/hp_example.wav';
    	allSounds.play(); //this actually plays the file
    	//Log the button press in an ongoing array for the trial
    	numHP +=1;
    };


/************************/
/** Volume Calibration **/
/************************/
var CALIB_AUD = ['hp/hp_01_01.wav', 'hp/hp_01_02.wav', 'hp/hp_01_03.wav', 'hp/hp_02_01.wav', 'hp/hp_02_02.wav', 'hp/hp_02_03.wav', 'hp/hp_03_01.wav', 'hp/hp_03_02.wav', 'hp/hp_03_03.wav', 'hp/hp_04_01.wav', 'hp/hp_04_02.wav', 'hp/hp_04_03.wav', 'hp/hp_05_01.wav', 'hp/hp_05_02.wav', 'hp/hp_05_03.wav', 'hp/hp_06_01.wav', 'hp/hp_06_02.wav', 'hp/hp_06_03.wav', 'hp/hp_example.wav', 'hp/hp_calibration.mp3'];


var volume_check = {
	type: jsPsychHtmlButtonResponse,
	stimulus: `<b><p>First, let's adjust your device's volume to a comfortable level.</b></p><p>Press the PLAY button to hear the sound.</br>Adjust your volume so that the sound is being played</br>at a comfortable level.</p>
               <p><input class='jspsych-btn' style='background-color:lightblue;' id='CALIB' type='button' value='PLAY' onclick='playCalib()'><audio id='playerCalib' src=''></audio></input></p>
               <p>When you are ready to begin, press Continue.</p>`,
  choices: ['Continue'],
  on_finish: function(){
    allSounds.pause();
    allSounds.src=''; //clear the src of the file (probably unnecessary)
  }
	};


/***********************************************/
/** Headphone Use (Self-Report and Objective) **/
/***********************************************/
var headphone_use = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>Are you wearing headphones or earbuds?</p>`,
  choices: ['No', 'Yes'],
  data: {designation: 'headphone-self-report'},
  on_finish: function(data){
    reported_headphones = data.response;
  }
};

var hp_intro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p><b>Now we will check your headphones.</b></br>(<em>Note: If you are not wearing headphones or earbuds and do not have access to any, that is okay. Please just try your best.</em>)</p>
    <p>In this mini-task, you will first hear a sound. The sound contains three noises with silent gaps in-between. One of the noises has a faint "beep" hidden within.</p>
    <p>Your task is to decide which of the three noises contains the beep, and click on the correct button: 1, 2, or 3.</p>
    <p>Click the blue button below to play an example. The beep is hidden inside the <b>second</b> noise, so the answer is <b>2</b>. You can play the example as many times as you like.
    <p><input class='jspsych-btn' style='background-color:lightblue;' type='button' value='PLAY' onclick='playHP()'><audio id='playerHP' src=''></audio></input></p>
    <p>Make sure you are ready before continuing! You will not be able to replay any of the noises in the mini-task.</p>`,
    choices: ['I am ready to begin!']
};

var hp_allvar = [
    {sound: 'hp/hp_01_01.wav', correctLOC: 0},
    {sound: 'hp/hp_02_01.wav', correctLOC: 0},
    {sound: 'hp/hp_03_01.wav', correctLOC: 0},
    {sound: 'hp/hp_04_01.wav', correctLOC: 0},
    {sound: 'hp/hp_05_01.wav', correctLOC: 0},
    {sound: 'hp/hp_06_01.wav', correctLOC: 0},
    {sound: 'hp/hp_01_02.wav', correctLOC: 1},
    {sound: 'hp/hp_02_02.wav', correctLOC: 1},
    {sound: 'hp/hp_03_02.wav', correctLOC: 1},
    {sound: 'hp/hp_04_02.wav', correctLOC: 1},
    {sound: 'hp/hp_05_02.wav', correctLOC: 1},
    {sound: 'hp/hp_06_02.wav', correctLOC: 1},
    {sound: 'hp/hp_01_03.wav', correctLOC: 2},
    {sound: 'hp/hp_02_03.wav', correctLOC: 2},
    {sound: 'hp/hp_03_03.wav', correctLOC: 2},
    {sound: 'hp/hp_04_03.wav', correctLOC: 2},
    {sound: 'hp/hp_05_03.wav', correctLOC: 2},
    {sound: 'hp/hp_06_03.wav', correctLOC: 2},
];

var hp_01var = hp_allvar.slice(0,6);
var hp_02var = hp_allvar.slice(6,12);
var hp_03var = hp_allvar.slice(12,18);

hp_01var = jsPsych.randomization.sampleWithoutReplacement(hp_01var, 2);
hp_02var = jsPsych.randomization.sampleWithoutReplacement(hp_02var, 2);
hp_03var = jsPsych.randomization.sampleWithoutReplacement(hp_03var, 2);

var hp_tlinevar = [];
//this contains the selected trials
hp_tlinevar.push(
  hp_01var[0],
  hp_02var[0],
  hp_03var[0],
  hp_01var[1],
  hp_02var[1],
  hp_03var[1]
  );

//Huggins Pitch Screens

var hp_playsound = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable(`sound`),
  choices: 'NO_KEYS',
  prompt: function(){return `<p>Noise ${noisecount} of ${hp_tlinevar.length}`;},
  trial_ends_after_audio: true,
  on_finish: function(){noisecount += 1;}
};

var hp_response = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>Which noise contained the beep?</p>`,
  data: {correct: jsPsych.timelineVariable(`correctLOC`), designation: 'headphone-judgment'},
  choices: ['1','2','3'],
  post_trial_gap: 500,
  on_finish: function(data){
    if(data.response == data.correct){
      var gotitright = 1;
      headphoneTally += 1;
    } else {
      var gotitright = 0;
    }
    jsPsych.data.get().addToLast({
      was_correct: gotitright
    });
  }
};

var hp_end = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>Thanks for your responses!</p><p>Sound calibration is now complete.</p>`,
  choices: ['Continue'],
  on_finish: function(data){
    if(headphoneTally > 4){
      var headphonepass = 1;
    } else {
      var headphonepass = 0;
    }
    console.log(headphonepass, headphoneTally, reported_headphones);
    jsPsych.data.get().addToLast({
      designation: 'headphone-summary',
      headphone_pass: headphonepass,
      headphone_total: headphoneTally,
      headphone_use_reported: reported_headphones
    });
  }
};

var hp_mainproc = {
  timeline: [hp_playsound, hp_response],
  timeline_variables: hp_tlinevar,
  randomize_order: true
};

var calibration = {
  timeline: [calib_instruct, volume_check, headphone_use, hp_intro, hp_mainproc, hp_end]
}
