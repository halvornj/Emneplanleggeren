import json
class workshop:
    def __init__(self, day, start_time, end_time):
        self.day = day
        self.start_time = start_time
        self.end_time = end_time

    def jsonExport(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__
            
        )
    '''this is needed for adding objects in set to find the unique patterns'''
    def __repr__(self):
        return self.day + str(self.start_time) + str(self.end_time)
    def __hash__(self):
        return hash(self.__repr__())
    
    def __eq__(self, other):
        if isinstance(other, workshop):
            return self.__repr__()==other.__repr__() 
        else:
            return False