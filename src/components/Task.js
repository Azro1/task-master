import { FaBell, FaTimesCircle } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      {task.reminder && <FaBell style={bellStyles} />}
      <h3>
        {task.text}{' '}
        <FaTimesCircle style={circleStyles} onClick={() => onDelete(task.id)} />
      </h3>
      <p>{task.day}</p>
      <p>{task.time}</p>
    </div>
  );
};

const circleStyles = {
  color: 'red',
  cursor: 'pointer',
};

const bellStyles = {
  float: 'left',
  color: '#FFA500',
};

export default Task;
