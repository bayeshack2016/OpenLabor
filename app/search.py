from whoosh.index import create_in
from whoosh.fields import *
from app import cursor
from whoosh.qparser import QueryParser
from whoosh.filedb.filestore import RamStorage
from whoosh.analysis import NgramAnalyzer
import pdb
from whoosh import query

storage = RamStorage()


def load_states():
	analyzer =  NgramAnalyzer(1,2)
	state_schema = Schema(state=ID(stored=True,analyzer=analyzer))
	with cursor() as cur:
		print('Loading states...')
		cur.execute('SELECT DISTINCT state FROM msa');
		state_index = storage.create_index(state_schema)
		writer = state_index.writer()
		for s in cur.fetchall():
			writer.add_document(state=s[u'state'])
		writer.commit()
	return state_index

def load_cities():
	analyzer =  NgramAnalyzer(1)
	city_schema = Schema(state=ID(stored=True),
		city=ID(stored=True,analyzer=analyzer))
	with cursor() as cur:
		print('Loading cities...')
		cur.execute('SELECT DISTINCT state, city FROM msa');
		city_index = storage.create_index(city_schema)
		writer = city_index.writer()
		for s in cur.fetchall():
			writer.add_document(state=s[u'state'],city=s[u'city'])
		writer.commit()
	return city_index

state_index = load_states()
city_index = load_cities()


# For example, to search the "title" field as the user types
def find_state(query):
	with state_index.searcher() as searcher:
		query = QueryParser("state", state_index.schema).parse(query)
		results = searcher.search(query)
		return [s['state'] for s in results]

def find_city(state, city):
	with city_index.searcher() as searcher:
		qp = QueryParser("city", city_index.schema).parse(
			'city:{} state:{}'.format(city, state))
		results = searcher.search(qp)
		print(results)
		return [s['city'] for s in results]



