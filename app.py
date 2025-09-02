# Libraries
import argparse, threading
from flask import Flask, render_template, request

# Functions
from src.open_browser import open_browser
from src.is_valid import is_valid

# Variables
max_length = 5
word = ""

# Application intialization and thread start
app = Flask(__name__)

# --- App routing ---
@app.route("/")
def index():
	return render_template("index.html")

# Submission
@app.route("/submit", methods=["POST"])
def submit():
	data = request.get_json()
	word = data.get("word", "")
	if not is_valid:
		return jsonify({"status": "fail", "msg": "Too few letters"})

# --- Main function ---
def main():
	# Handles input
	parser = argparse.ArgumentParser(description="Luke's Wordle")
	parser.add_argument("-w", "--word", required=True, help="Daily wordle!")
	args = parser.parse_args()
	global word
	word = vars(args)["word"].lower()

	# Checks valid word
	global max_length
	if not is_valid(word, max_length):
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