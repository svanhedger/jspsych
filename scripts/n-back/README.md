# Auditory N-Back

## Task Description
The n -back task is a continuous performance task that is commonly used
as an assessment in psychology and cognitive neuroscience to measure
a part of working memory and working memory capacity. The n -back was 
introduced by Wayne Kirchner (1958). Participants must monitor a continuous 
stream of stimuli (here, auditory stimuli) and respond based on whether 
the current stimulus matches the one presented 'n' stimuli previously.


## Notes about Script
The script is easily customizable. It is simple to change the presentation
rate of the stimuli, the level of n, the relative number of targets and 
non-targets, and the actual sounds themselves. At present, you can 
select from spoken letters, cat vocalizations, novel musical chords 
(using the Bohlen-Pierce scale), and musical tones. Just change the
'soundType' variable.

## Using the Script
The script outputs two important variables. The first is 
'nback' which should be added to the experiment timeline
in the main html file -- e.g., timeline.push(nback);

The second is 'return_nback_folder' which should be pushed or
concatenated with other audio files for preloading purposes.
This is a function, so users can specify a different folder
name in the main html file

-- e.g., var foldername = return_nback_folder();


##### Stephen Van Hedger, April 2020
