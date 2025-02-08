import sqlite3
from flask import Flask, flash, redirect, render_template, request, session, g, url_for
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

# Configure application
app = Flask(__name__)
DATABASE = 'storage.db'

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database configuration
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row  # Return rows as dictionaries
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/")
def start():
    return render_template("startPage.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log in the user."""
    session.clear()  # Clear existing session

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not username or not password:
            flash("Username and password are required!", "error")
            return redirect(url_for("login"))

        db = get_db()
        user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

        if user is None:
            flash("Invalid username!", "error")
            return redirect(url_for("login"))

        if not check_password_hash(user["hash"], password):
            flash("Invalid password!", "error")
            return redirect(url_for("login"))

        # Store user in session
        session["user_id"] = user["id"]
        flash("Login successful!", "success")
        return redirect(url_for("home"))

    return render_template("home.html")

@app.route("/logout")
def logout():
    """Log the user out."""
    session.clear()
    flash("You have been logged out!", "info")
    return redirect(url_for("login"))

@app.route("/signup", methods=["GET", "POST"])
def signup():
    """Register a new user."""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if not username or not password or not confirmation:
            flash("All fields are required!", "error")
            return redirect(url_for("login"))

        if password != confirmation:
            flash("Passwords do not match!", "error")
            return redirect(url_for("login"))

        db = get_db()
        existing_user = db.execute("SELECT id FROM users WHERE username = ?", (username,)).fetchone()

        if existing_user:
            flash("Username already exists!", "error")
            return redirect(url_for("login"))

        hash_password = generate_password_hash(password)
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", (username, hash_password))
        db.commit()

        flash("Registration successful! You can now log in.", "success")
        return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/learn")
def learns():
    return render_template("learn.html")

@app.route("/tools")
def tools():
    return render_template("tools.html")

@app.route("/frequencyAnalysis")
def frequency_analysis():
    return render_template("frequencyAnalysis.html")

@app.route("/indexOfCoincidence")
def index_of_coincidence():
    return render_template("indexOfCoincidence.html")

@app.route("/shiftTester")
def shift_tester():
    return render_template("shiftTester.html")

# Error handler (for displaying apology messages)
def apology(message, code=400):
    return render_template("apology.html", message=message), code

if __name__ == "__main__":
    app.run(debug=True)