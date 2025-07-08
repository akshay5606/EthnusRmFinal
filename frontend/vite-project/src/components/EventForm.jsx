import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ refresh, editing, cancelEdit }) => {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    price: '',
    capacity: ''
  });

  useEffect(() => {
    if (editing) {
      setEvent(editing);
    } else {
      setEvent({
        title: '',
        date: '',
        location: '',
        description: '',
        price: '',
        capacity: ''
      });
    }
  }, [editing]);

  const handleChange = e => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (editing) {
      await axios.put(`/api/events/${editing._id}`, event);
      cancelEdit();
    } else {
      await axios.post('/api/events', event);
    }

    refresh();
    setEvent({
      title: '',
      date: '',
      location: '',
      description: '',
      price: '',
      capacity: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editing ? 'Update Event' : 'Create Event'}</h2>
      <input name="title" placeholder="Title" value={event.title} onChange={handleChange} />
      <input name="date" placeholder="Date" value={event.date} onChange={handleChange} />
      <input name="location" placeholder="Location" value={event.location} onChange={handleChange} />
      <input name="description" placeholder="Description" value={event.description} onChange={handleChange} />
      <input name="price" placeholder="Price" value={event.price} onChange={handleChange} />
      <input name="capacity" placeholder="Capacity" value={event.capacity} onChange={handleChange} />
      <button type="submit">{editing ? 'Update' : 'Create'}</button>
      {editing && <button onClick={cancelEdit} type="button">Cancel</button>}
    </form>
  );
};

export default EventForm;
