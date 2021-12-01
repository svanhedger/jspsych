/************************************/
/***** Sentence Repetition Test *****/
/************************************/

/*
Description: The Sentence Repetition Test (SRT), also known as the Sentence Memory Test,
involves repeating (in this case, typing) back speech tokens of increasing numbers of syllables.
The test starts with just a single syllable ('look') and progresses to 26 syllables. The
typical scoring is the maximum syllable length able to be successfully recalled. We also have
coded the proportion of correctly identified words as a secondary measure.

The SRT taps linguistic knowledge and working memory.

Reference: Spreen, O., & Benton, A.L. (1969, 1977). Neurosensory Center Comprehensive Examination for Aphasia. Victoria, B.C.: University of Victoria, Neuropsychology Laboratory
*/


var SRT_proc = [
{SRTstim: 'SRT/srt_01.mp3', SRTcorrect: "look", syllables: 1},
{SRTstim: 'SRT/srt_02.mp3', SRTcorrect: "come here", syllables: 2},
{SRTstim: 'SRT/srt_03.mp3', SRTcorrect: "help yourself", syllables: 3},
{SRTstim: 'SRT/srt_04.mp3', SRTcorrect: "bring the table", syllables: 4},
{SRTstim: 'SRT/srt_05.mp3', SRTcorrect: "summer is coming", syllables: 5},
{SRTstim: 'SRT/srt_06.mp3', SRTcorrect: "the iron was quite hot", syllables: 6},
{SRTstim: 'SRT/srt_07.mp3', SRTcorrect: "the birds were singing all day", syllables: 7},
{SRTstim: 'SRT/srt_08.mp3', SRTcorrect: "the paper was under the chair", syllables: 8},
{SRTstim: 'SRT/srt_09.mp3', SRTcorrect: "the sun was shining throughout the day", syllables: 9},
{SRTstim: 'SRT/srt_10.mp3', SRTcorrect: "he entered about eight o'clock that night", syllables: 10},
{SRTstim: 'SRT/srt_11.mp3', SRTcorrect: "the pretty house on the mountain seemed empty", syllables: 11},
{SRTstim: 'SRT/srt_12.mp3', SRTcorrect: "the lady followed the path down the hill toward home", syllables: 13},
{SRTstim: 'SRT/srt_13.mp3', SRTcorrect: "the island in the ocean was first noticed by the young boy", syllables: 15},
{SRTstim: 'SRT/srt_14.mp3', SRTcorrect: "the distance between these two cities is too far to travel by car", syllables: 17},
{SRTstim: 'SRT/srt_15.mp3', SRTcorrect: "a judge here knows the law better than those people who must appear before him", syllables: 19},
{SRTstim: 'SRT/srt_16.mp3', SRTcorrect: "there is a new method in making steel which is far better than that used before", syllables: 20},
{SRTstim: 'SRT/srt_17.mp3', SRTcorrect: "this nation has a good government which gives us many freedoms not known in times past", syllables: 21},
{SRTstim: 'SRT/srt_18.mp3', SRTcorrect: "the friendly man told us the directions to the modern building where we could find the club", syllables: 22},
{SRTstim: 'SRT/srt_19.mp3', SRTcorrect: "the king knew how to rule his country so that his people would show respect for his government", syllables: 23},
{SRTstim: 'SRT/srt_20.mp3', SRTcorrect: "yesterday he said that he would be near the village station before it was time for the train to come", syllables: 24},
{SRTstim: 'SRT/srt_21.mp3', SRTcorrect: "his interest in the problem increased each time that he looked at the report which lay on the table", syllables: 25},
{SRTstim: 'SRT/srt_22.mp3', SRTcorrect: "riding his black horse the general came to the scene of the battle and began shouting at his brave men", syllables: 26},
];

var SRTSelectionIndex = 0;
var SRT_max;
var SRT_mean = [];

///push to preloading folder
var SRT_AUDIO = [];
for(var i=0; i<SRT_proc.length; i++){
	SRT_AUDIO.push(SRT_proc[i].SRTstim);
}


var SRT_intro = {
	type: "html-button-response",
	stimulus: "<p>You will now complete a <b>sentence repetition task</b>.</p><p>On each trial, you will hear a spoken sentence. You will then have to type back what you heard.</br>" +
			  "The task becomes progressively harder. The first sentences consist of just one or two words. The final sentences consist of up to 20 words.</p><p>It is not expected that you will be able to " +
			  "perfectly recall every sentence. However, we ask that you try your best.There are 22 sentences in total.</p>",
	choices: ['BEGIN'],
	post_trial_gap: 250,
	button_html: '<button class="buttonStyle">%choice%</button>'
};


var SRT_preparation = {
	type: "html-button-response",
	stimulus: function(){var srttrial = SRTSelectionIndex + 1; return  '<p>Trial ' + srttrial + ' of ' + SRT_proc.length + '</p>';},
	choices: ['Begin'],
	post_trial_gap: 250,
	button_html: '<button class="buttonStyle">%choice%</button>'
};


var SRT_presentation = {
	type: "audio-keyboard-response",
	stimulus: function(){ return  SRT_proc[SRTSelectionIndex].SRTstim;},
	trial_ends_after_audio: true,
	response_ends_trial: false,
	post_trial_gap: 250
};


var SRT_response = {
	type: "survey-text",
	questions: [{prompt: "", rows: 2, columns: 40}],
	post_trial_gap: 250,
	preamble: "<p>To the best of your ability, please type back exactly what you just heard.</br>Do not worry about capitalization. Please try your best to spell as accurately as possible.</p>",
	on_finish: function(data){
		var answer = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; //this is the extracted string they typed
		var correctSRT = SRT_proc[SRTSelectionIndex].SRTcorrect;

		var answerNew = answer.split('.').join(""); //remove period punctuation
		answerNew = answerNew.split(',').join(""); //remove comma punctuation

		var answer_parsed = answerNew.split(" "); //split typed-in answer based on space
		var correctSRT_parsed = correctSRT.split(" "); //split correct answer based on space
		var SRT_array = []; //array for holding final arrays of 1s and 0s (correct/incorrect)

		var TEST = correctSRT_parsed.filter(value => answer_parsed.includes(value));

		for (i = 0; i < correctSRT_parsed.length; i++) {
		  if (typeof answer_parsed[i] == 'undefined') {
				var temp_SRT = ['xxx'];
				answer_parsed.push(temp_SRT);
			} else if (answer_parsed[i].toUpperCase() == correctSRT_parsed[i].toUpperCase()) {
				SRT_array[i] = 1
			} else {
				SRT_array[i] = 0
			}
		}

		if(arrAvg(SRT_array) == 1){
			var SRT_fullcorrect = 1;
			SRT_max = SRT_proc[SRTSelectionIndex].syllables;
		} else {
			var SRT_fullcorrect = 0;
		}

		var propwords_correct = TEST.length / correctSRT_parsed.length;
		SRT_mean[SRTSelectionIndex] = propwords_correct.toFixed(3);

		jsPsych.data.addDataToLastTrial({
			  designation: "SRT-TRIAL",
			  stimulus: correctSRT_parsed,
			  response: answer_parsed,
			  correct: SRT_fullcorrect,
			  partial_correct: SRT_array,
			  syllables: SRT_proc[SRTSelectionIndex].syllables
			  });

		SRTSelectionIndex += 1;
		console.log(TEST, propwords_correct.toFixed(3));
	}
};


var SRT_wrapup = {
	type: "html-button-response",
	stimulus: "<p>Thank you for your responses.</p>",
	choices: ['Continue'],
	button_html: '<button class="buttonStyle">%choice%</button>',
	on_finish: function(data){
		var meanSRT_words = arrAvg(SRT_mean);
			jsPsych.data.addDataToLastTrial({
			  designation: "SRT-SUMMARY",
			  max_syllables: SRT_max,
			  mean_words_correct: meanSRT_words
			  });
	}

};

var srt_main = {
	timeline: [SRT_preparation, SRT_presentation, SRT_response],
	loop_function: function(){
		if(SRTSelectionIndex == SRT_proc.length){
			return false
		} else {
			return true
		}
	}
}

var srt = {
	timeline: [SRT_intro, srt_main, SRT_wrapup]
};

function return_srt_folder(){
	return SRT_AUDIO;
}
