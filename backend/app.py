from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["API_KEY"] = os.getenv("GOOGLE_MAPS_API_KEY")


@app.route("/")
def home():
    return "Traffic API server running!"


@app.route("/traffic")
def get_traffic_data():
    api_key = app.config["API_KEY"]
    origin = "FIU MMC Campus, Miami, FL 33199"
    destination = "4320 NW 107th Ave, Doral, FL 33178"
    url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&departure_time=now&key={api_key}"

    try:
        response = requests.get(url)
        data = response.json()

        if data["status"] == "OK":
            route = data["routes"][0]
            leg = route["legs"][0]

            steps = []
            for step in leg["steps"]:
                steps.append(step["html_instructions"])

            traffic_info = {
                "route": steps,
                "duration": leg["duration_in_traffic"]["text"],
                "distance": leg["distance"]["text"],
            }
            return jsonify(traffic_info)
        else:
            return jsonify({"error": "Unable to retrieve traffic data"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
