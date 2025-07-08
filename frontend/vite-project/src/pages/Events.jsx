import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from '../components/EventForm';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchEvents = async () => {
    const res = await axios.get('/api/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    await axios.delete(`/api/events/${id}`);
    fetchEvents();
  };

  const startEdit = (event) => {
    setEditing(event);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const addToCart = (event) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item._id === event._id);
    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...event, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  // ✅ Format Date for Google Calendar
  const formatDateForCalendar = (date) => {
    const dt = new Date(date);
    return dt.toISOString().replace(/[-:]|(\.\d{3})/g, '').slice(0, 15) + 'Z';
  };

  // ✅ Create Calendar Link
  const getCalendarLink = (event) => {
    const start = formatDateForCalendar(event.date);
    const end = formatDateForCalendar(new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000)); // +2hr

    const url = new URL("https://www.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", event.title);
    url.searchParams.set("dates", `${start}/${end}`);
    url.searchParams.set("details", event.description);
    url.searchParams.set("location", event.location);

    return url.toString();
  };

  return (
    <div>
      <h1>Event Management</h1>
      <EventForm refresh={fetchEvents} editing={editing} cancelEdit={cancelEdit} />

      <h2>All Events</h2>
      <ul>
        {Array.isArray(events) && events.map((e) => (
          <li key={e._id}>
            <div>
              <strong>{e.title}</strong> — {e.date} — ₹{e.price}
              <br />
              {e.location} | {e.description}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={() => addToCart(e)}>Add to Cart</button>
              <button onClick={() => startEdit(e)}>Edit</button>
              <button onClick={() => deleteEvent(e._id)}>Delete</button>
              <a href={getCalendarLink(e)} target="_blank" rel="noreferrer">
                <button>Add to Google Calendar</button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
