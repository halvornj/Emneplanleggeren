from group import group
from lecture import lecture 
from workshop import workshop
from groupLecture import groupLecture
import json

class course:
 
    def __init__(self, code, name, semester):
        self.code = code 
        self.name = name 
        self.semester = semester
        self.lectures=[]
        self.groups = []
        self.workshops = []


    def addLecture(self, lecture):
        self.lectures.append(lecture)
    
    def addGroup(self, group):
        self.groups.append(group)
    
    def addWorkshop(self, workshop):
        self.workshops.append(workshop)
    
    #this method will format and add lecture
    def formatToLecture(self, string):
        string = string.replace('-','',1).strip()
        if 'og' in string:
            string = string.split('og')
        else:
            string = string.split('and')
        
     
        for el in string:
            el=el.strip().split('.')
            day = el[0].strip()
            time = el[1].split('-')
            start_time = time[0]
            end_time = time[1]

            _lecture = lecture(day, start_time, end_time)
            self.addLecture(_lecture)
        
        self.printLectures()
            

    def formatToGroup(self, string, groupName):
        _group = group(groupName.strip())
        self.addGroup(_group)
        string = string.replace('-','',1).strip()
        if 'og' in string:
            string = string.split('og')
        else:
            string = string.split('and')
        
        
        for el in string:
            el=el.strip().split('.')
            day = el[0].strip()
            time = el[1].split('-')
            start_time = time[0]
            end_time = time[1]

            _groupLecture = groupLecture( day, start_time, end_time)
            _group.addLecture(_groupLecture)
            print(str(_group.name ) + _groupLecture.day + _groupLecture.start_time +' '+ _groupLecture.end_time )
         
       



    def formatToWorkshop(self, string):
        string = string.replace('-','',1).strip()
        if 'og' in string:
            string = string.split('og')
        else:
            string = string.split('and')
        
     
        for el in string:
            el=el.strip().split('.')
            day = el[0].strip()
            time = el[1].split('-')
            start_time = time[0]
            end_time = time[1]

            _workshop = workshop(day, start_time, end_time)
            self.addWorkshop(_workshop)
        
        self.printWorkshops()

    def stringIsEnglish():
        pass

    def convertToNorwegian():
        pass

    def printLectures(self):
        for lecture in self.lectures:
            print(lecture.day  + lecture.start_time + ' ' + lecture.end_time)

    def printWorkshops(self):
        for ws in self.workshops:
            print(ws.day  + ws.start_time + ' ' + ws.end_time)

    def jsonExport(self):
        for lect in self.lectures:
            lect = lect.jsonExport()
        for gr in self.groups:
            gr = gr.jsonExport()
        for ws in self.workshops:
            ws = ws.jsonExport()
        
        return json.dumps(
            self,
            default=lambda o: o.__dict__, 
            indent=4
        )

    def writeJsonFile(self):
        data = self.jsonExport()
        with open('UiO.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False)
            #self.readJsonFile('UiO.json')

    def readJsonFile(self, file ):
        with open(file) as json_data:
            d = json.load(json_data)
            json_data.close()
            print(d)