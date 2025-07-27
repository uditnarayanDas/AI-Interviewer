from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sqlite3

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize DB
def init_db():
    conn = sqlite3.connect('formdata.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            experience TEXT NOT NULL,
            company TEXT,
            resume_filename TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    experience = request.form.get('experience')
    company = request.form.get('company')
    resume = request.files.get('resume')

    if not (name and experience and resume):
        return jsonify({"error": "Missing required fields"}), 400

    resume_filename = None
    if resume:
        resume_filename = f"{name.replace(' ', '_')}_{resume.filename}"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], resume_filename)
        resume.save(save_path)

    conn = sqlite3.connect('formdata.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO users (name, experience, company, resume_filename)
        VALUES (?, ?, ?, ?)
    ''', (name, experience, company, resume_filename))
    conn.commit()
    conn.close()

    return jsonify({"message": "Form submitted successfully!"})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
