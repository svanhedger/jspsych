# Reading Span

## Task Description
This is a jsPsych implementation of the popular 
automated reading span task, which is one of 
several 'complex span' assessments of working 
memory. Participants read sentences and determine
whether or not they make sense. This sentence
task is interleaved with a letter memory task,
in which a single letter is presented on the 
screen. Participants go through this interleaved
sentence/letter process anywhere from 3-7 times
on a trial.

Then, participants must recall the letter string
IN ORDER to the best of their ability. Participants
are also encouraged to keep their sentence accuracy
above 85%, keeping in line with prior research.

References:
Daneman, M., & Carpenter, P.A. (1980). Individual differences in WM and reading. Journal of Verbal Learning and Verbal Behavior, 19, 450–466.
Conway, A. R. A., Kane, M. J., Bunting, M. F., Hambrick, D. Z., Wilhelm, O., & Engle, R. W. (2005). Working memory span tasks: A methodological review and user's guide. Psychonomic Bulletin and Review, 12, 769 - 786.


## Notes about Script
The script is easily customizable. For example, it is 
easy to use participants' mean response times in the 
sentence reading practice to calibrate a time-out window
in the main assessment. Please see the comments in the 
rspan.js file for additional customizations.

## Using the Script
The script outputs 'rspan_final' which should be added to the experiment timeline
in the main html file -- e.g., timeline.push(rspan_final);


##### Stephen Van Hedger, May 2020
