from flask import Flask
from flask_cors import CORS
import pandas as pd
import joblib 

app = Flask(__name__)
CORS(app)

User_credentials = {
    "alice": "password123",
    "bob": "secure456",
    "charlie": "qwerty789",
    "diana": "hunter2",
    "eve": "passpass",
    "frank": "letmein",
    "grace": "trustno1",
    "heidi": "admin123",
    "ivan": "welcome1",
    "judy": "password1"
}

@app.route('/validate_login', methods=['POST'])
def validate_login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if username in User_credentials and User_credentials[username] == password:
        response = {
            "success": True, 
            "message": "Credentials are valid"
        } 
    else: 
        response = {
            "success": False,
            "message": "Credentials are invalid"
        }

    return jsonify(response)

model = joblib.load("./src/random_forest_model.pkl")

@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    data = request.json
    cats = True if 'pets' in data and data['pets'] else False
    dogs = True if 'pets' in data and data['pets'] else False
    sample_data = [
        data['city'],
        data['province'],
        float(data['latitude']),
        float(data['longitude']),
        data['lease_term'],
        data['type'],
        float(data['beds']),
        float(data['baths']),
        float(data['sq_feet']),
        data['furnishing'],
        data['smoking'],
        cats,
        dogs
    ]
    sample_df = pd.DataFrame([sample_data], columns=[
        'city', 'province', 'latitude', 'longitude', 'lease_term',
        'type', 'beds', 'baths', 'sq_feet', 'furnishing',
        'smoking', 'cats', 'dogs'
    ])

    predicted_price = model.predict(sample_df)

    return jsonify({"predicted_price": float(predicted_price[0])})
    