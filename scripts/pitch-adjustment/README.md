# Pitch Adjustment

## Task Description
The pitch adjustment task has been used by our research group to assess
auditory category knowledge and working memory precision. On each trial,
participants hear a brief target tone, which is immediately masked by noise.
Participant are then given a starting tone - higher or lower than the initial
target tone. Participants must adjust this starting tone, using arrows provided
on the screen, to try and recreate the initial targert tone to the best
of their ability.

Citation: Heald, Van Hedger, & Nusbaum (2014). Auditory category knowledge in experts and novices. Frontiers in Neuroscience, https://doi.org/10.3389/fnins.2014.00260

## Notes about Script
The script is easily customizable. The script is written such that any 
continuum of sounds can be used. Changing parameters such as the number
of trials is also easy. At present, users can opt for a quick assessment
(32 trials, rather than 64 trials) with a single variable toggle (quickAssessment)

## Using the Script
The script outputs two important variables. The first is 
'pitchadjust' which should be added to the experiment timeline
in the main html file -- e.g., timeline.push(pithadjust);

The second is 'return_pitchadjust_folder' which should be pushed or
concatenated with other audio files for preloading purposes.
This is a function, so users can specify a different folder
name in the main html file

-- e.g., var foldername = return_pitchadjust_folder();


##### Stephen Van Hedger, April 2020
