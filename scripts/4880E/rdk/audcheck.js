
/**************************/
/** AUDITORY CALIBRATION **/
/**************************/
/*
This module consists of two parts - a basic volume adjustment
and a loudness judgment task. It should take fewer than 5
minutes to complete in total.

Make sure that the volume adjustment stimulus ('volumetest.mp3')
is normalized according to the stimuli you want to present!

The loudness judgment task comes from the McDermott lab (2017)
and should be relatively easy if wearing headphones (but quite
difficult if listening over typical computer speakers.

Woods et al. (2017). Headphone screening to facilitate auditory
web-based experiments. Attention, Perception, & Psychophysics,
79, 2064-72. 10.3758/s13414-017-1361-2

In the main index.html script, you should reference two things:

1. You must push 'audcheck' to the timeline [i.e., timeline.push(audcheck);] 
when you want the task to run

2. Use the 'return_audcheck_folder' function to name your own folder 
for the audio files (for preloading). This is optional -- if you do not
do this, you should specify that 'audcheck_files' is the variable to be
preloaded for audio


// Stephen Van Hedger, April 2020 //

*/


	var volume_check_1 = {
      type: 'html-button-response',
      stimulus: "<p>The <b>volume calibration</b> will be first.</p><p>" +
	  "You will hear a thirty-second noise. Please adjust your computer's volume so that this noise is being presented at a comfortable level.<p></p>",
	  choices: ['Listen'],
	  post_trial_gap: 250
    };


	var volume_check = {	
	type: 'audio-button-response',
	stimulus: 'audCalib/volumetest.mp3',
    choices: ['I am ready to continue.'],
    prompt: "<p>Adjust your volume so that the noise is being played at a comfortable level.</p>"+
	"<p></p>Press the button whenever you are ready to continue.",
    response_ends_trial: true,
	trial_duration: 30000
	};

	
	var volume_adjust = {
		timeline: [volume_check_1, volume_check]
	};	
	

	var headphone_check_inst = {
		type: 'html-button-response',
		stimulus: "<p>You will now complete a short loudness judgment task.</p><p>" +
		"On each trial, you will hear three tones. One of these tones will be quieter than the others. Your task is to identify whether the quiet tone occured first, second, or third.</p><p>" + 
		"There are six trials in total.<p></p>",
		choices: ['Begin'],
		post_trial_gap: 250
		};

// procedure that randomly presents the six trials and provides feedback to Participants
	var headphone_proc = {
		timeline: [
        {
            type: 'html-keyboard-response',
            stimulus: '<div style="font-size:60px;">+</div>',
            choices: jsPsych.NO_KEYS,
            trial_duration: 500
        },
        {
            type: 'audio-button-response',
            stimulus: jsPsych.timelineVariable('headphone_stim'),
            prompt: "<p>Which tone was the quietest?</p>",
            choices: ['First', 'Second', 'Third'],
			data: { correctRESP: jsPsych.timelineVariable('correctRESP') },
			post_trial_gap: 500,
            on_finish: function(data){
				if(data.button_pressed == data.correctRESP){
					data.correct = 1;
				} else {
					data.correct = 0;
				}
			jsPsych.data.addDataToLastTrial({
				designation: "headphone-test"
			});	
		}
       }
	   	   
    ],
    timeline_variables: [
        { headphone_stim: 'audCalib/t1_1.mp3', correctRESP: 0 },
		{ headphone_stim: 'audCalib/t1_2.mp3', correctRESP: 0 },
		{ headphone_stim: 'audCalib/t2_1.mp3', correctRESP: 1 },
		{ headphone_stim: 'audCalib/t2_2.mp3', correctRESP: 1 },
		{ headphone_stim: 'audCalib/t3_1.mp3', correctRESP: 2 },
		{ headphone_stim: 'audCalib/t3_2.mp3', correctRESP: 2 }
    ],
	randomize_order: true
	};

	var headphone_final = {
		timeline: [headphone_check_inst, headphone_proc]
	};

	//Interim screen prior to main task
	var welcome = {
		type: "html-button-response",
		stimulus: "<p>The volume calibration is now complete.</p>",
		choices: ['Continue']
	};


//1.Final timeline variable
var audcheck = {
	timeline: [volume_adjust, headphone_final, welcome]
};

//2.Preload folder
var audcheck_files = ['audCalib/t1_1.mp3', 'audCalib/t1_2.mp3', 'audCalib/t2_1.mp3', 'audCalib/t2_2.mp3', 'audCalib/t3_1.mp3', 'audCalib/t3_2.mp3', 'audCalib/volumetest.mp3'];

function return_audcheck_folder(){
	return audcheck_files;
};

