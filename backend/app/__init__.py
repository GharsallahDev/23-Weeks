from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .routes import main_routes, api_routes, auth_routes
    app.register_blueprint(main_routes.bp)
    app.register_blueprint(api_routes.bp, url_prefix='/api')
    app.register_blueprint(auth_routes.bp, url_prefix='/auth')

    return app