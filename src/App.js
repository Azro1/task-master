import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useCollection } from './hooks/useCollection';

// firebase imports
import { db } from './components/firebase/config';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks } = useCollection('tasks')

  // Delete a Task
  const deleteTask = async (id) => {
      const docRefToDel = doc(db, 'tasks', id)
      await deleteDoc(docRefToDel)
  };

  // toggle update reminder
  const toggleReminder = async (id) => {
    const docRefToUpt = doc(db, 'tasks', id);
    let newTask;

    tasks.forEach((task) => {
      if (task.id === id) {
        newTask = { id, ...task };
      }
    });

    const updTask = { ...newTask, reminder: !newTask.reminder };

    await updateDoc(docRefToUpt, {
      reminder: updTask.reminder,
    });
  };

  return (
    <div className='wrapper'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <p style={{ color: '#000' }}>You don't have any tasks !</p>
      )}
    </div>
  );
}

export default App;
