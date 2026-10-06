import styles from './TaskItem.module.css'

export function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className={task.done ? `${styles.task} ${styles.isDone}` : styles.task}>
      <button
        type="button"
        className={styles.check}
        onClick={() => onToggle(task.id)}
        aria-pressed={task.done}
        aria-label={
          task.done ? `Marcar ${task.title} como pendiente` : `Completar ${task.title}`
        }
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.5 10.5l3 3 6-6.5" />
        </svg>
      </button>

      <span className={styles.title}>{task.title}</span>

      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(task.id)}
        aria-label={`Eliminar ${task.title}`}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6 6l8 8M14 6l-8 8" />
        </svg>
      </button>
    </li>
  )
}
