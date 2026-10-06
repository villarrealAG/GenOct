import { MODES, MODE_KEYS } from '../../constants/timer'
import styles from './ModeSwitch.module.css'

export function ModeSwitch({ mode, onSelect }) {
  const posicion = MODE_KEYS.indexOf(mode) * 100

  return (
    <div className={styles.segmented}>
      <span
        className={styles.thumb}
        style={{ transform: `translateX(${posicion}%)` }}
      />

      {MODE_KEYS.map((key) => (
        <button
          key={key}
          type="button"
          className={key === mode ? `${styles.segment} ${styles.isActive}` : styles.segment}
          onClick={() => onSelect(key)}
        >
          {MODES[key].label}
        </button>
      ))}
    </div>
  )
}
