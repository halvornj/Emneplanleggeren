from bs4 import BeautifulSoup
import requests
 
URL = "https://www.uio.no/studier/emner/"
page = BeautifulSoup(requests.get(URL).text, "html.parser")

print(page.p)