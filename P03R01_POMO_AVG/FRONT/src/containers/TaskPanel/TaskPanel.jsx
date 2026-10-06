import { Button } from '../../components/Button/Button'
import { Panel } from '../../components/Panel/Panel'
import { TaskForm } from '../../components/TaskForm/TaskForm'
import { TaskList } from '../../components/TaskList/TaskList'
import { useTasks } from '../../hooks/useTasks'
import styles from './TaskPanel.module.css'

/**
 * Contenedor: el único componente de la app que guarda estado además de App.
 *
 * Su trabajo es pedirle los datos al hook y repartirlos. Los componentes que
 * usa (TaskForm, TaskList) no saben de dónde salen las tareas ni cómo se
 * guardan: sólo reciben props y avisan cuando pasa algo.
 */
export function TaskPanel() {
  const { tasks, doneCount, addTask, toggleTask, removeTask, clearDone } = useTasks()

  return (
    <Panel className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Tareas</h2>

        {tasks.length > 0 && (
          <p className={styles.count}>
            {doneCount}/{tasks.length}
          </p>
        )}
      </header>

      <TaskForm onAdd={addTask} />

      <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />

      {doneCount > 0 && (
        <Button variant="plain" className={styles.clear} onClick={clearDone}>
          Borrar completadas
        </Button>
      )}
    </Panel>
  )
}
