import math
from random import randint, choice
import time
import pygame as pg
from win32api import GetSystemMetrics


"""
Define the object class attributes
"""
obj_radius: int = 35  # size of balls in pixels
num_distractor = 6  # number of distractor objects
num_targ = 2  # number of target objects
num_total = num_distractor + num_targ

"""
Define the times and durations in SECONDS
"""
fix_draw_time = Tfix = 1.5 # time to present fixation cross and objects

flash_time = Tfl = fix_draw_time + 1  # time for targets to flash

animation_time = Tani = flash_time + 30  # time for objects to move around in seconds

answer_time = Tans = animation_time + 60  # time limit to make answer

feedback_time = 1
"""
Define the project display window
"""
title = "Multiple Object Tracking Experiment"
win_width = GetSystemMetrics(0)  # width of the user screen
win_height = GetSystemMetrics(1) 
win_dimension = (win_width, win_height)

"""win_width, win_height = 1920, 1080  # pixels; width of screen
win_dimension = (win_width, win_height)"""

"""
Define instruction texts
"""
start_text = "You will first see a cross at the center of the screen. Please focus your gaze to that cross.\n\n" \
             "There will be {dist:d} circles appearing on the screen, {targ:d} of them will flash in GREEN.\n" \
             "The cross will disappear, and all circles will start to move. Keep track of those {targ:d} " \
             "flashed circles.\n\nWhen the circles stop moving, select which circles you've been tracking by clicking " \
             "them.\nWhen you have made your selection, press the SPACEBAR to submit your selection.\n\n" \
             "Press F to start when you are ready.\n\nIf you need to stop, let the experimenter know."\
    .format(dist=num_distractor, targ=num_targ)

fix_text = "First, you will see this cross. Please focus your gaze here. \nPress F to continue."

present_text = "Then, {total:d} circles will appear randomly around the screen. {targ:d} random " \
               "circles will flash briefly. Remember which circles flashed. The cross will disappear, and all circles " \
               "will start moving when the flashing stops.\n\nPress F to continue."\
    .format(total=num_total, targ=num_targ)

submit_ans_txt = "When the circles stop moving, select the circles that you've been tracking.\n" \
                 "You will have {:d} seconds to make your choice.\n\n" \
                 "Press SPACEBAR to submit your answer.".format(int(answer_time-animation_time))

prac_finished_txt = "The practice is now over.\n\nPress the F when you are ready to continue to the real " \
                    "experiment.\nRemember to keep track of the {:d} targets and submit your result by " \
                    "pressing the SPACEBAR.\n\nBe as quick and accurate as you can!\n\n" \
                    "Press F to continue.".format(num_targ)

experim_fin_txt = "The experiment is now over; let the experimenter know.\n\nThank you for participating!" \
                  "\n\nPress F to exit."

guide_fin_txt = "The guide is now complete, and will move to practice rounds, where you will go through the " \
                "experiment in normal order, but your answers will not be recorded.\n\nAfter the practice is finished, " \
                "you will move to the real experiments where your responses will be recorded.\n\n" \
                "Press F to move to the practice rounds."

guide_submit_txt = "You've selected {:d} targets correctly."

guide_timeup_txt = "Time is up! Once the time is up, the experiment will automatically move on."

# == Font size ==
large_font = 72
med_font = 42
small_font = 12

"""
Define some colours
"""
# == Greyscale ==
BLACK = [0, 0, 0]
WHITE = [255, 255, 255]
GREY = [128, 128, 128]
SLATEGREY = [112, 128, 144]
DARKSLATEGREY = [47, 79, 79]

# == Yellows ==
YELLOW = [255, 255, 0]
OLIVE = [128,128,0]
DARKKHAKI = [189,183,107]

# == Greens ==
GREEN = [0, 128, 0]
GREENYELLOW = [173, 255, 47]

RED = [220, 20, 60]

"""
Generate random x and y coordinates within the window boundary
"""
boundary_location = ['up', 'down', 'left', 'right']
boundary_coord = [obj_radius, (win_height - obj_radius + 1), obj_radius, (win_width - obj_radius + 1)]
boundary = dict(zip(boundary_location, boundary_coord))

listX, listY = [], []
rangeX, rangeY = range(boundary['left'], boundary['right']), range(boundary['up'], boundary['down'])

min_spd, max_spd = -2, 2

"""
Define session information for recording purposes
"""
session_info = {'Observer': 'Type observer initials', 'Participant': 'Type participant ID'}
date_string = time.strftime("%b_%d_%H%M", time.localtime())  # add the current time


def brownian_motion(C1, C2):
    """ ===== FUNCTION TO CALCULATE BROWNIAN MOTION ===== """
    c1_spd = math.sqrt((C1.dx ** 2) + (C1.dy ** 2))
    
    diff_x = -(C1.x - C2.x)
    diff_y = -(C1.y - C2.y)
    vel_x = 0
    vel_y = 0
    if diff_x > 0:
        if diff_y > 0:
            angle = math.degrees(math.atan(diff_y / diff_x))
            vel_x = -c1_spd * math.cos(math.radians(angle))
            vel_y = -c1_spd * math.sin(math.radians(angle))
        elif diff_y < 0:
            angle = math.degrees(math.atan(diff_y / diff_x))
            vel_x = -c1_spd * math.cos(math.radians(angle))
            vel_y = -c1_spd * math.sin(math.radians(angle))
    elif diff_x < 0:
        if diff_y > 0:
            angle = 180 + math.degrees(math.atan(diff_y / diff_x))
            vel_x = -c1_spd * math.cos(math.radians(angle))
            vel_y = -c1_spd * math.sin(math.radians(angle))
        elif diff_y < 0:
            angle = -180 + math.degrees(math.atan(diff_y / diff_x))
            vel_x = -c1_spd * math.cos(math.radians(angle))
            vel_y = -c1_spd * math.sin(math.radians(angle))
    elif diff_x == 0:
        if diff_y > 0:
            angle = -90
        else:
            angle = 90
        vel_x = c1_spd * math.cos(math.radians(angle))
        vel_y = c1_spd * math.sin(math.radians(angle))
    elif diff_y == 0:
        if diff_x < 0:
            angle = 0
        else:
            angle = 180
        vel_x = c1_spd * math.cos(math.radians(angle))
        vel_y = c1_spd * math.sin(math.radians(angle))
    C1.dx = vel_x
    C1.dy = vel_y
 
