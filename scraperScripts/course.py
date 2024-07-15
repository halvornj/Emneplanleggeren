class course:
 
    def __init__(self, code, name, semester):
        self.code = code 
        self.name = name 
        self.semester = semester

    lectures=[]
    groups = []
    workshops = []

    def addLecture(self, lecture):
        self.lectures.append(lecture)
    
    def addGroups(self, groups):
        self.groups.append(groups)
    
    def addWorkshop(self, workshop):
        self.workshops.append(workshop)
    
    #this method will format and add lecture
    def formatToLecture(self, string):
        print(string)

    def formatToGroup(self, string):
        pass

    def formatToWorkshop(self, string):
        pass
