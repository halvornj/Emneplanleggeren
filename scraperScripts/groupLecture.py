from lecture import lecture
import json 

class groupLecture(lecture):
    
    def __init__(self, day, start_time, end_time):
        super().__init__( day, start_time, end_time)

    def jsonExport(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=True
     
        )
    '''this is needed for adding objects in set to find the unique patterns'''
    def __repr__(self):
        return self.day + self.start_time + self.end_time
    def __hash__(self):
        return hash(self.__repr__())
    
    def __eq__(self, other):
        if isinstance(other, groupLecture):
            return self.__repr__()==other.__repr__() 
        else:
            return False