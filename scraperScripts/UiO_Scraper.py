from bs4 import BeautifulSoup
import requests

#gathers all course page links and returns them in a list
def findAllCoursesLinks():
    URL = "https://www.uio.no/studier/emner/alle/"
    page = BeautifulSoup(requests.get(URL).text, "html.parser")

    #finding all the href links on the main index page
    courses = page.find_all('td',class_='vrtx-course-description-name')
    links = []
    for link in courses:
        for a in link.find_all('a', href=True):
            links.append(a['href'])
    return links




#this function must be called when from within the semester page 
def gatherCourseSchedule(semesterPage):
    schedule = semesterPage.find_all(id='vrtx-semester-links')
    schedule_href = schedule.find_all('a', string='Timeplan')

    lectures = [] #timestamps of all lectures
    seminars = [] #twodimensional array containing gropus nr 0 to x in outer and the seminar timestamps in the inner array.

    #visit schedule href 
    schedulePage = BeautifulSoup(requests.get(schedule_href), "html.parser")






#helping function, takes string example v24 or h24, 
#this is used for searching for schedule links for the given semester
def visitCoursePage(link, thisSemester, previousSemester): 
    link = 'https://www.uio.no'+link.replace('index.html', '')+ thisSemester + 'index/html'
    
    #first checking if thisSemester plan exists, if not get previous semester
    try: 

        page =  BeautifulSoup(requests.get(link).text, "html.parser")
        #continue
        gatherCourseSchedule(page)
        
        
    except:
        #if f.eks h24 not exist, check if v24 exists, if not, dont return anything,
        #  we dont store down more than the most recent info from a semester
        try:

            link = 'https://www.uio.no'+link.replace('index.html', '')+ previousSemester + 'index/html'
            page = BeautifulSoup(requests.get(link).text, "html.parser")
            gatherCourseSchedule(page)
        except:

            print('Error : no page found at '+ link)
            return 
     
    

    
    

def main():

    links = findAllCoursesLinks()
    #now that we have all the links we can visit each course and gather data

    #test
    visitCoursePage('/studier/emner/hf/ifikk/ANT1500/index.html', 'v24','h24')

    #for link in links:
        #visitCoursePage(link, 'Høst 2024')

main()





