import cv2 as cv
import numpy as np

# Load the image
img = cv.imread('C:/xampp/htdocs/AdnaanISRO/DAC/flask-server/EdgeDetection/TestImages/b.png')
# Convert the image to grayscale
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

# Apply Gaussian blur to reduce noise
blur = cv.GaussianBlur(gray, (3, 3), 3)

# Detect edges using Canny edge detection
canny = cv.Canny(blur, 100, 200)

# Display the Canny edges
cv.imshow("Canny Edges", canny)

# Apply binary thresholding to create a binary image
ret, thresh = cv.threshold(gray, 125, 255, cv.THRESH_BINARY)

# Dilate the edges to make them more connected
dilated = cv.dilate(canny, (7, 7), iterations=3)

# Find contours in the dilated image
contours, hierarchies = cv.findContours(dilated, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
print(f'{len(contours)} contours found')

# Create a blank image to draw the contours on
blank = np.zeros(img.shape, dtype="uint8")

# Draw the contours on the blank image in green color with thickness 1
cv.drawContours(blank, contours, -1, (0, 255, 0), 1)

# Display the image with contours
cv.imshow("Contours", blank)

# Wait for a key press and then close all windows
cv.waitKey(0)
cv.destroyAllWindows()
