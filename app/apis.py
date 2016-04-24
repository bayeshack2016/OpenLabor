import app
from app import app, cursor
import pdb
from flask import request, jsonify


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
			     	 AND city ~~* '{city}'""".format(**request.args)

		cur.execute(sql)
		# print(cur.fetchall())
		return jsonify({'data':cur.fetchall()})


