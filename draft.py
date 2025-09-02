# Libraries
import argparse

# variables
guesses = 0
max_guesses = 5
max_length = 5
res = False
word = ""

def is_valid(word):
    global max_length
    return len(word)==max_length

def check_guess(guess):
    # Letter count dictionary
    global word
    count = {x:word.count(x) for x in word}
    
    # Return lists
    letters = list(guess.lower())
    global max_length
    colors = ["grey"] * max_length
    
    # First pass: mark greens
    for i in range(max_length):
        if letters[i] == word[i]:
            count[letters[i]] -= 1
            colors.append("green")

    # Second pass: mark yellows
    for i in range(0, max_length):
        if colors[i] == "grey":
            letter = letters[i]
            if count.get(letter, 0) > 0:
                colors[i] = "yellow"
                count[letter] -= 1
    
    # Print out
    row1, row2 = "", ""
    for l in letters: row1 += f"[{l}] "
    for c in colors: row2 += f"[{c}]"
    print(row1)
    print(row2)

    return "".join(letters)==word

def main():
    parser = argparse.ArgumentParser(description="Luke's NYT Wordle")
    parser.add_argument("-w", "--word", required=True, help="Daily panagram!")
    args = parser.parse_args()
    global word
    word = vars(args)["word"].lower()

    # Checks valid word
    if not is_valid(word):
        print(f"(E) draft.py -> Must provide word of 5 letters: {word}")
        return
    
    # Begins Game
    print("Happy Wordling!")
    global guesses, max_guesses, max_length, res
    while guesses != max_guesses and not res:
        guess = input(f"{max_guesses - guesses} guesses left: ")
        if not is_valid(guess): continue
        guess = guess[:max_length]
        res = check_guess(guess)
        guesses += 1
    
    # Ends game
    if res: print(f"Winner! : {word}")
    elif guesses == 5: print(f"Good luck next time! : {word}")
    else: print("(E) draft.py: Unfound game ending.")
    return

if __name__ == "__main__":
    main()