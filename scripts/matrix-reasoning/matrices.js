
/*
/////////////////////////////////
// Sandia Matrix Reasoning Task //
/////////////////////////////////

This is a 42-item matrix reasoning task, 
similar to the Raven's Progressive Matrices.
It is not timed, but typical administration
time is between 45 and 60 minutes. 

The script can be set to exit after a 
certain amount of time has passed. 
(var specDuration). The script outputs 
two important variables.

1. matrices --> this is what should be 
pushed to the timeline in the main index
file (e.g., timeline.push(matrices);)

2. return_matrices_folder() --> this function
allows you to assign a variable to the 
images used in the task (for preloading).
For example:
var matrix_img = return_matrices_folder();

You can also create a short-form version of
the task by changing the shortForm variable
to 'true' -- NOTE: the short form version
has not been psychometrically assessed.

Stephen Van Hedger, June 2020


Reference:
Matzen, L.E., Benz, Z.O., Dixon, K.R. et al. Recreating Raven’s: Software for systematically generating large numbers of Raven-like matrix problems with normed properties. Behavior Research Methods 42, 525–541 (2010). https://doi.org/10.3758/BRM.42.2.525

Note: This is "List 1" from the experimental lists described in Matzen et al. (2010)
*/

/**************/
/** TIMELINE **/
/**************/

var timeline = []; //specify the jsPsych timeline to which all trials/blocks are pushed

var totalScore = 0; //for logging the total number of correct responses
var totalSeen = 0; //for logging the total number of items participants get to in the specified time frame
var specDuration = 60; //number of MINUTES you want participants to be able to spend on the task
var shortForm = true; //true: just presents the odd trials (21 total), false: present the full list (42)


/************************/
/** TIMELINE VARIABLES **/
/************************/

var matrixList = [
{name: 'MAT-01', pattern: 'one/B1_1.png', option_01: 'one/B1_1_Answers_01.png', option_02: 'one/B1_1_Answers_02.png', option_03: 'one/B1_1_Answers_03.png', option_04: 'one/B1_1_Answers_04.png', option_05: 'one/B1_1_Answers_05.png', option_06: 'one/B1_1_Answers_06.png', option_07: 'one/B1_1_Answers_07.png', option_08: 'one/B1_1_Answers_08.png', type: 'one', correct:2},
{name: 'MAT-02', pattern: 'one/C2_1.png', option_01: 'one/C2_1_Answers_01.png', option_02: 'one/C2_1_Answers_02.png', option_03: 'one/C2_1_Answers_03.png', option_04: 'one/C2_1_Answers_04.png', option_05: 'one/C2_1_Answers_05.png', option_06: 'one/C2_1_Answers_06.png', option_07: 'one/C2_1_Answers_07.png', option_08: 'one/C2_1_Answers_08.png', type: 'one', correct:4},
{name: 'MAT-03', pattern: 'one/D3_1.png', option_01: 'one/D3_1_Answers_01.png', option_02: 'one/D3_1_Answers_02.png', option_03: 'one/D3_1_Answers_03.png', option_04: 'one/D3_1_Answers_04.png', option_05: 'one/D3_1_Answers_05.png', option_06: 'one/D3_1_Answers_06.png', option_07: 'one/D3_1_Answers_07.png', option_08: 'one/D3_1_Answers_08.png', type: 'one', correct:6},
{name: 'MAT-04', pattern: 'one/E4_1.png', option_01: 'one/E4_1_Answers_01.png', option_02: 'one/E4_1_Answers_02.png', option_03: 'one/E4_1_Answers_03.png', option_04: 'one/E4_1_Answers_04.png', option_05: 'one/E4_1_Answers_05.png', option_06: 'one/E4_1_Answers_06.png', option_07: 'one/E4_1_Answers_07.png', option_08: 'one/E4_1_Answers_08.png', type: 'one', correct:7},
{name: 'MAT-05', pattern: 'two/A1B2.png', option_01: 'two/A1B2_Answers_01.png', option_02: 'two/A1B2_Answers_02.png', option_03: 'two/A1B2_Answers_03.png', option_04: 'two/A1B2_Answers_04.png', option_05: 'two/A1B2_Answers_05.png', option_06: 'two/A1B2_Answers_06.png', option_07: 'two/A1B2_Answers_07.png', option_08: 'two/A1B2_Answers_08.png', type: 'two', correct:4},
{name: 'MAT-06', pattern: 'two/A2C3.png', option_01: 'two/A2C3_Answers_01.png', option_02: 'two/A2C3_Answers_02.png', option_03: 'two/A2C3_Answers_03.png', option_04: 'two/A2C3_Answers_04.png', option_05: 'two/A2C3_Answers_05.png', option_06: 'two/A2C3_Answers_06.png', option_07: 'two/A2C3_Answers_07.png', option_08: 'two/A2C3_Answers_08.png', type: 'two', correct:6},
{name: 'MAT-07', pattern: 'two/A3D4.png', option_01: 'two/A3D4_Answers_01.png', option_02: 'two/A3D4_Answers_02.png', option_03: 'two/A3D4_Answers_03.png', option_04: 'two/A3D4_Answers_04.png', option_05: 'two/A3D4_Answers_05.png', option_06: 'two/A3D4_Answers_06.png', option_07: 'two/A3D4_Answers_07.png', option_08: 'two/A3D4_Answers_08.png', type: 'two', correct:1},
{name: 'MAT-08', pattern: 'two/A4E5.png', option_01: 'two/A4E5_Answers_01.png', option_02: 'two/A4E5_Answers_02.png', option_03: 'two/A4E5_Answers_03.png', option_04: 'two/A4E5_Answers_04.png', option_05: 'two/A4E5_Answers_05.png', option_06: 'two/A4E5_Answers_06.png', option_07: 'two/A4E5_Answers_07.png', option_08: 'two/A4E5_Answers_08.png', type: 'two', correct:7},
{name: 'MAT-09', pattern: 'two/B5C1.png', option_01: 'two/B5C1_Answers_01.png', option_02: 'two/B5C1_Answers_02.png', option_03: 'two/B5C1_Answers_03.png', option_04: 'two/B5C1_Answers_04.png', option_05: 'two/B5C1_Answers_05.png', option_06: 'two/B5C1_Answers_06.png', option_07: 'two/B5C1_Answers_07.png', option_08: 'two/B5C1_Answers_08.png', type: 'two', correct:4},
{name: 'MAT-10', pattern: 'two/B1D2.png', option_01: 'two/B1D2_Answers_01.png', option_02: 'two/B1D2_Answers_02.png', option_03: 'two/B1D2_Answers_03.png', option_04: 'two/B1D2_Answers_04.png', option_05: 'two/B1D2_Answers_05.png', option_06: 'two/B1D2_Answers_06.png', option_07: 'two/B1D2_Answers_07.png', option_08: 'two/B1D2_Answers_08.png', type: 'two', correct:3},
{name: 'MAT-11', pattern: 'two/B2E3.png', option_01: 'two/B2E3_Answers_01.png', option_02: 'two/B2E3_Answers_02.png', option_03: 'two/B2E3_Answers_03.png', option_04: 'two/B2E3_Answers_04.png', option_05: 'two/B2E3_Answers_05.png', option_06: 'two/B2E3_Answers_06.png', option_07: 'two/B2E3_Answers_07.png', option_08: 'two/B2E3_Answers_08.png', type: 'two', correct:7},
{name: 'MAT-12', pattern: 'two/C3D4.png', option_01: 'two/C3D4_Answers_01.png', option_02: 'two/C3D4_Answers_02.png', option_03: 'two/C3D4_Answers_03.png', option_04: 'two/C3D4_Answers_04.png', option_05: 'two/C3D4_Answers_05.png', option_06: 'two/C3D4_Answers_06.png', option_07: 'two/C3D4_Answers_07.png', option_08: 'two/C3D4_Answers_08.png', type: 'two', correct:1},
{name: 'MAT-13', pattern: 'two/C4E5.png', option_01: 'two/C4E5_Answers_01.png', option_02: 'two/C4E5_Answers_02.png', option_03: 'two/C4E5_Answers_03.png', option_04: 'two/C4E5_Answers_04.png', option_05: 'two/C4E5_Answers_05.png', option_06: 'two/C4E5_Answers_06.png', option_07: 'two/C4E5_Answers_07.png', option_08: 'two/C4E5_Answers_08.png', type: 'two', correct:6},
{name: 'MAT-14', pattern: 'two/D5E1.png', option_01: 'two/D5E1_Answers_01.png', option_02: 'two/D5E1_Answers_02.png', option_03: 'two/D5E1_Answers_03.png', option_04: 'two/D5E1_Answers_04.png', option_05: 'two/D5E1_Answers_05.png', option_06: 'two/D5E1_Answers_06.png', option_07: 'two/D5E1_Answers_07.png', option_08: 'two/D5E1_Answers_08.png', type: 'two', correct:4},
{name: 'MAT-15', pattern: 'logic/X_1.png', option_01: 'logic/X_1_Answers_01.png', option_02: 'logic/X_1_Answers_02.png', option_03: 'logic/X_1_Answers_03.png', option_04: 'logic/X_1_Answers_04.png', option_05: 'logic/X_1_Answers_05.png', option_06: 'logic/X_1_Answers_06.png', option_07: 'logic/X_1_Answers_07.png', option_08: 'logic/X_1_Answers_08.png', type: 'logic', correct:4},
{name: 'MAT-16', pattern: 'logic/Y_1.png', option_01: 'logic/Y_1_Answers_01.png', option_02: 'logic/Y_1_Answers_02.png', option_03: 'logic/Y_1_Answers_03.png', option_04: 'logic/Y_1_Answers_04.png', option_05: 'logic/Y_1_Answers_05.png', option_06: 'logic/Y_1_Answers_06.png', option_07: 'logic/Y_1_Answers_07.png', option_08: 'logic/Y_1_Answers_08.png', type: 'logic', correct:5},
{name: 'MAT-17', pattern: 'logic/Z_1.png', option_01: 'logic/Z_1_Answers_01.png', option_02: 'logic/Z_1_Answers_02.png', option_03: 'logic/Z_1_Answers_03.png', option_04: 'logic/Z_1_Answers_04.png', option_05: 'logic/Z_1_Answers_05.png', option_06: 'logic/Z_1_Answers_06.png', option_07: 'logic/Z_1_Answers_07.png', option_08: 'logic/Z_1_Answers_08.png', type: 'logic', correct:6},
{name: 'MAT-18', pattern: 'three/A3B1C2_1.png', option_01: 'three/A3B1C2_1_Answers_01.png', option_02: 'three/A3B1C2_1_Answers_02.png', option_03: 'three/A3B1C2_1_Answers_03.png', option_04: 'three/A3B1C2_1_Answers_04.png', option_05: 'three/A3B1C2_1_Answers_05.png', option_06: 'three/A3B1C2_1_Answers_06.png', option_07: 'three/A3B1C2_1_Answers_07.png', option_08: 'three/A3B1C2_1_Answers_08.png', type: 'three-01', correct:3},
{name: 'MAT-19', pattern: 'three/A2B4E1.png', option_01: 'three/A2B4E1_Answers_01.png', option_02: 'three/A2B4E1_Answers_02.png', option_03: 'three/A2B4E1_Answers_03.png', option_04: 'three/A2B4E1_Answers_04.png', option_05: 'three/A2B4E1_Answers_05.png', option_06: 'three/A2B4E1_Answers_06.png', option_07: 'three/A2B4E1_Answers_07.png', option_08: 'three/A2B4E1_Answers_08.png', type: 'three-01', correct:2},
{name: 'MAT-20', pattern: 'three/B1C5E2.png', option_01: 'three/B1C5E2_Answers_01.png', option_02: 'three/B1C5E2_Answers_02.png', option_03: 'three/B1C5E2_Answers_03.png', option_04: 'three/B1C5E2_Answers_04.png', option_05: 'three/B1C5E2_Answers_05.png', option_06: 'three/B1C5E2_Answers_06.png', option_07: 'three/B1C5E2_Answers_07.png', option_08: 'three/B1C5E2_Answers_08.png', type: 'three-01', correct:5},
{name: 'MAT-21', pattern: 'three/A1D3E2.png', option_01: 'three/A1D3E2_Answers_01.png', option_02: 'three/A1D3E2_Answers_02.png', option_03: 'three/A1D3E2_Answers_03.png', option_04: 'three/A1D3E2_Answers_04.png', option_05: 'three/A1D3E2_Answers_05.png', option_06: 'three/A1D3E2_Answers_06.png', option_07: 'three/A1D3E2_Answers_07.png', option_08: 'three/A1D3E2_Answers_08.png', type: 'three-01', correct:0},
{name: 'MAT-22', pattern: 'three/B2C1E4.png', option_01: 'three/B2C1E4_Answers_01.png', option_02: 'three/B2C1E4_Answers_02.png', option_03: 'three/B2C1E4_Answers_03.png', option_04: 'three/B2C1E4_Answers_04.png', option_05: 'three/B2C1E4_Answers_05.png', option_06: 'three/B2C1E4_Answers_06.png', option_07: 'three/B2C1E4_Answers_07.png', option_08: 'three/B2C1E4_Answers_08.png', type: 'three-01', correct:5},
{name: 'MAT-23', pattern: 'three/A3B4C1.png', option_01: 'three/A3B4C1_Answers_01.png', option_02: 'three/A3B4C1_Answers_02.png', option_03: 'three/A3B4C1_Answers_03.png', option_04: 'three/A3B4C1_Answers_04.png', option_05: 'three/A3B4C1_Answers_05.png', option_06: 'three/A3B4C1_Answers_06.png', option_07: 'three/A3B4C1_Answers_07.png', option_08: 'three/A3B4C1_Answers_08.png', type: 'three-02', correct:5},
{name: 'MAT-24', pattern: 'three/A3B2C5.png', option_01: 'three/A3B2C5_Answers_01.png', option_02: 'three/A3B2C5_Answers_02.png', option_03: 'three/A3B2C5_Answers_03.png', option_04: 'three/A3B2C5_Answers_04.png', option_05: 'three/A3B2C5_Answers_05.png', option_06: 'three/A3B2C5_Answers_06.png', option_07: 'three/A3B2C5_Answers_07.png', option_08: 'three/A3B2C5_Answers_08.png', type: 'three-02', correct:1},
{name: 'MAT-25', pattern: 'three/A4B1D3.png', option_01: 'three/A4B1D3_Answers_01.png', option_02: 'three/A4B1D3_Answers_02.png', option_03: 'three/A4B1D3_Answers_03.png', option_04: 'three/A4B1D3_Answers_04.png', option_05: 'three/A4B1D3_Answers_05.png', option_06: 'three/A4B1D3_Answers_06.png', option_07: 'three/A4B1D3_Answers_07.png', option_08: 'three/A4B1D3_Answers_08.png', type: 'three-02', correct:0},
{name: 'MAT-26', pattern: 'three/A4B2E5.png', option_01: 'three/A4B2E5_Answers_01.png', option_02: 'three/A4B2E5_Answers_02.png', option_03: 'three/A4B2E5_Answers_03.png', option_04: 'three/A4B2E5_Answers_04.png', option_05: 'three/A4B2E5_Answers_05.png', option_06: 'three/A4B2E5_Answers_06.png', option_07: 'three/A4B2E5_Answers_07.png', option_08: 'three/A4B2E5_Answers_08.png', type: 'three-02', correct:5},
{name: 'MAT-27', pattern: 'three/B5C3D1.png', option_01: 'three/B5C3D1_Answers_01.png', option_02: 'three/B5C3D1_Answers_02.png', option_03: 'three/B5C3D1_Answers_03.png', option_04: 'three/B5C3D1_Answers_04.png', option_05: 'three/B5C3D1_Answers_05.png', option_06: 'three/B5C3D1_Answers_06.png', option_07: 'three/B5C3D1_Answers_07.png', option_08: 'three/B5C3D1_Answers_08.png', type: 'three-02', correct:3},
{name: 'MAT-28', pattern: 'three/B5C2D4.png', option_01: 'three/B5C2D4_Answers_01.png', option_02: 'three/B5C2D4_Answers_02.png', option_03: 'three/B5C2D4_Answers_03.png', option_04: 'three/B5C2D4_Answers_04.png', option_05: 'three/B5C2D4_Answers_05.png', option_06: 'three/B5C2D4_Answers_06.png', option_07: 'three/B5C2D4_Answers_07.png', option_08: 'three/B5C2D4_Answers_08.png', type: 'three-02', correct:6},
{name: 'MAT-29', pattern: 'three/A2B3E4.png', option_01: 'three/A2B3E4_Answers_01.png', option_02: 'three/A2B3E4_Answers_02.png', option_03: 'three/A2B3E4_Answers_03.png', option_04: 'three/A2B3E4_Answers_04.png', option_05: 'three/A2B3E4_Answers_05.png', option_06: 'three/A2B3E4_Answers_06.png', option_07: 'three/A2B3E4_Answers_07.png', option_08: 'three/A2B3E4_Answers_08.png', type: 'three-02', correct:1},
{name: 'MAT-30', pattern: 'three/C3D5E1.png', option_01: 'three/C3D5E1_Answers_01.png', option_02: 'three/C3D5E1_Answers_02.png', option_03: 'three/C3D5E1_Answers_03.png', option_04: 'three/C3D5E1_Answers_04.png', option_05: 'three/C3D5E1_Answers_05.png', option_06: 'three/C3D5E1_Answers_06.png', option_07: 'three/C3D5E1_Answers_07.png', option_08: 'three/C3D5E1_Answers_08.png', type: 'three-02', correct:2},
{name: 'MAT-31', pattern: 'three/B2C4E3.png', option_01: 'three/B2C4E3_Answers_01.png', option_02: 'three/B2C4E3_Answers_02.png', option_03: 'three/B2C4E3_Answers_03.png', option_04: 'three/B2C4E3_Answers_04.png', option_05: 'three/B2C4E3_Answers_05.png', option_06: 'three/B2C4E3_Answers_06.png', option_07: 'three/B2C4E3_Answers_07.png', option_08: 'three/B2C4E3_Answers_08.png', type: 'three-02', correct:0},
{name: 'MAT-32', pattern: 'three/A2D4E5.png', option_01: 'three/A2D4E5_Answers_01.png', option_02: 'three/A2D4E5_Answers_02.png', option_03: 'three/A2D4E5_Answers_03.png', option_04: 'three/A2D4E5_Answers_04.png', option_05: 'three/A2D4E5_Answers_05.png', option_06: 'three/A2D4E5_Answers_06.png', option_07: 'three/A2D4E5_Answers_07.png', option_08: 'three/A2D4E5_Answers_08.png', type: 'three-02', correct:2},
{name: 'MAT-33', pattern: 'three/A3B4C5_1.png', option_01: 'three/A3B4C5_1_Answers_01.png', option_02: 'three/A3B4C5_1_Answers_02.png', option_03: 'three/A3B4C5_1_Answers_03.png', option_04: 'three/A3B4C5_1_Answers_04.png', option_05: 'three/A3B4C5_1_Answers_05.png', option_06: 'three/A3B4C5_1_Answers_06.png', option_07: 'three/A3B4C5_1_Answers_07.png', option_08: 'three/A3B4C5_1_Answers_08.png', type: 'three-03', correct:0},
{name: 'MAT-34', pattern: 'three/A3B5D4_1.png', option_01: 'three/A3B5D4_1_Answers_01.png', option_02: 'three/A3B5D4_1_Answers_02.png', option_03: 'three/A3B5D4_1_Answers_03.png', option_04: 'three/A3B5D4_1_Answers_04.png', option_05: 'three/A3B5D4_1_Answers_05.png', option_06: 'three/A3B5D4_1_Answers_06.png', option_07: 'three/A3B5D4_1_Answers_07.png', option_08: 'three/A3B5D4_1_Answers_08.png', type: 'three-03', correct:6},
{name: 'MAT-35', pattern: 'three/A4B3E5_1.png', option_01: 'three/A4B3E5_1_Answers_01.png', option_02: 'three/A4B3E5_1_Answers_02.png', option_03: 'three/A4B3E5_1_Answers_03.png', option_04: 'three/A4B3E5_1_Answers_04.png', option_05: 'three/A4B3E5_1_Answers_05.png', option_06: 'three/A4B3E5_1_Answers_06.png', option_07: 'three/A4B3E5_1_Answers_07.png', option_08: 'three/A4B3E5_1_Answers_08.png', type: 'three-03', correct:3},
{name: 'MAT-36', pattern: 'three/A4C5D3_1.png', option_01: 'three/A4C5D3_1_Answers_01.png', option_02: 'three/A4C5D3_1_Answers_02.png', option_03: 'three/A4C5D3_1_Answers_03.png', option_04: 'three/A4C5D3_1_Answers_04.png', option_05: 'three/A4C5D3_1_Answers_05.png', option_06: 'three/A4C5D3_1_Answers_06.png', option_07: 'three/A4C5D3_1_Answers_07.png', option_08: 'three/A4C5D3_1_Answers_08.png', type: 'three-03', correct:0},
{name: 'MAT-37', pattern: 'three/A3C4E5_1.png', option_01: 'three/A3C4E5_1_Answers_01.png', option_02: 'three/A3C4E5_1_Answers_02.png', option_03: 'three/A3C4E5_1_Answers_03.png', option_04: 'three/A3C4E5_1_Answers_04.png', option_05: 'three/A3C4E5_1_Answers_05.png', option_06: 'three/A3C4E5_1_Answers_06.png', option_07: 'three/A3C4E5_1_Answers_07.png', option_08: 'three/A3C4E5_1_Answers_08.png', type: 'three-03', correct:2},
{name: 'MAT-38', pattern: 'three/A3D5E4_1.png', option_01: 'three/A3D5E4_1_Answers_01.png', option_02: 'three/A3D5E4_1_Answers_02.png', option_03: 'three/A3D5E4_1_Answers_03.png', option_04: 'three/A3D5E4_1_Answers_04.png', option_05: 'three/A3D5E4_1_Answers_05.png', option_06: 'three/A3D5E4_1_Answers_06.png', option_07: 'three/A3D5E4_1_Answers_07.png', option_08: 'three/A3D5E4_1_Answers_08.png', type: 'three-03', correct:3},
{name: 'MAT-39', pattern: 'three/B3C4D5_1.png', option_01: 'three/B3C4D5_1_Answers_01.png', option_02: 'three/B3C4D5_1_Answers_02.png', option_03: 'three/B3C4D5_1_Answers_03.png', option_04: 'three/B3C4D5_1_Answers_04.png', option_05: 'three/B3C4D5_1_Answers_05.png', option_06: 'three/B3C4D5_1_Answers_06.png', option_07: 'three/B3C4D5_1_Answers_07.png', option_08: 'three/B3C4D5_1_Answers_08.png', type: 'three-03', correct:4},
{name: 'MAT-40', pattern: 'three/B3C5E4_1.png', option_01: 'three/B3C5E4_1_Answers_01.png', option_02: 'three/B3C5E4_1_Answers_02.png', option_03: 'three/B3C5E4_1_Answers_03.png', option_04: 'three/B3C5E4_1_Answers_04.png', option_05: 'three/B3C5E4_1_Answers_05.png', option_06: 'three/B3C5E4_1_Answers_06.png', option_07: 'three/B3C5E4_1_Answers_07.png', option_08: 'three/B3C5E4_1_Answers_08.png', type: 'three-03', correct:6},
{name: 'MAT-41', pattern: 'three/B4D3E5_1.png', option_01: 'three/B4D3E5_1_Answers_01.png', option_02: 'three/B4D3E5_1_Answers_02.png', option_03: 'three/B4D3E5_1_Answers_03.png', option_04: 'three/B4D3E5_1_Answers_04.png', option_05: 'three/B4D3E5_1_Answers_05.png', option_06: 'three/B4D3E5_1_Answers_06.png', option_07: 'three/B4D3E5_1_Answers_07.png', option_08: 'three/B4D3E5_1_Answers_08.png', type: 'three-03', correct:7},
{name: 'MAT-42', pattern: 'three/C4D5E3_1.png', option_01: 'three/C4D5E3_1_Answers_01.png', option_02: 'three/C4D5E3_1_Answers_02.png', option_03: 'three/C4D5E3_1_Answers_03.png', option_04: 'three/C4D5E3_1_Answers_04.png', option_05: 'three/C4D5E3_1_Answers_05.png', option_06: 'three/C4D5E3_1_Answers_06.png', option_07: 'three/C4D5E3_1_Answers_07.png', option_08: 'three/C4D5E3_1_Answers_08.png', type: 'three-03', correct:5}
];

//split array based on shortForm
//function to cut the trials in half for short-form version
function odds(array) {
    var oddOnes = [];
    for(var i=0; i<array.length; i++) {
        if(i % 2 == 0) {
			oddOnes.push(array[i]);
		}	
	}	
    return oddOnes;
};

if(shortForm == true) {
	matrixList = odds(matrixList)
};

//preload the image files
var img_preload = [
'two/A1B2.png', 'two/A1B2_Answers.png', 'two/A1B2_Answers_01.png', 'two/A1B2_Answers_02.png', 'two/A1B2_Answers_03.png', 'two/A1B2_Answers_04.png', 'two/A1B2_Answers_05.png', 'two/A1B2_Answers_06.png', 'two/A1B2_Answers_07.png', 'two/A1B2_Answers_08.png', 
'two/A2C3.png', 'two/A2C3_Answers.png', 'two/A2C3_Answers_01.png', 'two/A2C3_Answers_02.png', 'two/A2C3_Answers_03.png', 'two/A2C3_Answers_04.png', 'two/A2C3_Answers_05.png', 'two/A2C3_Answers_06.png', 'two/A2C3_Answers_07.png', 'two/A2C3_Answers_08.png', 
'two/A3D4.png', 'two/A3D4_Answers.png', 'two/A3D4_Answers_01.png', 'two/A3D4_Answers_02.png', 'two/A3D4_Answers_03.png', 'two/A3D4_Answers_04.png', 'two/A3D4_Answers_05.png', 'two/A3D4_Answers_06.png', 'two/A3D4_Answers_07.png', 'two/A3D4_Answers_08.png', 
'two/A4E5.png', 'two/A4E5_Answers.png', 'two/A4E5_Answers_01.png', 'two/A4E5_Answers_02.png', 'two/A4E5_Answers_03.png', 'two/A4E5_Answers_04.png', 'two/A4E5_Answers_05.png', 'two/A4E5_Answers_06.png', 'two/A4E5_Answers_07.png', 'two/A4E5_Answers_08.png', 
'two/B1D2.png', 'two/B1D2_Answers.png', 'two/B1D2_Answers_01.png', 'two/B1D2_Answers_02.png', 'two/B1D2_Answers_03.png', 'two/B1D2_Answers_04.png', 'two/B1D2_Answers_05.png', 'two/B1D2_Answers_06.png', 'two/B1D2_Answers_07.png', 'two/B1D2_Answers_08.png', 
'two/B2E3.png', 'two/B2E3_Answers.png', 'two/B2E3_Answers_01.png', 'two/B2E3_Answers_02.png', 'two/B2E3_Answers_03.png', 'two/B2E3_Answers_04.png', 'two/B2E3_Answers_05.png', 'two/B2E3_Answers_06.png', 'two/B2E3_Answers_07.png', 'two/B2E3_Answers_08.png', 
'two/B5C1.png', 'two/B5C1_Answers.png', 'two/B5C1_Answers_01.png', 'two/B5C1_Answers_02.png', 'two/B5C1_Answers_03.png', 'two/B5C1_Answers_04.png', 'two/B5C1_Answers_05.png', 'two/B5C1_Answers_06.png', 'two/B5C1_Answers_07.png', 'two/B5C1_Answers_08.png', 
'two/C3D4.png', 'two/C3D4_Answers.png', 'two/C3D4_Answers_01.png', 'two/C3D4_Answers_02.png', 'two/C3D4_Answers_03.png', 'two/C3D4_Answers_04.png', 'two/C3D4_Answers_05.png', 'two/C3D4_Answers_06.png', 'two/C3D4_Answers_07.png', 'two/C3D4_Answers_08.png', 
'two/C4E5.png', 'two/C4E5_Answers.png', 'two/C4E5_Answers_01.png', 'two/C4E5_Answers_02.png', 'two/C4E5_Answers_03.png', 'two/C4E5_Answers_04.png', 'two/C4E5_Answers_05.png', 'two/C4E5_Answers_06.png', 'two/C4E5_Answers_07.png', 'two/C4E5_Answers_08.png', 
'two/D5E1.png', 'two/D5E1_Answers.png', 'two/D5E1_Answers_01.png', 'two/D5E1_Answers_02.png', 'two/D5E1_Answers_03.png', 'two/D5E1_Answers_04.png', 'two/D5E1_Answers_05.png', 'two/D5E1_Answers_06.png', 'two/D5E1_Answers_07.png', 'two/D5E1_Answers_08.png', 
'three/A1D3E2.png', 'three/A1D3E2_Answers.png', 'three/A1D3E2_Answers_01.png', 'three/A1D3E2_Answers_02.png', 'three/A1D3E2_Answers_03.png', 'three/A1D3E2_Answers_04.png', 'three/A1D3E2_Answers_05.png', 'three/A1D3E2_Answers_06.png', 'three/A1D3E2_Answers_07.png', 'three/A1D3E2_Answers_08.png', 
'three/A2B3E4.png', 'three/A2B3E4_Answers.png', 'three/A2B3E4_Answers_01.png', 'three/A2B3E4_Answers_02.png', 'three/A2B3E4_Answers_03.png', 'three/A2B3E4_Answers_04.png', 'three/A2B3E4_Answers_05.png', 'three/A2B3E4_Answers_06.png', 'three/A2B3E4_Answers_07.png', 'three/A2B3E4_Answers_08.png', 
'three/A2B4E1.png', 'three/A2B4E1_Answers.png', 'three/A2B4E1_Answers_01.png', 'three/A2B4E1_Answers_02.png', 'three/A2B4E1_Answers_03.png', 'three/A2B4E1_Answers_04.png', 'three/A2B4E1_Answers_05.png', 'three/A2B4E1_Answers_06.png', 'three/A2B4E1_Answers_07.png', 'three/A2B4E1_Answers_08.png', 
'three/A2D4E5.png', 'three/A2D4E5_Answers.png', 'three/A2D4E5_Answers_01.png', 'three/A2D4E5_Answers_02.png', 'three/A2D4E5_Answers_03.png', 'three/A2D4E5_Answers_04.png', 'three/A2D4E5_Answers_05.png', 'three/A2D4E5_Answers_06.png', 'three/A2D4E5_Answers_07.png', 'three/A2D4E5_Answers_08.png', 
'three/A3B1C2_1.png', 'three/A3B1C2_1_Answers.png', 'three/A3B1C2_1_Answers_01.png', 'three/A3B1C2_1_Answers_02.png', 'three/A3B1C2_1_Answers_03.png', 'three/A3B1C2_1_Answers_04.png', 'three/A3B1C2_1_Answers_05.png', 'three/A3B1C2_1_Answers_06.png', 'three/A3B1C2_1_Answers_07.png', 'three/A3B1C2_1_Answers_08.png', 
'three/A3B2C5.png', 'three/A3B2C5_Answers.png', 'three/A3B2C5_Answers_01.png', 'three/A3B2C5_Answers_02.png', 'three/A3B2C5_Answers_03.png', 'three/A3B2C5_Answers_04.png', 'three/A3B2C5_Answers_05.png', 'three/A3B2C5_Answers_06.png', 'three/A3B2C5_Answers_07.png', 'three/A3B2C5_Answers_08.png', 	
'three/A3B4C1.png', 'three/A3B4C1_Answers.png', 'three/A3B4C1_Answers_01.png', 'three/A3B4C1_Answers_02.png', 'three/A3B4C1_Answers_03.png', 'three/A3B4C1_Answers_04.png', 'three/A3B4C1_Answers_05.png', 'three/A3B4C1_Answers_06.png', 'three/A3B4C1_Answers_07.png', 'three/A3B4C1_Answers_08.png', 	
'three/A3B4C5_1.png', 'three/A3B4C5_1_Answers.png', 'three/A3B4C5_1_Answers_01.png', 'three/A3B4C5_1_Answers_02.png', 'three/A3B4C5_1_Answers_03.png', 'three/A3B4C5_1_Answers_04.png', 'three/A3B4C5_1_Answers_05.png', 'three/A3B4C5_1_Answers_06.png', 'three/A3B4C5_1_Answers_07.png', 'three/A3B4C5_1_Answers_08.png', 	
'three/A3B5D4_1.png', 'three/A3B5D4_1_Answers.png', 'three/A3B5D4_1_Answers_01.png', 'three/A3B5D4_1_Answers_02.png', 'three/A3B5D4_1_Answers_03.png', 'three/A3B5D4_1_Answers_04.png', 'three/A3B5D4_1_Answers_05.png', 'three/A3B5D4_1_Answers_06.png', 'three/A3B5D4_1_Answers_07.png', 'three/A3B5D4_1_Answers_08.png', 	
'three/A3C4E5_1.png', 'three/A3C4E5_1_Answers.png', 'three/A3C4E5_1_Answers_01.png', 'three/A3C4E5_1_Answers_02.png', 'three/A3C4E5_1_Answers_03.png', 'three/A3C4E5_1_Answers_04.png', 'three/A3C4E5_1_Answers_05.png', 'three/A3C4E5_1_Answers_06.png', 'three/A3C4E5_1_Answers_07.png', 'three/A3C4E5_1_Answers_08.png', 	
'three/A3D5E4_1.png', 'three/A3D5E4_1_Answers.png', 'three/A3D5E4_1_Answers_01.png', 'three/A3D5E4_1_Answers_02.png', 'three/A3D5E4_1_Answers_03.png', 'three/A3D5E4_1_Answers_04.png', 'three/A3D5E4_1_Answers_05.png', 'three/A3D5E4_1_Answers_06.png', 'three/A3D5E4_1_Answers_07.png', 	'three/A3D5E4_1_Answers_08.png', 	
'three/A4B1D3.png', 'three/A4B1D3_Answers.png', 'three/A4B1D3_Answers_01.png', 'three/A4B1D3_Answers_02.png', 'three/A4B1D3_Answers_03.png', 'three/A4B1D3_Answers_04.png', 'three/A4B1D3_Answers_05.png', 'three/A4B1D3_Answers_06.png', 'three/A4B1D3_Answers_07.png', 'three/A4B1D3_Answers_08.png', 	
'three/A4B2E5.png', 'three/A4B2E5_Answers.png', 'three/A4B2E5_Answers_01.png', 'three/A4B2E5_Answers_02.png', 'three/A4B2E5_Answers_03.png', 'three/A4B2E5_Answers_04.png', 'three/A4B2E5_Answers_05.png', 'three/A4B2E5_Answers_06.png', 'three/A4B2E5_Answers_07.png', 'three/A4B2E5_Answers_08.png', 	
'three/A4B3E5_1.png', 'three/A4B3E5_1_Answers.png', 'three/A4B3E5_1_Answers_01.png', 'three/A4B3E5_1_Answers_02.png', 'three/A4B3E5_1_Answers_03.png', 'three/A4B3E5_1_Answers_04.png', 'three/A4B3E5_1_Answers_05.png', 'three/A4B3E5_1_Answers_06.png', 'three/A4B3E5_1_Answers_07.png', 'three/A4B3E5_1_Answers_08.png', 	
'three/A4C5D3_1.png', 'three/A4C5D3_1_Answers.png', 'three/A4C5D3_1_Answers_01.png', 'three/A4C5D3_1_Answers_02.png', 'three/A4C5D3_1_Answers_03.png', 'three/A4C5D3_1_Answers_04.png', 'three/A4C5D3_1_Answers_05.png', 'three/A4C5D3_1_Answers_06.png', 'three/A4C5D3_1_Answers_07.png', 'three/A4C5D3_1_Answers_08.png', 	
'three/B1C5E2.png', 'three/B1C5E2_Answers.png', 'three/B1C5E2_Answers_01.png', 'three/B1C5E2_Answers_02.png', 'three/B1C5E2_Answers_03.png', 'three/B1C5E2_Answers_04.png', 'three/B1C5E2_Answers_05.png', 'three/B1C5E2_Answers_06.png', 'three/B1C5E2_Answers_07.png', 'three/B1C5E2_Answers_08.png', 	
'three/B2C1E4.png', 'three/B2C1E4_Answers.png', 'three/B2C1E4_Answers_01.png', 'three/B2C1E4_Answers_02.png', 'three/B2C1E4_Answers_03.png', 'three/B2C1E4_Answers_04.png', 'three/B2C1E4_Answers_05.png', 'three/B2C1E4_Answers_06.png', 'three/B2C1E4_Answers_07.png', 'three/B2C1E4_Answers_08.png',
'three/B2C4E3.png', 'three/B2C4E3_Answers.png', 'three/B2C4E3_Answers_01.png', 'three/B2C4E3_Answers_02.png', 'three/B2C4E3_Answers_03.png', 'three/B2C4E3_Answers_04.png', 'three/B2C4E3_Answers_05.png', 'three/B2C4E3_Answers_06.png', 'three/B2C4E3_Answers_07.png', 'three/B2C4E3_Answers_08.png', 	
'three/B3C4D5_1.png', 'three/B3C4D5_1_Answers.png', 'three/B3C4D5_1_Answers_01.png', 'three/B3C4D5_1_Answers_02.png', 'three/B3C4D5_1_Answers_03.png', 'three/B3C4D5_1_Answers_04.png', 'three/B3C4D5_1_Answers_05.png', 'three/B3C4D5_1_Answers_06.png', 'three/B3C4D5_1_Answers_07.png', 'three/B3C4D5_1_Answers_08.png', 	
'three/B3C5E4_1.png', 'three/B3C5E4_1_Answers.png', 'three/B3C5E4_1_Answers_01.png', 'three/B3C5E4_1_Answers_02.png', 'three/B3C5E4_1_Answers_03.png', 'three/B3C5E4_1_Answers_04.png', 'three/B3C5E4_1_Answers_05.png', 'three/B3C5E4_1_Answers_06.png', 'three/B3C5E4_1_Answers_07.png', 'three/B3C5E4_1_Answers_08.png', 	
'three/B4D3E5_1.png', 'three/B4D3E5_1_Answers.png', 'three/B4D3E5_1_Answers_01.png', 'three/B4D3E5_1_Answers_02.png', 'three/B4D3E5_1_Answers_03.png', 'three/B4D3E5_1_Answers_04.png', 'three/B4D3E5_1_Answers_05.png', 'three/B4D3E5_1_Answers_06.png', 'three/B4D3E5_1_Answers_07.png', 'three/B4D3E5_1_Answers_08.png', 	
'three/B5C2D4.png', 'three/B5C2D4_Answers.png', 'three/B5C2D4_Answers_01.png', 'three/B5C2D4_Answers_02.png', 'three/B5C2D4_Answers_03.png', 'three/B5C2D4_Answers_04.png', 'three/B5C2D4_Answers_05.png', 'three/B5C2D4_Answers_06.png', 'three/B5C2D4_Answers_07.png', 'three/B5C2D4_Answers_08.png', 	
'three/B5C3D1.png', 'three/B5C3D1_Answers.png', 'three/B5C3D1_Answers_01.png', 'three/B5C3D1_Answers_02.png', 'three/B5C3D1_Answers_03.png', 'three/B5C3D1_Answers_04.png', 'three/B5C3D1_Answers_05.png', 'three/B5C3D1_Answers_06.png', 'three/B5C3D1_Answers_07.png', 'three/B5C3D1_Answers_08.png', 
'three/C3D5E1.png', 'three/C3D5E1_Answers.png', 'three/C3D5E1_Answers_01.png', 'three/C3D5E1_Answers_02.png', 'three/C3D5E1_Answers_03.png', 'three/C3D5E1_Answers_04.png', 'three/C3D5E1_Answers_05.png', 'three/C3D5E1_Answers_06.png', 'three/C3D5E1_Answers_07.png', 'three/C3D5E1_Answers_08.png', 
'three/C4D5E3_1.png', 'three/C4D5E3_1_Answers.png', 'three/C4D5E3_1_Answers_01.png', 'three/C4D5E3_1_Answers_02.png', 'three/C4D5E3_1_Answers_03.png', 'three/C4D5E3_1_Answers_04.png', 'three/C4D5E3_1_Answers_05.png', 'three/C4D5E3_1_Answers_06.png', 'three/C4D5E3_1_Answers_07.png', 'three/C4D5E3_1_Answers_08.png', 	
'one/B1_1.png', 'one/B1_1_Answers.png', 'one/B1_1_Answers_01.png', 'one/B1_1_Answers_02.png', 'one/B1_1_Answers_03.png', 'one/B1_1_Answers_04.png', 'one/B1_1_Answers_05.png', 'one/B1_1_Answers_06.png', 'one/B1_1_Answers_07.png', 'one/B1_1_Answers_08.png', 	
'one/C2_1.png', 'one/C2_1_Answers.png', 'one/C2_1_Answers_01.png', 'one/C2_1_Answers_02.png', 'one/C2_1_Answers_03.png', 'one/C2_1_Answers_04.png', 'one/C2_1_Answers_05.png', 'one/C2_1_Answers_06.png', 'one/C2_1_Answers_07.png', 'one/C2_1_Answers_08.png', 	
'one/D3_1.png', 'one/D3_1_Answers.png', 'one/D3_1_Answers_01.png', 'one/D3_1_Answers_02.png', 'one/D3_1_Answers_03.png', 'one/D3_1_Answers_04.png', 'one/D3_1_Answers_05.png', 'one/D3_1_Answers_06.png', 'one/D3_1_Answers_07.png', 'one/D3_1_Answers_08.png', 	
'one/E4_1.png', 'one/E4_1_Answers.png', 'one/E4_1_Answers_01.png', 'one/E4_1_Answers_02.png', 'one/E4_1_Answers_03.png', 'one/E4_1_Answers_04.png', 'one/E4_1_Answers_05.png', 'one/E4_1_Answers_06.png', 'one/E4_1_Answers_07.png', 'one/E4_1_Answers_08.png', 	
'logic/X_1.png', 'logic/X_1_Answers.png', 'logic/X_1_Answers_01.png', 'logic/X_1_Answers_02.png', 'logic/X_1_Answers_03.png', 'logic/X_1_Answers_04.png', 'logic/X_1_Answers_05.png', 'logic/X_1_Answers_06.png', 'logic/X_1_Answers_07.png', 'logic/X_1_Answers_08.png', 
'logic/Y_1.png', 'logic/Y_1_Answers.png', 'logic/Y_1_Answers_01.png', 'logic/Y_1_Answers_02.png', 'logic/Y_1_Answers_03.png', 'logic/Y_1_Answers_04.png', 'logic/Y_1_Answers_05.png', 'logic/Y_1_Answers_06.png', 'logic/Y_1_Answers_07.png', 'logic/Y_1_Answers_08.png', 	
'logic/Z_1.png', 'logic/Z_1_Answers.png', 'logic/Z_1_Answers_01.png', 'logic/Z_1_Answers_02.png', 'logic/Z_1_Answers_03.png', 'logic/Z_1_Answers_04.png', 'logic/Z_1_Answers_05.png', 'logic/Z_1_Answers_06.png', 'logic/Z_1_Answers_07.png', 'logic/Z_1_Answers_08.png' 
];


/************************/
/** BASIC INSTRUCTIONS **/
/************************/

var matrix_instructions = {
	type: 'html-button-response',
	stimulus: '<p><b>Matrix Reasoning Task</b></p><p>This is a pattern completion task. You will be presented with patterns, one pattern at a time.'+
			  '<p>The lower-right piece of the pattern will be missing. Your job is to select the best option that completes the pattern.</p><p>You will have '+specDuration+' minutes to complete as many patterns as you can.</p>',
	choices: ['BEGIN']		  
}


/**************************/
/** MAIN RESPONSE SCREEN **/
/**************************/

var matrix_response = {
	type: 'ravens-matrix',
	stimulus: jsPsych.timelineVariable('pattern'),
	data: {item: jsPsych.timelineVariable('name'), correct_ans: jsPsych.timelineVariable('correct')},
	post_trial_gap: 250,
	choices: [
	jsPsych.timelineVariable('option_01'), 
	jsPsych.timelineVariable('option_02'),
	jsPsych.timelineVariable('option_03'),
	jsPsych.timelineVariable('option_04'),
	jsPsych.timelineVariable('option_05'),
	jsPsych.timelineVariable('option_06'),
	jsPsych.timelineVariable('option_07'),
	jsPsych.timelineVariable('option_08')
	],
	on_finish:function(data){
		//score the response
		if(data.button_pressed == data.correct_ans){
			var gotitright = 1;
			totalScore += 1;
			console.log("correct");
		} else {
			var gotitright = 0;
			console.log("NOPE");
		}
		
		 jsPsych.data.addDataToLastTrial({
			  designation: "MATRIX-RESP",
			  correct: gotitright	
            });	
		
		totalSeen += 1;	//add to the total number of seen items
	}
};


var matrix_proc = {
	timeline: [matrix_response],
	timeline_variables: matrixList,
	//function to terminate this timeline after a specific duration
	on_start: function(){
		setTimeout(function(){
		jsPsych.endCurrentTimeline();
		}, (specDuration*60000));
	}
};



/*************/
/** WRAP-UP **/ 
/*************/

//final feedback screen
var matrix_goodbye = {
    type: "html-button-response",
    stimulus: "<p>This concludes the pattern completion task.</p><p>Thank you for your responses!</p>",
    choices: ['Exit']
    };


/******************/
/** MAIN OUTPUTS **/ 
/******************/

//This is the ultimate variable that you will push to the timeline in the main section
var matrices = {
	timeline: [matrix_instructions, matrix_proc, matrix_goodbye]
}	

//This function will allow you to assign the to-be-preloaded images to a variable name of your choice
function return_matrices_folder(){
	return img_preload;
}

