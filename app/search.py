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


def load_occs():
	analyzer =  NgramAnalyzer(3)
	occ_schema = Schema(occ_title=TEXT(stored=True,analyzer=analyzer),
		occ_code=ID(stored=True))
	with cursor() as cur:
		print('Loading occs...')
		cur.execute('SELECT DISTINCT occ_code, occ_title FROM msa');
		occ_index = storage.create_index(occ_schema)
		writer = occ_index.writer()
		for s in cur.fetchall():
			writer.add_document(occ_title=s[u'occ_title'],occ_code=s[u'occ_code'])
		writer.commit()
	return occ_index

state_index = load_states()
city_index = load_cities()
occ_index = load_occs()


# For example, to search the "title" field as the user types
def find_state(query):
	with state_index.searcher() as searcher:
		qp = QueryParser("state", state_index.schema).parse(query)
		results = searcher.search(qp)
		print('Query: {}\nResult:{}'.format(query,results))
		return [s['state'] for s in results]

def find_city(state, city):
	with city_index.searcher() as searcher:
		query = 'city:{} state:{}'.format(city, state)
		qp = QueryParser("city", city_index.schema).parse(query)
		results = searcher.search(qp)
		print('Query: {}\nResult:{}'.format(query,results))
		return [s['city'] for s in results]


def find_occ(occ_title):
	with occ_index.searcher() as searcher:
		query = '{}'.format(occ_title)
		qp = QueryParser("occ_title", occ_index.schema).parse(query)
		results = searcher.search(qp)
		print('Query: {}\nResult:{}'.format(query,results))
		return [{'occ_title':s['occ_title'], 'occ_code':s['occ_code']} for s in results]



