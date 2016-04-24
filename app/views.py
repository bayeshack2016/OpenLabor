from app import app
from flask import render_template, send_from_directory

@app.route('/')
@app.route('/index')
def index():
    return render_template('collect_data.html')

@app.route('/surface_relevance')
def surface_relevance():
    return render_template('surface_relevance.html')

@app.route('/<path:path>')
def send_js(path):
	print(path)
	return send_from_directory('static', path)
