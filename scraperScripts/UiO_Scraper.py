from bs4 import BeautifulSoup
import requests
from course import course
from group import groupLecture
from group import group
from lecture import lecture
from workshop import workshop
from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
import json
from findCourseLinks import scrapeAllUiOCourseLinks
# -*- coding: utf-8 -*-

driver = webdriver.Chrome()




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

    #using selenium to expand schedule fields
    driver.get(schedule_href)

    activities = driver.find_elements(By.ID, "activities")#list of activities elements

    
    for i in activities:

        clickable = i.find_elements(By.TAG_NAME, 'h3')

        '''maybe click all h3 first, lol this actually seems to be a must. '''
        for j in range(0, len(clickable)):
            driver.execute_script("arguments[0].click();", clickable[j])

        for j in range(0,len(clickable)):
            activityType= clickable[j].find_element(By.TAG_NAME, 'a').text.split(' ')[0][0:2]
            activityType= formatActivityType(activityType)
            
            if activityType=='group':

                name= clickable[j].find_element(By.TAG_NAME, 'a').text.split(' ')
                name = name[0]+name[1]
                _group= group(name)
                _course.addGroup(_group)
                driver.execute_script("arguments[0].click();", clickable[j])
                table= i.find_elements(By.TAG_NAME, 'tbody')
                #click o each element to get schedule 
                _course = scrapeTable(table[j], _course, activityType,_group)
                #loop through the first 3 weeks of schedule to find course dates and times

            else :

                driver.execute_script("arguments[0].click();", clickable[j])
                table= i.find_elements(By.TAG_NAME, 'tbody')
                #click o each element to get schedule 
                _course = scrapeTable(table[j], _course, activityType, None)
                #loop through the first 3 weeks of schedule to find course dates and times

    #_course.writeJsonFile()
    return _course

    '''
    _course.writeJsonFile()
'''
def formatActivityType(str):
    str= str.lower()
    match str:
        case 'fo':
            return 'lecture'
        case 'pl':
            return 'lecture'
        case 'le':
            return 'lecture'
        case 'gr':
            return 'group'
        case 'se':
            return 'group'
    return 'workshop'

def scrapeTable(tableDiv, _course, activityType, _group): #group is none unless passing a group object
    rows = tableDiv.find_elements(By.TAG_NAME, 'tr')
    uniqueLecture= set() 
    uniqueGroup= set()
    uniqueWorkshop= set()
    #every other row is a empty row which we will not scrape, starting from the first element
    rowsToScrape= len(rows)#the more rows, the slower the script will be, we just want the recuring structure, not one random guest lecture i:n the semester

    for i in range(1,rowsToScrape ,2):
        date = rows[i].find_element(By.CLASS_NAME, 'date').text
        if date==None or date=='':
            continue
        else:
            date = formatDate(date)
            time = rows[i].find_element(By.CLASS_NAME, 'time').find_elements(By.TAG_NAME, 'span')
            # the first span wil not be scraped as it does not contain anything useful
            start_time = float(course.convert_time_to_decimal(time[1].text.strip('–')))
            end_time = float(course.convert_time_to_decimal(time[2].text))

            match activityType:
                case 'lecture':
                    uniqueLecture.add(lecture(date, start_time, end_time)) 
                case 'group':
                    uniqueGroup.add(groupLecture(date, start_time, end_time)) 
                case 'workshop':
                    uniqueWorkshop.add(workshop(date, start_time, end_time)) 

    for l in uniqueLecture:
        _course.addLecture(l)
    for g in uniqueGroup:
        _group.addLecture(g)
    for w in uniqueWorkshop:
        _course.addWorkshop(w)
    return _course

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
    return gatherCourseSchedule(page,semester)

def main():
    start = time.time()
    #links = scrapeAllUiOCourseLinks()
    link1 = '/studier/emner/matnat/ifi/IN1000/'
    link2 = '/studier/emner/matnat/ifi/IN5020/'
    link3 = '/studier/emner/hf/ikos/KIN1010/'
    #test
    links = [link2]
    courses =[]

 

    for link in links:
        scanned= 0
        try:
            courses.append(visitCoursePage( link, 'h24','v25' ).jsonExport())
            scanned+=1
        except:
            print('could not scan ' + link)
            continue

    try:
        courses=  json.dumps(
            courses,
            default=lambda o: o.__dict__, 
            indent=4,
            ensure_ascii=False
        )
        
        with open('UiO.json', 'w', encoding='utf-8') as f:
            json.dump(courses,f,default=lambda o: o.__dict__,  indent=0,ensure_ascii=False)
            
    except Exception as e:
        print(f"Error writing JSON to file: {e}")
    # Optionally read the file back to check its content

    print("--- %s seconds ---" % (time.time()-start))
    print('scanned ' + str(scanned) + ' out of ' + str(len(links)))
main()





