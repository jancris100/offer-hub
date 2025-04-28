'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  return (
    <div className="rounded-md border p-4">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        className="w-full"
        fromYear={1900}
        toYear={new Date().getFullYear()}
        captionLayout="dropdown"
        modifiersClassNames={{
          selected: 'bg-primary text-white',
          today: 'text-primary',
        }}
      />
    </div>
  );
}
