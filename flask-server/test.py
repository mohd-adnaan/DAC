from selenium import webdriver

browser = webdriver.Chrome()
browser.get("https://www.google.com")
button = browser.find_element_by_id("btnI")
button.click()

browser.close()