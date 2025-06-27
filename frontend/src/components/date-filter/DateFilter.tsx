"use client";

import { redirect } from "next/navigation";
import { DatePickerWithRange } from "../date-pickers/DatePickerRange";
import { Button } from "../ui/button";
import {
  getCurrentWeek,
  getCurrentMonth,
  isToday,
  isWeek,
  isMonth,
  getStartOfToday,
  getEndOfToday,
} from "@/utils/date";

interface DateFilterProps {
  from: Date;
  to: Date;
}

export default function DateFilter({ from, to }: DateFilterProps) {
  const startDate = from;
  const endDate = to;

  return (
    <div className="flex items-center justify-end gap-2 flex-wrap">
      <Button
        variant={isToday(startDate, endDate) ? "default" : "outline"}
        onClick={() => {
          redirect("?from=" + getStartOfToday() + "&to=" + getEndOfToday());
        }}
      >
        Hoje
      </Button>
      <Button
        variant={isWeek(startDate, endDate) ? "default" : "outline"}
        onClick={() => {
          redirect("?from=" + getCurrentWeek().startDate + "&to=" + getCurrentWeek().endDate);
        }}
      >
        Semana
      </Button>
      <Button
        variant={isMonth(startDate, endDate) ? "default" : "outline"}
        onClick={() => {
          redirect("?from=" + getCurrentMonth().startDate + "&to=" + getCurrentMonth().endDate);
        }}
      >
        Mês
      </Button>
      <DatePickerWithRange from={startDate} to={endDate} />
    </div>
  );
}
