import { Course } from "@/model/Course";
import { GroupLecture } from "@/model/GroupLecture";
import { Lecture } from "@/model/Lecture";
import { Workshop } from "@/model/Workshop";
import { assert } from "console";
import { CSSProperties } from "react";
import { useState } from "react";

export default function Calendar({ courses }: { courses: Array<Course> }) {
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  const days = ["man", "tir", "ons", "tor", "fre"];
  //TODO find more colors, and test them to see if they are visible
  // sky-300, yellow-300, purple-300
  const colors = [
    "rgba(125, 211, 252,0.6)",
    "rgba(253, 224, 71, 0.6)",
    "rgba(216, 180, 254,0.6)",
  ];

  const codeColorMap = new Map<string, string>();
  //this is gonna suck:
  const lectureIsGroup = new Map<Lecture, string>(); //if lecture is in keys, it is a group lecture and the value is groupname. if not, it is not a group lecture
  //this could be removed later by rewriting the json and models to reference the other way
  const lectureCourseIds = new Map<Lecture, string>();
  const coursesByPeriod: Array<Array<Array<Lecture>>> = [
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ];
  const boxesByPeriod: Array<Array<Array<JSX.Element>>> = [
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ];

  courses.forEach((course) => {
    if (!codeColorMap.has(course.id)) {
      codeColorMap.set(course.id, colors[codeColorMap.size]);
    }
    course.lectures.forEach((lecture) => {
      try {
        coursesByPeriod[days.indexOf(lecture.day)][
          hours.indexOf(Math.floor(lecture.startTime))
        ].push(lecture);
        lectureCourseIds.set(lecture, course.id);
      } catch (e) {
        console.error("Error in lecture", lecture);
        throw e;
      }
    });
    course.workshops.forEach((workshop) => {
      coursesByPeriod[days.indexOf(workshop.day)][
        hours.indexOf(Math.floor(workshop.startTime))
      ].push(workshop);
      lectureIsGroup.set(workshop, "workshop");
      lectureCourseIds.set(workshop, course.id);
    });

    course.groups.forEach((group) => {
      try {
        group.groupLectures.forEach((groupLecture) => {
          coursesByPeriod[days.indexOf(groupLecture.day)][
            hours.indexOf(Math.floor(groupLecture.startTime))
          ].push(groupLecture);
          lectureIsGroup.set(groupLecture, group.name);
          lectureCourseIds.set(groupLecture, course.id);
        });
      } catch (e) {
        console.error("Error in group", group);
        throw e;
      }
    });
  });

  //double matrices baby
  coursesByPeriod.forEach((day, i) => {
    day.forEach((hour, j) => {
      hour.forEach((lecture, k) => {
        const courseId = lectureCourseIds.get(lecture) as string; //* this seems like i've just thrown in a non-null-assertion on accident
        const groupName: string | undefined = lectureIsGroup.get(lecture);
        const color = codeColorMap.get(courseId) as string;
        boxesByPeriod[i][j].push(
          createTimeBox(
            courseId,
            lecture,
            {
              backgroundColor: color,
              borderColor: color,
              width: `${(1 / hour.length) * 100}%`,
              left: `${(k / hour.length) * 100}%`,
            },
            groupName
          )
        );
      });
    });
  });

  return (
    <div className="w-3/4 min-w-96 bg-white rounded">
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
              <td className="p-2 border relative">{boxesByPeriod[0][0]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][0]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][0]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][0]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][0]} </td>
            </tr>
            <tr>
              <td className="border">09:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][1]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][1]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][1]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][1]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][1]} </td>
            </tr>
            <tr>
              <td className="border">10:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][2]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][2]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][2]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][2]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][2]} </td>
            </tr>
            <tr>
              <td className="border">11:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][3]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][3]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][3]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][3]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][3]} </td>
            </tr>
            <tr>
              <td className="border">12:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][4]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][4]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][4]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][4]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][4]} </td>
            </tr>
            <tr>
              <td className="border">13:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][5]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][5]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][5]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][5]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][5]} </td>
            </tr>
            <tr>
              <td className="border">14:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][6]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][6]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][6]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][6]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][6]} </td>
            </tr>
            <tr>
              <td className="border">15:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][7]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][7]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][7]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][7]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][7]} </td>
            </tr>
            <tr>
              <td className="border">16:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][8]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][8]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][8]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][8]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][8]} </td>
            </tr>
            <tr>
              <td className="border">17:00</td>
              <td className="p-2 border relative">{boxesByPeriod[0][9]} </td>
              <td className="p-2 border relative">{boxesByPeriod[1][9]} </td>
              <td className="p-2 border relative">{boxesByPeriod[2][9]} </td>
              <td className="p-2 border relative">{boxesByPeriod[3][9]} </td>
              <td className="p-2 border relative">{boxesByPeriod[4][9]} </td>
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
//*this should be a component
function createTimeBox(
  id: string,
  lecture: Lecture,
  style: CSSProperties,
  groupName?: string
): JSX.Element {
  const topOffset: string =
    ((lecture.startTime - Math.floor(lecture.startTime)) * 100).toString() +
    "%";
  const height: string = getTimeBlockSize(lecture);

  return (
    <div
      key={id + lecture.day + groupName}
      className={`absolute flex-col rounded-lg bg-opacity-60 z-1 border-solid border-2 overflow-hidden`}
      style={{
        ...style,
        top: topOffset,
        height: height,
      }}
    >
      <div className="text-center p-1 text-base md:text-lg font-semibold overflow-hidden">
        {id}
      </div>
      <div className="text-center p-0 text-sm md:text-base font-light overflow-hidden">
        {`${getTimeStringFormat(lecture.startTime)}-${getTimeStringFormat(
          lecture.endTime
        )}`}
        <br />
        {groupName ? groupName : ""}
      </div>
    </div>
  );
}

function getTimeStringFormat(time: number): string {
  const hour = Math.floor(time).toString();
  const minute = ((time - Math.floor(time)) * 0.6)
    .toFixed(2)
    .toString()
    .slice(2);
  return hour + ":" + minute;
}
