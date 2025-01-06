
from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session # type: ignore
from werkzeug.security import check_password_hash, generate_password_hash

# Configuare application
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# logIn page
@app.route("/login")
def tools():
    return render_template("login.html")

# Sign Up page
@app.route("/signup")
def tools():
    render_template("signup.html")


# Tools page
@app.route("/tools")
def tools():
    return render_template("tools.html")

# Frequecny Analysis
@app.route("/frequencyAnalysis")
def frequencyAnalysis():
    return render_template("frequencyAnalysis.html")

# Index of Coincidence
@app.route("/indexOfCoincidence")
def indexOfCoincidence():
    return render_template("indexOfCoincidence.html")


# Shift tester
@app.route("/shiftTester")
def shiftTester():
    return render_template("shiftTester.html")