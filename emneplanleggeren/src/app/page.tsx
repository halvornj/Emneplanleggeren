"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Calendar from "@/components/ui/calendar";
import { Course } from "@/model/Course";
import { Lecture } from "@/model/Lecture";
import { Group } from "@/model/Group";
import { GroupLecture } from "@/model/GroupLecture";
import ChosenBar from "@/components/ui/ChosenBar";
import { use, useEffect, useState } from "react";

export default function Home() {
  const allCourses = fetch("courses.json");

  const [activeCourses, setActiveCourses] = useState(
    new Map<Course, boolean>([
      //todo this is just a test, replace this with something like await fetch("jsonfile")
      [
        new Course(
          "IN1000",
          "Introduksjon til objektorientert programmering",
          "h24",
          [new Lecture("man.", 10.25, 12.0)],
          [
            new Group("gruppe 1", [
              new GroupLecture("tir.", 12.25, 14.0),
              new GroupLecture("tor.", 14.25, 16.0),
            ]),
          ]
        ),
        true,
      ],
      [
        new Course(
          "IN1020",
          "Introduksjon til datamaskiner og databehandling",
          "h24",
          [new Lecture("ons.", 12.25, 14.0)],
          [
            new Group("Gruppe 1", [new GroupLecture("tir.", 14.25, 16.0)]),
            new Group("Gruppe 2", [new GroupLecture("ons.", 14.25, 16.0)]),
            new Group("Gruppe 3", [new GroupLecture("tor.", 14.25, 16.0)]),
          ]
        ),
        true,
      ],
    ])
  );

  function toggleCourse(this: any, course: Course, setActive: boolean) {
    console.debug("Toggling course", course, setActive);
    if (!activeCourses.has(course)) {
      console.error("Course not in active ActiveCourses, cannot be toggled!");
      return;
    }
    if (setActive) {
      //if we're supposed to add the course
      console.debug("course is supposed to be added now:");
      if (!activeCourses.get(course)) {
        //just make sure it ain't aleady there
        console.debug("Adding course", course);
        setActiveCourses(new Map(activeCourses.set(course, true)));
      } else {
        console.error(
          "Course already in active ActiveCourses, cannot be re-added!"
        );
      }
    } else {
      //if we're supposed to remove the course
      console.debug("course is supposed to be removed now:");
      if (activeCourses.has(course)) {
        console.debug("Removing course", course);
        setActiveCourses(new Map(activeCourses.set(course, false)));
      } else {
        console.error("Course not in active ActiveCourses, cannot be removed!");
      }
    }
  }

  console.debug(activeCourses);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      <div className="flex items-center w-full max-w-4xl mb-4 space-x-4">
        <Input placeholder="Emnekode" className="flex-1" />
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="UiO" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(activeCourses.keys()).map((course) => {
              return (
                <SelectItem value={course.id.toLowerCase()}>
                  {course.id}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button className="bg-teal-800 text-white">Legg til</Button>
      </div>
      <div className="flex items-center flex-col w-full  space-x-4 ">
        <ChosenBar
          courses={Array.from(activeCourses.keys())}
          checkFunction={toggleCourse}
        />
        <Calendar
          courses={Array.from(activeCourses.keys()).filter((course) => {
            //filter out the ActiveCourses that are not active
            return activeCourses.get(course) == true;
          })}
        />
      </div>
    </div>
  );
}
