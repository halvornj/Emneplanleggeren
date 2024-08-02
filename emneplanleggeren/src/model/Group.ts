import { GroupLecture } from "./GroupLecture";
import { Lecture } from "./Lecture";

class Group {
  readonly name: string;
  readonly groupLectures: Array<Lecture>;
  constructor(name: string, groupLectures: Array<GroupLecture> = []) {
    this.name = name;
    this.groupLectures = groupLectures;
  }
}
export { Group };
