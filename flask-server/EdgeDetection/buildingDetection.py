# import csv
# import folium
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options as ChromeOptions

# file_path = r'C:\xampp\htdocs\AdnaanISRO\DAC\flask-server\coordinates.csv'
# # open csv file containing latitudes and longitudes to read through
# reader = csv.reader(open(file_path, 'r'), delimiter=',')

# # set your access token obtained from your mapbox account. See instructions on GitHub for more
# mapboxAccessToken = 'pk.eyJ1IjoiYWRuYWFuMDcwOSIsImEiOiJjbGo3azM4aDQwazlrM2ZxcHBvaHR4azBhIn0.y10hp3ht1p4vtHiS2_DdBw'
# # set tile set
# mapboxTilesetId = 'mapbox.satellite'

# # Create options for the Chrome WebDriver
# chrome_options = ChromeOptions()
# chrome_options.add_argument("--headless")  # Run Chrome in headless mode

# # Loop through all coordinates in the csv file
# for row in reader:
#     # Check if the row contains the required number of elements
#     if len(row) >= 3:
#         # Extracting each cell in row individually
#         key = (row[0], row[1], row[2])
#         print(key)

#         m = folium.Map(
#             location=[float(row[0]), float(row[1])],
#             zoom_start=20,
#             tiles='https://api.tiles.mapbox.com/v4/' + mapboxTilesetId + '/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken,
#             attr='mapbox.com')

#         # Save the map as an HTML file
#         m.save(row[2] + '.html')

#         # Use the Chrome WebDriver to take a screenshot of the HTML page and save as a .png file
#         driver = webdriver.Chrome(options=chrome_options)
#         driver.get('file:///' + row[2] + '.html')
#         driver.set_window_size(1024, 768)
#         driver.save_screenshot(row[2] + '.png')
#         driver.quit()
#     else:
#         print("Error: Invalid row format in the CSV file.")
#---------------------------------------------------------------------------------------------------------------------


# import csv
# import folium
# import io
# import math
# from PIL import Image
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options as ChromeOptions
# from shapely.geometry import Polygon



# file_path = r'C:\xampp\htdocs\AdnaanISRO\DAC\flask-server\coordinates.csv'
# # open csv file containing latitudes and longitudes to read through
# reader = csv.reader(open(file_path, 'r'), delimiter=',')


# # Set your access token obtained from your mapbox account. See instructions on GitHub for more
# mapboxAccessToken = 'pk.eyJ1IjoiYWRuYWFuMDcwOSIsImEiOiJjbGo3azM4aDQwazlrM2ZxcHBvaHR4azBhIn0.y10hp3ht1p4vtHiS2_DdBw'
# # Set tile set
# mapboxTilesetId = 'mapbox.satellite'

# # Function to draw polygon with six draggable markers around the specified latitude and longitude
# def draw_polygon(lat, lon, filename):
#     m = folium.Map(
#         location=[lat, lon],
#         zoom_start=20,  # Increase the zoom level even more for a detailed view
#         tiles='https://api.tiles.mapbox.com/v4/' + mapboxTilesetId + '/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken,
#         attr='mapbox.com')

#     # Create six draggable markers forming a closed figure around the specified point
#     edge_length = 0.0005  # Shorten the distance between the markers
#     num_markers = 6  # Use six markers for the polygon
#     marker_points = []
#     for i in range(num_markers):
#         angle = i * 360 / num_markers
#         lat_point = lat + edge_length * math.cos(math.radians(angle))
#         lon_point = lon + edge_length * math.sin(math.radians(angle))
#         marker_points.append((lat_point, lon_point))

#     # Draw the polygon connecting the markers
#     folium.Polygon(locations=marker_points, color='blue', fill=True, fill_color='blue').add_to(m)

#     # Add draggable markers at each point
#     for point in marker_points:
#         folium.Marker(location=point, draggable=True).add_to(m)

#     m.save(filename + '.html')  # Save as html file
#     # Take screenshot of html page and save as .png file
#     img_data = m._to_png(4)
#     img = Image.open(io.BytesIO(img_data))
#     img.save(filename + '.png')

# # Create options for the Chrome WebDriver
# chrome_options = ChromeOptions()
# chrome_options.add_argument("--headless")  # Run Chrome in headless mode

# # Loop through all coordinates in the csv file
# for row in reader:
#     # Extracting each cell in row individually
#     latitude, longitude, filename = float(row[0]), float(row[1]), row[2]
#     print((latitude, longitude, filename))

#     # Use the Chrome WebDriver to take a screenshot of the HTML page and save as a .png file
#     driver = webdriver.Chrome(options=chrome_options)
#     draw_polygon(latitude, longitude, filename)
#     driver.quit()


#--------------------------------------------------------------------------------------------------------------------------------


# import csv
# import folium
# import io
# import math
# from PIL import Image
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service

# # Set your access token obtained from your mapbox account. See instructions on GitHub for more
# mapboxAccessToken = 'pk.eyJ1IjoiYWRuYWFuMDcwOSIsImEiOiJjbGo3azM4aDQwazlrM2ZxcHBvaHR4azBhIn0.y10hp3ht1p4vtHiS2_DdBw'
# # Set tile set
# mapboxTilesetId = 'mapbox.satellite'

# # Function to create the HTML file with the map and polygon
# def create_html(lat, lon, filename):
#     m = folium.Map(
#         location=[lat, lon],
#         zoom_start=20,  # Increase the zoom level even more for a detailed view
#         tiles='https://api.tiles.mapbox.com/v4/' + mapboxTilesetId + '/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken,
#         attr='mapbox.com')

#     # Create six draggable markers forming a closed figure around the specified point
#     edge_length = 0.0005  # Shorten the distance between the markers
#     num_markers = 6  # Use six markers for the polygon
#     marker_points = []
#     for i in range(num_markers):
#         angle = i * 360 / num_markers
#         lat_point = lat + edge_length * math.cos(math.radians(angle))
#         lon_point = lon + edge_length * math.sin(math.radians(angle))
#         marker_points.append((lat_point, lon_point))

#     # Draw the polygon connecting the markers
#     folium.Polygon(locations=marker_points, color='blue', fill=True, fill_color='blue').add_to(m)

#     # Add draggable markers at each point
#     for point in marker_points:
#         folium.Marker(location=point, draggable=True).add_to(m)

#     # Save the map as an HTML file
#     m.save(filename + '.html')

# # Set the path to the ChromeDriver executable
# chromedriver_path = r'C:\xampp\htdocs\AdnaanISRO\DAC\flask-server\EdgeDetection\chromedriver.exe'

# filePath = r'C:\xampp\htdocs\AdnaanISRO\DAC\flask-server\EdgeDetection\coordinates.csv'
# # Open csv file containing latitudes and longitudes to read through
# with open(filePath, 'r') as csvfile:
#     reader = csv.reader(csvfile, delimiter=',')

#     # Configure Chrome options
#     options = webdriver.ChromeOptions()
#     # Add any additional options you need, e.g., headless mode:
#     # options.add_argument("--headless")

#     # Set the path to the ChromeDriver executable
#     service = Service(executable_path=chromedriver_path)
#     driver = webdriver.Chrome(service=service, options=options)

#     # Loop through all coordinates in the csv file
#     for row in reader:
#         # Extracting each cell in row individually
#         latitude, longitude, filename = float(row[0]), float(row[1]), row[2]
#         print((latitude, longitude, filename))

#         # Call the function to create the HTML file with the map and polygon
#         create_html(latitude, longitude, filename)

# # Close the webdriver after processing all coordinates
# driver.quit()

#------------------------------------------------------------------------------------------ -----------------------

#Squares
# import csv
# import folium
# import math
# import cv2
# from PIL import Image
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service

# # Set your access token obtained from your mapbox account. See instructions on GitHub for more
# mapboxAccessToken = 'pk.eyJ1IjoiYWRuYWFuMDcwOSIsImEiOiJjbGo3azM4aDQwazlrM2ZxcHBvaHR4azBhIn0.y10hp3ht1p4vtHiS2_DdBw'
# # Set tile set
# mapboxTilesetId = 'mapbox.satellite'

# # Function to create the HTML file with the map and polygon
# def create_html(lat, lon, filename):
#     # Load the satellite image from the map provider (you'll need to implement this part)

#     # Perform image preprocessing (you'll need to implement this part)

#     # Use object detection to detect buildings in the image (you'll need to implement this part)

#     # Assuming you have detected a building and obtained its boundary coordinates
#     building_boundary_coordinates = [(lat, lon), (lat + 0.0001, lon), (lat + 0.0001, lon + 0.0001), (lat, lon + 0.0001)]

#     # Create the map and draw the polygon
#     m = folium.Map(
#         location=[lat, lon],
#         zoom_start=20,
#         tiles='https://api.tiles.mapbox.com/v4/' + mapboxTilesetId + '/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken,
#         attr='mapbox.com')

#     # Draw the polygon around the building
#     folium.Polygon(locations=building_boundary_coordinates, color='blue', fill=True, fill_color='blue').add_to(m)

#     # Add draggable markers at each point
#     for point in building_boundary_coordinates:
#         folium.Marker(location=point, draggable=True).add_to(m)

#     # Save the map as an HTML file
#     m.save(filename + '.html')

# # Set the path to the ChromeDriver executable
# chromedriver_path = r'C:\xampp\htdocs\AdnaanISRO\DAC\flask-server\EdgeDetection\chromedriver.exe'

# filePath = r'C:\xampp\htdocs\AdnaanISRO\DAC\flask-server\EdgeDetection\coordinates.csv'
# # Open csv file containing latitudes and longitudes to read through
# with open(filePath, 'r') as csvfile:
#     reader = csv.reader(csvfile, delimiter=',')

#     # Configure Chrome options
#     options = webdriver.ChromeOptions()
#     # Add any additional options you need, e.g., headless mode:
#     # options.add_argument("--headless")

#     # Set the path to the ChromeDriver executable
#     service = Service(executable_path=chromedriver_path)
#     driver = webdriver.Chrome(service=service, options=options)

#     # Loop through all coordinates in the csv file
#     for row in reader:
#         # Extracting each cell in row individually
#         latitude, longitude, filename = float(row[0]), float(row[1]), row[2]
#         print((latitude, longitude, filename))

#         # Call the function to create the HTML file with the map and polygon
#         create_html(latitude, longitude, filename)

# # Close the webdriver after processing all coordinates
# driver.quit()


#==========================================================================================================


