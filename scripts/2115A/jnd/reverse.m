currentdir = pwd();

list = dir(fullfile(currentdir, '*.wav'));

for i=1:length(list)
    file = list(i).name;
    [y, Fs] = audioread(file);
    y2 = flip(y); % reverses the sound
    audiowrite(file, y2, Fs);
end
   