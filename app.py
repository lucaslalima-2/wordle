# Libraries
import argparse, os, threading
from flask import Flask, render_template, request, jsonify, session

# Functions
from src.open_browser import open_browser
from src.is_valid import is_valid

# Variables
dictionary_path = "./data/five_letter_words.txt"
word_set = set()
max_length = 5
word = ""

# Application intialization and thread start
app = Flask(__name__)
app.secret_key = os.environ.get("DEV_SECRET_KEY")

# --- App routing ---
@app.route("/")
def index():
	session.pop("guesses", None) # Reset guesses on refresh ; for dev
	return render_template("index.html")

# Submission
@app.route("/submit", methods=["POST"])
def submit():
	word = request.get_json().get("word", "").lower()
	guesses = session.get("guesses", [])
	if word in guesses:
		return jsonify({"status": "fail", "msg": "Already guessed"})
	elif word not in word_set:
		return jsonify({"status": "fail", "msg": "Not a word"})
	else:
		guesses.append(word)
		session["guesses"] = guesses
		return jsonify({"status": "success"})
	
# --- Main function ---
def main():
	# Handles input
	parser = argparse.ArgumentParser(description="Luke's Wordle")
	parser.add_argument("-w", "--word", required=True, help="Daily wordle!")
	args = parser.parse_args()
	global word
	word = vars(args)["word"].lower()

	# Checks valid word
	if not is_valid(word, max_length):
		print(f"(E) draft.py -> Must provide word of 5 letters: {word}")
		return

	# Loads dictionary
	with open(dictionary_path, "r") as d:
		for line in d:
			w = line.strip().lower()
			word_set.add(w)

	# Successful response
	print("Happy Wordling! Starting game ...")

	# App running
	threading.Timer(1.0, open_browser).start()
	app.run(debug=True, use_reloader=False, port=5000)
	return

# --- Anchor ---
if __name__ == "__main__":
	main()