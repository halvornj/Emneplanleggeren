import { Group } from "./Group";
import { Lecture } from "./Lecture";

class Course {
  readonly id: string;
  readonly name: string;
  readonly semester: string;
  readonly lectures: Array<Lecture>;
  readonly groups: Array<Group>;
  readonly workshops: Array<Workshop>;
  constructor(
    id: string,
    name: string,
    semester: string,
    lectures: Array<Lecture> = [],
    groups: Array<Group> = [],
    workshops: Array<Workshop> = []
  ) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.lectures = lectures;
    this.groups = groups;
    this.workshops = workshops;
  }
}
export { Course };
