import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      <div className="flex items-center w-full max-w-4xl mb-4 space-x-4">
        <Input placeholder="Emnekode" className="flex-1" />
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="UiO" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uio">UiO</SelectItem>
            <SelectItem value="ntnu">NTNU</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-teal-800 text-white">Legg til</Button>
      </div>
      <div className="flex w-full max-w-4xl space-x-4">
        <div className="w-1/4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Valgte emner</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="in1000" defaultChecked />
              <label htmlFor="in1000" className="text-sm">
                IN1000
                <br />
                <span className="text-xs text-gray-500">
                  Introduksjon til obj...
                </span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in2010" />
              <label htmlFor="in2010" className="text-sm">
                IN2010
                <br />
                <span className="text-xs text-gray-500">
                  Algoritmer og data...
                </span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in1020" defaultChecked />
              <label htmlFor="in1020" className="text-sm">
                IN1020
                <br />
                <span className="text-xs text-gray-500">
                  Introduksjon til dat...
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-3/4 bg-white rounded shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-fixed ">
              <thead>
                <tr>
                  <th className="w-1/6 p-2 text-right text-sm bg-gray-100 border-none">
                    08:00
                  </th>
                  <th className="w-1/6 p-2 border">Today</th>
                  <th className="w-1/6 p-2 border">Tuesday, 16/07</th>
                  <th className="w-1/6 p-2 border">Wednesday, 17/07</th>
                  <th className="w-1/6 p-2 border">Thursday, 18/07</th>
                  <th className="w-1/6 p-2 border">Friday, 19/07</th>
                </tr>
              </thead>
              <tbody className="[&_td:nth-child(1)]:text-right text-sm">
                <tr>
                  <td className="p-2 border">09:00</td>
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                </tr>
                <tr>
                  <td className="p-2 border">10:00</td>
                  <td className="p-2 border relative">
                    <div className="absolute top-1/2 left-0 w-full h-12 bg-purple-300 rounded-lg flex items-center justify-center">
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
                  <td className="p-2 border">11:00</td>
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                </tr>
                <tr>
                  <td className="p-2 border">12:00</td>
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
                  <td className="p-2 border">13:00</td>
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                </tr>
                <tr>
                  <td className="p-2 border">14:00</td>
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                </tr>
                <tr>
                  <td className="p-2 border">15:00</td>
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                  <td className="p-2 border" />
                </tr>
                <tr>
                  <td className="p-2 border">16:00</td>
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
      </div>
    </div>
  );
}
