import sqlite3
from flask import Flask, redirect, render_template, request, session, g
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
            return "Username is required!", 400
        elif not password:
            return "Password is required!", 400

        # Query database for username
        db = get_db()
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", (username,)
        ).fetchall()

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], password):
            return "Invalid username and/or password!", 400

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    else:
        return render_template("login.html")

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
            return "Username is required!", 400
        elif not password:
            return "Password is required!", 400
        elif not confirmation:
            return "Password confirmation is required!", 400

        if password != confirmation:
            return "Passwords do not match!", 400

        # Hash the password
        hash = generate_password_hash(password)

        # Insert new user into the database
        db = get_db()
        try:
            db.execute(
                "INSERT INTO users (username, hash) VALUES (?, ?)", (username, hash)
            )
            db.commit()
            return redirect("/login")
        except sqlite3.IntegrityError:
            return "Username already exists!", 400
    else:
        return render_template("signup.html")

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
