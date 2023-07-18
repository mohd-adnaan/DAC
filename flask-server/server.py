from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/members", methods=["POST"])
def members():
    # Retrieve latitude and longitude from the request payload
    latitude = request.json.get("latitude")
    longitude = request.json.get("longitude")

    # Process the latitude and longitude as needed
    # ...

    # Return a response indicating successful data handling
    response_data = {"message": "Data Sent Successfully"}
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')