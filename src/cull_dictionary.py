import argparse

def main():
	parser = argparse.ArgumentParser(description="Cull dictionary")
	parser.add_argument("-f", help="Target file")
	args = parser.parse_args()

	with open(args.f, "r") as f:
		for line in f:
			data = line.strip()
			if data[-1]=="S" or data[-2:]=="ES": continue
			else: print(data)

if __name__ ==  "__main__":
  main()