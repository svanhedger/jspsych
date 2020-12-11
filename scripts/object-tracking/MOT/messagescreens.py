import pygame as pg
import os
from MOT_constants import *

# == Set window ==
x, y = 50, 50
os.environ['SDL_VIDEO_WINDOW_POS'] = "%d,%d" % (x,y)
win = pg.display.set_mode((win_width, win_height), pg.FULLSCREEN)
pg.display.set_caption(title)

# == Define colors ==
background_col = GREY
hover_col = DARKSLATEGREY
click_col = GREENYELLOW
select_col = YELLOW


def wait_key():
    """function to wait key press"""
    while True:
        for event in pg.event.get():
            if event.type == pg.KEYDOWN and event.key == pg.K_f:
                return


def flash_targets(dlist, tlist):
    """function to flash targets"""
    # pg.time.Clock().tick(FPS)
    fixation_cross()
    for d in dlist:
        for t in tlist:
            d.draw_circle(win)
            t.flash_color()
            t.draw_circle(win)
    pg.display.update()


def animate(dlist, tlist, mlist):
    """function to move or animate objects on screen"""
    # fixation_cross()
    for d in dlist:
        d.detect_collision(mlist)
        d.draw_circle(win)
    for t in tlist:
        t.detect_collision(mlist)
        t.draw_circle(win)
    """for d in dlist:
        for t in tlist:
            d.detect_collision(mlist)
            t.detect_collision(mlist)
            d.draw_circle(win)
            t.draw_circle(win)"""
    pg.display.update()


def static_draw(mlist):
    """function for static object draw"""
    for obj in mlist:
        obj.draw_circle()


def fixation_cross(color=BLACK):
    """function to draw fixation cross"""
    start_x, end_x = ((win_width/2)-7, (win_height/2)) , ((win_width/2)+7, (win_height/2))
    start_y, end_y = (win_width/2, (win_height/2)-7), (win_width/2, (win_height/2)+7)
    pg.draw.line(win, color, start_x, end_x, 3)
    pg.draw.line(win, color, start_y, end_y, 3)


def fixation_screen(mlist):
    """function to present the fixation cross and the objects"""
    fixation_cross(BLACK)
    for obj in mlist:
        obj.draw_circle()
    pg.display.update()


def text_objects(text, color, textsize):
    """text object defining text"""
    msg = pg.font.SysFont("arial", textsize)
    text_surf = msg.render(text, True, color)
    return text_surf, text_surf.get_rect()  # - Returns the text surface and rect object


def msg_to_screen(text, textcolor, textsize, pos, display=win):
    """function to render message to screen centered"""
    text_surface, text_rect = text_objects(text, textcolor, textsize)  # - set variable for text rect object
    text_rect.center = pos
    display.blit(text_surface, text_rect)


def msg_to_screen_centered(text, textcolor, textsize, display=win):
    """function to render message to screen centered"""
    text_surface, text_rect = text_objects(text, textcolor, textsize)  # - set variable for text rect object
    text_rect.center = (win_width/2), (win_height/2)
    display.blit(text_surface, text_rect)


def multi_line_message(text, textsize, pos=((win_width-(win_width/10)), win_height), color=BLACK, display=win):
    """function to split text message to multiple lines and blit to display window"""
    # -- Make a list of strings split by the "\n", and each list contains words of that line as elements
    font = pg.font.SysFont("arial", textsize)
    words = [word.split(" ") for word in text.splitlines()]

    # -- Get the width required to render an empty space
    space_w = font.size(" ")[0]  # .size method returns dimension in width and height. [0] gets the width
    max_w, max_h = ((win_width-(win_width/10)), win_height)
    text_x, text_y = pos

    for line in words:
        for word in line:
            word_surface = font.render(word, True, color)  # get surface for each word
            word_w, word_h = word_surface.get_size()  # get size for each word
            if text_x + word_w >= max_w:  # if the a word exceeds the line length limit
                text_x = (win_width/10)  # reset the x
                text_y += word_h  # start a new row
            display.blit(word_surface, (text_x, text_y))  # blit the text onto surface according to pos
            text_x += word_w + space_w  # force a space between each word
        text_x = (win_width/10)  # reset the x
        text_y += word_h  # start a new row
    pg.display.flip()


def message_screen(message, display=win):
    if message == "start":
        display.fill(background_col)
        multi_line_message(start_text, med_font, ((win_width - (win_width / 10)), 120))
    if message == "not_selected_4":
        msg_to_screen_centered("Select 2 circles!", BLACK, med_font)
    if message == "timeup":
        display.fill(background_col)
        msg_to_screen_centered("Time's up! Now resetting", BLACK, large_font)
        pg.display.flip()
    if message == "prac_finished":
        display.fill(background_col)
        multi_line_message(prac_finished_txt, med_font, ((win_width - (win_width / 10)), 120))
        pg.display.flip()
    if message == "exp_finished":
        display.fill(background_col)
        multi_line_message(experim_fin_txt, large_font, ((win_width - (win_width / 10)), 150))
        pg.display.flip()


def guide_screen(call, mlist, selected_targets_list):
    if call == "start":
        win.fill(background_col)
        multi_line_message(start_text, med_font, ((win_width - (win_width / 10)), 120))
        pg.display.flip()
    if call == "focus":
        win.fill(background_col)
        fixation_cross()
        multi_line_message(fix_text, med_font, ((win_width - (win_width / 10)), (win_height / 2 + 30)))
        pg.display.flip()
    if call == "present":
        win.fill(background_col)
        fixation_cross()
        static_draw(mlist)
        multi_line_message(present_text, med_font, ((win_width - (win_width / 10)), (win_height / 2 + 30)))
        pg.display.flip()
    if call == "answer":
        static_draw(mlist)
        multi_line_message(submit_ans_txt, med_font, ((win_width - (win_width / 10)), (win_height / 2 + 30)))
        pg.display.flip()
    if call == "timeup":
        win.fill(background_col)
        multi_line_message(guide_timeup_txt, med_font, ((win_width - (win_width / 10)), (win_height / 2 + 30)))
        pg.display.flip()
    if call == "submitted":
        win.fill(background_col)
        msg_to_screen_centered(guide_submit_txt.format(len(selected_targets_list)), BLACK, large_font)
        pg.display.flip()
    if call == "finished":
        win.fill(background_col)
        multi_line_message(guide_fin_txt, med_font,((win_width - (win_width / 10)), 120))
        pg.display.flip()
