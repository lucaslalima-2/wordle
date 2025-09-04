# Libraries
import argparse, os, random, threading
from flask import Flask, render_template, request, jsonify, session

# Functions
from src.open_browser import open_browser
from src.is_valid import is_valid
from src.get_colors import get_colors

# Variables
dictionary_path = "./data/latest_five_letter_words.txt"
word_set = set()
max_length = 5
wordle = None

# Application intialization and thread start
app = Flask(__name__)
app.secret_key = os.environ.get("DEV_SECRET_KEY")

# --- App routing ---
@app.route("/")
def index():
	session.pop("guesses", None)
	return render_template("index.html")

# Fetch new word
@app.route("/reset_game", methods=["GET"])
def new_game():
	global wordle
	wordle = random.choice(list(word_set))
	return jsonify({"status": "new", "wordle": wordle})

# Submission
@app.route("/submit", methods=["POST"])
def submit():
	guess = request.get_json().get("guess", "").lower()
	guesses = session.get("guesses", [])
	if guess in guesses:
		return jsonify({"status": "fail", "msg": "Already guessed"})
	elif guess not in word_set:
		return jsonify({"status": "fail", "msg": "Not a word"})
	else:
		guesses.append(guess)
		session["guesses"] = guesses
		colors = get_colors(guess, wordle, max_length)
		return jsonify({"status": "success", "guess": guess, "colors": colors, "wordle": wordle})
	
# --- Main function ---
def main():
	# Handles input
	parser = argparse.ArgumentParser(description="Luke's Wordle")
	parser.add_argument("-w", "--wordle", help="Daily wordle!")
	args = parser.parse_args()

	# Loads dictionary
	with open(dictionary_path, "r") as d:
		for line in d:
			if line[0] == "#": continue
			w = line.strip().lower()
			word_set.add(w)

	# Sets wordle if provided
	global wordle
	if args.wordle:
		wordle = args.wordle.lower()
		if not is_valid(wordle, max_length):
			print(f"(E) draft.py -> Must provide word of 5 letters: {word}")
			return

	# Successful response
	print("Happy Wordling! Starting game ...")

	# App running
	threading.Timer(1.0, open_browser).start()
	app.run(debug=True, use_reloader=False, port=5000)
	return

# --- Anchor ---
if __name__ == "__main__":
	main()