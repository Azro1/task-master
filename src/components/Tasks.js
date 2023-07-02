import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
      <p style={paragraphStyles}>If you forget to set a reminder double click on a task to set it</p>
    </>
  );
};

const paragraphStyles = {
  color: '#000',
  opacity: '0.5',
  top: '10px',
  position: 'relative',
  lineHeight: '1.5',
};

export default Tasks;
