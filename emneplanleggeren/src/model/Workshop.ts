import { Lecture } from "./Lecture";

class Workshop extends Lecture {
  constructor(day: string, startTime: number, endTime: number) {
    super(day, startTime, endTime);
  }
}
export { Workshop };
