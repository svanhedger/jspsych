# Backward Digit Span

## Task Description
This module consists of an adaptive backward digit span (BDS)
task, commonly used as a measure of working memory.

On each trial, participant hear or see a string of digits. 
Then, participants have to click on buttons to report these 
digits in reverse order..

## Notes about Script
The script is easily customizable (e.g., audio or visual 
digit presentation, starting span, number of trials, etc.)
The task is adaptive based on a 1:2 staircase procedure -
that is, a correct answer will increase the span by one, 
whereas two incorrect answers in a row will decrease the
span by one.

## Using the Script
The script outputs two important variables. The first is 
'bds_adaptive' which should be added to the experiment timeline
in the main html file -- e.g., timeline.push(bds_adaptive);

The second is 'return_bds_adaptive_folder' which should be pushed or
concatenated with other audio files for preloading purposes.
This is a function, so users can specify a different folder
name in the main html file

-- e.g., var foldername = return_bds_adaptive_folder();

The folder is not applicable if you are planning
on running a visual version of the task as no additional
files are needed.

##### Stephen Van Hedger, April 2020
