"use client";

import { Course } from "@/model/Course";
import { Checkbox } from "./checkbox";

export default function ChosenBar({
  courses,
  checkFunction,
}: {
  courses: Array<Course>;
  checkFunction: (course: Course, setActive: boolean) => void;
}) {
  const courseDivs: Array<JSX.Element> = [];
  courses.forEach((course, i) => {
    var abbrCourseName = course.name.slice(0, 22);
    if (abbrCourseName.length < course.name.length) {
      //if has been shortened, add ellipsis
      abbrCourseName += "...";
    }
    courseDivs.push(
      <div key={course.id} className="flex items-center space-x-2">
        <Checkbox
          id={course.id}
          defaultChecked={true}
          onCheckedChange={(checked) =>
            checkFunction(course, checked as boolean)
          }
        />
        <label htmlFor={course.id} className="text-sm">
          {course.id}
          <br />
          <span className="text-xs text-gray-500">{abbrCourseName}</span>
        </label>
      </div>
    );
  });
  return (
    <div className="w-11/12 items-center p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Valgte emner</h2>
      <div className="flex w-full h-full space-x-3">{courseDivs}</div>
    </div>
  );
}
