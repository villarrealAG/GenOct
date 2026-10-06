import { AuroraBackground } from './components/AuroraBackground/AuroraBackground'
import { TimerCard } from './components/TimerCard/TimerCard'
import { TaskPanel } from './containers/TaskPanel/TaskPanel'
import { GOAL_DEFAULT, GOAL_MAX, GOAL_MIN } from './constants/timer'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTimer } from './hooks/useTimer'
import styles from './App.module.css'

/**
 * Aquí viven los datos del timer, y de aquí bajan por props.
 *
 * ¿Por qué el estado del timer está aquí y no dentro de TimerCard?
 * Porque el fondo de la pantalla también cambia de color según la fase
 * (el data-mode de abajo), y el fondo es HERMANO de la tarjeta. Cuando dos
 * componentes necesitan el mismo dato, el dato vive en el ancestro común.
 */
export default function App() {
  const timer = useTimer()
  const [goal, setGoal] = useLocalStorage('pomodoro.goal', GOAL_DEFAULT)

  function changeGoal(nuevaMeta) {
    if (nuevaMeta < GOAL_MIN || nuevaMeta > GOAL_MAX) return

    setGoal(nuevaMeta)
  }

  return (
    <div className={styles.stage} data-mode={timer.mode}>
      <AuroraBackground />
      <main className={styles.stack}>
        <TimerCard timer={timer} goal={goal} onChangeGoal={changeGoal} />
        <TaskPanel />
      </main>
    </div>
  )
}
