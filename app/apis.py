import app
from app import app, cursor
import pdb
from flask import request
from flask.ext.jsonpify import jsonify


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


@app.route('/search_state')
def search_state():
	with db().cursor() as cur:
		cur.execute("SELECT * FROM msa LIMIT 1")
		return str(''.join(cur.fetchall()))

@app.route('/stats_by_state_city_occ',methods=['GET'])
def stats_by_state_city_occ():
	with cursor() as cur:
		# pdb.set_trace()
		sql="""SELECT state,
					  city,
					  occ_title,
					  tot_emp,
					  jobs_1000,
					  h_mean,
					  a_mean,
					  h_median,
					  a_median
				FROM msa
			   WHERE state ~~* '{state}'
			     	 AND city ~~* '{city}'
			     	 AND occ_code = '{occ_code}'""".format(**request.args)

		cur.execute(sql)
		print(sql)
		return jsonify({'data':cur.fetchall()})

@app.route('/a_median_by_state',methods=['GET'])
def a_median_by_state():
	with cursor() as cur:
		# pdb.set_trace()
		sql="""SELECT state,
					  a_mean
			     FROM msa"""

		cur.execute(sql)
		print(sql)
		return jsonify({'data':cur.fetchall()})



