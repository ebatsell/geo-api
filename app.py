import urllib
import flask
from cities import CityHandler


app = flask.Flask(__name__)
city_handler = CityHandler()

@app.route('/lexical_query', methods=['GET'])
def get_lexical_query():
	words = urllib.parse.unquote(flask.request.args['words'])
	
	matching_cities = city_handler.lexical_query(words)

	resp = flask.make_response(flask.jsonify({'cities': [city.to_json() for city in matching_cities]}))
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp

@app.route('/proximal_query', methods=['GET'])
def get_proximal_query():
	city_id = flask.request.args['id']
	num_cities = int(flask.request.args['n'])
	# country_limit = flask.request.args['limit']

	close_cities = city_handler.proximal_query(city_id, num_cities, country_limit=False)

	resp = flask.make_response(flask.jsonify({'cities': [city.to_json() for city in close_cities]}))
	resp.headers['Access-Control-Allow-Origin'] = '*'
	return resp
