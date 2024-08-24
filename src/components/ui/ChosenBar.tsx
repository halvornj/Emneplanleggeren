"use client";

import { Course } from "@/model/Course";
import { Checkbox } from "./checkbox";
import { Button } from "@nextui-org/button";
import { Clear } from "@/res/clear";
import { Group } from "@/model/Group";
import React, { use, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { SharedSelection } from "@nextui-org/system";
import CourseSelectionBox from "./CourseSelectionBox";

export default function ChosenBar({
  courses,
  checkFunction,
  removeFunction,
}: {
  courses: Array<Course>;
  checkFunction: (course: Course, selectedGroup: Group | null) => void;
  removeFunction: (course: Course) => void;
}) {
  const courseDivs: Array<JSX.Element> = [];
  courses.forEach((course, i) => {
    courseDivs.push(
      <CourseSelectionBox
        key={i}
        course={course}
        checkFunction={checkFunction}
        removeFunction={removeFunction}
      />
    );
  });
  return (
    <div className="w-11/12 items-center p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Valgte emner</h2>
      <div className="flex w-full h-full space-x-3">{courseDivs}</div>
    </div>
  );
}
