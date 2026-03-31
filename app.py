from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculator")
def calculator():
    return render_template("calculator.html")       #open the calculator page

@app.route("/music")
def music_api():
    return render_template("music-player.html")

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=5000)