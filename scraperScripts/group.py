from groupLecture import groupLecture
import json

class group():
    def __init__(self, name):
        self.name = name
    
    groupLectures = []

    def addLecture(self, groupLecture):
        self.groupLectures.append(groupLecture)

    def getNumber(self):
        return self.number
    
    def JsonExport(self):
        pass