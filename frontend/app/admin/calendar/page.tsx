"use client"
import  { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; 
import { EventInput } from "@fullcalendar/core";
import { ReasonForLeave } from "@/app/components/model/DialogBox";
import { useEffect } from "react";
export default function MultiMonthCalendar() {
  const [leaves, setLeaves] = useState<EventInput[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo);
    setOpen(true);
  };

  useEffect(() => {
    if (title && selectedDate) {
      setLeaves((prev) => [
        ...prev,
        {
          title,
          start: selectedDate.startStr,
          end: selectedDate.endStr,
          backgroundColor: "gray",
          borderColor: "gray",
        },
      ]);
    }
  }, [title]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <ReasonForLeave open={open} setOpen={setOpen} title={title} setTitle={setTitle} />
      <FullCalendar
        plugins={[multiMonthPlugin, interactionPlugin, dayGridPlugin, timeGridPlugin]} // ✅ Add timeGridPlugin
        initialView="multiMonthYear"
        selectable={true}
        selectMirror={true}
        select={handleDateSelect}
        events={leaves}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear",
        }}
        views={{
          dayGridMonth: { type: "dayGridMonth" },
          timeGridWeek: { type: "timeGrid", duration: { weeks: 1 } },
          timeGridDay: { type: "timeGrid", duration: { days: 1 } },
          multiMonthYear: { type: "multiMonth", duration: { months: 1 } },
          multiMonthFourMonth: { type: "multiMonth", duration: { months: 4 } },
        }}
      />
    </div>
  );
}
