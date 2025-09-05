USAGE:
======
- git clone <ssh> <target_dir_name>
- make setup
- source venv/bin/activate

Two ways to play the game
- python3 app.py -w 
    - Allows you to play with a given wordle target
- python3 app.py
    - Allows random game play

Any refresh (Ctrl+R) or new game button click (seen at the end of the game) will set a new wordle target.


FUTURE UPDATES:
===============
Need for an editor:
    - From the five_letter_words.txt, I have started to cull the words I want available.
    - Words that are already removed: Ending in "ed", "s"

    - Can manually cull words from the "latest_five_letter_words.txt" by putting "#" in front of words, or by outright deleting the words. I prefer the leading "#" approach.