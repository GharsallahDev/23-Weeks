from flask import Flask, Response, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Set up CORS
    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://192.168.1.104:3000"]}})

    # Handle OPTIONS request
    @app.before_request
    def preflight():
        if request.method.lower() == 'options':
            return Response()

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .routes import main_routes, api_routes, auth_routes
    app.register_blueprint(main_routes.bp)
    app.register_blueprint(api_routes.bp, url_prefix='/api')
    app.register_blueprint(auth_routes.bp, url_prefix='/auth')

    return app