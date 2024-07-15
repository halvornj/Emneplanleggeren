import { Course } from "@/model/Course";

export default function Calendar({ courses }: { courses: Array<Course> }) {
  return (
    <div className="w-3/4 bg-white rounded">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-fixed [&_td]:h-16">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-1/10 p-0 text-right text-sm bg-gray-100 font-normal border-none"
              ></th>
              <th scope="col" className="w-1/6 p-2 border">
                Today
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Tuesday, 16/07
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Wednesday, 17/07
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Thursday, 18/07
              </th>
              <th scope="col" className="w-1/6 p-2 border">
                Friday, 19/07
              </th>
            </tr>
          </thead>
          <tbody
            className="[&_td:nth-child(1)]:bg-gray-100 
                              [&_td:nth-child(1)]:text-right 
                              [&_td:nth-child(1)]:text-sm p-0 
                              [&_td:nth-child(1)]:align-top
                              [&_td:nth-child(1)]:font-normal
                              [&_td:nth-child(1)]:border-none
                              "
          >
            <tr>
              <td className="border">08:00</td>
              <td className="p-2 border">
                <div></div>
              </td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">09:00</td>
              <td className="p-2 border"></td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">10:00</td>
              <td className="p-2 border relative">
                {/*? an hour(60 mins) is 4rem. this means a 120 minute lecture is 8rem, and a standard 105-minute lecture is 8rem-25%. */}
                <div className="absolute top-1/4 left-0 w-full h-[calc(8rem-25%)] bg-purple-300 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium">
                    IN1000
                    <br />
                    10:15 - 12:00
                  </span>
                </div>
              </td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">11:00</td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border relative">
                <div className="absolute top-1/2 left-0 w-full h-12 bg-pink-300 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium">
                    IN1020
                    <br />
                    12:15 - 14:00
                  </span>
                </div>
              </td>
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">12:00</td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">13:00</td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">14:00</td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">15:00</td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
            <tr>
              <td className="border">16:00</td>
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
              <td className="p-2 border" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
