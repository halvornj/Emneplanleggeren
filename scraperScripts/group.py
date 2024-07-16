from groupLecture import groupLecture
import json

class group():
    def __init__(self, name):
        self.name = name
        self.groupLectures = []

    def addLecture(self, groupLecture):
        self.groupLectures.append(groupLecture)

    def getNumber(self):
        return self.number
    
    def jsonExport(self):
        for lect in self.groupLectures:
            lect = lect.jsonExport()
        return json.dumps(
            self,
            default=lambda o: o.__dict__, 
            ensure_ascii=False
        )