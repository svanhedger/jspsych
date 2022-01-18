/*
Categorizing Chords as Minor vs Major - Effects of Instrument

In this experiment, participants categorize three-note triads
as either minor or major. Critically, the middle note differs
systematically in its tuning to form a minor-to-major continuum.
Similar to prior work on the categorical perception of musical
chords, we expect a relatively sharp change from perceiving the
triads as either minor or major. However, we expect this inflection
point to be influenced by the instrument: 'happier' instruments
should be classified as major when the middle note is flatter
compared to 'sadder' instruments. Valence of instruments was
determined by prior research. Piano is also included as a more
neutral instrument.

*/

//General Variables
var blocknum = 1; //to be updated with each passing block
var takeabreak = ''; //to be updated with a break message after block 1
var givePractice = true; //boolean - if true, participant will practice categorizing unambiguous major/minor sounds

//Participant Identifier
var identifier = jsPsych.randomization.randomID(14); //random alphanumeric string for ID
    jsPsych.data.addProperties({
      participant: identifier,
      expt: 'inst-cat-01',
      chord: 'C'
    });

var main_variables = [
  {audio: 'sounds/violin/FINAL_STIM/C000.wav', instrument: 'violin', instrument_type: 'sad', stimulus_type: 1},
  {audio: 'sounds/violin/FINAL_STIM/C025.wav', instrument: 'violin', instrument_type: 'sad', stimulus_type: 2},
  {audio: 'sounds/violin/FINAL_STIM/C050.wav', instrument: 'violin', instrument_type: 'sad', stimulus_type: 3},
  {audio: 'sounds/violin/FINAL_STIM/C075.wav', instrument: 'violin', instrument_type: 'sad', stimulus_type: 4},
  {audio: 'sounds/violin/FINAL_STIM/C100.wav', instrument: 'violin', instrument_type: 'sad', stimulus_type: 5},
  {audio: 'sounds/flute/FINAL_STIM/C000.wav', instrument: 'flute', instrument_type: 'sad', stimulus_type: 1},
  {audio: 'sounds/flute/FINAL_STIM/C025.wav', instrument: 'flute', instrument_type: 'sad', stimulus_type: 2},
  {audio: 'sounds/flute/FINAL_STIM/C050.wav', instrument: 'flute', instrument_type: 'sad', stimulus_type: 3},
  {audio: 'sounds/flute/FINAL_STIM/C075.wav', instrument: 'flute', instrument_type: 'sad', stimulus_type: 4},
  {audio: 'sounds/flute/FINAL_STIM/C100.wav', instrument: 'flute', instrument_type: 'sad', stimulus_type: 5},
  {audio: 'sounds/oboe/FINAL_STIM/C000.wav', instrument: 'oboe', instrument_type: 'sad', stimulus_type: 1},
  {audio: 'sounds/oboe/FINAL_STIM/C025.wav', instrument: 'oboe', instrument_type: 'sad', stimulus_type: 2},
  {audio: 'sounds/oboe/FINAL_STIM/C050.wav', instrument: 'oboe', instrument_type: 'sad', stimulus_type: 3},
  {audio: 'sounds/oboe/FINAL_STIM/C075.wav', instrument: 'oboe', instrument_type: 'sad', stimulus_type: 4},
  {audio: 'sounds/oboe/FINAL_STIM/C100.wav', instrument: 'oboe', instrument_type: 'sad', stimulus_type: 5},
  {audio: 'sounds/piano/FINAL_STIM/C000.wav', instrument: 'piano', instrument_type: 'neutral', stimulus_type: 1},
  {audio: 'sounds/piano/FINAL_STIM/C025.wav', instrument: 'piano', instrument_type: 'neutral', stimulus_type: 2},
  {audio: 'sounds/piano/FINAL_STIM/C050.wav', instrument: 'piano', instrument_type: 'neutral', stimulus_type: 3},
  {audio: 'sounds/piano/FINAL_STIM/C075.wav', instrument: 'piano', instrument_type: 'neutral', stimulus_type: 4},
  {audio: 'sounds/piano/FINAL_STIM/C100.wav', instrument: 'piano', instrument_type: 'neutral', stimulus_type: 5},
  {audio: 'sounds/marimba/FINAL_STIM/C000.wav', instrument: 'marimba', instrument_type: 'happy', stimulus_type: 1},
  {audio: 'sounds/marimba/FINAL_STIM/C025.wav', instrument: 'marimba', instrument_type: 'happy', stimulus_type: 2},
  {audio: 'sounds/marimba/FINAL_STIM/C050.wav', instrument: 'marimba', instrument_type: 'happy', stimulus_type: 3},
  {audio: 'sounds/marimba/FINAL_STIM/C075.wav', instrument: 'marimba', instrument_type: 'happy', stimulus_type: 4},
  {audio: 'sounds/marimba/FINAL_STIM/C100.wav', instrument: 'marimba', instrument_type: 'happy', stimulus_type: 5},
  {audio: 'sounds/xylophone/FINAL_STIM/C000.wav', instrument: 'xylophone', instrument_type: 'happy', stimulus_type: 1},
  {audio: 'sounds/xylophone/FINAL_STIM/C025.wav', instrument: 'xylophone', instrument_type: 'happy', stimulus_type: 2},
  {audio: 'sounds/xylophone/FINAL_STIM/C050.wav', instrument: 'xylophone', instrument_type: 'happy', stimulus_type: 3},
  {audio: 'sounds/xylophone/FINAL_STIM/C075.wav', instrument: 'xylophone', instrument_type: 'happy', stimulus_type: 4},
  {audio: 'sounds/xylophone/FINAL_STIM/C100.wav', instrument: 'xylophone', instrument_type: 'happy', stimulus_type: 5},
  {audio: 'sounds/vibraphone/FINAL_STIM/C000.wav', instrument: 'vibraphone', instrument_type: 'happy', stimulus_type: 1},
  {audio: 'sounds/vibraphone/FINAL_STIM/C025.wav', instrument: 'vibraphone', instrument_type: 'happy', stimulus_type: 2},
  {audio: 'sounds/vibraphone/FINAL_STIM/C050.wav', instrument: 'vibraphone', instrument_type: 'happy', stimulus_type: 3},
  {audio: 'sounds/vibraphone/FINAL_STIM/C075.wav', instrument: 'vibraphone', instrument_type: 'happy', stimulus_type: 4},
  {audio: 'sounds/vibraphone/FINAL_STIM/C100.wav', instrument: 'vibraphone', instrument_type: 'happy', stimulus_type: 5}
];

main_variables = jsPsych.randomization.repeat(main_variables, 2); //shuffle and double trials
//main_variables = main_variables.slice(0,1) //for troubleshooting! comment out if really piloting/testing

//preload all of the audio files for calibration and main task
var preload_audio = [];

for(var i=0; i<main_variables.length; i++){
  preload_audio.push(main_variables[i].audio);
}

//////////////////
// Trials //
/////////////////


//Main instructions
var main_instructions = {
  type: 'instructions',
  pages: [
    '<p>You will now learn more about the main task.</p>',
    '<p>This is a categorization task. On each trial, you will hear three musical notes, played one after another.</p><p>Your task is to determine whether the three notes make up a <b>minor</b> or <b>major</b> triad.</p>',
    '<p>If you are not sure of your answer, please guess to the best of your abilities. </p><p>This task is expected to take approximately 45 minutes. </p><p>You will be given several opportunities to take breaks throughout the study.</p>'
  ],
  show_clickable_nav: true,
  on_start: function(){jsPsych.setProgressBar(0.05);}
};


var triad_presentation = {
  type: 'audio-keyboard-response',
  stimulus: jsPsych.timelineVariable('audio'),
  trial_ends_after_audio: true,
  choices: jsPsych.NO_KEYS,
  post_trial_gap: 250
};

var response_screen = {
  type: 'html-button-response',
  stimulus: '<p>Did that sound more like a <b>minor</b> or <b>major</b> triad?</p>',
  choices: ['Minor', 'Major'],
  post_trial_gap: 500,
  data: {designation: 'MAIN-JUDGMENT', instrument: jsPsych.timelineVariable('instrument'), valence: jsPsych.timelineVariable('instrument_type'), tuning_step: jsPsych.timelineVariable('stimulus_type')},
  on_finish: function(){
      var proportion_complete = jsPsych.getProgressBarCompleted();
      jsPsych.setProgressBar(proportion_complete+.003);
  }
};

var main_procedure = {
  timeline: [triad_presentation, response_screen],
  timeline_variables: main_variables,
  randomize_order: true
};

//Final Procedure, repeating the 70 sounds five times
var shortBreak = {
  type: 'html-button-response',
  stimulus: function(){return '<p>Block '+blocknum+ ' of 4</p><p>'+takeabreak+'</p>';},
  choices: ['Begin'],
  on_finish: function(){
    blocknum +=1;
    takeabreak = 'Please take a short break if you wish.';
  }
};


var final_proc = {
  timeline:[shortBreak, main_procedure, shortBreak, main_procedure, shortBreak, main_procedure, shortBreak, main_procedure]
};

/////////////////////////////
/* Initiate Practice Block */
/////////////////////////////

var numMin1 = 0; //logs how many times they play the minor example #1
var numMaj1 = 0; //logs how many times they play the major example #1
var pracBlock = 1; //for determining which practice block they are on
var setFeedback; //dynamic feedback for each trial
var totalTally = 0; //tallying correct responses
var repeatPrac; //whether participants must repeat practice
var repeatPracInstruct; //instructions for repeating practice
var curTally; //the current tally of performance of each block
var maxPracBlock = 2; //practice will repeat n times if participants have poor performance
var blockPassed; //logs whether the block was pass/fail
var passedPrac; //passed practice as boolean

function playMaj1() {
    	var audio = document.getElementById('playerMaj1');
    	audio.play();
    	numMaj1 +=1;
    };

function playMin1() {
      var audio = document.getElementById('playerMin1');
      audio.play();
      numMin1 +=1;
        };

var prac_instruct = {
  type: 'html-button-response',
  stimulus: '<p>You will now have the opportunity to practice the categorization task.</p>'+
            '<p>Each sound consists of three musical notes, played one at a time. The <u>middle</u> note of each sound is what determines whether it is <em>minor</em> or <em>major</em>.</p>'+
            '<p>In case you do not know what these sound like, please press the buttons below to hear an example of each.</p>'+
            '<p><input class="jspsych-btn" style="background-color:#FADBD8;" id="MIN" type="button" value="Minor" onclick="playMin1()"><audio id="playerMin1" src="examples/C000.wav"></audio></input><input class="jspsych-btn" style="background-color:#D1F2EB;" id="MAJ" type="button" value="Major" onclick="playMaj1()"><audio id="playerMaj1" src="examples/C100.wav"></audio></input></p>'+
            '<p>During practice, after you categorize each sound as <em>minor</em> or <em>major</em>, you will receive feedback about whether you made the right choice.</p>',
  choices: ['Begin Practice'],
  on_finish: function(data){
    jsPsych.data.addDataToLastTrial({
  		played_major1: numMaj1,
      played_minor1: numMin1,
      designation: 'practice-intro'
  		});
  }
};

var practice_vars = [
  {audio: 'examples/C000.wav', correct: 0, designation: 'practice'},
  {audio: 'examples/C100.wav', correct: 1, designation: 'practice'}
];

//push to array audio for preloading
for(var i=0; i<practice_vars.length; i++){
  preload_audio.push(practice_vars[i].audio)
};

var prac_audio = {
  type: 'audio-keyboard-response',
  stimulus: jsPsych.timelineVariable('audio'),
  trial_ends_after_audio: true,
  choices: jsPsych.NO_KEYS,
  post_trial_gap: 250
};


var prac_resp = {
  type: 'html-button-response',
  stimulus: '<p>Was that a <b>minor</b> or <b>major</b> triad?</p>',
  choices: ['Minor', 'Major'],
  post_trial_gap: 0,
  data: {correct: jsPsych.timelineVariable('correct')},
  on_finish: function(data){
    if(data.response == data.correct){
      var gotitright = 1;
      totalTally += 1;
      setFeedback = '<p style="color: darkgreen">Correct!</p>';
    } else {
      var gotitright = 0;
      setFeedback = '<p style="color:red">Incorrect.</p>';
    }
    jsPsych.data.addDataToLastTrial({
      practice_was_correct: gotitright,
      designation: 'practice-resp'
      });
  }
};

var prac_feedback = {
  type: 'html-keyboard-response',
  stimulus: function(){return setFeedback;},
  trial_duration: 1000,
  choices: jsPsych.NO_KEYS
};

var prac_proc = {
  timeline: [prac_audio, prac_resp, prac_feedback],
  timeline_variables: practice_vars,
  randomize_order: true,
  sample: {
        type: 'fixed-repetitions',
        size: [6,6]
      }
};

var calc_prac_perf = {
  type: 'html-keyboard-response',
  stimulus: '<p>+</p>',
  trial_duration: 500,
  on_finish: function(){
    curTally = totalTally;
    if(totalTally >= 8){
      repeatPrac = 0;
      repeatPracInstruct = 'Good job! You may now move onto the main task.';
      blockPassed = pracBlock;
      passedPrac = 1;
    } else if(pracBlock == maxPracBlock) {
      repeatPrac = 0;
      blockPassed = NA;
      passedPrac = 0;
      repeatPracInstruct = 'You do not have to repeat practice again. However, please try your best in the main task.';
    } else {
      repeatPrac = 1
      repeatPracInstruct = 'Please repeat practice one more time and try to get at least 8 of 12 correct.';
    }
    totalTally = 0;
    pracBlock +=1; //add one to practice block
    }
}

var prac_block_feedback = {
  type: 'html-button-response',
  stimulus: function(){return '<p>You correctly identified '+curTally+ ' of 12 sounds.</p><p>'+repeatPracInstruct+'</p>';},
  choices: ['Continue']
}

var prac_proc_loop = {
  timeline: [prac_proc, calc_prac_perf, prac_block_feedback],
  loop_function: function(){
        if(repeatPrac == 1){
            return true;
        } else {
            jsPsych.setProgressBar(0.10);
            return false;
        }
}
};

var final_practice_proc = {
  timeline: [prac_instruct, prac_proc_loop],

};

var begin_main = {
  type: 'html-button-response',
  stimulus: '<p>You will now complete the main task.</p><p>In the main task, some of the triads might be harder to classify than others, as they will be somewhat between typical minor and major triads.</p>'+
            '<p><em>Thus, it is important to listen carefully to each sound.</em></p><p>Every triad you hear can be correctly classified as either minor or major, even if some feel more difficult to classify than others.</p>',
  choices: ['Begin'],
  on_finish: function(data){
    jsPsych.data.addDataToLastTrial({
      designation: 'PRACTICE-PASSED-SUMMARY',
      passed_practice: passedPrac,
      block_passed_practice: blockPassed,
      practice_score: curTally
      });
  }
};

///////////////////////////////////////////////
/* Explicit Categorization of Isolated Notes */
///////////////////////////////////////////////

var explicit_instruct = {
  type: 'html-button-response',
  stimulus: '<p>Thank you for your responses.</p><p>In this next part of the study, you will hear single musical notes, played one at a time.</p>'+
            '<p>Please pay attention to the instrument that is playing each note. Your task will be to judge whether you think the instrument is more likely to play a sad (versus happy) song</p>'+
            '<p>You will rate 7 notes in total. This part of the study is expected to take about 3 minutes.</p>',
  choices: ['Begin'],
  post_trial_gap: 500
};


var explicit_var = [
  {audio: 'sounds/vibraphone/vC000.wav', instrument: 'vibraphone', instrument_type: 'happy'},
  {audio: 'sounds/xylophone/xC000.wav', instrument: 'xylophone', instrument_type: 'happy'},
  {audio: 'sounds/marimba/mC000.wav', instrument: 'marimba', instrument_type: 'happy'},
  {audio: 'sounds/piano/pC000.wav', instrument: 'piano', instrument_type: 'neutral'},
  {audio: 'sounds/flute/fC000.wav', instrument: 'flute', instrument_type: 'sad'},
  {audio: 'sounds/violin/vC000.wav', instrument: 'violin', instrument_type: 'sad'},
  {audio: 'sounds/oboe/oC000.wav', instrument: 'oboe', instrument_type: 'sad'}
];

//preload sounds for explicit ratings
var explicit_audio = [];
for(var i=0; i<explicit_var.length; i++){
  explicit_audio.push(explicit_var[i].audio);
};

var final_preload_cat = [...explicit_audio, ...preload_audio];

var main_preload = {
  type: 'preload',
  audio: final_preload_cat,
  continue_after_error: true
};

var likert_rtg = ["Very likely a sad song", "Possibly a sad song", "Possibly a happy song", "Very likely a happy song"];

var explicit_audio = {
  type: 'audio-keyboard-response',
  stimulus: jsPsych.timelineVariable('audio'),
  trial_ends_after_audio: true,
  choices: jsPsych.NO_KEYS
};

var explicit_rating = {
  type: 'survey-likert',
  questions: [
      {prompt: "<p>Do you think this instrument is likely to play a sad or happy song?</p>", name: 'exprtg', labels: likert_rtg}
    ],
  post_trial_gap: 500,
  data: {designation: 'INST-VALENCE-RTG', instrument: jsPsych.timelineVariable('instrument'), valence: jsPsych.timelineVariable('instrument_type')},
  on_finish: function(data){
    var curresp = data.response;
    var extractedresp = curresp.exprtg;
	   jsPsych.data.addDataToLastTrial({explicit_rtg: extractedresp+1});
  }
};

var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<p style="font-size: 40px;">+</p>',
  trial_duration: 500,
  choices: jsPsych.NO_KEYS
};

var explicit_rating_proc = {
  timeline: [fixation, explicit_audio, explicit_rating],
  timeline_variables: explicit_var,
  randomize_order: true,
  on_finish: function(){jsPsych.setProgressBar(1);}
};

var final_explicit_proc = {
  timeline: [explicit_instruct, explicit_rating_proc]
};

//////////////////////////////////////
// Push everything to the timeline! //
//////////////////////////////////////
if(givePractice){
var maincattask = {
  timeline:[main_preload, main_instructions, final_practice_proc, begin_main, final_proc, final_explicit_proc]
}
} else {
  var maincattask = {
    timeline:[main_preload, main_instructions, final_proc, final_explicit_proc]
  }
}
