import heapq
import math
import random


class City(object):
	def __init__(self, cityid, name, population, alt_names_str, latitude, longitude, country_code, segment):
		self.id = cityid
		self.primary_name = name
		self.population = population
		self.country_segment = segment
		self.latitude = float(latitude)
		self.longitude = float(longitude)
		self.alt_names = alt_names_str.split(',')
		self.country_code = country_code
		self._temp_distance = None

	def matches_word(self, word):
		return word in self.name

	def set_distance(self, distance):
		self._temp_distance = distance	

	@property
	def distance(self):
		return self._temp_distance

	def distance_to(self, city):
		'''
		Uses Haversine method for calculating distance from current objects lat & long
		to another City's lat & lon
		Ported from javascript code from 
		https://www.movable-type.co.uk/scripts/latlong.html		
		'''
		EARTH_RADIUS = 6371000 # meters
		lat1 = math.radians(self.latitude)
		lat2 = math.radians(city.latitude)
		delta_lat = math.radians(city.latitude - self.latitude)
		delta_lon = math.radians(city.longitude - self.longitude)
		a = math.sin(delta_lat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * (math.sin(delta_lon / 2) ** 2)
		c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

		return EARTH_RADIUS * c

	def find_k_closest(self, k, city_list):
		for city in city_list:
			city.set_distance(self.distance_to(city))

		# heap is faster than sorting entire list for small values of k
		return heapq.nsmallest(
			k, 
			city_list,
			key=lambda city: city.distance
		)

	def find_k_closest_in_country(self, k, city_list):
		country_cities = list(filter(lambda city: self.country_code == city.country_code, city_list))
		for city in country_cities:
			city.set_distance(self.distance_to(city))

		return heapq.nsmallest(
			k, 
			country_cities,
			key=lambda city: city.distance
		)

	def to_json(self):
		return {
			'id': self.id, 
			'name': self.primary_name,
			'country': self.country_code,
			'latitude': self.latitude,
			'longitude': self.longitude,
			'segment': self.country_segment,
			'population': self.population
		}

	# for debugging
	def __repr__(self):
		return "City: {}\nId: {}\nLoc ({},{})\nCountry: {}\n------".format(
			self.primary_name,
			self.id,
			self.latitude,
			self.longitude,
			self.country_code
		)


class CityHandler(object):

	def __init__(self):
		self.cities = {}
		self._load_cities()

	def _load_cities(self):
		with open('cities1000.txt') as dataset_file:
			for line in dataset_file.readlines():
				city_data = line.split('\t')
				(city_id, city_name, ascii_name, alternate_names, latitude, longitude, _, _, country_code, _, country_segment, _, _, _, population) = city_data[0:15]
				self.cities[city_id]= City(
					city_id, 
					city_name, 
					population, 	
					alternate_names, 
					latitude, 
					longitude, 
					country_code,
					country_segment
				)

	# Lower Population limit (filter by min-population to avoid BS cities)
	def proximal_query(self, city_id, num_cities, country_limit=False):
		if country_limit:
			return self.cities[city_id].find_k_closest_in_country(num_cities, self.cities.values())
		return self.cities[city_id].find_k_closest(num_cities, self.cities.values())

	# Sort by certain things: 
	# population
	# id
	# proximity to current location (distance function + browser location - interesting proposition)
	def lexical_query(self, text):
		matching_cities = []
		words = text.split(' ')
		for city in self.cities.values():
			matches = True
			for word in words:
				# Change the way this is implemented to get the alternate names
				word_matches = False
				if word in city.primary_name:
					word_matches = True
				for name in city.alt_names:
					if word in name: 
						word_matches = True
				matches = matches and word_matches		

			if matches:
				matching_cities.append(city)

		return matching_cities
