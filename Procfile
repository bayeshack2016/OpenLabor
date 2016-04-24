web: gunicorn app:app
init: python db_create.py
upgrade: python db_upgrade.py
heroku ps:scale web=1