# Emneplanleggeren

This is an opensource project for course planning at universities and colleges. The course data can be scraped or entered mannually by contributers in a json file belonging to the course's university or college.

The json format is as followed:

{
    "code": "IN1000",
    "name": "Introduksjon til objektorientert programmering",
    "semester": "h24",
    "lectures": [
        {
            "day": "ons",
            "start_time": " 12:15",
            "end_time": "14:00"
        }
    ],
    "groups": [
        {
            "name": "Gruppe 1 design",
            "groupLectures": [
                {
                    "day": "man",
                    "start_time": " 12:15",
                    "end_time": "14:00"
                },
                {
                    "day": "tor",
                    "start_time": " 12:15",
                    "end_time": "14:00"
                }
            ]
        }
    ],
    "workshops": [
        {
            "day": "tor",
            "start_time": " 08:15",
            "end_time": "10:00"
        },
        {
            "day": "fre",
            "start_time": " 14:15",
            "end_time": "18:00"
        }
    ]
}
the objects are:

- Course
  Where 'code' is the course identifier,
  'name' is the name of the course,
  'semester' is the season followed by year in the format h24 meaning spring 2025 and h25 meaning autumn 2024,
  'lectures' is a list of lecture objects

- Lecture
  'day' can be in english or norwegian, always contains only the first three letters of the day like mon, tue and so on
  'start_time'
  'end_time'

  MORE DOCUMENTATION WILL BE ADDED SOON
