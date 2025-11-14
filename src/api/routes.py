"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()

    if not data["email"] or not data["password"]:
        return jsonify({"msg": "email and password are required"}), 400
    
    existing_user = db.session.execute(db.select(User).where(
        User.email == data["email"]
    )).scalar_one_or_none()

    if existing_user:
        return jsonify({"msg": "an user already exists with this email"})
    
    new_user = User(email = data["email"])
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"})

@api.route("/login",methods=["POST"])
def login():
    data = request.get_json()

    if not data["email"] or not data["password"]:
        return jsonify({"msg": "email and password are required"}), 400
    
    user = db.session.execute(db.select(User).where(
        User.email == data["email"]
    )).scalar_one_or_none()

    if user is None:
        return jsonify({"msg": "invalid email or password"}), 401
    
    if user.check_password(data["password"]):
        return jsonify({"msg": "login successful"}), 200
    else:
        return jsonify({"msg": "invalid email or password"}), 401

