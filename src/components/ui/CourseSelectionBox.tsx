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
import {
  ArrowDown,
  ArrowUp,
  ArrowUp01,
  ArrowUp01Icon,
  ArrowUpCircle,
  ArrowUpFromDot,
  ArrowUpFromLine,
  ArrowUpIcon,
  ArrowUpSquare,
  Triangle,
} from "lucide-react";

export default function CourseSelectionBox({
  course,
  checkFunction,
  removeFunction,
}: {
  course: Course;
  checkFunction: (course: Course, selectedGroup: Group | null) => void;
  removeFunction: (course: Course) => void;
}) {
  const [selectedKeys, setSelectedKeys] = React.useState(() => {
    if (course.groups.length == 0) {
      return new Set(["ingen grupper"]);
    } else {
      return new Set([course.groups[0].name ?? "ingen grupper"]); //default to first group, it has to exist here because else branch but js/ts doesn't have smart-cast, Kotlin-master-race
    }
  });
  const [isOpen, setIsOpen] = React.useState(false);

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

  function Arrow() {
    if (isOpen) {
      return <ArrowUp size={20} opacity={0.5} />;
    } else {
      return <ArrowDown size={20} opacity={0.5} />;
    }
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

        <Dropdown
          onOpenChange={(isOpen) => {
            setIsOpen(isOpen);
          }}
        >
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedValue}
              <Arrow />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="select group"
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
