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

export default function CourseSelectionBox({
  course,
  checkFunction,
  removeFunction,
}: {
  course: Course;
  checkFunction: (course: Course, selectedGroup: Group | null) => void;
  removeFunction: (course: Course) => void;
}) {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([course.groups[0].name ?? "ingen grupper"])
  );

  const handleSelectionChange = (keys: SharedSelection) => {
    if (typeof keys === "string") {
      setSelectedKeys(new Set([keys]));
    } else if (keys instanceof Set) {
      const strings = new Set<string>();
      const keyArr = Array.from(keys);
      for (var i = 0; i < keyArr.length; i++) {
        strings.add(keyArr[i].toString());
      }
      setSelectedKeys(new Set(strings));
      checkFunction(
        course,
        course.groups.find((group) => group.name == keyArr[0]) ?? null
      );
    }
  };

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  var abbrCourseName = course.name.slice(0, 22);
  if (abbrCourseName.length < course.name.length) {
    //if has been shortened, add ellipsis
    abbrCourseName += "...";
  }
  return (
    <div key={course.id} className="flex items-center space-x-2">
      <Checkbox
        id={course.id}
        defaultChecked={true}
        onCheckedChange={(checked) => {
          let group: Group | null = null;
          if (checked) {
            group =
              course.groups.find((group) => group.name == selectedValue) ??
              null;
          }
          checkFunction(course, group);
        }}
      />
      <label htmlFor={course.id} className="text-sm">
        {course.id}
        <Button
          isIconOnly
          aria-label="remove"
          size="sm"
          onClick={() => removeFunction(course)}
          className="m-2"
        >
          <Clear size={12} />
        </Button>
        <br />
        <span className="text-xs text-gray-500">{abbrCourseName}</span>

        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
          >
            {course.groups.map((group) => (
              <DropdownItem key={group.name}>{group.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </label>
    </div>
  );
}
