import { TaskItem } from '../TaskItem/TaskItem'
import styles from './TaskList.module.css'

export function TaskList({ tasks, onToggle, onRemove }) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Agrega lo que quieras sacar en estos pomodoros.</p>
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  )
}
