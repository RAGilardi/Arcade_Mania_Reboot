# ArcadeMania_Bootleg

Access to the site at:
https://ragilardi.github.io/Arcade_Mania_Reboot/

This GitHub Page was made in 2023 by Riccardo Aurelio Gilardi for free, with open-source as an exercise in building a HTML/CSS/JavaScript adaptive website from scratch. It was built by choice without the use of any framework (vue.js, react, jquery...).

DISCLAIMER:
This website is based on a project showed during a 4-days long introductory class to web development by Boolean (https://boolean.careers/), called "coding week 2022 (II edition)" (https://booleancodingweek.teachable.com/courses/enrolled/1643637).

I attended this course and tried to expand by myself the project adding some new features, such as responsive element sizing and positioning, new games, new animations and logic for some games, possibility to save high-scores, reset and menu buttons...

I highly recommend to consider a Boolean complete course if you're interested in learning web development. I could not do it and tried to learn something by myself, but their introductory lectures were totally interesting and well made.

Known bug and missing features:
- games don't have home or replay buttons before game ends: this was due the added complexity of fixed position with flex containers and adaptative sizing
- duck run:
    * movement is laggy and hard to master
    * might improve animation for plants and overlaps
    * might add different plants for screen or flying obstacles
- space invaders:
    * now there is no recharge/delay between shots, which is kinda broken
    * might connect the score to the timer
    * could add destroyable barrers as in the original game
- tetris:
    * during play it's impossible to change the tetromino position at the last moment (lateral insert), or it happens and it overlap with some other pieces
    * no pac-man effects on the sides
    * no "all the way down" button to immediatly place a tetromino
    * no music
    * tetris button doesn't resize with the page
