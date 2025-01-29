import sqlite3
from flask import Flask, flash, redirect, render_template, request, session, g
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
def home():
    return render_template("startPage.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log in the user."""
    session.clear()  # Forget any user_id

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # Validate input
        if not username:
            flash("Username is required!", "error")
            return redirect("/login")
        elif not password:
            flash("Password is required!", "error")
            return redirect("/login")

        # Query database for username
        db = get_db()
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", (username,)
        ).fetchall()

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], password):
            flash("Invalid username and/or password!", "error")
            return redirect("/login")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        flash("You were successfully logged in!", "success")
        return redirect("/")

    else:
        return render_template("tools.html")

@app.route("/logout")
def logout():
    """Log the user out."""
    session.clear()  # Forget any user_id
    return redirect("/")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    """Register a new user."""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # Validate input
        if not username:
            flash("Username is required!", "error")
            return redirect("/signup")
        elif not password:
            flash("Password is required!", "error")
            return redirect("/signup")
        elif not confirmation:
            flash("Password confirmation is required!", "error")
            return redirect("/signup")
        if password != confirmation:
            flash("Passwords do not match!", "error")
            return redirect("/signup")

        db = get_db()

        # Check if username already exists
        existing_user = db.execute(
            "SELECT id FROM users WHERE username = ?", (username,)
        ).fetchone()

        if existing_user:
            flash("Username already exists!", "error")
            return redirect("/signup")

        # Hash the password and insert new user
        hash = generate_password_hash(password)
        db.execute(
            "INSERT INTO users (username, hash) VALUES (?, ?)", (username, hash)
        )
        db.commit()

        flash("You were successfully registered!", "success")
        return redirect("/login")

    return render_template("login.html")

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