
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
var norepeatnoise;

	var volume_check_1 = {
      type: 'html-button-response',
      stimulus: "<p>The <b>volume calibration</b> will be first.</p><p>" +
	  "You will hear a five-second noise. Please adjust your computer's volume so that this noise is being presented at a comfortable level.</p>"+
		"<p>You will have the opportunity to repeat the noise if you wish.</p>",
	  choices: ['Listen'],
	  post_trial_gap: 250
    };


	var volume_check = {
	type: 'audio-button-response',
	stimulus: 'audCalib/volumetest.mp3',
  choices: ['Play Noise Again', 'Continue'],
  prompt: "<p>Adjust your volume so that the noise is being played at a comfortable level.</p>",
  response_ends_trial: true,
	trial_ends_after_audio: false,
	on_finish: function(data){
		norepeatnoise = data.response;
	}
	};

	var volume_loop = {
		timeline: [volume_check],
		loop_function: function(){
			if(norepeatnoise){
				return false;
			} else {
				return true;
			}
		}
	};


	var volume_adjust = {
		timeline: [volume_check_1, volume_loop]
	};


	var headphone_check_inst = {
		type: 'html-button-response',
		stimulus: "<p>You will now complete a short loudness judgment task.</p><p>" +
		"On each trial, you will hear three tones. One of these tones will be quieter than the others. Your task is to identify whether the quiet tone occured first, second, or third.</p>" +
		"<p><em>This task is relatively easy with headphones but extremely difficult without headphones. Thus, if you have access to headphones or earbuds, please wear them.</em></p>"+
		"<p>There are six trials in total.</p>",
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

	//Preload folder
	var audcheck_files = ['audCalib/t1_1.mp3', 'audCalib/t1_2.mp3', 'audCalib/t2_1.mp3', 'audCalib/t2_2.mp3', 'audCalib/t3_1.mp3', 'audCalib/t3_2.mp3', 'audCalib/volumetest.mp3'];

	var preload_audcheck = {
		type: 'preload',
		audio: audcheck_files,
		continue_after_error: true
	};



//Final timeline variable
var audcheck = {
	timeline: [preload_audcheck, volume_adjust, headphone_final, welcome]
};
