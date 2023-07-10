import cv2
import osmnx as ox
import numpy as np

# Get the latitude and longitude of the long-press location
latitude = 40.7128  # Replace with the latitude of the long-pressed location
longitude = -74.0060  # Replace with the longitude of the long-pressed location

# Obtain the live map screen using osmnx and the specified latitude and longitude
graph = ox.graph_from_point((latitude, longitude), distance=500, network_type='all')
fig, ax = ox.plot_graph(ox.project_graph(graph), show=False, close=False)

# Enable long-press gesture detection in your application
# Get the long-press coordinates and convert them to screen position (x, y)

# Capture the live screen at the long-press coordinates
image = fig.canvas.tostring_rgb()
width, height = fig.canvas.get_width_height()
image = np.frombuffer(image, dtype=np.uint8).reshape(height, width, 3)

# Preprocess the image
# Convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

# Apply image thresholding
_, threshold = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

# Perform contour detection
contours, _ = cv2.findContours(threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Draw the contours on the captured image
cv2.drawContours(image, contours, -1, (0, 255, 0), 2)

# Display the updated map with the highlighted building's boundary
cv2.imshow("Live Map with Building Boundary", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
