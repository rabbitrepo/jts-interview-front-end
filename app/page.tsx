'use client'

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import MonthYearPicker from "@/components/MonthYearPicker";
import TypePieChart from "@/components/TypePieChart";
import DataTable from "@/components/DataTable";


const fetchReports = async (year: number, month: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/reports?year=${year}&month=${month}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function Home() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());

  const handleMonthChange = (value: number) => {
    setSelectedMonth(Number(value));
  };

  const handleYearChange = (value: number) => {
    setSelectedYear(Number(value));
  };

  const { data: query, error, isLoading } = useQuery({
    queryKey: ['reports', selectedYear, selectedMonth],
    queryFn: () => fetchReports(selectedYear, selectedMonth),
  });
  console.log('query:', query)

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center gap-3">
        <Spinner>กำลังโหลด...</Spinner>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center text-red-500">Error: {error?.message}</div>
    </div>
  );
  
  return (
    <div className="p-8 max-w-[95%] mx-auto">
      <div className="space-y-8">
        <MonthYearPicker
          month={selectedMonth}
          year={selectedYear}
          onMonthChange={(value) => handleMonthChange(Number(value))}
          onYearChange={(value) => handleYearChange(Number(value))}
        />

        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Distribution by Type</h2>
          {query.data.summary.total > 0 ? <TypePieChart data={query.data.summary.by_type} /> : <p className="text-center">ไม่พบข้อมูล</p>}
        </Card>

        <DataTable data={query.data} />
      </div>
    </div>
  );
}