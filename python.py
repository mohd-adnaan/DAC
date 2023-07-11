import cv2
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('./Screenshot.png', methods=['POST'])
def process_screenshot():
    # Get the uploaded screenshot image file
    screenshot = request.files['screenshot']

    # Read the image file using OpenCV
    image = cv2.imdecode(np.fromstring(screenshot.read(), np.uint8), cv2.IMREAD_COLOR)

    # Perform contour detection on the image
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(image, contours, -1, (0, 255, 0), 2)

    # Encode the original image and the image with contours as PNG files
    _, original_image = cv2.imencode('.png', image)
    _, contour_image = cv2.imencode('.png', image)

    # Convert the encoded images to byte arrays
    original_bytes = original_image.tobytes()
    contour_bytes = contour_image.tobytes()

    # Prepare the response
    response = {
        'original_image': original_bytes,
        'contour_image': contour_bytes
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run()
