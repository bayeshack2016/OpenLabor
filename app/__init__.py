from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import psycopg2 
import psycopg2.extras

app = Flask(__name__,static_url_path='')
app.config.from_object('config')



def db():
	global __conn
	if __conn is None:
		__conn = psycopg2.connect(
		 host=config.DB_HOST,
		 database=config.DB_NAME,
		 user=config.DB_USER,
		 password=config.DB_PASSWORD)
	return __conn

def cursor():
	return db().cursor(cursor_factory = psycopg2.extras.RealDictCursor)
from app import apis
import config

__conn = None