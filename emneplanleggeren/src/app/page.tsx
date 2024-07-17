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

export default function Home() {
  //!TO TEST
  const activeCourses: Array<Course> = [
    //todo this is just a test, replace this with something like await fetch("jsonfile") then obv decode json
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
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      <div className="flex items-center w-full max-w-4xl mb-4 space-x-4">
        <Input placeholder="Emnekode" className="flex-1" />
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="UiO" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uio">UiO</SelectItem>
            <SelectItem value="ntnu">NTNU</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-teal-800 text-white">Legg til</Button>
      </div>
      <div className="flex items-center flex-col w-full  space-x-4 ">
        <ChosenBar courses={activeCourses} />
        <Calendar courses={activeCourses as Array<Course>} />
      </div>
    </div>
  );
}
