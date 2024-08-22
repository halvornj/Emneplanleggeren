from bs4 import BeautifulSoup
import requests
from course import course
from group import group
from lecture import lecture
from workshop import workshop
from selenium import webdriver 
from selenium.webdriver.common.by import By


# -*- coding: utf-8 -*-

driver = webdriver.Chrome()

def driverTest():
    print(driver.get("https://www.uio.no/studier/emner/alle/"))
    driver.quit()

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

''' funksjonen under er den funksjonen jeg m[ bruke selenium i. Activity divs p[ trykkes p[ og expandes med evenlistener'''
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
    #schedulePage = BeautifulSoup(requests.get(schedule_href).text, "html.parser")
    
    '''HER ENDRER JEG '''
    #using selenium to expand schedule fields
    driver.get(schedule_href)

    activities = driver.find_elements(By.ID, "activities")#list of activities elements

    print(len(activities))
    for i in activities:


        clickable = i.find_element(By.TAG_NAME, 'h3')
        
        driver.execute_script("arguments[0].click();", clickable)
        driver.implicitly_wait(1) # seconds
        scheduleRows= i.find_element(By.TAG_NAME, 'tbody')


        #click o each element to get schedule 
    
        scrapeLectureTable(scheduleRows, _course)
        #loop through the first 3 weeks of schedule to find course dates and times
    
        return
'''

    _course.writeJsonFile()
'''

def scrapeLectureTable(tableDiv, course):
    rows = tableDiv.find_elements(By.TAG_NAME, 'tr')
    uniqueLectures= set() 
    #every other row is a empty row which we will not scrape, starting from the first element
    rowsToScrape= 12 #the more rows, the slower the script will be, we just want the recuring structure, not one random guest lecture in the semester
    for i in range(1,rowsToScrape,2):
     
        date = rows[i].find_element(By.CLASS_NAME, 'date').text
        if date==None or date=='':
            continue
        
        date = formatDate(date)

        time = rows[i].find_element(By.CLASS_NAME, 'time').find_elements(By.TAG_NAME, 'span')
        # the first span wil not be scraped as it does not contain anything useful
        start_time = time[1].text.strip('-')
        end_time = time[2].text
   
        uniqueLectures.add(lecture(date, start_time, end_time)) 

    for l in uniqueLectures:
        course.addLecture(l)

    course.printLectures()
    print(len(uniqueLectures))


def formatDate(str):
    # example Tu. 20. Aug we are interrested in Tu

    day = str.split(' ')
    day= day[0].replace('.', '').lower()
    match day:
        case 'ma':
            return 'man'
        case 'mo':
            return 'man'
        
        case 'ti':
            return 'tir'
        case 'tu':
            return 'tir'

        case 'on':
            return 'ons'
        case 'we':
            return 'ons'

        case 'to':
            return 'tor'
        case 'th':
            return 'tor'

        case 'fr':
            return 'fre'
        


def scrapeGroupTable(tableDiv):
    pass

    

def scrapeworkshopTable(tableDiv):
    pass




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





