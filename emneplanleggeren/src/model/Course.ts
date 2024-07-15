import { Group } from "./Group";
import { Lecture } from "./Lecture";

class Course {
  readonly id: String;
  readonly name: String;
  readonly semester: String;
  readonly lectures: Array<Lecture>;
  readonly groups: Array<Group>;
  readonly workshops: Array<Workshop>;
  constructor(
    id: String,
    name: String,
    semester: String,
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
