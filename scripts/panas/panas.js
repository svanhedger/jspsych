/*
Positive Affect Negative Affect Schedule

Watson, D., Clark, L. A., & Tellegen, A. (1988). Development and validation of brief measures of positive
and negative affect: the PANAS scales. Journal of personality and social psychology, 54(6), 1063.

20 items (10 positive, 10 negative)
automatic scoring of positive and negative affect dimensions
implemented in jsPsych 6

To use: simply load this js file in your main html file, and then simply push the "panas" variable to your
timeline whenever you wish to administer. You will also need to ensure that 'survey-likert.js' is being
loaded as well

Stephen Van Hedger, November 2021

*/

var scale_panas = ["Very slightly or not at all", "A little", "Moderately", "Quite a bit", "Extremely"];

var panas =  {
  type: 'survey-likert',
  preamble: '<p><em>Indicate the extent you feel this way in the present moment.</em></p>',
  questions: [
    {prompt: "<b style='font-size:16px;'>Interested</b>", name: 'PANAS_01', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Distressed</b>", name: 'PANAS_02', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Excited</b>", name: 'PANAS_03', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Upset</b>", name: 'PANAS_04', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Strong</b>", name: 'PANAS_05', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Guilty</b>", name: 'PANAS_06', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Scared</b>", name: 'PANAS_07', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Hostile</b>", name: 'PANAS_08', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Enthusiastic</b>", name: 'PANAS_09', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Proud</b>", name: 'PANAS_10', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Irritable</b>", name: 'PANAS_11', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Alert</b>", name: 'PANAS_12', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Ashamed</b>", name: 'PANAS_13', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Inspired</b>", name: 'PANAS_14', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Nervous</b>", name: 'PANAS_15', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Determined</b>", name: 'PANAS_16', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Attentive</b>", name: 'PANAS_17', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Jittery</b>", name: 'PANAS_18', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Active</b>", name: 'PANAS_19', labels: scale_panas, required: true},
    {prompt: "<b style='font-size:16px;'>Afraid</b>", name: 'PANAS_20', labels: scale_panas, required: true}
  ],
  randomize_question_order: false,
  post_trial_gap: 500,
  on_finish: function(data){
    //correct for attn is 4
    var panasdata = data.response;
    var panas_p = (10+panasdata.PANAS_01+panasdata.PANAS_03+panasdata.PANAS_05+panasdata.PANAS_09+panasdata.PANAS_10+panasdata.PANAS_12+panasdata.PANAS_14+panasdata.PANAS_16+panasdata.PANAS_17+panasdata.PANAS_19);
    var panas_n = (10+panasdata.PANAS_02+panasdata.PANAS_04+panasdata.PANAS_06+panasdata.PANAS_07+panasdata.PANAS_08+panasdata.PANAS_11+panasdata.PANAS_13+panasdata.PANAS_15+panasdata.PANAS_18+panasdata.PANAS_20);
    console.log(panas_p, panas_n);
    jsPsych.data.addDataToLastTrial({
      PANAS_P: panas_p,
      PANAS_N: panas_n
    });
    }
};
