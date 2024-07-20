from flask import Blueprint, jsonify, request
from app.models.user import User
from app.schemas.user_schema import user_schema, users_schema
from app import db

bp = Blueprint('api', __name__)

@bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users))

@bp.route('/users', methods=['POST'])
def create_user():
    user_data = request.json
    new_user = User(username=user_data['username'], email=user_data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(user_schema.dump(new_user)), 201