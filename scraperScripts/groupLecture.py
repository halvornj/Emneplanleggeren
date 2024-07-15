from lecture import lecture


class groupLecture(lecture):
    
    def __init__(self, day, start_time, end_time):
        super().__init__( day, start_time, end_time)

    def JsonExport(self):
        pass