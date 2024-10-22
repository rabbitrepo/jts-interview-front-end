import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface MonthYearPickerProps {
    month: number;
    year: number;
    onMonthChange: (value: string) => void;
    onYearChange: (value: string) => void;
}

export default function MonthYearPicker({ month, year, onMonthChange, onYearChange }: MonthYearPickerProps) {
    return (
        <div className="flex space-x-4">
            <Select onValueChange={onMonthChange} value={month.toString()}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={onYearChange} value={year.toString()}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 81 }, (_, i) => (
                        <SelectItem key={i} value={(2020 + i).toString()}>
                            {2020 + i}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};