# import pygame as pg
import sys
# from MOT_constants import *
from messagescreens import  *
from psychopy.gui import DlgFromDict
from random import randint, choice

# == Trial variables ==
n_real = 50
n_prac = 2


# == Processing power or frames per second ==
FPS = 144


class MOTobj:
    def __init__(self, default_color=WHITE):
        # -- Radius of the circle objects
        self.radius = obj_radius

        # -- Object positions attributes
        self.x, self.y = choice([n for n in range(int(boundary["left"]), int(boundary["right"]))
                                 if n not in range(x - self.radius, x + self.radius)]), \
                         choice([n for n in range(int(boundary["up"]), int(boundary["down"]))
                                 if n not in range(y - self.radius, y + self.radius)])
        # -- Velocity set so that it's random within a range but NOT ZERO
        self.dx, self.dy = choice([dx for dx in range(min_spd, max_spd) if dx not in [0]]), \
                           choice([dy for dy in range(min_spd, max_spd) if dy not in [0]])

        # -- Set the circle object neutral state color
        self.color = default_color
        self.default_color = default_color

        # -- Timer attributes
        self.timer = 0
        self.flash = True

        # -- State attributes for mouse selection control
        self.state = ""
        self.isClicked = False
        self.isSelected = False

    def change_color(self, color):
        self.color = color

    def in_circle(self, mouse_x, mouse_y):
        # -- Return boolean value depending on mouse position, if it is in circle or not
        if math.sqrt(((mouse_x - self.x) ** 2) + ((mouse_y - self.y) ** 2)) < self.radius:
            return True
        else:
            return False

    def state_control(self, state):
        # -- Neutral or default state with no form of mouse selection
        if state == "neutral":
            self.color = self.default_color
            self.state = "neutral"
            self.isClicked = self.isSelected = False
        # -- Hovered state if mouse is hovering over circle object
        if state == "hovered":
            self.color = hover_col
            self.state = "hovered"
            self.isClicked = self.isSelected = False
        # -- Clicked state if mouse click DOWN while in object
        if state == "clicked":
            self.color = click_col
            self.state = "clicked"
            self.isClicked = True
            self.isSelected = False
        # -- Selected state if mouse click UP on a "clicked" object
        if state == "selected":
            self.color = select_col
            self.state = "selected"
            self.isClicked = False
            self.isSelected = True

    def detect_collision(self, mlist):
        # -- Object positions in x and y coordinates change in velocity value
        self.x += self.dx
        self.y += self.dy
        # -- If the object reaches the window boundary, bounce back
        if self.x < self.radius or self.x > win_width-self.radius:
            self.dx *= -1
        if self.y < self.radius or self.y > win_height-self.radius:
            self.dy *= -1
        # -- If the object bounces off each other, run the Brownian motion physics
        # objects need to be from the same list, otherwise the objects
        # can pass through each other if they're from a different list
        for a in mlist:
            for b in mlist:
                if a != b:
                    if math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2)) <= (a.radius + b.radius):
                        brownian_motion(a, b)

    def draw_circle(self, display=win):
        # -- Function to draw circle onto display
        pg.draw.circle(display, self.color, (int(self.x), int(self.y)), self.radius)

    def flash_color(self):
        # -- Function to flash color
        if self.timer == FPS:
            self.timer = 0
            self.flash = not self.flash

        self.timer += 3

        if self.flash:
            self.color = self.default_color
        else:
            self.color = GREEN

    def shuffle_position(self):
        """Shuffle the position of circles"""
        self.x = choice([n for n in range(int(boundary["left"]), int(boundary["right"]))
                         if n not in range(x - self.radius, x + self.radius)])
        self.y = choice([n for n in range(int(boundary["up"]), int(boundary["down"]))
                         if n not in range(y - self.radius, y + self.radius)])


def generate_list(color):
    """function to generate new list of objects"""
    distractor_list = []
    for nd in range(num_distractor):
        d = MOTobj()
        distractor_list.append(d)

    target_list = []
    for nt in range(num_targ):
        t = MOTobj(color)
        target_list.append(t)

    return distractor_list, target_list


def delay(t):
    """function to stop all processes for a time"""
    pg.time.delay((t*1000))  # multiply by a thousand because the delay function takes milliseconds


def record_response(response_time, response_score, time_out_state, log):
    # record the responses
    header_list = [response_time, response_score, time_out_state]
    # convert to string
    header_str = map(str, header_list)
    # convert to a single line, separated by commas
    header_line = ','.join(header_str)
    header_line += '\n'
    log.write(header_line)


def guide_user(master_list, distractor_list, target_list):

    timeup = False
    submitted = False
    need_to_select_4 = False
    guiding = True
    animating = True
    Tsub = 0

    STL = []
    # -- Welcome message --
    guide_screen("start", master_list, STL)
    wait_key()

    # -- Fixation cross screen
    guide_screen("focus", master_list, STL)
    wait_key()

    # -- Present cross and circles screen
    guide_screen("present", master_list, STL)
    wait_key()

    t0 = pg.time.get_ticks()

    while True:
        pg.time.Clock().tick_busy_loop(FPS)  # =Set FPS

        win.fill(background_col)  # =fill background with background color
        mx, my = pg.mouse.get_pos()  # =get x and y coord of mouse cursor on window

        selected_list = STL = []  # - list for all selected objects
        selected_targ = []  # - list for all SELECTED TARGETS

        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.KEYDOWN:
                if event.key == pg.K_ESCAPE:
                    pg.quit()
                    sys.exit()
                if event.key == pg.K_SPACE:
                    if animating:
                        for target in target_list:
                            if target.isSelected and not target.isClicked:
                                selected_targ.append(target)
                                selected_list.append(target)
                        for distractor in distractor_list:
                            if distractor.isSelected and not distractor.isClicked:
                                selected_list.append(distractor)
                        if len(selected_list) == num_targ:
                            submitted = True
                        else:
                            need_to_select_4 = True

            for obj in master_list:
                if obj.in_circle(mx, my):
                    if event.type == pg.MOUSEMOTION:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("hovered")
                    if event.type == pg.MOUSEBUTTONDOWN:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("clicked")

                        if not obj.isClicked and obj.isSelected:
                            obj.state_control("neutral")
                    if event.type == pg.MOUSEBUTTONUP:
                        if obj.isClicked and not obj.isSelected:
                            obj.state_control("selected")

                elif not obj.in_circle(mx, my):
                    if event.type == pg.MOUSEMOTION:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("neutral")
                    if event.type == pg.MOUSEBUTTONUP:
                        if obj.isClicked and not obj.isSelected:
                            obj.state_control("neutral")

        t1 = pg.time.get_ticks()
        dt = (t1 - t0)/1000

        if animating:
            if dt < Tfl - Tfix:
                flash_targets(distractor_list, target_list)
            elif Tfl - Tfix <= dt < Tani - Tfl:
                for t in target_list:
                    t.state_control("neutral")  # this resets target color to match distractor's
                animate(distractor_list, target_list, master_list)
            elif Tani - Tfl <= dt < Tans - Tani:
                if need_to_select_4:
                    message_screen("not_selected_4")
                guide_screen("answer", master_list, selected_targ)
            elif Tans - Tani < dt:
                # guide_screen("timeup", master_list, selected_targ)
                timeup = True
        if timeup:
            guide_screen("timeup", master_list, STL)
            delay(feedback_time)
            guiding = False
        if submitted:
            guide_screen("submitted", master_list, STL)
            for obj in master_list:
                obj.shuffle_position()
                obj.state_control("neutral")
            delay(feedback_time)
            guiding = False
        if not guiding:
            guide_screen("finished", master_list, STL)
            wait_key()
            need_to_select_4 = False
            break


def practice_trials(master_list, distractor_list, target_list, CPT):
    """function for practice trials; goes through all the protocols but does not record subject responses"""
    completed_practice_trial_count = CPT

    # == Variables for controlling protocols ==
    reset = False
    submitted = False
    need_to_select_4 = False
    timeup = False

    # == Timer
    t0 = pg.time.get_ticks()

    # == Main loop
    while True:
        pg.time.Clock().tick_busy_loop(FPS)  # =Set FPS

        win.fill(background_col)  # =fill background with background color
        mx, my = pg.mouse.get_pos()  # =get x and y coord of mouse cursor on window

        selected_list = []  # - list for all selected objects
        selected_targ = []  # - list for all SELECTED TARGETS

        # -- Quit controller
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.KEYDOWN:
                if event.key == pg.K_ESCAPE:
                    pg.quit()
                    sys.exit()

                # -- Answer submission controller
                if event.key == pg.K_SPACE:
                    if not reset:  # -- If the loop is not in the reset state
                        # -- Add selected distractors and targets separately to compare answers
                        for target in target_list:
                            if target.isSelected and not target.isClicked:
                                selected_targ.append(target)  # separate list for selected targets
                                selected_list.append(target)  # common list for both targ and dist
                        for distractor in distractor_list:
                            if distractor.isSelected and not distractor.isClicked:
                                selected_list.append(distractor)

                        if len(selected_list) == num_targ:  # if user selects the same number as there are targets
                            submitted = True  # allow for answer submission
                        else:  # if user selects more or less than there are targets,
                            need_to_select_4 = True  # remind them to select the same number as there are targets

            for obj in master_list:
                if obj.in_circle(mx, my):  # -- If the mouse is within the circle
                    if event.type == pg.MOUSEMOTION:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("hovered")
                            # print("Clicked state: ", obj.isClicked, "Selected state: ", obj.isSelected)
                    if event.type == pg.MOUSEBUTTONDOWN:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("clicked")
                        if not obj.isClicked and obj.isSelected:
                            obj.state_control("neutral")
                    if event.type == pg.MOUSEBUTTONUP:
                        if obj.isClicked and not obj.isSelected:
                            obj.state_control("selected")

                elif not obj.in_circle(mx, my):
                    if event.type == pg.MOUSEMOTION:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("neutral")
                    if event.type == pg.MOUSEBUTTONUP:
                        if obj.isClicked and not obj.isSelected:
                            obj.state_control("neutral")

        # == Timer to calculate elapsed time ==
        t1 = pg.time.get_ticks()
        dt = (t1 - t0)/1000

        if completed_practice_trial_count < n_prac:  # if the completed trial count is less than total trial count
            if not reset:  # normal state; return to this state if reset is passed, or is supposed to run
                if dt <= Tfix:  # fixation time
                    fixation_screen(master_list)
                elif Tfix < dt <= Tfl:  # flash targets
                    flash_targets(distractor_list, target_list)
                elif Tfl < dt <= Tani:  # animate/move the circles around the screen
                    for targ in target_list:
                        targ.state_control("neutral")
                    animate(distractor_list, target_list, master_list)
                elif Tani < dt <= Tans:  # stop moving the circles
                    if need_to_select_4:
                        message_screen("not_selected_4")
                    static_draw(master_list)
                    pg.display.flip()
                elif Tans < dt:  # timed out
                    timeup = True

            if submitted:  # if user successfully submits answer
                win.fill(background_col)
                msg_to_screen_centered("{:d} out of {:d} correct".format(len(selected_targ), len(selected_list)), BLACK, large_font)
                pg.display.flip()
                delay(feedback_time)
                reset = True

            if timeup:  # if timed out, run this protocol
                message_screen("timeup")
                delay(feedback_time)
                reset = True

            if reset:  # reset state to reset the whole trial
                for obj in master_list:
                    obj.shuffle_position()
                    obj.state_control("neutral")
                completed_practice_trial_count += 1
                submitted = timeup = need_to_select_4 = reset = False
                t0 = t1
        else:  # if the user completes all the intended trial number
            win.fill(background_col)
            message_screen("prac_finished")
            pg.display.flip()
            wait_key()
            break


def real_trials(master_list, distractor_list, target_list, CRT, recorder):
    """function for real trials to record answer score, time and timed out state; same as practice trial except
    the user responses are recorded"""

    completed_practice_trial_count = CRT

    reset = False
    submitted = False
    need_to_select_4 = False
    timeup = False

    t0 = pg.time.get_ticks()
    while True:
        pg.time.Clock().tick_busy_loop(FPS)  # =Set FPS

        win.fill(background_col)  # =fill background with background color
        mx, my = pg.mouse.get_pos()  # =get x and y coord of mouse cursor on window

        selected_list = []  # - list for all selected objects
        selected_targ = []  # - list for all SELECTED TARGETS

        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.KEYDOWN:
                if event.key == pg.K_ESCAPE:
                    pg.quit()
                    sys.exit()
                if event.key == pg.K_SPACE:
                    if not reset:
                        for target in target_list:
                            if target.isSelected and not target.isClicked:
                                selected_targ.append(target)
                                selected_list.append(target)
                        for distractor in distractor_list:
                            if distractor.isSelected and not distractor.isClicked:
                                selected_list.append(distractor)

                        if len(selected_list) == num_targ:
                            submitted = True
                            # print("Answer submitted")
                            t_keypress = pg.time.get_ticks()
                        else:
                            need_to_select_4 = True

            for obj in master_list:
                if obj.in_circle(mx, my):
                    if event.type == pg.MOUSEMOTION:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("hovered")
                    if event.type == pg.MOUSEBUTTONDOWN:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("clicked")
                        if not obj.isClicked and obj.isSelected:
                            obj.state_control("neutral")

                    if event.type == pg.MOUSEBUTTONUP:
                        if obj.isClicked and not obj.isSelected:
                            obj.state_control("selected")

                elif not obj.in_circle(mx, my):
                    if event.type == pg.MOUSEMOTION:
                        if not obj.isClicked and not obj.isSelected:
                            obj.state_control("neutral")
                    if event.type == pg.MOUSEBUTTONUP:
                        if obj.isClicked and not obj.isSelected:
                            obj.state_control("neutral")

        t1 = pg.time.get_ticks()
        dt = (t1 - t0)/1000

        if completed_practice_trial_count < n_real:
            if not reset:
                if dt <= Tfix:
                    fixation_screen(master_list)
                elif Tfix < dt <= Tfl:
                    flash_targets(distractor_list, target_list)
                elif Tfl < dt <= Tani:
                    for targ in target_list:
                        targ.state_control("neutral")
                    animate(distractor_list, target_list, master_list)
                elif Tani < dt <= Tans:
                    if need_to_select_4:
                        message_screen("not_selected_4")
                    static_draw(master_list)
                    pg.display.flip()
                    t_stop = pg.time.get_ticks()
                elif Tans < dt:
                    timeup = True

            if submitted:
                t_sub = ((t_keypress - t0)/1000) - animation_time
                record_response(t_sub, len(selected_targ), False, recorder)
                win.fill(background_col)
                msg_to_screen_centered("{:d} out of {:d} correct".format(len(selected_targ), len(selected_list)), BLACK, large_font)
                pg.display.flip()
                delay(feedback_time)
                reset = True

            if timeup:
                record_response("timed out", "timed out", True, recorder)
                message_screen("timeup")
                delay(feedback_time)
                reset = True

            if reset:
                print(completed_practice_trial_count)
                for obj in master_list:
                    obj.shuffle_position()
                    obj.state_control("neutral")
                completed_practice_trial_count += 1
                submitted = timeup = need_to_select_4 = reset = False
                # timeup = False
                # need_to_select_4 = False
                # reset = False
                t0 = t1

        else:
            win.fill(background_col)
            message_screen("exp_finished")
            pg.display.flip()
            wait_key()
            recorder.close()
            break


def main():
    """Main loop"""

    # == Variables to count how many trials have been completed ==
    completed_real_trials = 0
    completed_practice_trials = 0

    # == Generate a list of objects ==
    list_d, list_t = generate_list(WHITE)
    list_m = list_d + list_t

    # == Dialogue box to enter participant information ==
    dlg_box = DlgFromDict(session_info, title="Multiple Object Tracking", fixed=["date"])
    if dlg_box.OK:  # - If participant information has been entered
        print(session_info)

        # == Prepare a CSV file ==
        mot_log = date_string + ' pcpnt_' + session_info['Participant'] + '_obsvr_' + session_info['Observer']
        log = open(mot_log + '.csv', 'w')
        header = ["response_time", "response_score", "timed_out"]
        delim = ",".join(header)
        delim += "\n"
        log.write(delim)

        # == Initiate pygame ==
        pg.init()

        # == Start guide ==
        #guide_user(list_m, list_d, list_t)

        # == Start practice ==

        practice_trials(list_m, list_d, list_t, completed_practice_trials)

        # == Start real trials, recording responses ==
        real_trials(list_m, list_d, list_t, completed_real_trials, log)
        pg.quit()
        sys.exit()

    else:  # - If the user has not entered the participant information
        print("User has cancelled")
        pg.quit()
        sys.exit()


if __name__ == "__main__":
    main()
