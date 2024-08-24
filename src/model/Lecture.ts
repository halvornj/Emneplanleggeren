class Lecture {
  readonly day: string;
  readonly startTime: number;
  readonly endTime: number;
  constructor(day: string, startTime: number, endTime: number) {
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
export { Lecture };
