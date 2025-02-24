from UiO_Scraper import gatherCourseSchedule
from bs4 import BeautifulSoup
import requests
def main():
	print("test")
	link = "https://www.uio.no/studier/emner/matnat/ifi/IN3240/v25/index.html"
	#link = "https://www.uio.no/studier/emner/matnat/ifi/IN3260/v25/index.html"
	page =  BeautifulSoup(requests.get(link).text, "html.parser")
	schedule = gatherCourseSchedule(page, "v25")
	print(schedule)
	print("done")
if __name__ == "__main__": main()
