# Matrix Reasoning

## Task Description
This is a 42-item matrix reasoning task, 
similar to the Raven's Progressive Matrices.
It is not timed, but typical administration
time is between 45 and 60 minutes. It is meant
to assess fluid intelligence.

Reference:
Matzen, L.E., Benz, Z.O., Dixon, K.R. et al. Recreating Raven’s: Software for systematically generating large numbers of Raven-like matrix problems with normed properties. Behavior Research Methods 42, 525–541 (2010). https://doi.org/10.3758/BRM.42.2.525

Note: This is "List 1" from the experimental lists described in Matzen et al. (2010)

## Notes about Script
The script can be set to exit after a certain amount of time has passed. 
(var specDuration). You can also create a short-form version of
the task by changing the shortForm variable to 'true' -- 
NOTE: the short form version has not been psychometrically assessed.

## Using the Script
The script outputs  two important variables.

1. matrices --> this is what should be 
pushed to the timeline in the main index
file (e.g., timeline.push(matrices);)

2. return_matrices_folder() --> this function
allows you to assign a variable to the 
images used in the task (for preloading).

For example:
var matrix_img = return_matrices_folder();

##### Stephen Van Hedger, June 2020
