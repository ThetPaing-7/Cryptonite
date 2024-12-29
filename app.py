
from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session # type: ignore
from werkzeug.security import check_password_hash, generate_password_hash

# Configuare application
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("base.html")



@app.route("/tools")
def tools():
    return render_template("tools.html")
