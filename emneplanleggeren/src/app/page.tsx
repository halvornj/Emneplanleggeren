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
        <div className="w-11/12 items-center p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Valgte emner</h2>
          <div className="flex w-full h-full space-x-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="in1000" defaultChecked />
              <label htmlFor="in1000" className="text-sm">
                IN1000
                <br />
                <span className="text-xs text-gray-500">
                  Introduksjon til obj...
                </span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in2010" />
              <label htmlFor="in2010" className="text-sm">
                IN2010
                <br />
                <span className="text-xs text-gray-500">
                  Algoritmer og data...
                </span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in1020" defaultChecked />
              <label htmlFor="in1020" className="text-sm">
                IN1020
                <br />
                <span className="text-xs text-gray-500">
                  Introduksjon til dat...
                </span>
              </label>
            </div>
          </div>
        </div>
        <Calendar courses={activeCourses as Array<Course>} />
      </div>
    </div>
  );
}
