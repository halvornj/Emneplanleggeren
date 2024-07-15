from groupLecture import groupLecture

class group():
    def __init__(self, number):
        self.number = number
        
    groupLectures = []

    def addLecture(self, groupLecture):
        self.groupLectures.append(groupLecture)