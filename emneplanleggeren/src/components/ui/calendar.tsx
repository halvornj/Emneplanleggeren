import { Course } from "@/model/Course";
import { Lecture } from "@/model/Lecture";

export default function Calendar({ courses }: { courses: Array<Course> }) {
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  const days = ["man.", "tir.", "ons.", "tor.", "fre."];
  //TODO find more colors, and test them to see if they are visible
  const colors = ["bg-sky-300", "bg-yellow-300", "bg-purple-300"];

  const tableList: Array<Array<Array<JSX.Element>>> = [
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ];
  courses.forEach((course) => {
    course.lectures.forEach((lecture) => {
      console.log(
        "lecture",
        lecture,
        "top:",
        (lecture.startTime - Math.floor(lecture.startTime)) * 50
      );
      const topOffset: string =
        ((lecture.startTime - Math.floor(lecture.startTime)) * 100).toString() +
        "%";
      const height: string = getTimeBlockSize(lecture);
      const color: string = colors.pop() || "bg-purple-300";
      console.log("color", color);

      console.log("height", height);
      console.log("topOffset", topOffset);
      //* i know what you're thinking: why only color in the string template, but offset and height as props?
      //* well, the color is a constant, and the height and offset are calculated, and aparrently tailwind just silently drops 'em if they're not consant.
      //TODO split horizontal on the width as well. Width is 1/sizeOfList, and left- is 100%-offsetIntoList*width
      var timeBox = (
        <div
          className={`absolute left-0  w-full ${color} rounded-lg flex items-center justify-center bg-opacity-75 border-solid border-2  z-1`}
          style={{
            top: topOffset,
            height: height,
          }}
        >
          <span className="text-sm font-medium">
            {course.id}
            <br />
            todo times
          </span>
        </div>
      );
      tableList[days.indexOf(lecture.day)][
        hours.indexOf(Math.floor(lecture.startTime))
      ].push(timeBox);
    });
  });

  return (
    <div className="w-3/4 bg-white rounded">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-fixed [&_td]:h-16">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-1/10 p-0 text-right text-sm bg-gray-100 font-normal border-none"
              ></th>
              <th scope="col" className="w-1/6 p-2 border">
                Man.
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Tir.
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Ons.
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Tor.
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Fre.
              </th>
            </tr>
          </thead>
          <tbody
            className="[&_td:nth-child(1)]:bg-gray-100 
                              [&_td:nth-child(1)]:text-right 
                              [&_td:nth-child(1)]:text-sm p-0 
                              [&_td:nth-child(1)]:align-top
                              [&_td:nth-child(1)]:font-normal
                              [&_td:nth-child(1)]:border-none
                              "
          >
            <tr>
              <td className="border">08:00</td>
              <td className="p-2 border relative">{tableList[0][0]} </td>
              <td className="p-2 border relative">{tableList[1][0]} </td>
              <td className="p-2 border relative">{tableList[2][0]} </td>
              <td className="p-2 border relative">{tableList[3][0]} </td>
              <td className="p-2 border relative">{tableList[4][0]} </td>
            </tr>
            <tr>
              <td className="border">09:00</td>
              <td className="p-2 border relative">{tableList[0][1]} </td>
              <td className="p-2 border relative">{tableList[1][1]} </td>
              <td className="p-2 border relative">{tableList[2][1]} </td>
              <td className="p-2 border relative">{tableList[3][1]} </td>
              <td className="p-2 border relative">{tableList[4][1]} </td>
            </tr>
            <tr>
              <td className="border">10:00</td>
              <td className="p-2 border relative">{tableList[0][2]} </td>
              <td className="p-2 border relative">{tableList[1][2]} </td>
              <td className="p-2 border relative">{tableList[2][2]} </td>
              <td className="p-2 border relative">{tableList[3][2]} </td>
              <td className="p-2 border relative">{tableList[4][2]} </td>
            </tr>
            <tr>
              <td className="border">11:00</td>
              <td className="p-2 border relative">{tableList[0][3]} </td>
              <td className="p-2 border relative">{tableList[1][3]} </td>
              <td className="p-2 border relative">{tableList[2][3]} </td>
              <td className="p-2 border relative">{tableList[3][3]} </td>
              <td className="p-2 border relative">{tableList[4][3]} </td>
            </tr>
            <tr>
              <td className="border">12:00</td>
              <td className="p-2 border relative">{tableList[0][4]} </td>
              <td className="p-2 border relative">{tableList[1][4]} </td>
              <td className="p-2 border relative">{tableList[2][4]} </td>
              <td className="p-2 border relative">{tableList[3][4]} </td>
              <td className="p-2 border relative">{tableList[4][4]} </td>
            </tr>
            <tr>
              <td className="border">13:00</td>
              <td className="p-2 border relative">{tableList[0][5]} </td>
              <td className="p-2 border relative">{tableList[1][5]} </td>
              <td className="p-2 border relative">{tableList[2][5]} </td>
              <td className="p-2 border relative">{tableList[3][5]} </td>
              <td className="p-2 border relative">{tableList[4][5]} </td>
            </tr>
            <tr>
              <td className="border">14:00</td>
              <td className="p-2 border relative">{tableList[0][6]} </td>
              <td className="p-2 border relative">{tableList[1][6]} </td>
              <td className="p-2 border relative">{tableList[2][6]} </td>
              <td className="p-2 border relative">{tableList[3][6]} </td>
              <td className="p-2 border relative">{tableList[4][6]} </td>
            </tr>
            <tr>
              <td className="border">15:00</td>
              <td className="p-2 border relative">{tableList[0][7]} </td>
              <td className="p-2 border relative">{tableList[1][7]} </td>
              <td className="p-2 border relative">{tableList[2][7]} </td>
              <td className="p-2 border relative">{tableList[3][7]} </td>
              <td className="p-2 border relative">{tableList[4][7]} </td>
            </tr>
            <tr>
              <td className="border">16:00</td>
              <td className="p-2 border relative">{tableList[0][8]} </td>
              <td className="p-2 border relative">{tableList[1][8]} </td>
              <td className="p-2 border relative">{tableList[2][8]} </td>
              <td className="p-2 border relative">{tableList[3][8]} </td>
              <td className="p-2 border relative">{tableList[4][8]} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
 * @param lecture: Lecture - The lecture to get the time block size for"
 * @returns String - The height of the lecture block in the timetable, as a string to be used in tailwind as h-{value}
 */

function getTimeBlockSize(lecture: Lecture): string {
  const duration = lecture.endTime - lecture.startTime;
  return (duration * 4).toString() + "rem";
}
