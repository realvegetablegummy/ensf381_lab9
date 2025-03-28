from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello everyone, Welcome to ENSF381: Flask Projects!'

if __name__ == '__main__':
    app.run(debug=True)
