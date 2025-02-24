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

@app.route("/join")
def explore():
    return render_template("login.html")


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
        flash("Record Added Successfully", "success")
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

def get_meme_text(error_code):
    memes = {
        "invalid_username": "🚫 Username not found! Maybe try 'admin'?",
        "invalid_password": "🔒 Wrong password! Are you sure it's not 'password123'?",
        "username_exists": "😅 That username is already taken! Try 'CoolUser2025'?",
        "passwords_mismatch": "🤦‍♂️ Oops! Your passwords don’t match!",
        "fields_required": "⚠️ Please fill in all fields before submitting!"
    }
    return memes.get(error_code, "❌ Something went wrong! Try again later.")

# Login route
@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()  # Clear existing session

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not username or not password:
            return render_template("error.html", 
                                   error_code="fields_required", 
                                   error_message="Username and password are required!", 
                                   meme_text=get_meme_text("fields_required"))

        db = get_db()
        user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

        if user is None:
            return render_template("error.html", 
                                   error_code="invalid_username", 
                                   error_message="Invalid username!", 
                                   meme_text=get_meme_text("invalid_username"))

        if not check_password_hash(user["hash"], password):
            return render_template("error.html", 
                                   error_code="invalid_password", 
                                   error_message="Invalid password!", 
                                   meme_text=get_meme_text("invalid_password"))

        # Store user in session
        session["user_id"] = user["id"]
        return redirect(url_for("home"))

    return render_template("login.html")

# Logout route
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("start"))

# Signup route
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if not username or not password or not confirmation:
            return render_template("error.html", 
                                   error_code="fields_required", 
                                   error_message="All fields are required!", 
                                   meme_text=get_meme_text("fields_required"))

        if password != confirmation:
            return render_template("error.html", 
                                   error_code="passwords_mismatch", 
                                   error_message="Passwords do not match!", 
                                   meme_text=get_meme_text("passwords_mismatch"))

        db = get_db()
        existing_user = db.execute("SELECT id FROM users WHERE username = ?", (username,)).fetchone()

        if existing_user:
            return render_template("error.html", 
                                   error_code="username_exists", 
                                   error_message="Username already exists!", 
                                   meme_text=get_meme_text("username_exists"))

        hash_password = generate_password_hash(password)
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", (username, hash_password))
        db.commit()

        return redirect(url_for("login"))

    return render_template("login.html")

# Other routes
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/logo")
def logo():
    return render_template("home.html")

@app.route("/learn")
def learns():
    return render_template("learn.html")

@app.route("/bigram")
def bigram():
    return render_template("bigram.html")

@app.route("/trigram")
def trigram():
    return render_template("trigram.html")

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


