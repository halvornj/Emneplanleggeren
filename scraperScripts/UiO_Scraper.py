from bs4 import BeautifulSoup
import requests
from course import course
from group import group
from lecture import lecture
from workshop import workshop


'''
notes for my self

I know this code is shit. please help me.

'''

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
def gatherCourseSchedule(semesterPage, semester):
    #schedule = semesterPage.find_all(id='vrtx-semester-links')
    schedule_href = semesterPage.find_all('a', string='Timeplan')
    courseTitle = semesterPage.find('div', class_='vrtx-context-box vrtx-context-box-linked').a.string.split('-')
    code = courseTitle[0].strip()
    name = courseTitle[1].strip()

    _course = course(code, name, semester)
    

    #coverign edge cases, there is english and norvegian, if no schedule found, return.
    if not schedule_href:
        schedule_href = semesterPage.find_all('a',string='Schedule')
    if not schedule_href:
        return 
    
    #formating the href
    schedule_href = schedule_href[0]['href']
    print('scanning link :' + schedule_href)
    #visit schedule href 
    schedulePage = BeautifulSoup(requests.get(schedule_href).text, "html.parser")
    

    #here we gather schedule info
    schedules = schedulePage.find_all(class_='cs-toc-section-link')

    #adding all teachings to lists
    for event in schedules:
        if 'forelesninger' in event.text.lower():
            _course.formatToLecture(event.span.string)
     
       
        elif 'gruppe' in event.text.lower():
            groupName= event.text.split('-')[0].strip()
            _course.formatToGroup(event.span.string, groupName )
        else:
            _course.formatToWorkshop(event.span.string)
        #print(event.span.text)
        #print(event.text)

    _course.jsonExport()



#helping function, takes string example v24 or h24, 
#this is used for searching for schedule links for the given semester
def visitCoursePage(link, thisSemester, previousSemester): 
    link = 'https://www.uio.no'+link.replace('/index.html', '')+ '/' + thisSemester + '/index.html'
    semester = thisSemester
    #first checking if thisSemester plan exists, if not get previous semester
    try: 

        page =  BeautifulSoup(requests.get(link).text, "html.parser")
        #continue

    except:
        #if f.eks h24 not exist, check if v24 exists, if not, dont return anything,
        #  we dont store down more than the most recent info from a semester
        #try:

        link = link.replace('/index.html', '').replace(thisSemester,'') + previousSemester + '/index.html'
        page = BeautifulSoup(requests.get(link).text, "html.parser")
        semester= previousSemester


        #except:

           # print('Error : no page found at '+ link)
            # return 
            #return 

    gatherCourseSchedule(page,semester)

def main():

    links = findAllCoursesLinks()
    #now that we have all the links we can visit each course and gather data

    #test
    visitCoursePage('/studier/emner/matnat/ifi/IN1000/', 'h24','v25')

    #for link in links:
        #visitCoursePage(link, 'Høst 2024')
    

main()





