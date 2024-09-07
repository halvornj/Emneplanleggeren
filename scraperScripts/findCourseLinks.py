from bs4 import BeautifulSoup
import requests

def getLinksForPage(page, links):
    courses = page.find_all('td',class_='vrtx-course-description-name')
    for link in courses:
        for a in link.find_all('a', href=True):
            links.append(a['href'])

def scrapeAllUiOCourseLinks():
    pageNo = 1
    baseURL = "https://www.uio.no/studier/emner/alle/?filter.semester=h24&filter.teaching-language=norwegian"
    links = []
    page = BeautifulSoup(requests.get(baseURL).text, "html.parser")
#finding all the href links on the main index page
    nextButton = page.find_all('a',class_='vrtx-next')
    while nextButton:
        #print(f"{pageNo=}")
        #print(f"{nextButton=}")
        #print(f"--------------------------------------")
        getLinksForPage(page, links)
        pageNo = pageNo +1
        page = BeautifulSoup(requests.get(baseURL+f"&page={pageNo}&u-page={pageNo}").text, "html.parser")
        nextButton = page.find_all('a',class_='vrtx-next')
    getLinksForPage(page, links)    
    print(f"{len(links)=}")
    return links


def main():
    pass
    #scrapeAllUiOCourseLinks()
