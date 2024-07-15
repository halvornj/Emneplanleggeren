import { GroupLecture } from "./GroupLecture";
import { Lecture } from "./Lecture";

class Group {
  readonly name: String;
  readonly lectures: Array<Lecture>;
  constructor(name: String, groupLectures: Array<GroupLecture> = []) {
    this.name = name;
    this.lectures = groupLectures;
  }
}
export { Group };
