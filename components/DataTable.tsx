/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DailyAmount, TypeData } from "@/types/data";
import { Data } from "react-minimal-pie-chart/types/commonTypes";
import { Card } from "./ui/card";

interface DataTableProps {
    data: Data
}

export default function DataTable({ data }: DataTableProps) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const getDailyAmount = (dailyAmounts: DailyAmount[], day: number) => {
        const amount = dailyAmounts.find(d => d.day === day)?.amount;
        return amount !== undefined ? amount.toLocaleString() : '-';
    };

    return (
        <Card className="mt-8 shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[1000px] relative">
                    <thead>
                        <tr className="border-b bg-gray-200">
                            <th className="text-left p-4 font-medium w-[100px]">Type</th>
                            <th className="text-left p-4 font-medium w-[200px] sticky left-0 bg-inherit">Sub Type</th>
                            {days.map((day) => (
                                <th key={day} className="text-right p-4 font-medium min-w-[80px]">
                                    {day}
                                </th>
                            ))}
                            <th className="text-right p-4 font-medium min-w-[100px] sticky right-0 bg-inherit">1 - 31</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((type: TypeData) =>
                            type.sub_types.map((subType, subTypeIndex) => (
                                <tr key={subType.sub_type_id} className="border-b hover:bg-gray-50">
                                    {subTypeIndex === 0 && (
                                        <td
                                            rowSpan={type.sub_types.length}
                                            className="p-4 bg-gray-100 font-semibold sticky left-0"
                                        >
                                            {type.type_name}
                                        </td>
                                    )}
                                    <td className="p-4 sticky left-0 bg-white">{subType.sub_type_name}</td>
                                    {days.map((day) => (
                                        <td key={day} className="text-right p-4">
                                            {getDailyAmount(subType.daily_amounts, day)}
                                        </td>
                                    ))}
                                    <td className="text-right p-4 font-medium sticky right-0 bg-white">
                                        {subType.total.toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                        <tr className="border-t-2 bg-gray-100 font-bold">
                            <td className="p-4 sticky left-0 bg-inherit">Total</td>
                            <td></td>
                            {days.map((day) => (
                                <td key={day} className="text-right p-4">
                                    {data.summary.by_date.find(d => d.day === day)?.amount.toLocaleString() || '0'}
                                </td>
                            ))}
                            <td className="text-right p-4 sticky right-0 bg-inherit">
                                {data.summary.total.toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
};