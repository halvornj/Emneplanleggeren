import json
class workshop:
    def __init__(self, day, start_time, end_time):
        self.day = day
        self.start_time = start_time
        self.end_time = end_time

    def jsonExport(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__,
            ensure_ascii=False
            
        )
        