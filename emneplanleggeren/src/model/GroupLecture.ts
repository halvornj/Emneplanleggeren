import { Lecture } from "./Lecture";

class GroupLecture extends Lecture {
  constructor(day: String, startTime: number, endTime: number) {
    super(day, startTime, endTime);
  }
}
export { GroupLecture };
