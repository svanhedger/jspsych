
/*
Statistical Learning Assessments

This js file implements two measures of
statistical learning - syllable target
detection and two-alternative forced choice.

The statistical learning language is similar
to that originally described by Saffran et al. (1996),
using 12 syllables to construct four trisyllabic
"words"

Syllable target detection is an implicit measure
as the task can be done without any explicit
understanding of the underlying sequence structure.
It is thus used as both a measure of implicit,
"online" learning as well as exposure to the
statistical structure. Participants simply
listen for a target syllable and respond as
quickly as possible when they hear it. Based on
prior work, we expect participants to eventually
show faster response times to the medial and final
syllable positions of a "word" relative to the
initial syllable positions of a "word"

The two-alternative forced-choice task presents
two trisyllabic sequences to participants and has
them make a forced choice as to which one sounds
more similar to those heard in training (in this
case, during the syllable target detection task)

The task allows for a URL variable to be set to
determine counterbalancing of syllables (three
versions: A, B, C) to ensure that sequence position
effects are not confounded with order effects

Stephen Van Hedger & Mark Dunlop, November 2022


*/
//build in counterbalancing in url variable, randomly determine if not provided
var sl_counterbalance = jsPsych.data.getURLVariable('sl')
if(sl_counterbalance != 'A' || sl_counterbalance != 'B' || sl_counterbalance != 'C' ){
    console.log("sl counterbalance not detected. assigning now...");
    var sl_conds = ['A', 'B', 'C'];
    sl_counterbalance = jsPsych.randomization.repeat(sl_conds, 1)[0];
    console.log("assigned sl counterbalance is ", sl_counterbalance);
};


/* Syllable Target Detection Task */
/* LISTS */
//Counterbalancing A
var TD_GA_A = [
    {file: `sounds/td/A/GA_01_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 5, 7, 12], targRT: [900, 3600, 5400, 9900], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_02_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 7, 9, 11], targRT: [900, 5400, 7200, 9000], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_03_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [6, 10, 13, 15], targRT: [4500, 8100, 10800, 12600], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_04_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [4, 7, 10, 13], targRT: [2700, 5400, 8100, 10800], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_05_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [4, 6, 10, 15], targRT: [2700, 4500, 8100, 12600], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_06_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 10, 13, 15], targRT: [900, 8100, 10800, 12600], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_07_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 4, 7, 10], targRT: [900, 2700, 5400, 8100], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_08_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 8, 10, 12], targRT: [1800, 6300, 8100, 9900], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_09_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 4, 7, 14], targRT: [900, 2700, 5400, 11700], targSYL: `GA`, SYL_POS: 1},
    {file: `sounds/td/A/GA_10_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 7, 10, 14], targRT: [900, 5400, 8100, 11700], targSYL: `GA`, SYL_POS: 1}
];

var TD_MI_A = [
    {file: `sounds/td/A/MI_01_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 6, 8, 14], targRT: [1200, 4800, 6600, 12000], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_02_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [3, 6, 9, 14], targRT: [2100, 4800, 7500, 12000], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_03_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [4, 8, 12, 14], targRT: [3000, 6600, 10200, 12000], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_04_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [4, 6, 8, 15], targRT: [3000, 4800, 6600, 12900], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_05_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 9, 12, 14], targRT: [1200, 7500, 10200, 12000], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_06_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 8, 10, 13], targRT: [1200, 6600, 8400, 11100], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_07_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 4, 11, 14], targRT: [1200, 3000, 9300, 12000], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_08_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 5, 11, 14], targRT: [1200, 3900, 9300, 12000], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_09_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [4, 7, 11, 15], targRT: [3000, 5700, 9300, 12900], targSYL: `MI`, SYL_POS: 2},
    {file: `sounds/td/A/MI_10_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 5, 7, 9], targRT: [1200, 3900, 5700, 7500], targSYL: `MI`, SYL_POS: 2}
];

var TD_LU_A = [
    {file: `sounds/td/A/LU_01_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [5, 10, 13, 15], targRT: [4200, 8700, 11400, 13200], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_02_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 5, 12, 15], targRT: [2400, 4200, 10500, 13200], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_03_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [2, 4, 11, 15], targRT: [1500, 3300, 9600, 13200], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_04_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 8, 11, 13], targRT: [2400, 6900, 9600, 11400], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_05_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [5, 7, 10, 13], targRT: [4200, 6000, 8700, 11400], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_06_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 5, 7, 15], targRT: [2400, 4200, 6000, 13200], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_07_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [4, 9, 11, 14], targRT: [3300, 7800, 9600, 12300], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_08_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [4, 7, 10, 14], targRT: [3300, 6000, 8700, 12300], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_09_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 9, 11, 15], targRT: [2400, 7800, 9600, 13200], targSYL: `LU`, SYL_POS: 3},
    {file: `sounds/td/A/LU_10_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 5, 9, 12], targRT: [2400, 4200, 7800, 10500], targSYL: `LU`, SYL_POS: 3}
];

var TD_MAI_A = [
    {file: `sounds/td/A/MAI_01_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 5, 10, 13], targRT: [1800, 3600, 8100, 10800], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_02_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 5, 11, 15], targRT: [1800, 3600, 9000, 12600], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_03_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 5, 11, 13], targRT: [1800, 3600, 9000, 10800], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_04_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 6, 10, 14], targRT: [900, 4500, 8100, 11700], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_05_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 7, 9, 15], targRT: [1800, 5400, 7200, 12600], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_06_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 4, 8, 10], targRT: [900, 2700, 6300, 8100], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_07_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 7, 13, 15], targRT: [1800, 5400, 10800, 12600], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_08_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 4, 9, 11], targRT: [900, 2700, 7200, 9000], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_09_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [5, 8, 11, 14], targRT: [3600, 6300, 9000, 11700], targSYL: `MAI`, SYL_POS: 1},
    {file: `sounds/td/A/MAI_10_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [5, 8, 10, 12], targRT: [3600, 6300, 8100, 9900], targSYL: `MAI`, SYL_POS: 1}
];

var TD_FU_A = [
    {file: `sounds/td/A/FU_01_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [3, 5, 7, 11], targRT: [2100, 3900, 5700, 9300], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_02_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [7, 9, 11, 15], targRT: [5700, 7500, 9300, 12900], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_03_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [6, 9, 11, 13], targRT: [4800, 7500, 9300, 11100], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_04_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [7, 10, 13, 15], targRT: [5700, 8400, 11100, 12900], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_05_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 5, 9, 15], targRT: [1200, 3900, 7500, 12900], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_06_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 4, 6, 10], targRT: [1200, 3000, 4800, 8400], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_07_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 7, 9, 14], targRT: [1200, 5700, 7500, 12000], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_08_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [3, 5, 7, 13], targRT: [2100, 3900, 5700, 11100], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_09_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 6, 12, 15], targRT: [1200, 4800, 10200, 12900], targSYL: `FU`, SYL_POS: 2},
    {file: `sounds/td/A/FU_10_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [4, 8, 10, 15], targRT: [3000, 6600, 8400, 12900], targSYL: `FU`, SYL_POS: 2}
];

var TD_KI_A = [
    {file: `sounds/td/A/KI_01_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 6, 11, 13], targRT: [1500, 5100, 9600, 11400], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_02_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 6, 9, 13], targRT: [2400, 5100, 7800, 11400], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_03_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 7, 10, 12], targRT: [1500, 6000, 8700, 10500], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_04_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 5, 7, 12], targRT: [2400, 4200, 6000, 10500], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_05_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [5, 9, 13, 15], targRT: [4200, 7800, 11400, 13200], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_06_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 4, 6, 14], targRT: [1500, 3300, 5100, 12300], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_07_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 5, 8, 13], targRT: [1500, 4200, 6900, 11400], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_08_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 5, 9, 15], targRT: [2400, 4200, 7800, 13200], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_09_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [5, 7, 11, 14], targRT: [4200, 6000, 9600, 12300], targSYL: `KI`, SYL_POS: 3},
    {file: `sounds/td/A/KI_10_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 6, 9, 15], targRT: [1500, 5100, 7800, 13200], targSYL: `KI`, SYL_POS: 3}
];

var TD_NU_A = [
    {file: `sounds/td/A/NU_01_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [6, 8, 10, 14], targRT: [4500, 6300, 8100, 11700], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_02_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [6, 10, 12, 14], targRT: [4500, 8100, 9900, 11700], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_03_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 5, 9, 11], targRT: [1800, 3600, 7200, 9000], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_04_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [7, 10, 12, 14], targRT: [5400, 8100, 9900, 11700], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_05_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [2, 5, 8, 10], targRT: [900, 3600, 6300, 8100], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_06_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [4, 8, 11, 14], targRT: [2700, 6300, 9000, 11700], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_07_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 8, 12, 14], targRT: [1800, 6300, 9900, 11700], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_08_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [4, 6, 8, 12], targRT: [2700, 4500, 6300, 9900], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_09_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 7, 9, 12], targRT: [1800, 5400, 7200, 9900], targSYL: `NU`, SYL_POS: 1},
    {file: `sounds/td/A/NU_10_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [2, 6, 10, 15], targRT: [900, 4500, 8100, 12600], targSYL: `NU`, SYL_POS: 1}
];

var TD_RA_A = [
    {file: `sounds/td/A/RA_01_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 5, 9, 11], targRT: [1200, 3900, 7500, 9300], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_02_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 6, 9, 14], targRT: [3000, 4800, 7500, 12000], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_03_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 10, 12, 15], targRT: [3000, 8400, 10200, 12900], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_04_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 6, 11, 13], targRT: [3000, 4800, 9300, 11100], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_05_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [3, 6, 11, 14], targRT: [2100, 4800, 9300, 12000], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_06_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [6, 8, 11, 15], targRT: [4800, 6600, 9300, 12900], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_07_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [3, 9, 12, 15], targRT: [2100, 7500, 10200, 12900], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_08_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 6, 11, 14], targRT: [1200, 4800, 9300, 12000], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_09_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 6, 13, 15], targRT: [3000, 4800, 11100, 12900], targSYL: `RA`, SYL_POS: 2},
    {file: `sounds/td/A/RA_10_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 10, 12, 15], targRT: [1200, 8400, 10200, 12900], targSYL: `RA`, SYL_POS: 2}
];

var TD_FI_A = [
    {file: `sounds/td/A/FI_01_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [4, 8, 10, 13], targRT: [3300, 6900, 8700, 11400], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_02_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [9, 11, 13, 15], targRT: [7800, 9600, 11400, 13200], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_03_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 7, 12, 14], targRT: [1500, 6000, 10500, 12300], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_04_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [5, 11, 13, 15], targRT: [4200, 9600, 11400, 13200], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_05_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [4, 7, 9, 15], targRT: [3300, 6000, 7800, 13200], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_06_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 5, 7, 10], targRT: [1500, 4200, 6000, 8700], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_07_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 7, 9, 13], targRT: [1500, 6000, 7800, 11400], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_08_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [6, 8, 10, 13], targRT: [5100, 6900, 8700, 11400], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_09_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [3, 6, 12, 15], targRT: [2400, 5100, 10500, 13200], targSYL: `FI`, SYL_POS: 3},
    {file: `sounds/td/A/FI_10_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [5, 8, 12, 14], targRT: [4200, 6900, 10500, 12300], targSYL: `FI`, SYL_POS: 3}
];

var TD_PAU_A = [
    {file: `sounds/td/A/PAU_01_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [4, 9, 11, 13], targRT: [2700, 7200, 9000, 10800], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_02_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 4, 7, 9], targRT: [900, 2700, 5400, 7200], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_03_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [4, 8, 12, 15], targRT: [2700, 6300, 9900, 12600], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_04_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [4, 7, 9, 11], targRT: [2700, 5400, 7200, 9000], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_05_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [5, 8, 10, 15], targRT: [3600, 6300, 8100, 12600], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_06_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [3, 8, 12, 15], targRT: [1800, 6300, 9900, 12600], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_07_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [4, 6, 8, 14], targRT: [2700, 4500, 6300, 11700], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_08_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 5, 7, 14], targRT: [900, 3600, 5400, 11700], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_09_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 6, 10, 12], targRT: [900, 4500, 8100, 9900], targSYL: `PAU`, SYL_POS: 1},
    {file: `sounds/td/A/PAU_10_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 4, 7, 15], targRT: [900, 2700, 5400, 12600], targSYL: `PAU`, SYL_POS: 1}
];

var TD_TO_A = [
    {file: `sounds/td/A/TO_01_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [3, 6, 9, 11], targRT: [2100, 4800, 7500, 9300], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_02_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 11, 13, 15], targRT: [1200, 9300, 11100, 12900], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_03_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 8, 10, 12], targRT: [1200, 6600, 8400, 10200], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_04_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [3, 7, 9, 14], targRT: [2100, 5700, 7500, 12000], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_05_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 5, 13, 15], targRT: [1200, 3900, 11100, 12900], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_06_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [6, 8, 10, 12], targRT: [4800, 6600, 8400, 10200], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_07_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [6, 8, 11, 13], targRT: [4800, 6600, 9300, 11100], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_08_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [3, 9, 12, 14], targRT: [2100, 7500, 10200, 12000], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_09_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 4, 6, 9], targRT: [1200, 3000, 4800, 7500], targSYL: `TO`, SYL_POS: 2},
    {file: `sounds/td/A/TO_10_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [5, 10, 12, 14], targRT: [3900, 8400, 10200, 12000], targSYL: `TO`, SYL_POS: 2}
];

var TD_NE_A = [
    {file: `sounds/td/A/NE_01_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [4, 6, 12, 14], targRT: [3300, 5100, 10500, 12300], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_02_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 4, 10, 15], targRT: [1500, 3300, 8700, 13200], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_03_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [8, 11, 13, 15], targRT: [6900, 9600, 11400, 13200], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_04_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 9, 11, 15], targRT: [1500, 7800, 9600, 13200], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_05_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [4, 10, 13, 15], targRT: [3300, 8700, 11400, 13200], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_06_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 6, 10, 13], targRT: [2400, 5100, 8700, 11400], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_07_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 9, 11, 13], targRT: [2400, 7800, 9600, 11400], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_08_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 6, 12, 14], targRT: [2400, 5100, 10500, 12300], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_09_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 7, 12, 14], targRT: [2400, 6000, 10500, 12300], targSYL: `NE`, SYL_POS: 3},
    {file: `sounds/td/A/NE_10_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 5, 12, 15], targRT: [1500, 4200, 10500, 13200], targSYL: `NE`, SYL_POS: 3}
];

//Counterbalancing B
var TD_MI_B = [
    {file: `sounds/td/B/MI_01_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 9, 11, 14], targRT: [900, 7200, 9000, 11700], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_02_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [5, 7, 9, 14], targRT: [3600, 5400, 7200, 11700], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_03_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 4, 10, 12], targRT: [900, 2700, 8100, 9900], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_04_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [8, 10, 12, 15], targRT: [6300, 8100, 9900, 12600], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_05_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [4, 9, 13, 15], targRT: [2700, 7200, 10800, 12600], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_06_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 4, 6, 10], targRT: [900, 2700, 4500, 8100], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_07_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [5, 10, 13, 15], targRT: [3600, 8100, 10800, 12600], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_08_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [5, 8, 11, 15], targRT: [3600, 6300, 9000, 12600], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_09_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [4, 7, 9, 13], targRT: [2700, 5400, 7200, 10800], targSYL: `MI`, SYL_POS: 1},
    {file: `sounds/td/B/MI_10_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [5, 9, 13, 15], targRT: [3600, 7200, 10800, 12600], targSYL: `MI`, SYL_POS: 1}
];

var TD_LU_B = [
    {file: `sounds/td/B/LU_01_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 5, 11, 14], targRT: [2100, 3900, 9300, 12000], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_02_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [2, 9, 11, 15], targRT: [1200, 7500, 9300, 12900], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_03_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [2, 4, 10, 15], targRT: [1200, 3000, 8400, 12900], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_04_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [8, 11, 13, 15], targRT: [6600, 9300, 11100, 12900], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_05_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [5, 8, 12, 15], targRT: [3900, 6600, 10200, 12900], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_06_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [2, 4, 6, 8], targRT: [1200, 3000, 4800, 6600], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_07_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [4, 6, 11, 14], targRT: [3000, 4800, 9300, 12000], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_08_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [4, 6, 9, 13], targRT: [3000, 4800, 7500, 11100], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_09_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 5, 7, 12], targRT: [2100, 3900, 5700, 10200], targSYL: `LU`, SYL_POS: 2},
    {file: `sounds/td/B/LU_10_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 5, 12, 14], targRT: [2100, 3900, 10200, 12000], targSYL: `LU`, SYL_POS: 2}
];

var TD_GA_B = [
    {file: `sounds/td/B/GA_01_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 10, 12, 14], targRT: [1500, 8700, 10500, 12300], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_02_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 5, 10, 14], targRT: [2400, 4200, 8700, 12300], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_03_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 4, 7, 9], targRT: [1500, 3300, 6000, 7800], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_04_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 5, 8, 12], targRT: [2400, 4200, 6900, 10500], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_05_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 4, 13, 15], targRT: [1500, 3300, 11400, 13200], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_06_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 4, 7, 15], targRT: [1500, 3300, 6000, 13200], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_07_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 7, 10, 14], targRT: [2400, 6000, 8700, 12300], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_08_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 9, 12, 14], targRT: [2400, 7800, 10500, 12300], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_09_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [4, 8, 10, 12], targRT: [3300, 6900, 8700, 10500], targSYL: `GA`, SYL_POS: 3},
    {file: `sounds/td/B/GA_10_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [2, 6, 12, 15], targRT: [1500, 5100, 10500, 13200], targSYL: `GA`, SYL_POS: 3}
];

var TD_FU_B = [
    {file: `sounds/td/B/FU_01_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [4, 7, 11, 15], targRT: [2700, 5400, 9000, 12600], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_02_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [4, 7, 10, 13], targRT: [2700, 5400, 8100, 10800], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_03_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [3, 6, 9, 11], targRT: [1800, 4500, 7200, 9000], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_04_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [6, 8, 10, 13], targRT: [4500, 6300, 8100, 10800], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_05_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [4, 10, 12, 14], targRT: [2700, 8100, 9900, 11700], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_06_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [3, 6, 8, 15], targRT: [1800, 4500, 6300, 12600], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_07_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [4, 8, 13, 15], targRT: [2700, 6300, 10800, 12600], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_08_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [4, 6, 10, 13], targRT: [2700, 4500, 8100, 10800], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_09_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [7, 10, 13, 15], targRT: [5400, 8100, 10800, 12600], targSYL: `FU`, SYL_POS: 1},
    {file: `sounds/td/B/FU_10_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 5, 7, 10], targRT: [900, 3600, 5400, 8100], targSYL: `FU`, SYL_POS: 1}
];

var TD_KI_B = [
    {file: `sounds/td/B/KI_01_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [5, 8, 12, 14], targRT: [3900, 6600, 10200, 12000], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_02_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 7, 12, 15], targRT: [2100, 5700, 10200, 12900], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_03_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 5, 7, 11], targRT: [1200, 3900, 5700, 9300], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_04_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [7, 9, 13, 15], targRT: [5700, 7500, 11100, 12900], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_05_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [5, 8, 10, 12], targRT: [3900, 6600, 8400, 10200], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_06_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 4, 8, 14], targRT: [1200, 3000, 6600, 12000], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_07_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 7, 9, 13], targRT: [1200, 5700, 7500, 11100], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_08_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 5, 7, 11], targRT: [2100, 3900, 5700, 9300], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_09_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [4, 6, 8, 10], targRT: [3000, 4800, 6600, 8400], targSYL: `KI`, SYL_POS: 2},
    {file: `sounds/td/B/KI_10_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [6, 8, 12, 15], targRT: [4800, 6600, 10200, 12900], targSYL: `KI`, SYL_POS: 2}
];

var TD_MAI_B = [
    {file: `sounds/td/B/MAI_01_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 5, 7, 13], targRT: [2400, 4200, 6000, 11400], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_02_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [4, 7, 10, 12], targRT: [3300, 6000, 8700, 10500], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_03_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [7, 10, 12, 14], targRT: [6000, 8700, 10500, 12300], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_04_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 5, 8, 15], targRT: [2400, 4200, 6900, 13200], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_05_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [4, 6, 8, 11], targRT: [3300, 5100, 6900, 9600], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_06_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [6, 8, 10, 15], targRT: [5100, 6900, 8700, 13200], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_07_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [5, 8, 13, 15], targRT: [4200, 6900, 11400, 13200], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_08_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 5, 7, 15], targRT: [1500, 4200, 6000, 13200], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_09_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 6, 8, 14], targRT: [1500, 5100, 6900, 12300], targSYL: `MAI`, SYL_POS: 3},
    {file: `sounds/td/B/MAI_10_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 10, 12, 14], targRT: [2400, 8700, 10500, 12300], targSYL: `MAI`, SYL_POS: 3}
];

var TD_RA_B = [
    {file: `sounds/td/B/RA_01_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 9, 12, 14], targRT: [2700, 7200, 9900, 11700], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_02_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 6, 12, 14], targRT: [900, 4500, 9900, 11700], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_03_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 9, 11, 13], targRT: [900, 7200, 9000, 10800], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_04_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 8, 11, 14], targRT: [900, 6300, 9000, 11700], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_05_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [3, 5, 10, 15], targRT: [1800, 3600, 8100, 12600], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_06_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 5, 10, 14], targRT: [900, 3600, 8100, 11700], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_07_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 8, 10, 14], targRT: [2700, 6300, 8100, 11700], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_08_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 4, 12, 15], targRT: [900, 2700, 9900, 12600], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_09_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [5, 11, 13, 15], targRT: [3600, 9000, 10800, 12600], targSYL: `RA`, SYL_POS: 1},
    {file: `sounds/td/B/RA_10_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 4, 10, 14], targRT: [900, 2700, 8100, 11700], targSYL: `RA`, SYL_POS: 1}
];

var TD_FI_B = [
    {file: `sounds/td/B/FI_01_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [4, 10, 12, 15], targRT: [3000, 8400, 10200, 12900], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_02_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [5, 8, 11, 13], targRT: [3900, 6600, 9300, 11100], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_03_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [3, 5, 10, 12], targRT: [2100, 3900, 8400, 10200], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_04_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [3, 9, 11, 14], targRT: [2100, 7500, 9300, 12000], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_05_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 8, 12, 14], targRT: [1200, 6600, 10200, 12000], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_06_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [4, 8, 12, 14], targRT: [3000, 6600, 10200, 12000], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_07_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [3, 8, 11, 14], targRT: [2100, 6600, 9300, 12000], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_08_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [3, 9, 12, 15], targRT: [2100, 7500, 10200, 12900], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_09_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [5, 8, 10, 14], targRT: [3900, 6600, 8400, 12000], targSYL: `FI`, SYL_POS: 2},
    {file: `sounds/td/B/FI_10_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [3, 5, 11, 13], targRT: [2100, 3900, 9300, 11100], targSYL: `FI`, SYL_POS: 2}
];

var TD_NU_B = [
    {file: `sounds/td/B/NU_01_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [5, 9, 12, 14], targRT: [4200, 7800, 10500, 12300], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_02_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 6, 8, 14], targRT: [2400, 5100, 6900, 12300], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_03_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 10, 13, 15], targRT: [2400, 8700, 11400, 13200], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_04_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 7, 11, 15], targRT: [2400, 6000, 9600, 13200], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_05_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [4, 7, 11, 13], targRT: [3300, 6000, 9600, 11400], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_06_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 7, 9, 14], targRT: [2400, 6000, 7800, 12300], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_07_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [4, 10, 13, 15], targRT: [3300, 8700, 11400, 13200], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_08_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 5, 9, 15], targRT: [2400, 4200, 7800, 13200], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_09_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [6, 8, 11, 14], targRT: [5100, 6900, 9600, 12300], targSYL: `NU`, SYL_POS: 3},
    {file: `sounds/td/B/NU_10_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [2, 4, 11, 14], targRT: [1500, 3300, 9600, 12300], targSYL: `NU`, SYL_POS: 3}
];

var TD_TO_B = [
    {file: `sounds/td/B/TO_01_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [9, 11, 13, 15], targRT: [7200, 9000, 10800, 12600], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_02_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [4, 7, 12, 14], targRT: [2700, 5400, 9900, 11700], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_03_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [3, 7, 10, 15], targRT: [1800, 5400, 8100, 12600], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_04_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 5, 8, 10], targRT: [900, 3600, 6300, 8100], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_05_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [5, 7, 13, 15], targRT: [3600, 5400, 10800, 12600], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_06_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [4, 7, 11, 14], targRT: [2700, 5400, 9000, 11700], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_07_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [3, 5, 7, 14], targRT: [1800, 3600, 5400, 11700], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_08_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 7, 9, 12], targRT: [900, 5400, 7200, 9900], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_09_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 7, 11, 14], targRT: [900, 5400, 9000, 11700], targSYL: `TO`, SYL_POS: 1},
    {file: `sounds/td/B/TO_10_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [3, 8, 10, 13], targRT: [1800, 6300, 8100, 10800], targSYL: `TO`, SYL_POS: 1}
];

var TD_NE_B = [
    {file: `sounds/td/B/NE_01_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [4, 6, 13, 15], targRT: [3000, 4800, 11100, 12900], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_02_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [5, 8, 11, 14], targRT: [3900, 6600, 9300, 12000], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_03_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 6, 9, 12], targRT: [1200, 4800, 7500, 10200], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_04_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 6, 9, 14], targRT: [2100, 4800, 7500, 12000], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_05_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 5, 8, 10], targRT: [2100, 3900, 6600, 8400], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_06_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 6, 11, 13], targRT: [1200, 4800, 9300, 11100], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_07_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [4, 8, 11, 14], targRT: [3000, 6600, 9300, 12000], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_08_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [5, 7, 9, 13], targRT: [3900, 5700, 7500, 11100], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_09_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 9, 12, 15], targRT: [1200, 7500, 10200, 12900], targSYL: `NE`, SYL_POS: 2},
    {file: `sounds/td/B/NE_10_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 7, 12, 14], targRT: [1200, 5700, 10200, 12000], targSYL: `NE`, SYL_POS: 2}
];

var TD_PAU_B = [
    {file: `sounds/td/B/PAU_01_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [3, 6, 8, 10], targRT: [2400, 5100, 6900, 8700], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_02_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 7, 9, 14], targRT: [1500, 6000, 7800, 12300], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_03_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 5, 9, 12], targRT: [1500, 4200, 7800, 10500], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_04_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 10, 13, 15], targRT: [1500, 8700, 11400, 13200], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_05_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 7, 10, 12], targRT: [1500, 6000, 8700, 10500], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_06_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 6, 11, 15], targRT: [1500, 5100, 9600, 13200], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_07_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [4, 6, 8, 13], targRT: [3300, 5100, 6900, 11400], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_08_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [7, 9, 11, 13], targRT: [6000, 7800, 9600, 11400], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_09_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 5, 13, 15], targRT: [1500, 4200, 11400, 13200], targSYL: `PAU`, SYL_POS: 3},
    {file: `sounds/td/B/PAU_10_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [6, 8, 11, 13], targRT: [5100, 6900, 9600, 11400], targSYL: `PAU`, SYL_POS: 3}
];

//Counterbalance C
var TD_LU_C = [
    {file: `sounds/td/C/LU_01_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [2, 5, 7, 10], targRT: [900, 3600, 5400, 8100], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_02_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [4, 8, 10, 15], targRT: [2700, 6300, 8100, 12600], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_03_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 6, 11, 15], targRT: [1800, 4500, 9000, 12600], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_04_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [2, 5, 8, 13], targRT: [900, 3600, 6300, 10800], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_05_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 8, 10, 12], targRT: [1800, 6300, 8100, 9900], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_06_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [3, 7, 10, 15], targRT: [1800, 5400, 8100, 12600], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_07_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [6, 8, 11, 13], targRT: [4500, 6300, 9000, 10800], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_08_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [4, 7, 10, 15], targRT: [2700, 5400, 8100, 12600], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_09_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [2, 8, 11, 15], targRT: [900, 6300, 9000, 12600], targSYL: `LU`, SYL_POS: 1},
    {file: `sounds/td/C/LU_10_TD.mp3`, phonetic: `LOO`, exemplar: `sounds/syllables/LU.mp3`, targetLOC: [4, 7, 10, 13], targRT: [2700, 5400, 8100, 10800], targSYL: `LU`, SYL_POS: 1}
];

var TD_GA_C = [
    {file: `sounds/td/C/GA_01_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [4, 7, 9, 15], targRT: [3000, 5700, 7500, 12900], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_02_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [6, 8, 13, 15], targRT: [4800, 6600, 11100, 12900], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_03_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [6, 8, 11, 14], targRT: [4800, 6600, 9300, 12000], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_04_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 5, 8, 12], targRT: [2100, 3900, 6600, 10200], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_05_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 7, 9, 11], targRT: [2100, 5700, 7500, 9300], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_06_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [5, 8, 12, 15], targRT: [3900, 6600, 10200, 12900], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_07_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [6, 11, 13, 15], targRT: [4800, 9300, 11100, 12900], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_08_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [6, 8, 10, 13], targRT: [4800, 6600, 8400, 11100], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_09_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [3, 8, 11, 13], targRT: [2100, 6600, 9300, 11100], targSYL: `GA`, SYL_POS: 2},
    {file: `sounds/td/C/GA_10_TD.mp3`, phonetic: `GAH`, exemplar: `sounds/syllables/GA.mp3`, targetLOC: [4, 6, 9, 13], targRT: [3000, 4800, 7500, 11100], targSYL: `GA`, SYL_POS: 2}
];

var TD_MI_C = [
    {file: `sounds/td/C/MI_01_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [7, 9, 11, 13], targRT: [6000, 7800, 9600, 11400], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_02_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 6, 8, 12], targRT: [1500, 5100, 6900, 10500], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_03_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [3, 6, 8, 10], targRT: [2400, 5100, 6900, 8700], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_04_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 8, 10, 13], targRT: [1500, 6900, 8700, 11400], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_05_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [5, 10, 12, 14], targRT: [4200, 8700, 10500, 12300], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_06_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 4, 11, 13], targRT: [1500, 3300, 9600, 11400], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_07_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [2, 8, 13, 15], targRT: [1500, 6900, 11400, 13200], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_08_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [3, 10, 13, 15], targRT: [2400, 8700, 11400, 13200], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_09_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [4, 7, 9, 12], targRT: [3300, 6000, 7800, 10500], targSYL: `MI`, SYL_POS: 3},
    {file: `sounds/td/C/MI_10_TD.mp3`, phonetic: `MEE`, exemplar: `sounds/syllables/MI.mp3`, targetLOC: [3, 6, 11, 14], targRT: [2400, 5100, 9600, 12300], targSYL: `MI`, SYL_POS: 3}
];

var TD_KI_C = [
    {file: `sounds/td/C/KI_01_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 8, 10, 12], targRT: [900, 6300, 8100, 9900], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_02_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 6, 12, 14], targRT: [1800, 4500, 9900, 11700], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_03_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 6, 8, 14], targRT: [1800, 4500, 6300, 11700], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_04_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 5, 7, 12], targRT: [900, 3600, 5400, 9900], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_05_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 5, 9, 15], targRT: [900, 3600, 7200, 12600], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_06_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [4, 6, 12, 14], targRT: [2700, 4500, 9900, 11700], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_07_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [4, 7, 10, 12], targRT: [2700, 5400, 8100, 9900], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_08_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [5, 10, 13, 15], targRT: [3600, 8100, 10800, 12600], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_09_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [3, 8, 11, 14], targRT: [1800, 6300, 9000, 11700], targSYL: `KI`, SYL_POS: 1},
    {file: `sounds/td/C/KI_10_TD.mp3`, phonetic: `KEE`, exemplar: `sounds/syllables/KI.mp3`, targetLOC: [2, 10, 13, 15], targRT: [900, 8100, 10800, 12600], targSYL: `KI`, SYL_POS: 1}
];

var TD_MAI_C = [
    {file: `sounds/td/C/MAI_01_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 6, 8, 13], targRT: [1200, 4800, 6600, 11100], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_02_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 4, 9, 11], targRT: [1200, 3000, 7500, 9300], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_03_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 7, 9, 13], targRT: [1200, 5700, 7500, 11100], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_04_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [3, 5, 11, 14], targRT: [2100, 3900, 9300, 12000], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_05_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [4, 6, 8, 11], targRT: [3000, 4800, 6600, 9300], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_06_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [4, 6, 8, 13], targRT: [3000, 4800, 6600, 11100], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_07_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [5, 7, 13, 15], targRT: [3900, 5700, 11100, 12900], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_08_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [4, 6, 10, 15], targRT: [3000, 4800, 8400, 12900], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_09_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [2, 5, 8, 12], targRT: [1200, 3900, 6600, 10200], targSYL: `MAI`, SYL_POS: 2},
    {file: `sounds/td/C/MAI_10_TD.mp3`, phonetic: `MAI`, exemplar: `sounds/syllables/MAI.mp3`, targetLOC: [4, 7, 9, 14], targRT: [3000, 5700, 7500, 12000], targSYL: `MAI`, SYL_POS: 2}
];

var TD_FU_C = [
    {file: `sounds/td/C/FU_01_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 4, 12, 14], targRT: [1500, 3300, 10500, 12300], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_02_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [3, 5, 11, 13], targRT: [2400, 4200, 9600, 11400], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_03_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 9, 11, 14], targRT: [1500, 7800, 9600, 12300], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_04_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [5, 7, 9, 13], targRT: [4200, 6000, 7800, 11400], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_05_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 4, 10, 15], targRT: [1500, 3300, 8700, 13200], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_06_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [5, 7, 10, 14], targRT: [4200, 6000, 8700, 12300], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_07_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 7, 11, 15], targRT: [1500, 6000, 9600, 13200], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_08_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 7, 9, 15], targRT: [1500, 6000, 7800, 13200], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_09_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 4, 6, 10], targRT: [1500, 3300, 5100, 8700], targSYL: `FU`, SYL_POS: 3},
    {file: `sounds/td/C/FU_10_TD.mp3`, phonetic: `FOO`, exemplar: `sounds/syllables/FU.mp3`, targetLOC: [2, 5, 10, 12], targRT: [1500, 4200, 8700, 10500], targSYL: `FU`, SYL_POS: 3}
];

var TD_FI_C = [
    {file: `sounds/td/C/FI_01_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 6, 10, 15], targRT: [900, 4500, 8100, 12600], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_02_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 6, 11, 14], targRT: [900, 4500, 9000, 11700], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_03_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [6, 9, 12, 14], targRT: [4500, 7200, 9900, 11700], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_04_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 8, 11, 14], targRT: [900, 6300, 9000, 11700], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_05_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [2, 5, 7, 13], targRT: [900, 3600, 5400, 10800], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_06_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [5, 8, 10, 15], targRT: [3600, 6300, 8100, 12600], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_07_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [4, 7, 11, 14], targRT: [2700, 5400, 9000, 11700], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_08_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [4, 6, 13, 15], targRT: [2700, 4500, 10800, 12600], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_09_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [3, 5, 9, 11], targRT: [1800, 3600, 7200, 9000], targSYL: `FI`, SYL_POS: 1},
    {file: `sounds/td/C/FI_10_TD.mp3`, phonetic: `FEE`, exemplar: `sounds/syllables/FI.mp3`, targetLOC: [4, 8, 11, 15], targRT: [2700, 6300, 9000, 12600], targSYL: `FI`, SYL_POS: 1}
];

var TD_NU_C = [
    {file: `sounds/td/C/NU_01_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [2, 7, 10, 12], targRT: [1200, 5700, 8400, 10200], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_02_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 5, 7, 9], targRT: [2100, 3900, 5700, 7500], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_03_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 5, 10, 13], targRT: [2100, 3900, 8400, 11100], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_04_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [2, 6, 12, 14], targRT: [1200, 4800, 10200, 12000], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_05_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [4, 7, 12, 15], targRT: [3000, 5700, 10200, 12900], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_06_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [4, 11, 13, 15], targRT: [3000, 9300, 11100, 12900], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_07_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [2, 4, 6, 9], targRT: [1200, 3000, 4800, 7500], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_08_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [3, 5, 10, 12], targRT: [2100, 3900, 8400, 10200], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_09_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [2, 7, 11, 13], targRT: [1200, 5700, 9300, 11100], targSYL: `NU`, SYL_POS: 2},
    {file: `sounds/td/C/NU_10_TD.mp3`, phonetic: `NOO`, exemplar: `sounds/syllables/NU.mp3`, targetLOC: [7, 9, 11, 15], targRT: [5700, 7500, 9300, 12900], targSYL: `NU`, SYL_POS: 2}
];

var TD_RA_C = [
    {file: `sounds/td/C/RA_01_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [5, 7, 10, 15], targRT: [4200, 6000, 8700, 13200], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_02_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [3, 6, 8, 12], targRT: [2400, 5100, 6900, 10500], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_03_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 8, 11, 13], targRT: [3300, 6900, 9600, 11400], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_04_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 8, 13, 15], targRT: [3300, 6900, 11400, 13200], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_05_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [4, 6, 11, 13], targRT: [3300, 5100, 9600, 11400], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_06_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [7, 10, 13, 15], targRT: [6000, 8700, 11400, 13200], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_07_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [5, 8, 10, 12], targRT: [4200, 6900, 8700, 10500], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_08_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [3, 9, 13, 15], targRT: [2400, 7800, 11400, 13200], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_09_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [2, 5, 7, 11], targRT: [1500, 4200, 6000, 9600], targSYL: `RA`, SYL_POS: 3},
    {file: `sounds/td/C/RA_10_TD.mp3`, phonetic: `RAH`, exemplar: `sounds/syllables/RA.mp3`, targetLOC: [6, 8, 12, 14], targRT: [5100, 6900, 10500, 12300], targSYL: `RA`, SYL_POS: 3}
];

var TD_NE_C = [
    {file: `sounds/td/C/NE_01_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 7, 13, 15], targRT: [900, 5400, 10800, 12600], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_02_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 7, 11, 13], targRT: [1800, 5400, 9000, 10800], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_03_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 5, 7, 14], targRT: [1800, 3600, 5400, 11700], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_04_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [5, 7, 10, 13], targRT: [3600, 5400, 8100, 10800], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_05_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [5, 8, 11, 15], targRT: [3600, 6300, 9000, 12600], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_06_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [5, 8, 12, 14], targRT: [3600, 6300, 9900, 11700], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_07_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [6, 8, 10, 15], targRT: [4500, 6300, 8100, 12600], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_08_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [2, 4, 12, 15], targRT: [900, 2700, 9900, 12600], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_09_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [4, 7, 11, 15], targRT: [2700, 5400, 9000, 12600], targSYL: `NE`, SYL_POS: 1},
    {file: `sounds/td/C/NE_10_TD.mp3`, phonetic: `NAY`, exemplar: `sounds/syllables/NE.mp3`, targetLOC: [3, 8, 11, 15], targRT: [1800, 6300, 9000, 12600], targSYL: `NE`, SYL_POS: 1}
];

var TD_PAU_C = [
    {file: `sounds/td/C/PAU_01_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [3, 5, 8, 13], targRT: [2100, 3900, 6600, 11100], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_02_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [4, 6, 10, 13], targRT: [3000, 4800, 8400, 11100], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_03_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [3, 5, 9, 15], targRT: [2100, 3900, 7500, 12900], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_04_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 6, 10, 14], targRT: [1200, 4800, 8400, 12000], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_05_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 8, 10, 14], targRT: [1200, 6600, 8400, 12000], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_06_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 5, 7, 14], targRT: [1200, 3900, 5700, 12000], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_07_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 5, 11, 14], targRT: [1200, 3900, 9300, 12000], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_08_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [3, 5, 7, 13], targRT: [2100, 3900, 5700, 11100], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_09_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [4, 6, 11, 14], targRT: [3000, 4800, 9300, 12000], targSYL: `PAU`, SYL_POS: 2},
    {file: `sounds/td/C/PAU_10_TD.mp3`, phonetic: `POW`, exemplar: `sounds/syllables/PAU.mp3`, targetLOC: [2, 5, 12, 15], targRT: [1200, 3900, 10200, 12900], targSYL: `PAU`, SYL_POS: 2}
];

var TD_TO_C = [
    {file: `sounds/td/C/TO_01_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 4, 10, 14], targRT: [1500, 3300, 8700, 12300], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_02_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 4, 6, 8], targRT: [1500, 3300, 5100, 6900], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_03_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [5, 7, 11, 14], targRT: [4200, 6000, 9600, 12300], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_04_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [4, 8, 10, 12], targRT: [3300, 6900, 8700, 10500], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_05_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 5, 9, 12], targRT: [1500, 4200, 7800, 10500], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_06_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [4, 9, 12, 15], targRT: [3300, 7800, 10500, 13200], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_07_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 5, 13, 15], targRT: [1500, 4200, 11400, 13200], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_08_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 5, 9, 11], targRT: [1500, 4200, 7800, 9600], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_09_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [4, 7, 13, 15], targRT: [3300, 6000, 11400, 13200], targSYL: `TO`, SYL_POS: 3},
    {file: `sounds/td/C/TO_10_TD.mp3`, phonetic: `TOH`, exemplar: `sounds/syllables/TO.mp3`, targetLOC: [2, 5, 10, 15], targRT: [1500, 4200, 8700, 13200], targSYL: `TO`, SYL_POS: 3}
];


//Dynamically select stimuli based on counterbalancing
if (sl_counterbalance == 'A'){
    var TD_FI = TD_FI_A;
    var TD_FU = TD_FU_A;
    var TD_GA = TD_GA_A;
    var TD_KI = TD_KI_A;
    var TD_LU = TD_LU_A;
    var TD_MAI = TD_MAI_A;
    var TD_MI = TD_MI_A;
    var TD_NE = TD_NE_A;
    var TD_NU = TD_NU_A;
    var TD_PAU = TD_PAU_A;
    var TD_RA = TD_RA_A;
    var TD_TO = TD_TO_A;
} else if (sl_counterbalance == 'B'){
    var TD_FI = TD_FI_B;
    var TD_FU = TD_FU_B;
    var TD_GA = TD_GA_B;
    var TD_KI = TD_KI_B;
    var TD_LU = TD_LU_B;
    var TD_MAI = TD_MAI_B;
    var TD_MI = TD_MI_B;
    var TD_NE = TD_NE_B;
    var TD_NU = TD_NU_B;
    var TD_PAU = TD_PAU_B;
    var TD_RA = TD_RA_B;
    var TD_TO = TD_TO_B;
} else {
    var TD_FI = TD_FI_C;
    var TD_FU = TD_FU_C;
    var TD_GA = TD_GA_C;
    var TD_KI = TD_KI_C;
    var TD_LU = TD_LU_C;
    var TD_MAI = TD_MAI_C;
    var TD_MI = TD_MI_C;
    var TD_NE = TD_NE_C;
    var TD_NU = TD_NU_C;
    var TD_PAU = TD_PAU_C;
    var TD_RA = TD_RA_C;
    var TD_TO = TD_TO_C;
}

TD_FI = jsPsych.randomization.sampleWithoutReplacement(TD_FI, 3);
TD_FU = jsPsych.randomization.sampleWithoutReplacement(TD_FU, 3);
TD_GA = jsPsych.randomization.sampleWithoutReplacement(TD_GA, 3);
TD_KI = jsPsych.randomization.sampleWithoutReplacement(TD_KI, 3);
TD_LU = jsPsych.randomization.sampleWithoutReplacement(TD_LU, 3);
TD_MAI = jsPsych.randomization.sampleWithoutReplacement(TD_MAI, 3);
TD_MI = jsPsych.randomization.sampleWithoutReplacement(TD_MI, 3);
TD_NE = jsPsych.randomization.sampleWithoutReplacement(TD_NE, 3);
TD_NU = jsPsych.randomization.sampleWithoutReplacement(TD_NU, 3);
TD_PAU = jsPsych.randomization.sampleWithoutReplacement(TD_PAU, 3);
TD_RA = jsPsych.randomization.sampleWithoutReplacement(TD_RA, 3);
TD_TO = jsPsych.randomization.sampleWithoutReplacement(TD_TO, 3);

//Append all syllables to one variable, then randomize it
var TD_VAR = [...TD_FI, ...TD_FU, ...TD_GA, ...TD_KI, ...TD_LU, ...TD_MAI, ...TD_MI, ...TD_NE, ...TD_NU, ...TD_PAU, ...TD_RA, ...TD_TO];
var TD_VAR_FINAL = jsPsych.randomization.shuffle(TD_VAR);
if(piloting){
    TD_VAR_FINAL = TD_VAR_FINAL.slice(0,2); //just show two trials if piloting
}


//Preloading audio here probably -- extract the TD strings here and then preload in the main script
var TD_AUD = [];

for(var i=0; i<TD_VAR_FINAL.length; i++){
	TD_AUD.push(TD_VAR_FINAL[i].file);
}

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
//ADD THE GOOD STUFF//

///////////////////////
// DEFINE THE TRIALS //
///////////////////////

//Introduction Screens

var td_counter = 1; //for counting the number of trials
var syllableRef; //updating the to-be-displayed syllable
var phoneticRef; //updating the to-be-displayed phonetic pronounciation


var rtCounter = 0; //used for updating RT array
var rtCurrent = []; //the actual RT array

var TD_Intro_01 = {
	type: jsPsychHtmlButtonResponse,
	stimulus: '<p>You will now listen to streams of spoken syllables. The syllables are spoken rapidly, with approximately three syllables spoken every second.</p>'+
			  '<p>Each syllables stream lasts about 14 seconds.</p>'+
			  '<p>For each syllable stream, you will be given a <b>target syllable</b>. Your task is to listen very carefully for this syllable, which will be embedded within the syllable stream.</p>'+
			  '<p>Every time you hear the <b>target syllable</b>, you will press the spacebar as quickly and accurately as you can.</p>',
	choices: ['Continue'],
	post_trial_gap: 250
}

var TD_Intro_02 = {
	type: jsPsychHtmlButtonResponse,
	stimulus: '<p>It is very important that you make your responses as quickly and accurately as possible.</p>'+
			  '<p>To help you make your responses, you will be able to listen to the <b>target syllable</b> prior to beginning each syllable stream (trial).</p>'+
			  '<p>There will be 36 total trials.</p>',
	choices: ['Continue'],
	post_trial_gap: 250,
	on_finish: function(){td_counter = 1;}
};

var currentExemplar; //for storing current exemplar to be played prior to the trial
var currentPhonetic; //for storing current phonetic representation
var numPlays = 0; //to log the number of times the participant plays the noise-vocoded speech sample


//Main Procedure Screens
var TD_setup = {
	type: jsPsychHtmlButtonResponse,
	data: {SYLLABLE: jsPsych.timelineVariable('targSYL'), EXEMPLAR: jsPsych.timelineVariable('exemplar'), PHONETIC: jsPsych.timelineVariable('phonetic'), TD_LOCS: jsPsych.timelineVariable('targRT'), TD_TYPE: jsPsych.timelineVariable('SYL_POS')},
	stimulus: function(){return '<p>Trial '+td_counter+' of 36</p>';},
	choices: ['Continue'],
	on_finish: function(data){
		syllableRef = data.SYLLABLE;
		td_counter += 1;
		currentExemplar = data.EXEMPLAR;
        currentPhonetic = data.PHONETIC;
		numPlays = 0;
	}
};


var TD_trial_intro_01 = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: '',
	data: {SYLLABLE: jsPsych.timelineVariable('targSYL'),  EXEMPLAR: jsPsych.timelineVariable('exemplar'), PHONETIC: jsPsych.timelineVariable('phonetic'), TD_LOCS: jsPsych.timelineVariable('targRT'), TD_TYPE: jsPsych.timelineVariable('SYL_POS')},
	choices: ['p'],
	prompt: function(){
        return `<p>The <b>target syllable</b> for this stream is ${syllableRef}, which is pronounced like "${currentPhonetic}"</p><p style="color: darkred;"><em>Press "p" on the keyboard to listen to the <b>target syllable</b> for the current trial</em></p>`;}
};

var TD_play_exemplar = {
	type: jsPsychAudioKeyboardResponse,
	stimulus: jsPsych.timelineVariable('exemplar'),
	trial_ends_after_audio: true,
	choices: `NO_KEYS`,
	on_finish: function(){
		numPlays += 1
	}
};

var loop_toggle;

var TD_replay_option = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: function(){return `<p>${syllableRef} ("${currentPhonetic}")</p><p>To replay the <b>target syllable</b>, press "p"</p> When you are ready to begin listening for the <b>target syllable</b>, press "spacebar"`},
	choices: [' ', 'p'],
	post_trial_gap: 500,
	on_finish: function(data){
		loop_toggle = data.response;
	}
};

var TD_exemplar_loop = {
	timeline: [TD_play_exemplar, TD_replay_option],
	loop_function: function(data){
		if(loop_toggle == 'p'){ //80 is 'p'
			return true;
		}else {
			return false;
		}
		}
	};




/////////////////////////////////////////
// MAIN RESPONSE SCREEN FOR TD TRIALS ///
/////////////////////////////////////////


var after_response = function(info){
	rtCurrent[rtCounter] = info.rt;
	rtCounter += 1;
	};


var TD_trial_MAIN = {
	type: jsPsychAudioKeyboardResponse,
	stimulus: jsPsych.timelineVariable('file'),
	data: {SYLLABLE: jsPsych.timelineVariable('targSYL'), EXEMPLAR: jsPsych.timelineVariable('exemplar'), PHONETIC: jsPsych.timelineVariable('phonetic'), TD_LOCS: jsPsych.timelineVariable('targRT'), TD_TYPE: jsPsych.timelineVariable('SYL_POS')},
	trial_ends_after_audio: true,
	response_ends_trial: false,
	prompt: function(){return '<p>'+syllableRef+'</p><p>("'+currentPhonetic+'")</p><p style="color:darkred;"><em>Press spacebar whenever you hear this syllable!</em></p>';},
	on_start: function(){
		//here is a function to listen for a keyboard response
		var listener_id = jsPsych.pluginAPI.getKeyboardResponse({
			callback_function:after_response,
			valid_responses: [' '],
			rt_method: 'performance',
			persist: true
			});
		},
	on_finish: function(data){
		//let's compare the RTs to the known locations of the targets
		var targRTs = data.TD_LOCS; //make sure the target locations actually exist
		var userRTs = rtCurrent; //make sure the actual user RTs are being logged
		var userRTsString = rtCurrent.toString();
		var newChar = '_';
		var userRTsdata = userRTsString.split(',').join(newChar);

		var normedRT = [null, null, null, null];

		for (i=0; i < targRTs.length; i++) {
		  var curRTtarg = targRTs[i]; //current position of the target
			for (j=0; j < userRTs.length; j++) {
				var tempRT = userRTs[j];
				var RTdiff = tempRT - curRTtarg; //this is the RT difference

				if(RTdiff > 200 && RTdiff < 1200) {
					normedRT[i] = RTdiff;
		    }
		  }
		}

		jsPsych.data.addDataToLastTrial({
			designation: 'TD_SUMMARY',
			TDLOC_01: targRTs[0],
			TDLOC_02: targRTs[1],
			TDLOC_03: targRTs[2],
			TDLOC_04: targRTs[3],
			TD_RT_01: normedRT[0],
			TD_RT_02: normedRT[1],
			TD_RT_03: normedRT[2],
			TD_RT_04: normedRT[3],
			TD_SUBJ_RTs: userRTsdata,
			number_of_plays: numPlays
		});
		rtCurrent = []; //reset the rt array
	}
};



//Push everything to the timeline
var td_trials_final = {
	timeline: [TD_setup, TD_trial_intro_01, TD_exemplar_loop, TD_trial_MAIN],
	timeline_variables: TD_VAR_FINAL,
	randomize_order: true
}




//Final completed target-detection array
var td_final = {
	timeline: [TD_Intro_01, TD_Intro_02, td_trials_final]
}



//////////////////////////////////////
//////////////////////////////////////
/////////////////////////////////////
//////////////////////////////////////




/*  Forced-Choice Task */
var slafc_tlinevars_01 = [
    {aud01: `sounds/afc/${sl_counterbalance}/W001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N001.mp3`, afc_cresp: 0, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/W001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N002.mp3`, afc_cresp: 0, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/N003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W001.mp3`, afc_cresp: 1, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/N004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W001.mp3`, afc_cresp: 1, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/N001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W002.mp3`, afc_cresp: 1, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/N002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W002.mp3`, afc_cresp: 1, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/W002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N003.mp3`, afc_cresp: 0, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/W002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N004.mp3`, afc_cresp: 0, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/W003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N001.mp3`, afc_cresp: 0, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/W003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N002.mp3`, afc_cresp: 0, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/N003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W003.mp3`, afc_cresp: 1, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/N004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W003.mp3`, afc_cresp: 1, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/N001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W004.mp3`, afc_cresp: 1, afc_word: 4},
    {aud01: `sounds/afc/${sl_counterbalance}/N002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W004.mp3`, afc_cresp: 1, afc_word: 4},
    {aud01: `sounds/afc/${sl_counterbalance}/W004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N003.mp3`, afc_cresp: 0, afc_word: 4},
    {aud01: `sounds/afc/${sl_counterbalance}/W004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N004.mp3`, afc_cresp: 0, afc_word: 4},
];

var slafc_tlinevars_02 = [
    {aud01: `sounds/afc/${sl_counterbalance}/N001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W001.mp3`, afc_cresp: 1, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/N002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W001.mp3`, afc_cresp: 1, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/W001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N003.mp3`, afc_cresp: 0, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/W001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N004.mp3`, afc_cresp: 0, afc_word: 1},
    {aud01: `sounds/afc/${sl_counterbalance}/W002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N001.mp3`, afc_cresp: 0, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/W002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N002.mp3`, afc_cresp: 0, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/N003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W002.mp3`, afc_cresp: 1, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/N004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W002.mp3`, afc_cresp: 1, afc_word: 2},
    {aud01: `sounds/afc/${sl_counterbalance}/N001.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W003.mp3`, afc_cresp: 1, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/N002.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W003.mp3`, afc_cresp: 1, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/W003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N003.mp3`, afc_cresp: 0, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/W003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N004.mp3`, afc_cresp: 0, afc_word: 3},
    {aud01: `sounds/afc/${sl_counterbalance}/W004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N001.mp3`, afc_cresp: 0, afc_word: 4},
    {aud01: `sounds/afc/${sl_counterbalance}/W004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/N002.mp3`, afc_cresp: 0, afc_word: 4},
    {aud01: `sounds/afc/${sl_counterbalance}/N003.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W004.mp3`, afc_cresp: 1, afc_word: 4},
    {aud01: `sounds/afc/${sl_counterbalance}/N004.mp3`, aud02: `sounds/afc/${sl_counterbalance}/W004.mp3`, afc_cresp: 1, afc_word: 4},
];

var selected_afc_vars = [slafc_tlinevars_01, slafc_tlinevars_02][Math.floor(Math.random() + 0.5)] //randomly select one of the two lists
if(piloting){
    selected_afc_vars = selected_afc_vars.slice(0,2) //make it just two trials if piloting
}


var slafc_instruct = {
    type: jsPsychInstructions,
    pages: [
        `<p>Thank you for your responses. This concludes the syllable detection task.</p>`,
        `<p>You will now listen to and make judgments about shorter syllable streams.</p><p>On each trial, you will hear two sounds. Each sound is short and only consists of three syllables.</p>`,
        `<p>One of the two sounds might sound more familiar to you, as it was heard as a part of the earlier syllable detection task.</p><p>The other sound will contain a sequence of syllables that was not part of the earlier syllable detection task, and thus might sound unfamiliar.</p>`,
        `<p>Your job is to determine which sound (1 or 2) is more familiar to you.</p><p>For each response, you will be asked a follow-up question about how confident you are in your answer.</p>`,
        `<p>There are 16 judgments in total.</p><p>Click on the "Next" button to begin!`
    ],
    show_clickable_nav: true
}

var afc_count = 1;

var slafc_proc = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: function(){return `<p>Judgment ${afc_count} of 16</p>`},
            choices: ['Listen!'],
            on_finish: function(){
                afc_count +=1;
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p style="font-size:40px;">+</p>`,
            choices: `NO_KEYS`,
            trial_duration: 1000,
        },
        {
            type: jsPsychAudioKeyboardResponse,
            stimulus: jsPsych.timelineVariable('aud01'),
            choices: `NO_KEYS`,
            trial_ends_after_audio: true,
            prompt: `<p style="font-size:60px">1</p>`,
            post_trial_gap: 1500
        },
        {
            type: jsPsychAudioKeyboardResponse,
            stimulus: jsPsych.timelineVariable('aud02'),
            choices: `NO_KEYS`,
            trial_ends_after_audio: true,
            prompt: `<p style="font-size:60px">2</p>`,
            post_trial_gap: 250
        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: `<p>Which sounded more familiar based on the sounds heard in the preceding syllable detection task?</p>`,
            choices: [`<p style="font-size: 36px;">1</p>`, `<p style="font-size: 36px;">2</p>`],
            button_html: `<button class="jspsych-btn" style="width:200px; height:200px;">%choice%</button>`,
            data: {designation: `2AFC-ACC`, afc_01: jsPsych.timelineVariable('aud01'), afc_01: jsPsych.timelineVariable('aud02'), afc_cresp: jsPsych.timelineVariable('afc_cresp'), afc_word: jsPsych.timelineVariable('afc_word')},
            on_finish: function(data){
                if(data.response == data.afc_cresp){
                    var gotitright = 1;
                } else {
                    var gotitright = 0;
                }
                jsPsych.data.addDataToLastTrial({
                    AFC_ACC: gotitright
                  });
            }
        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: `<p>How confident are you in your answer?</p>`,
            choices: [`<b>I recalled from exposure</b>`, `<b>It sounds familiar, but I have no clear memory</b>`, `<b>I guessed</b>`],
            button_html: `<button class="jspsych-btn" style="width:200px; height:200px; white-space: normal; word-wrap: break-word">%choice%</button>`,
            data: {designation: `2AFC-CONF`, afc_01: jsPsych.timelineVariable('aud01'), afc_01: jsPsych.timelineVariable('aud02'), afc_cresp: jsPsych.timelineVariable('afc_cresp'), afc_word: jsPsych.timelineVariable('afc_word')},
            post_trial_gap: 500,
            on_finish: function(data){
                if(data.response == 0){
                    var knewresp = 1;
                } else {
                    var knewresp = 0;
                }
                jsPsych.data.addDataToLastTrial({
                    AFC_CONF: knewresp
                  });
            }
        }
    ],
    timeline_variables: selected_afc_vars,
    randomize_order: true
};


var afc_final = {
    timeline: [slafc_instruct, slafc_proc]
}

//Add some generic preloading here? Or should you place that in the beginning of the script?
var AFC_AUD = [];
for(var i=0; i<selected_afc_vars.length; i++){
    AFC_AUD.push(selected_afc_vars[i].aud01);
    AFC_AUD.push(selected_afc_vars[i].aud02);
}



var sl = {
    timeline: [td_final, afc_final]
}
