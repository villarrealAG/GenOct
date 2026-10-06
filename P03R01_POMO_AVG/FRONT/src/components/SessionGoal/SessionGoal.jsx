import { Button } from '../Button/Button'
import { GOAL_MAX, GOAL_MIN } from '../../constants/timer'
import styles from './SessionGoal.module.css'

export function SessionGoal({ completed, goal, onChangeGoal }) {
  const reached = completed >= goal
  
  const pips = []
  for (let i = 0; i < goal; i++) {
    pips.push(i)
  }

  return (
    <div className={styles.goal}>
      <div className={styles.row}>
        <p className={styles.label}>Meta de sesión</p>

        <div className={styles.stepper}>
          <Button
            variant="plain"
            className={styles.step}
            onClick={() => onChangeGoal(goal - 1)}
            disabled={goal <= GOAL_MIN}
            ariaLabel="Quitar un pomodoro a la meta"
          >
            −
          </Button>

          <span className={styles.value}>{goal}</span>

          <Button
            variant="plain"
            className={styles.step}
            onClick={() => onChangeGoal(goal + 1)}
            disabled={goal >= GOAL_MAX}
            ariaLabel="Agregar un pomodoro a la meta"
          >
            +
          </Button>
        </div>
      </div>

      {/* Cada punto se prende si su índice ya quedó atrás: con 2 completados
          se iluminan el 0 y el 1. */}
      <div className={styles.pips}>
        {pips.map((i) => (
          <span
            key={i}
            className={i < completed ? `${styles.pip} ${styles.isOn}` : styles.pip}
          />
        ))}
      </div>

      <p className={reached ? `${styles.status} ${styles.isReached}` : styles.status}>
        {reached ? '¡Meta cumplida!' : `${completed} de ${goal} completados`}
      </p>
    </div>
  )
}
