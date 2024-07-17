import { Lecture } from "@/model/Lecture";

export default function Timebox(
  id: string,
  lecture: Lecture,
  codeColorMap: Map<string, string>,
  style: React.CSSProperties,
  groupName?: string
) {
  //TODO split horizontal on the width as well. Width is 1/sizeOfList, and left- is 100%-offsetIntoList*width
  return (
    <div
      key={id + lecture.day}
      className={`absolute left-0  w-full rounded-lg flex items-center justify-center bg-opacity-60 z-1 border-solid border-2 align-top`}
      style={{
        ...style,
        top:
          (
            (lecture.startTime - Math.floor(lecture.startTime)) *
            100
          ).toString() + "%",
        height: getTimeBlockSize(lecture),
        backgroundColor: codeColorMap.get(id) as string,
      }}
    >
      <div className="absolute text-center top-0 m-2 text-lg font-semibold">
        {id}
      </div>
      <div className="absolute text-center bottom-1/4 m-2 text-base font-light">
        {`${getTimeStringFormat(lecture.startTime)}-${getTimeStringFormat(
          lecture.endTime
        )}`}
      </div>
      <div className="absolute text-center bottom-0 m-2 text-base font-light">
        {groupName}
      </div>
    </div>
  );
}

function getTimeStringFormat(time: number): string {
  const hour = Math.floor(time).toString();
  const minute = ((time - Math.floor(time)) * 0.6)
    .toFixed(2)
    .toString()
    .slice(2);
  return hour + ":" + minute;
}

/*
 * @param lecture: Lecture - The lecture to get the time block size for"
 * @returns String - The height of the lecture block in the timetable, as a string to be used in tailwind as h-{value}
 */
function getTimeBlockSize(lecture: Lecture): string {
  const duration = lecture.endTime - lecture.startTime;
  return (duration * 4).toString() + "rem";
}
