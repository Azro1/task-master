import { useState } from 'react';
import { MdDateRange, MdOutlineAccessTime } from 'react-icons/md';

// firebase imports
import { db } from '../components/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reminder, setReminder] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reference firestore collection
    const ref = collection(db, 'tasks');

    // convert DatePicker objects into formatted date and time strings before sending to firestore db
    const weekDay = selectedDate.toLocaleDateString('en-GB', {
      weekday: 'short',
    });
    const dayMonthYear = selectedDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const date = `${weekDay} ${dayMonthYear}`;

    const time = selectedTime.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // add new document to firestore collection
    await addDoc(ref, {
      text: text,
      day: date,
      time: time,
      reminder: reminder,
    });

    setText('');
    setSelectedDate('');
    setSelectedTime('');
    setReminder(false);
  };

  return (
    <form
      className='add-form'
      onSubmit={handleSubmit}
      style={{ position: 'relative' }}
    >
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          required
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day</label>
        <DatePicker
          placeholderText={'Please select a date'}
          required
          dateFormat='EEE dd MMM yyyy'
          timeFormat={false}
          minDate={new Date()}
          value={selectedDate}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <MdDateRange
          style={{
            position: 'absolute',
            right: '5px',
            top: '132px',
          }}
        />
        <label>Time</label>
        <DatePicker
          placeholderText={'Please select a Time'}
          required
          showTimeSelect
          showTimeSelectOnly
          timeFormat='HH:mm'
          dateFormat='HH:mm'
          value={selectedTime}
          selected={selectedTime}
          onChange={(time) => setSelectedTime(time)}
        />
        <MdOutlineAccessTime
          style={{
            position: 'absolute',
            right: '5px',
            top: '211px',
          }}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          id='check'
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  );
};


export default AddTask;
