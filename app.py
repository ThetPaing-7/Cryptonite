from flask import Flask, render_template, request, redirect, url_for, flash, session, g, jsonify
import sqlite3 as sql
from werkzeug.security import check_password_hash, generate_password_hash
from flask_session import Session

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
        db = g._database = sql.connect(DATABASE)
        db.row_factory = sql.Row  # Return rows as dictionaries
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Start page
@app.route("/")
def start():
    return render_template("startPage.html")


@app.route('/save', methods=['POST'])
def save_record():
    data = request.get_json()
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO history (plaintext, cphier_method, cphier_text) VALUES (?, ?, ?)',
                   (data['plaintext'], data['cphier_method'], data['cphier_text']))
    db.commit()
    return jsonify({'message': 'Record saved successfully!'}), 201

# Track page (used for the index route)
@app.route("/track")
def track():
    con = sql.connect(DATABASE)
    con.row_factory = sql.Row
    cur = con.cursor()
    cur.execute("SELECT * FROM history")
    datas = cur.fetchall()  # Change 'data' to 'datas' to match the template
    return render_template("track.html", datas=datas)  # Ensure 'datas' is passed


@app.route("/add_user", methods=["POST", "GET"])
def add_user():
    if request.method == "POST":
        text = request.form["text"]
        method = request.form["method"]
        chiper = request.form["chiper"]
        
        # Connect to the database and insert the data
        con = sql.connect(DATABASE)
        cur = con.cursor()
        cur.execute("INSERT INTO history (plaintext, cphier_method, cphier_text) VALUES (?, ?, ?)", (text, method, chiper))
        con.commit()
        
        # Show a success message and redirect to the main page
        flash("User Added Successfully", "success")
        return redirect(url_for("track"))
    
    return render_template("add_user.html")




@app.route("/edit_user/<string:id>", methods=['POST', 'GET'])
def edit_user(id):
    if request.method == 'POST':
        text = request.form['text']
        method = request.form['method']
        chiper = request.form['chiper']
        con = sql.connect(DATABASE)
        cur = con.cursor()
        cur.execute("UPDATE history SET plaintext = ?, cphier_method = ?, cphier_text = ? WHERE id = ?", (text, method, chiper, id))
        con.commit()
        flash('User Updated', 'success')
        return redirect(url_for("track"))
    
    con = sql.connect(DATABASE)
    con.row_factory = sql.Row
    cur = con.cursor()
    cur.execute("SELECT * FROM history WHERE id = ?", (id,))
    data = cur.fetchone()
    return render_template("edit_user.html", datas=data)


@app.route("/delete_user/<string:id>", methods=['GET'])
def delete_user(id):
    con = sql.connect(DATABASE)
    cur = con.cursor()
    cur.execute("DELETE FROM history WHERE id = ?", (id,))
    con.commit()
    flash('User Deleted', 'warning')
    return redirect(url_for("track"))


# Login route
@app.route("/login", methods=["GET", "POST"])
def login():
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

    return render_template("login.html")

# Logout route
@app.route("/logout")
def logout():
    session.clear()
    flash("You have been logged out!", "info")
    return redirect(url_for("login"))

# Signup route
@app.route("/signup", methods=["GET", "POST"])
def signup():
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

# Other routes
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

# Error handler
def apology(message, code=400):
    return render_template("apology.html", message=message), code

if __name__ == "__main__":
    app.run(debug=True)


