from lecture import lecture
import json 

class groupLecture(lecture):
    
    def __init__(self, day, start_time, end_time):
        super().__init__( day, start_time, end_time)

    def jsonExport(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=True,
            indent=4
        )