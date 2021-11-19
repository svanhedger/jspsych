function dbnorm(dBFS, dnameinput, dnameoutput)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Batch normalize audio files based on dBFS value
%
% This function has three arguments.
%
% dbnorm(dBFS, dnameinput, dnameoutput)
%
% 1. dBFS = normalization value, represented in terms of dB full spectrum.
%
% Acceptable Non-Numeric Arguments:
% To norm to the average level from your files, type in 'mean'
% To norm to the lowest/softest sound from your files, type in 'min'
% To norm to the highest/loudest sound from your files, type in 'max'
%
% 2. dnameinput = input directory. If not provided in the function, a GUI
% will pop up asking you to select the location of the to-be-normalized
% files
% 
% 3. dnameoutput = output directory. If not provided in the function, a GUI
% will pop up asking you to select the location where the normalized files
% should be saved 
% 
%
% Stephen Van Hedger (Helpful: John Veillette; Hurtful: Shannon Heald)
% November, 2018
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

initialdir = pwd();

%% prompt user for essential arguments if none are provided
P{1,1} = "Enter the desired dBFS value (e.g., -20).";
P{2,1} = "If you would like to normalize to the mean value of all files in the folder, type 'mean'";
P{3,1} = "If you would like to normalize to the minimum value of all files in the folder, type 'min'";
P{4,1} = "If you would like to normalize to the maximum value of all files in the folder, type 'max'";
P{5,1} = "dBFS = ";

if ~exist('dBFS', 'var') || isempty(dBFS)
    prompt = sprintf('%s\n\n%s\n%s\n%s\n\n\n%s',P{1,1},P{2,1},P{3,1},P{4,1},P{5,1});
    dBFS = input(prompt);
end

if ~exist('dnameinput', 'var') || isempty(dnameinput)
    dnameinput = uigetdir(path, 'SELECT A DIRECTORY FOR INPUT FILES'); % select input directory
end

if ~exist('dnameoutput', 'var') || isempty(dnameoutput)
    dnameoutput = uigetdir(path, 'SELECT A DIRECTORY FOR OUTPUT FILES'); % select output directory
end

%% change current working directory to input, read in all wav files
cd(dnameinput); % change current directory to input folder
list = dir(fullfile(dnameinput, '*.wav'));

%% pre-allocate for efficiency
fileRMS = zeros(1, length(list));

%% calculate the mean/min/max for use in normalization
% mean RMS as normalizaton reference
if strcmp(dBFS, 'mean') == 1
  for i = 1:length(list)
    file = list(i).name;
    [y ,~] = audioread(file);
    fileRMS(i) = sqrt(mean(y.^2));
  end
    targetRMS = mean(fileRMS); %this is the mean RMS 
    dBFS = 20*log10(abs(targetRMS)); %this is the mean dBFS
end

% max RMS as normalizaton reference
if strcmp(dBFS, 'max') == 1
  for i = 1:length(list)
    file = list(i).name;
    [y ,~] = audioread(file);
    fileRMS(i) = sqrt(mean(y.^2));
  end
    targetRMS = max(fileRMS); %this is the max RMS
    dBFS = 20*log10(abs(targetRMS)); %this is the max dBFS 
end


% min RMS as normalizaton reference
if strcmp(dBFS, 'min') == 1
  for i = 1:length(list)
    file = list(i).name;
    [y ,~] = audioread(file);
    fileRMS(i) = sqrt(mean(y.^2));
  end
    targetRMS = min(fileRMS); %this is the max RMS
    dBFS = 20*log10(abs(targetRMS)); %this is the max dBFS 
end

%% main normalization loop
%rescale each individual sound file in input folder to desired value
 for i = 1:length(list)
     
    %read current target
    file = list(i).name;
    [y, Fs] = audioread(file);
   
    %compute RMS
    fileRMS = mean(sqrt(mean(y.^2)));
    
    %represent target dBFS in RMS (Johm and algebra FTW)
    RMS = 10^((1/20)*dBFS);

    %scale the wave to match the desired dBFS
    rmsratio = RMS / fileRMS;
    waveform = y * rmsratio;

    %save normalized wave in output directory
    cd(dnameoutput)
    [~, ~, Ext] = fileparts(file);
    %baseFileName = baseFileName(1:5);
    %ix=strfind(baseFileName,'_');  % get the underscore locations
    %t=baseFileName(1:ix(2)-1);  % return the substring up to 2nd underscore
    %audiowrite(strcat(t, '_', num2str(round(dBFS, 2)), Ext), waveform, Fs);
    %numFilename = [sprintf('%02d', i), Ext]; 
    audiowrite(file, waveform, Fs);
    cd(dnameinput)
 end
 
cd(initialdir);

end