"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function DateTimePicker({
  date,
  setDate,
  className,
}: DateTimePickerProps) {
  const [time, setTime] = React.useState({
    hour: date ? date.getHours() : 0,
    minute: date ? date.getMinutes() : 0,
  });

  React.useEffect(() => {
    if (date) {
      setTime({
        hour: date.getHours(),
        minute: date.getMinutes(),
      });
    }
  }, [date]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(undefined);
      return;
    }
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      time.hour,
      time.minute
    );
    setDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newTime = { ...time, [name]: parseInt(value, 10) || 0 };

    if (
      newTime.hour >= 0 &&
      newTime.hour < 24 &&
      newTime.minute >= 0 &&
      newTime.minute < 60
    ) {
      setTime(newTime);
      if (date) {
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          newTime.hour,
          newTime.minute
        );
        setDate(newDate);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP 'às' HH:mm", { locale: ptBR })
          ) : (
            <span>Selecione data e hora</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          locale={ptBR}
        />
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-center gap-2">
            <Input
              type="number"
              name="hour"
              value={String(time.hour).padStart(2, "0")}
              onChange={handleTimeChange}
              className="w-16 text-center"
              min="0"
              max="23"
            />
            <span>:</span>
            <Input
              type="number"
              name="minute"
              value={String(time.minute).padStart(2, "0")}
              onChange={handleTimeChange}
              className="w-16 text-center"
              min="0"
              max="59"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
