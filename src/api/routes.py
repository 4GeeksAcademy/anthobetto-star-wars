"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts, Characters, Planets, Starships, FavoritesCharacters, FavoritesPlanets
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}    
    response_body["message"] = "Hello! I'm a message that came from the backend"
    return response_body, 200


@api.route("/login", methods=["POST"])  # VI
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body["message"]="Bad email or password"
        return response_body, 401
    print(user.serialize())
    access_token = create_access_token(identity={'email': user.email, "is_active": user.is_active})
    response_body["message"] = f'Bienvenida {email}'
    response_body["access_token"] = access_token
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body["logged_in_as"]= current_user
    return response_body, 200


@api.route('/users')
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'Listado de Usuarios y sus publicaciones(GET)'
    response_body['results'] = result
    return response_body, 200


# Endpoint de Post (CRUD)
@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        # option2 
        # print(rows)
        # result = []
        # for row in rows:
        #    result.append(row.serialize())
        # option 1 - list comprenhesion
        # var = [objetivo for iterador in list]
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las Publicaciones (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # validar si estoy recibiendo todas las claves (campos)
        row = Posts(title = data.get('title'),
                    description = data.get('description'),
                    body = data.get('body'),
                    date = datetime.now(),
                    image_url = data.get('image_url'),
                    user_id = data.get('user_id'),)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una Publicación (POST)'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def post(id):
    response_body =  {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'Method (GET): La publicación {id} no existe'
        response_body['result'] = {}
        return response_body, 404
    current_user = get_jwt_identity
    if row.user_id != current_user['user_id']:
        response_body['message'] = f'Usted no puede gestion la publicación de {id}'
        response_body['result'] = {row.serialize()}
        return response_body, 401
    # print(row.serialize())
    if request.method == 'GET':
        response_body['message'] = f'Method (GET): Obtenemos datos a través del {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        print(data)
        # Valida que reciba todas las claves en el body( json)
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.image_url = data.get('image_url')
        db.session.commit()
        response_body['message'] = f'Method (PUT): Actualizamos datos a través del {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Method (DELETE): Borramos datos a través del {id}'
        response_body['result'] = {}
        return response_body, 200


@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    url = "https://swapi.dev/api/people"
    response = requests.get(url)
    print(response) 
    if response.status_code == 200:
        data = response.json()
        print(data)
        for row in data['results']:
            Character = Characters(
                name=row.get("name"),
                height=row.get("height"),
                mass=row.get("mass"),
                hair_color=row.get("hair_color"),
                skin_color=row.get("skin_color"),
                eye_color=row.get("eye_color"),
                birth_year=row.get("birth_year")
            )
            db.session.add(Character)       
        db.session.commit()
        response_body['results'] = data
    return response_body, 200


@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    url = "https://swapi.dev/api/planets"
    response = requests.get(url)
    print(response) 
    if response.status_code == 200:
        data = response.json()
        print(data)
        for row in data['results']:
            Planet = Planets(
                name=row.get("name"),
                diameter=row.get("diameter"),
                rotation_period=row.get("rotation_period"),
                orbital_period=row.get("orbital_period"),
                gravity=row.get("gravity"),
                population=row.get("population"),
                climate=row.get("climate"),
                terrain=row.get("terrain"),
                surface_water=row.get("surface_water"),
            )
            db.session.add(Planet)       
        db.session.commit()
        response_body['results'] = data
    return response_body, 200


@api.route('/starships', methods=['GET'])
def starships():
    response_body = {}
    url = "https://swapi.dev/api/starships"
    response = requests.get(url)
    print(response) 
    if response.status_code == 200:
        data = response.json()
        print(data)
        for row in data['results']:
            Starship = Starships(
                name=row.get("name"),
                starship_class=row.get("starship_class"),
                manufacturer=row.get("manufacturer"),
                length=row.get("length"),
                crew=row.get("crew"),
                passengers=row.get("passengers"),
                max_atmosphering_speed=row.get("max_atmosphering_speed"),
                hyperdrive_rating=row.get("hyperdrive_rating"),
                mglt=row.get("MGLT"),
                cargo_capacity=row.get("cargo_capacity"),
            )
            db.session.add(Starship)       
        db.session.commit()
        response_body['results'] = data
    return response_body, 200


@api.route('/favoritescharacters/<int:id>', methods=['GET', 'POST', 'DELETE'])
def favoritecharacter(id):
    response_body =  {}
    row = db.session.execute(db.select(FavoritesCharacters).where(FavoritesCharacters.id == id)).scalar()
    if request.method == 'GET':
        response_body['message'] = f'Method (GET): {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        print(data)
        # Valida que reciba todas las claves en el body( json)
        row.name = data.get('name')
        row.type = data.get('type')
        db.session.commit()
        response_body['message'] = f'Method (POST): {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Method (DELETE): Borramos datos a través del {id}'
        response_body['result'] = {}
        return response_body, 200


@api.route('/favoritesplanets/<int:id>', methods=['GET', 'POST', 'DELETE'])
def favoriteplanet(id):
    response_body =  {}
    row = db.session.execute(db.select(FavoritesPlanets).where(FavoritesPlanets.id == id)).scalar()
    if request.method == 'GET':
        response_body['message'] = f'Method (GET): {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        print(data)
        # Valida que reciba todas las claves en el body( json)
        row.name = data.get('name')
        row.type = data.get('type')
        db.session.commit()
        response_body['message'] = f'Method (POST): {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Method (DELETE): Borramos datos a través del {id}'
        response_body['result'] = {}
        return response_body, 200


@api.route('/favoritesstarships/<int:id>', methods=['GET', 'POST', 'DELETE'])
def starshipplanet(id):
    response_body =  {}
    row = db.session.execute(db.select(FavoritesStarships).where(FavoritesStarships.id == id)).scalar()
    if request.method == 'GET':
        response_body['message'] = f'Method (GET): {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        print(data)
        # Valida que reciba todas las claves en el body( json)
        row.name = data.get('name')
        row.type = data.get('type')
        db.session.commit()
        response_body['message'] = f'Method (POST): {id}'
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Method (DELETE): Borramos datos a través del {id}'
        response_body['result'] = {}
        return response_body, 200

