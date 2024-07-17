import { GroupLecture } from "./GroupLecture";
import { Lecture } from "./Lecture";

class Group {
  readonly name: string;
  readonly lectures: Array<Lecture>;
  constructor(name: string, groupLectures: Array<GroupLecture> = []) {
    this.name = name;
    this.lectures = groupLectures;
  }
}
export { Group };
