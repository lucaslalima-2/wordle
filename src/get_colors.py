"""
Fetches colors for the submission.
This is built off the function check_guess from draft.py
"""

def get_colors(guess, wordle, max_length):
    # Letter count dictionary
    count = {x:wordle.count(x) for x in wordle}
    
    # Return lists
    letters = list(guess)
    colors = ["dark-gray"] * max_length
    
    # First pass: mark greens
    for i in range(max_length):
        if letters[i] == wordle[i]:
            count[letters[i]] -= 1
            colors[i] = "green"

    # Second pass: mark yellows
    for i in range(0, max_length):
        if colors[i] == "dark-gray":
            letter = letters[i]
            if count.get(letter, 0) > 0:
                count[letter] -= 1
                colors[i] = "yellow"
    
    return colors