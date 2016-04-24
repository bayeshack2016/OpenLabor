from app import app, cursor, search
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


@app.route('/search_state',methods=['GET'])
def search_state():
	with cursor() as cur:
		query = request.args['query']
		cur.execute("""SELECT DISTINCT state FROM msa WHERE state ~~* '{}%' """.format(query))
		return jsonify({'data':{
			'inputPhrase': query,
			'results': cur.fetchall()}})

@app.route('/search_city',methods=['GET'])
def search_city():
	state = request.args['state']
	city = request.args['city']
	# pdb.set_trace()
	return jsonify({'data':{
			'inputPhrase': city,
			'results': search.find_city(state,city)}})

@app.route('/search_occ',methods=['GET'])
def search_occ():
	occ_title = request.args['occ_title']
	return jsonify({'data':{
			'inputPhrase': occ_title,
			'results': search.find_occ(occ_title)}})



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

@app.route('/a_mean_by_state_occ',methods=['GET'])
def a_median_by_state():
	with cursor() as cur:
		# pdb.set_trace()
		sql="""SELECT occ_code,
					  state,
					  SUM(a_mean*tot_emp)/SUM(tot_emp) AS a_mean
			     FROM msa
			     WHERE occ_code = '{occ_code}'
			     GROUP BY 1,2""".format(**request.args)

		cur.execute(sql)
		print(sql)
		return jsonify({'data':cur.fetchall()})

@app.route('/top_salaries_in_state_by_city',methods=['GET'])
def top_salaries_in_state_by_city():
	
	sql = """SELECT occ_code,
					state,
					city,
	                a_mean
		       FROM msa 
			   WHERE occ_code ='{occ_code}' AND state = '{state}'
			   ORDER BY a_mean DESC
			   LIMIT 10""".format(**request.args)
	with cursor() as cur:
		print(sql)
		cur.execute(sql)
		return jsonify({'data':cur.fetchall()})




