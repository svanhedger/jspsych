/*
Time Load Dual Back Task

In this cognitive task, different levels of
cognitive load can be induced and individually
adjusted by modifying the time available to
process the ongoing-task demands.

The present approach deviates from earlier uses.
Rather than determining a baseline adequate speed
in a pretest session, the present script uses a
psychophysical approach to calibrate the speed of
presentation in a single session. In the script,
you can specify whether you want the response speed
calibration to be depleting (ensuring that final
performance hovers around 83% accuracy, using a
staircase procedure) or non-depleting (fixed
presentation rate).

The task involves making alternate decisions.
Participants see letters and numbers alternate
on the screen. If the letter matches the one
presented previously, participants are instructed
to press spacebar. With the numbers, participants
are instructed to press '1' if the number is odd
and '2' if the number is even.

Tested letters are A C T L N E U
Tested numbers are 1,2,3,4,6,7,8,9

Each "block" has 60 stim (30 letter, 30 numbers)
There are 10 targets per block for the letter task.

Short breaks (10-seconds) are given every 100 trials
in the main task.

The task includes an extensive practice session, in
which participants practice both tasks (letter judgment,
number judgment) separately (30 trials each, with feedback)
and then practice the tasks together, in an interleaved
fashion (60 trial, with feedback). The main assessment
is identical to the interleaved practice with the exception
of (1) no feedback, (2) length, and (3) depending on condition,
adaptive presentation rate of the stimuli.

For further details see the publication:
Borragán, Slama, Bartolomei and Peigneux. 2017.
“Cognitive Fatigue: A Time-Based Resource-Sharing Account.”
Cortex 89: 71–84. doi:10.1016/j.cortex.2017.01.023

*/
var tload_condition = jsPsych.data.getURLVariable("c"); //inherit condition from URL: c=1 is fatiguing, c=2 is control
var tload_condition_pretty; //for logging the condition to the data

//function to generate random integer within range
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

//randomly assign condition if not specified in URL (1 = fatiguing, 2 = control)
if(tload_condition != 1 || tload_condition != 2){
    tload_condition = randomIntFromInterval(1, 2)
}

//add the pretty name of the condition to the data output
if(tload_condition == 1){
    tload_condition_pretty = `Fatigue`;
    jsPsych.data.addProperties({condition: tload_condition_pretty});
} else {
    tload_condition_pretty = `Control`;
    jsPsych.data.addProperties({condition: tload_condition_pretty});
}


var tload_letters = [`A`, `C`, `T`, `L`, `N`, `E`, `U`];
var tload_numbers = [`1`, `2`, `3`, `4`, `6`, `7`, `8`, `9`];



var tload_tlinevars = [];
var tload_maintask_duration = (piloting == true) ? 2 : 16; //desired duration of the main run (default of 2 min for piloting and 16 min if not)
var tload_trial = 1; //update this after each trial in the main task
var tload_correct_tally = 0; //for adaptively updating the response time based on performance
var tload_base_rt = 3000; //this is the default presentation rate for stimuli
var cur_tload_rt = 3000; //set the adaptive presentation rate to the default, initially



var tload_lettertargets = Array(10).fill(1);
var tload_letternontargets = Array(20).fill(0);
var tload_lettercombined = [...tload_lettertargets, ...tload_letternontargets];

function nontargetfirst(array){
while(array[0] === 1){
   array = jsPsych.randomization.repeat(array, 1);
   if(array[0] === 0){
    return array;
   }
 }
}


function createLetters(targlocs, letterarray){
    var curletter;
    var temparray = [];
    for(var i=0; i<targlocs.length; i++){
        if(i===0){
            curletter =  jsPsych.randomization.repeat(letterarray, 1)[0] //randomly select a letter if in first position
            temparray.push(curletter);
        } else {
            if(targlocs[i] === 1){
                temparray.push(curletter);
            } else {
                var newletters = jsPsych.randomization.repeat(letterarray, 1)
                if(newletters[0] === curletter){
                    temparray.push(newletters[1]); //make sure that the nontarget is not accidentally a repeat
                    curletter = newletters[1];
                } else {
                    temparray.push(newletters[0]);
                    curletter = newletters[0];
                }
            }
        }
    }
    return temparray;
};


//////////////////////////////////////////////////////////////////
//this should be moved to some call function prior to each block
var cur_tload_targlocs = nontargetfirst(tload_lettercombined); //this represents the final ordering of targets/nontargets
var cur_tload_numbers = jsPsych.randomization.sampleWithReplacement(tload_numbers, 30); //this represents the final numbers
var cur_tload_letters = createLetters(cur_tload_targlocs, tload_letters);
var final_block_stim = [];


var final_block_cresp = [];
for(var i=0; i<cur_tload_targlocs.length; i++){
    if(cur_tload_targlocs[i] === 0){
        final_block_cresp.push(null);
    } else {
        final_block_cresp.push(' ');
    }
    if(cur_tload_numbers[i] == `1`||cur_tload_numbers[i] ==`3`||cur_tload_numbers[i] ==`7`||cur_tload_numbers[i] ==`9`){
        final_block_cresp.push(1);
    } else {
        final_block_cresp.push(2);
    }
}


//combine arrays and alternate letters and numbers
for(var i=0; i<cur_tload_letters.length; i++){
    final_block_stim.push(cur_tload_letters[i]);
    final_block_stim.push(cur_tload_numbers[i]);
}

if(piloting){
    var tload_length_01 = ``
    var tload_length_02 = ``
} else {
    var tload_length_01 = `<p>In total, this part of the study is expected to take about 25 minutes</p>`;
    var tload_length_02 = `<p>Short breaks are provided approximately every five minutes.</p>`
}



//////////////////////////////////////
var tload_instruct_01 = {
    type: jsPsychInstructions,
    pages: [
        `<p>Welcome.</p><p>In this part of the study, you will be making decisions about letters and numbers that appear on the screen.</p>`,
        `<p>Letters and numbers will appear on the screen one at a time, in an alternating fashion.</p>`,
        `<p>You will be making different responses depending on whether a letter or number is presented</p><p>If a letter is presented, you must press the spacebar if the letter is a repeat of the previous letter.</p><p>If it is not a repeat, do not press anything.</p>
         <p>If a number is presented, you must press "1" if the number is odd or "2" if the number is even.</p>`,
        `<p>Thus, you should be responding to <em>every</em> number you see by pressing either 1 or 2.</p><p>In contrast, you will only be pressing the spacebar to letters</br>if the letter is a repeat from the previous letter.</p>`,
        `<p>This task is organized into four parts:</p><p>1. Practice the number task by itself</br>2.Practice the letter task by itself</br>3.Practice both tasks together</br>4.Complete the main task.</p>${tload_length_01}`,
        `<p>On the next screen, you will practice the number task.</p><p>Remember, you should press 1 if the number on the screen is odd</br>and 2 if the number on the screen is even.</p><p>You will receive feedback after each response.</p><p>You must make your response within three seconds, </br>otherwise, your answer will be marked as incorrect</p><p>Press 'Next' to begin!</p>`
    ],
    show_clickable_nav: true,
    post_trial_gap: 250
};


var tload_feedback; //for setting tload feedback
var tload_pracnum_size = (piloting == true) ? 5 : 30

var tload_pracnum_proc = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                var letterstim = `<p style="font-size: 50px;">${jsPsych.timelineVariable('digit')}</p>`
                return letterstim
            },
            choices: ['1', '2'],
            data: {designation: 'TLOAD-NUMPRAC', cresp: jsPsych.timelineVariable('cresp')},
            response_ends_trial: false,
            trial_duration: tload_base_rt,
            on_finish: function(data){
                if(data.response == data.cresp){
                    var gotitright = 1;
                    tload_feedback = `<p style="color: darkgreen; font-size: 50px;">Correct!</p>`;
                } else if(data.rt != null) {
                    var gotitright = 0;
                    tload_feedback = `<p style="color: red; font-size: 50px;">Incorrect</p>`;
                } else {
                    var gotitright = 0;
                    tload_feedback = `<p style="color: red; font-size: 50px;">Incorrect</br><br></br>(respond faster)</p>`;
                }
                jsPsych.data.get().addToLast({tload_correct: gotitright});
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){return tload_feedback;},
            choices:`NO_KEYS`,
            trial_duration: 750,
            post_trial_gap: 250
        }
    ],
    timeline_variables: [
        {digit: '1', cresp: 1},
        {digit: '2', cresp: 2},
        {digit: '3', cresp: 1},
        {digit: '4', cresp: 2},
        {digit: '6', cresp: 2},
        {digit: '7', cresp: 1},
        {digit: '8', cresp: 2},
        {digit: '9', cresp: 1}
    ],
    randomize_order: true,
    sample: {
        type: 'with-replacement',
        size: tload_pracnum_size
    }
};




///////LETTER PRACTICE////////
var tload_instruct_02 = {
    type: jsPsychInstructions,
    pages: [
        `<p>This concludes the number practice task.</p>`,
        `<p>You will now complete the letter practice task.</p><p>As a reminder, you should press the spacebar</br>whenever the letter on the screen is a repeat of the previous letter.</p>`,
        `<p>For example, if you saw the letters:</p><p style="font-size:36px;">A &#8594; L &#8594; <b style="color:blue;">L</b> &#8594; F &#8594; W &#8594; <b style="color:blue;">W</b></p><p>you would press spacebar for the letters printed in blue, as these are repeats of the previous letter.</p>`,
        `<p>On the next screen, you will practice the letter task.</p><p>Remember, you should press spacebar if the letter on the screen is a repeat of the previous letter.</p><p>If the letter is not a repeat, do not press anything.</p><p>If the letter is a repeat, you must press spacebar within three seconds,</br>otherwise, your answer will be marked as incorrect</p><p>You will receive feedback after each response.</p><p>Press 'Next' to begin!</p>`
    ],
    show_clickable_nav: true,
    post_trial_gap: 250
};


//Function to generate letter practice timeline variable
var tload_letterprac_targets;
var tload_letterprac_letters;


function gen_tload_letterprac(){
    tload_letterprac_targets = nontargetfirst(tload_lettercombined); //this represents the final ordering of targets/nontargets
    tload_letterprac_letters = createLetters( tload_letterprac_targets, tload_letters);
    var temp = [];
    for(var i=0; i<tload_letterprac_targets.length; i++){
            var curobj = {letter: tload_letterprac_letters[i], cresp: tload_letterprac_targets[i]};
            temp.push(curobj);
        }
        return temp;
}

var tload_letterprac_vars = gen_tload_letterprac();

//do something similar for combined prac, and then possibly make ~10 blocks/variables? or literally just combine them into a massive var, building in breaks?

//just show a few trials if piloting
if(piloting){
    tload_letterprac_vars = tload_letterprac_vars.slice(0,4);
}

var tload_pracletter_proc = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                var letterstim = `<p style="font-size: 50px;">${jsPsych.timelineVariable('letter')}</p>`
                return letterstim
            },
            trial_duration: tload_base_rt,
            choices: [` `],
            response_ends_trial: false,
            data: {designation: 'TLOAD-LETTERPRAC', cresp: jsPsych.timelineVariable('cresp')},
            on_finish: function(data){
                if(data.rt != null && data.cresp == 1){
                    var gotitright = 1;
                    tload_feedback = `<p style="color: darkgreen; font-size: 50px;">Correct!</p>`;
                } else if(data.rt == null && data.cresp == 0) {
                    var gotitright = 1;
                    tload_feedback = `<p style="color: darkgreen; font-size: 50px;">Correct!</p>`;
                } else if(data.rt == null && data.cresp == 1) {
                    var gotitright = 0;
                    tload_feedback = `<p style="color: red; font-size: 50px;">Incorrect</p>`;
                } else {
                    var gotitright = 0;
                    tload_feedback = `<p style="color: red; font-size: 50px;">Incorrect</p>`;
                }
                jsPsych.data.get().addToLast({tload_correct: gotitright});
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){return tload_feedback;},
            choices:`NO_KEYS`,
            trial_duration: 750,
            post_trial_gap: 250
        }
    ],
        timeline_variables: tload_letterprac_vars
};

///////////LETTER+NUMBER PRACTICE//////////////

var tload_instruct_03 = {
    type: jsPsychInstructions,
    pages: [
        `<p>This concludes the letter practice task.</p>`,
        `<p>Now, you will have the opportunity to try both tasks together</p>`,
        `<p>You will see a letter, followed by a number, followed by a letter, followed by a number and so on.</p>`,
        `<p>If the letter is the same as the previous letter, you should press spacebar.</p><p>Otherwise, you should press nothing.</p><p>If the number is odd, press "1". If the number is even, press "2".</p>`,
        `<p>As mentioned earlier, you should therefore be reponding to <em>every</em> number that is presented.</p><p>In contrast, you will only be responding to some of the letters, depending on whether the letter is a repeat.</p>`,
        `<p>On the next screen, you will practice the letter + number task.</p><p>You will receive feedback after each response.</p><p>Press 'Next' to begin!</p>`,
    ],
    show_clickable_nav: true,
    post_trial_gap: 250
};


function gen_tload_maintask(){
    var cur_tload_targlocs = nontargetfirst(tload_lettercombined); //this represents the final ordering of targets/nontargets
    var cur_tload_numbers = jsPsych.randomization.sampleWithReplacement(tload_numbers, 30); //this represents the final numbers
    var cur_tload_letters = createLetters(cur_tload_targlocs, tload_letters);
    var final_block_stim = [];
    var stimtype = [];
    var final_block_cresp = [];
    for(var i=0; i<cur_tload_targlocs.length; i++){
        if(cur_tload_targlocs[i] === 0){
            final_block_cresp.push(null);
        } else {
            final_block_cresp.push(' ');
        }
        if(cur_tload_numbers[i] == `1`||cur_tload_numbers[i] ==`3`||cur_tload_numbers[i] ==`7`||cur_tload_numbers[i] ==`9`){
            final_block_cresp.push(1);
        } else {
            final_block_cresp.push(2);
        }
    }
    //combine arrays and alternate letters and numbers
    for(var i=0; i<cur_tload_letters.length; i++){
        final_block_stim.push(cur_tload_letters[i]);
        stimtype.push("Letter");
        final_block_stim.push(cur_tload_numbers[i]);
        stimtype.push("Number");
    }
    //now, let's take the correct responses and stimuli and format them for a timeline variable
    var temp = [];
    for(var i=0; i<final_block_stim.length; i++){
        var curobj = {stim: final_block_stim[i], cresp: final_block_cresp[i], stimtype: stimtype[i]}
        temp.push(curobj);
    }
    return temp;
};

var tload_letternumprac_vars = gen_tload_maintask(); //this generated the 60-item block
tload_letternumprac_vars = tload_letternumprac_vars.slice(0,29); //just show the first 30 to keep practice reasonable length

//just show 10 if piloting
if(piloting){
    tload_letternumprac_vars = tload_letternumprac_vars.slice(0,9)
}

var tload_pracletternum_proc = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                var stim = `<p style="font-size: 50px;">${jsPsych.timelineVariable('stim')}</p>`
                return stim
            },
            trial_duration: tload_base_rt,
            choices: [` `, `1`, `2`],
            response_ends_trial: false,
            data: {designation: 'TLOAD-LETTERNUMPRAC', cresp: jsPsych.timelineVariable('cresp'), type: jsPsych.timelineVariable('stimtype')},
            on_finish: function(data){
                if(data.cresp == data.response){
                    var gotitright = 1;
                    tload_feedback = `<p style="color: darkgreen; font-size: 50px;">Correct!</p>`;
                } else if(data.rt == data.cresp) {
                    var gotitright = 1;
                    tload_feedback = `<p style="color: darkgreen; font-size: 50px;">Correct!</p>`;
                } else if(data.rt == null && data.type == "Number") {
                    var gotitright = 0;
                    tload_feedback = `<p style="color: red; font-size: 50px;">Incorrect</br><br></br>(respond faster)</p>`;
                } else {
                    var gotitright = 0;
                    tload_feedback = `<p style="color: red; font-size: 50px;">Incorrect</p>`;
                }
                jsPsych.data.get().addToLast({tload_correct: gotitright});
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){return tload_feedback;},
            choices:`NO_KEYS`,
            trial_duration: 750,
            post_trial_gap: 250
        }
    ],
        timeline_variables: tload_letternumprac_vars
};
//if you fix the timing of break screens, you cna ensure that participants across conditions would be doing the task the same amount of time

var tload_practice_final = {
    timeline: [tload_instruct_01, tload_pracnum_proc, tload_instruct_02, tload_pracletter_proc, tload_instruct_03, tload_pracletternum_proc]
};


////////////MAIN TASK////////////////////
var adaptive_inst;
if(tload_condition == 1){
    adaptive_inst = `3. The letters and numbers will be presented at a faster pace than practice,</br>and you should make your response as quickly and accurately as possible.`;
} else {
    adaptive_inst = ``;
}



var tload_instruct_04 = {
    type: jsPsychInstructions,
    pages: [
        `<p>This concludes the letter + number practice task.</p><p>You are now ready to begin the main task.</p>`,
        `<p>The main task is nearly identical to the practice you just completed.</p><p>The main differences are that:</p><p>1. You will not be told whether each answer was right or wrong</br>2. The duration is ${tload_maintask_duration} minutes</br>${adaptive_inst}</p>${tload_length_02}`,
        `<p>As a reminder...</p><p>You will see a letter, followed by a number, followed by a letter, followed by a number and so on.</p>`,
        `<p>If the letter is the same as the previous letter, you should press spacebar. Otherwise, you should press nothing.</p><p>If the number is odd, press "1". If the number is even, press "2".</p>`,
        `<p>You should therefore be reponding to <em>every</em> number that is presented. In contrast, you will only be responding to some of the letters, depending on whether the letter is a repeat.</p>`,
        `<p>On the next screen, you will begin the main task.</p><p><b>Please try to respond as quickly and accurately as possible.</b></p><p>Press 'Next' to begin!</p>`,
    ],
    show_clickable_nav: true,
    post_trial_gap: 250
};




//This generates 720 trials for the dual task - this is almost certainly overkill, but we will set the main task to exit after X minutes
var tload_maintask_vars = [];
for(var i=0; i<12; i++){
    var temp = gen_tload_maintask();
        for(var j=0; j<temp.length; j++){
            tload_maintask_vars.push(temp[j]);
        }
};


//conditional, mandatory 10-second break every 100 trials
var conditional_break = {
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                var timeleft = 10;
                var downloadTimer = setInterval(function(){
                if(timeleft <= 0){
                    clearInterval(downloadTimer);
                }
                document.getElementById("progressBar").innerHTML = timeleft;
                timeleft -= 1;
                }, 1000);
                var stim = `<p>Please take a short break. The task will begin again at the end of the countdown.</p><div id="progressBar">&nbsp;</div>`;
                return stim;
            },
            trial_duration: 11000,
            choices: `NO_KEYS`,
            post_trial_gap: 1000
        }
    ],
    conditional_function: function(){
        if(tload_trial % 100 === 0){
            return true;
        } else {
            return false;
        }
    }
};

var tload_maintask_proc = {
    timeline: [
            {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: function(){
                    var stim = `<p style="font-size: 50px;">${jsPsych.timelineVariable('stim')}</p>`
                    return stim
                },
                trial_duration: function(){
                    if(tload_condition == 1){
                        return cur_tload_rt;
                    } else {
                        return tload_base_rt;
                    }
                },
                choices: [` `, `1`, `2`],
                response_ends_trial: false,
                data: {designation: 'TLOAD-MAIN', cresp: jsPsych.timelineVariable('cresp'), type: jsPsych.timelineVariable('stimtype')},
                on_finish: function(data){
                    if(data.cresp == data.response){
                        var gotitright = 1;
                        tload_correct_tally += 1;
                    } else if(data.rt == data.cresp) {
                        var gotitright = 1;
                        tload_correct_tally += 1;
                    } else if(data.rt == null && data.type == "Number") {
                        var gotitright = 0;
                        tload_correct_tally = 0;
                    } else {
                        var gotitright = 0;
                        tload_correct_tally = 0;
                    }

                    jsPsych.data.get().addToLast({
                        tload_correct: gotitright,
                        tload_trialnum: tload_trial,
                        tload_presRate: cur_tload_rt
                    });

                    if(tload_condition == 1){
                    if(tload_correct_tally == 5){
                        cur_tload_rt -= 100; //shave off 100ms if five in a row are correct
                        tload_correct_tally = 0; //five in a row reached, reset
                    } else if(tload_correct_tally == 0){
                        cur_tload_rt += 100; //tack on 100ms if the answer was incorrect
                    } else {
                        cur_tload_rt = cur_tload_rt;
                    }
                }
                    tload_trial += 1; //update the trial number
                }
            },
            conditional_break
    ],
    timeline_variables: tload_maintask_vars,
    on_start: function(){
		setTimeout(function(){
		jsPsych.endCurrentTimeline();
		}, (tload_maintask_duration*60000));
	}
};


//Pre-post-measure fatigue rating
var tload_fatigue_rating = '<div style="display: flex; width: 50vw; justify-content: space-between; font-size:30px;"><div>1<p style="font-size:22px;">Very slightly or</br>not at all</p></div><div>2<p style="font-size:22px;">A little</p></div><div>3<p style="font-size:22px;">Moderately</p></div><div>4<p style="font-size:22px;">Quite a bit</p></div><div>5<p style="font-size:22px;">Extremely</p></div></div>';

var tload_fatigue_pre = {
    type: jsPsychHtmlKeyboardResponse,
    prompt: tload_fatigue_rating,
    stimulus: '<p>Before we begin, please answer the following question:</p><p style="font-size:28px;"><b>How fatigued are you feeling in the present moment?</b></br></p><p>(Make your response by pressing the corresponding key on the keyboard)</p><p>&nbsp;</p>',
    data: {designation: 'TLOAD-FATIGUE-PRE'},
    choices: ['1','2','3','4','5'],
    on_finish: function(data){
      var tloadfatigue = data.response;
      jsPsych.data.addDataToLastTrial({
        FATIGUE: tloadfatigue
      });
    }
  };

var tload_fatigue_post = {
  type: jsPsychHtmlKeyboardResponse,
  prompt: tload_fatigue_rating,
  stimulus: '<p>Thank you for your responses! You are now done with this part of the study.</p><p style="font-size:28px;"><b>How fatigued are you feeling in the present moment?</b></br></p><p>(Make your response by pressing the corresponding key on the keyboard)</p><p>&nbsp;</p>',
  data: {designation: 'TLOAD-FATIGUE-POST'},
  choices: ['1','2','3','4','5'],
  on_finish: function(data){
    var tloadfatigue = data.response;
    jsPsych.data.addDataToLastTrial({
      FATIGUE: tloadfatigue
    });
  }
};

var tload_maintask_final = {
    timeline: [tload_instruct_04, tload_maintask_proc]
};

var tload = {
    timeline: [tload_fatigue_pre, tload_practice_final, tload_maintask_final, tload_fatigue_post]
};

//all that is left to do is pilot through everything!!
