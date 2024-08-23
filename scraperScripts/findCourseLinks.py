from bs4 import BeautifulSoup
import requests

def scrapeAllUiOCourseLinks():
    URL = "https://www.uio.no/studier/emner/matnat/ifi/?filter.level=bachelor&filter.semester=h24&filter.teaching-language=norwegian"
    page = BeautifulSoup(requests.get(URL).text, "html.parser")
    #finding all the href links on the main index page
    courses = page.find_all('td',class_='vrtx-course-description-name')
    links = []
    for link in courses:
        for a in link.find_all('a', href=True):
            links.append(a['href'])
    print(links)
    print(len(links))
    return links

def main():
    pass


scrapeAllUiOCourseLinks()