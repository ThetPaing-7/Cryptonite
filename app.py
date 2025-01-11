import sqlite3
from flask import Flask, flash, redirect, render_template, request, session, g
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database configuration
DATABASE = "finance.db"

def get_db():
    """Open a new database connection if none exists for the current context."""
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE, check_same_thread=False)
        g.db.row_factory = sqlite3.Row  # Return rows as dictionaries
    return g.db

@app.teardown_appcontext
def close_db(exception):
    """Close the database connection at the end of the request."""
    db = g.pop("db", None)
    if db is not None:
        db.close()

@app.route("/")
def home():
    return render_template("base.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log in the user."""
    session.clear()  # Forget any user_id

    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        db = get_db()
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", (request.form.get("username"),)
        ).fetchall()

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

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

        if not username:
            return apology("Username is required!")
        elif not password:
            return apology("Password is required!")
        elif not confirmation:
            return apology("Password confirmation is required!")

        if password != confirmation:
            return apology("Passwords do not match!")

        hash = generate_password_hash(password)

        db = get_db()
        try:
            db.execute(
                "INSERT INTO users (username, hash) VALUES (?, ?)", (username, hash)
            )
            db.commit()
            return redirect("/")
        except sqlite3.IntegrityError:
            return apology("Username has already been registered!")
    else:
        return render_template("signup.html")

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
