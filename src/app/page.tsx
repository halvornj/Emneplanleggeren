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
import rawCourses from "@/data/UiO.json";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { useAsyncList } from "@react-stately/data";

export default function Home() {
  //const courses :Array<Course> = JSON.parse(rawCourses).map((course: string) => {
  //  return JSON.parse(course) as Course;
  //});
  //const courses = JSON.parse(rawCourses) as Array<Course>;
  const courses = useAsyncList<Course>({
    async load() {
      return { items: JSON.parse(rawCourses) };
    },
  });

  const [activeCourses, setActiveCourses] = useState(
    new Map<Course, Group | null>([])
  );

  const [displayCourses, setDisplayCourses] = useState<Array<Course>>([]);

  function toggleCourse(
    this: any,
    course: Course,
    selectedGroup: Group | null
  ) {
    if (!activeCourses.has(course)) {
      console.error("Course not in active ActiveCourses, cannot be toggled!");
      return;
    }
    if (selectedGroup != null) {
      //if we're supposed to add the course

      const truncatedCourse = { ...course };
      //!this is a stupid hotfix for the mvp, the use of groups as a flag for if a course is active is stupid and should be changed
      if (selectedGroup.name == "") {
        truncatedCourse.groups = [];
      } else {
        truncatedCourse.groups = [selectedGroup];
      }
      const newDisplayCourses = displayCourses.filter((displayCourse) => {
        return displayCourse.id != course.id;
      });
      setDisplayCourses([...newDisplayCourses, truncatedCourse]);
    } else {
      //if we're supposed to remove the course

      setDisplayCourses(
        displayCourses.filter((displayCourse) => {
          return displayCourse.id != course.id;
        })
      );
    }
  }
  function removeCourse(this: any, course: Course) {
    const newMap = new Map(activeCourses);
    const removed = newMap.delete(course);
    if (removed) {
      setActiveCourses(newMap);
      setDisplayCourses(
        displayCourses.filter((displayCourse) => {
          return displayCourse.id != course.id;
        })
      );
    }
  }

  function onSelectionChange(key: React.Key) {
    courses.setFilterText("");
    if (
      Array.from(activeCourses.keys()).filter((course) => {
        return course.id == key.toString();
      }).length == 0
    ) {
      //if the key of the seletced course is not already in the selected courses
      const course = courses.items.find((course: Course) => {
        return course.id == key.toString();
      }) as Course;
      if (course.groups.length == 0) {
        //we're trying to turn on a course with no groups, but I'm stupid and used groups as the identifier for if they're active.
        setActiveCourses(new Map(activeCourses.set(course, null)));
        toggleCourse(course, new Group(""));
      } else {
        setActiveCourses(new Map(activeCourses.set(course, course.groups[0])));
        toggleCourse(course, course.groups[0]);
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      <div className="flex items-center w-full max-w-4xl mb-4 space-x-4">
        <Autocomplete
          label="emnekode"
          color={"default"}
          className="flex-1"
          inputValue={courses.filterText}
          isLoading={courses.isLoading}
          defaultItems={courses.items}
          onSelectionChange={(key) => {
            if (key != null) {
              //stupid hack to make sure input is valid
              onSelectionChange(key);
            }
          }}
          onInputChange={courses.setFilterText}
        >
          {(item: Course) => (
            <AutocompleteItem key={item.id}>{item.id}</AutocompleteItem>
          )}
        </Autocomplete>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="UiO" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uio">UiO</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center flex-col w-full  space-x-4 ">
        <ChosenBar
          courses={Array.from(activeCourses.keys())}
          checkFunction={toggleCourse}
          removeFunction={removeCourse}
        />
        <Calendar courses={displayCourses} />
      </div>
    </div>
  );
}
