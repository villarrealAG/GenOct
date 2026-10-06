import { Button } from '../Button/Button'
import styles from './TimerControls.module.css'

export function TimerControls({ running, onToggle, onReset }) {
  return (
    <div className={styles.controls}>
      <Button variant="primary" className={styles.main} onClick={onToggle}>
        {running ? 'Pausar' : 'Iniciar'}
      </Button>

      <Button variant="ghost" className={styles.secondary} onClick={onReset}>
        Reiniciar
      </Button>
    </div>
  )
}
