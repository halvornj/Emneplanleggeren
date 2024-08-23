from group import group
from lecture import lecture 
from workshop import workshop
from groupLecture import groupLecture
import json

class course:
 
    def __init__(self, id, name, semester):
        self.id = id
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
    def formatToLecture(self, day, start_time, end_time):
        _lecture = lecture(day, start_time, end_time)
        self.addLecture(_lecture)
        #self.printLectures()
        return _lecture

    def formatToGroup(self, day, start_time, end_time, groupName):
        _group = group(groupName.strip())
        self.addGroup(_group)
        _groupLecture = groupLecture( day, start_time, end_time)
        _group.addLecture(_groupLecture)
        #print(str(_group.name ) + _groupLecture.day + _groupLecture.start_time +' '+ _groupLecture.end_time )
        return _group

    def formatToWorkshop(self, day, start_time, end_time):
    
        _workshop = workshop(day, start_time, end_time)
        self.addWorkshop(_workshop)
        
        #self.printWorkshops()
        return _workshop

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
            indent=4,
            ensure_ascii=False
        )

    def writeJsonFile(self):
        try:
            data = self.jsonExport()
            with open('UiO.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
        except Exception as e:
            print(f"Error writing JSON to file: {e}")
        # Optionally read the file back to check its content
        self.readJsonFile('UiO.json')


    def readJsonFile(self, file):
        try:
            with open(file, 'r', encoding='utf-8') as json_data:
                d = json.load(json_data)
                print(d)
        except FileNotFoundError:
            print(f"File {file} not found.")
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON from file {file}: {e}")
        except Exception as e:
            print(f"Unexpected error reading JSON file {file}: {e}")



    def convert_time_to_decimal(time_str):
        hours, minutes = map(int, time_str.split(':'))
        minutes_in_decimal = minutes / 60
        decimal_time = hours + minutes_in_decimal
        formatted_time = f"{decimal_time:.2f}".rstrip('0').rstrip('.')
        return formatted_time

