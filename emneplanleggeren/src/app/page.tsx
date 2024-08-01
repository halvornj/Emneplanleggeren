"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/ui/calendar";
import { Course } from "@/model/Course";
import { Lecture } from "@/model/Lecture";
import { Group } from "@/model/Group";
import { GroupLecture } from "@/model/GroupLecture";
import ChosenBar from "@/components/ui/ChosenBar";
import React, { use, useEffect, useState } from "react";
import courses from "@/app/courses.json";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";

export default function Home() {
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
      if (!activeCourses.get(course)) {
        //just make sure it ain't aleady there
        setActiveCourses(new Map(activeCourses.set(course, true)));
      } else {
        console.error(
          "Course already in active ActiveCourses, cannot be re-added!"
        );
      }
    } else {
      //if we're supposed to remove the course
      if (activeCourses.has(course)) {
        setActiveCourses(new Map(activeCourses.set(course, false)));
      } else {
        console.error("Course not in active ActiveCourses, cannot be removed!");
      }
    }
  }
  function removeCourse(this: any, course: Course) {
    const newMap = new Map(activeCourses);
    const removed = newMap.delete(course);
    if (removed) setActiveCourses(newMap);
  }

  function onSelectionChange(key: React.Key) {
    if (
      Array.from(activeCourses.keys()).filter((course) => {
        return course.id == key.toString();
      }).length == 0
    ) {
      //if the key of the seletced course is not already in the selected courses
      const course = courses.find((course) => {
        return course.id == key.toString();
      }) as Course;
      setActiveCourses(new Map(activeCourses.set(course, true)));
    }
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      <div className="flex items-center w-full max-w-4xl mb-4 space-x-4">
        <Autocomplete
          label="emnekode"
          color={"default"}
          className="flex-1"
          defaultItems={courses}
          onSelectionChange={(key) => {
            if (key != null) {
              //stupid hack to make sure input is valid
              onSelectionChange(key);
            }
          }}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.id}</AutocompleteItem>
          )}
        </Autocomplete>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="UiO" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uio">UiO</SelectItem>
            <SelectItem value="ntnu">NTNU</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center flex-col w-full  space-x-4 ">
        <ChosenBar
          courses={Array.from(activeCourses.keys())}
          checkFunction={toggleCourse}
          removeFunction={removeCourse}
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
