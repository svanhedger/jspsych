
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
      stimulus: "<p>Welcome to the study. You will first complete a short volume calibration.</p><p>" +
	  "Please make sure you are in a quiet listening environment and that your computer's volume is turned on.<p></p>",
	  choices: ['Continue'],
	  post_trial_gap: 250
    };

	var volume_check_2 = {
      type: 'html-button-response',
      stimulus: "<p>The volume calibration will be first.</p><p>" +
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
		timeline: [volume_check_1, volume_check_2, volume_check]
	};	
	


	//Interim screen prior to main task
	var welcome = {
		type: "html-button-response",
		stimulus: "<p>The volume calibration is now complete.</p>",
		choices: ['Continue']
	};


//1.Final timeline variable
var audcheck = {
	timeline: [volume_adjust, welcome]
};

//2.Preload folder
var audcheck_files = ['audCalib/volumetest.mp3'];

function return_audcheck_folder(){
	return audcheck_files;
};

