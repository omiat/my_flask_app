# my_flask_app/run.py

from flask import Flask
from app.admin.route import admin_bp

app = Flask(__name__)
# @app.route('/')
# def index():
#     return 'Index Page'
# Register the admin Blueprint
app.secret_key = '1234567890'
app.register_blueprint(admin_bp)

if __name__ == '__main__':
    app.run(debug=True)
