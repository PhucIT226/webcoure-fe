import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const initialEvents = [
  {
    id: "1",
    title: "🚚 Ship Order #1234",
    start: "2025-08-27T10:00:00",
    end: "2025-08-27T12:00:00",
    backgroundColor: "#60a5fa",
  },
  {
    id: "2",
    title: "🏍️ Delivery to Customer",
    start: "2025-08-28T14:00:00",
    end: "2025-08-28T16:00:00",
    backgroundColor: "#34d399",
  },
  {
    id: "3",
    title: "🏢 Pickup from Warehouse",
    start: "2025-08-29T09:00:00",
    end: "2025-08-29T10:30:00",
    backgroundColor: "#fbbf24",
  },
  {
    id: "4",
    title: "🚚 Ship Order #1235",
    start: "2025-08-30T11:00:00",
    end: "2025-08-30T13:00:00",
    backgroundColor: "#818cf8",
  },
  {
    id: "5",
    title: "🏍️ Express Delivery",
    start: "2025-08-31T15:00:00",
    end: "2025-08-31T16:30:00",
    backgroundColor: "#f472b6",
  },
  {
    id: "6",
    title: "🏢 Pickup from Warehouse",
    start: "2025-09-01T08:30:00",
    end: "2025-09-01T09:30:00",
    backgroundColor: "#4ade80",
  },
  {
    id: "7",
    title: "🚚 Ship Order #1236",
    start: "2025-09-02T10:00:00",
    end: "2025-09-02T12:00:00",
    backgroundColor: "#facc15",
  },
  {
    id: "8",
    title: "🏍️ Delivery to Customer",
    start: "2025-09-03T13:00:00",
    end: "2025-09-03T14:30:00",
    backgroundColor: "#38bdf8",
  },
];

function Shipping() {
  const [events] = useState(initialEvents);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Shipping Schedule
      </h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            height="auto"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Shipping;
