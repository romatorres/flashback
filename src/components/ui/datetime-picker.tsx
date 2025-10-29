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
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(
    date || new Date()
  );

  React.useEffect(() => {
    if (date) {
      setSelectedDateTime(date);
    }
  }, [date]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const newDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedDateTime.getHours(),
      selectedDateTime.getMinutes()
    );
    setSelectedDateTime(newDateTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDateTime = new Date(selectedDateTime);
    let hour = newDateTime.getHours();
    let minute = newDateTime.getMinutes();

    if (name === "hour") {
      hour = parseInt(value, 10);
    }
    if (name === "minute") {
      minute = parseInt(value, 10);
    }

    if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
      newDateTime.setHours(hour);
      newDateTime.setMinutes(minute);
      setSelectedDateTime(newDateTime);
    }
  };

  const handleConfirm = () => {
    setDate(selectedDateTime);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedDateTime(date || new Date());
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          onClick={() => setIsOpen(true)}
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
          selected={selectedDateTime}
          onSelect={handleDateSelect}
          initialFocus
          locale={ptBR}
        />
        <div className="p-3 border-t border-border space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Input
              type="number"
              name="hour"
              value={String(selectedDateTime.getHours()).padStart(2, "0")}
              onChange={handleTimeChange}
              className="w-16 text-center"
              min="0"
              max="23"
            />
            <span>:</span>
            <Input
              type="number"
              name="minute"
              value={String(selectedDateTime.getMinutes()).padStart(2, "0")}
              onChange={handleTimeChange}
              className="w-16 text-center"
              min="0"
              max="59"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="w-full"
            >
              Cancelar
            </Button>
            <Button size="sm" onClick={handleConfirm} className="w-full">
              Confirmar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
