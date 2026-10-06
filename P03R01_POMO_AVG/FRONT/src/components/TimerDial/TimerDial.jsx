import { MODES } from '../../constants/timer'
import { formatTime } from '../../utils/time'
import styles from './TimerDial.module.css'

// El círculo del SVG tiene radio 136, así que su perímetro es 2*PI*r ≈ 854 px.
const RADIO = 136
const CONTORNO = 2 * Math.PI * RADIO

export function TimerDial({ mode, secondsLeft, progress }) {
  return (
    <div className={styles.dial}>
      <svg className={styles.svg} viewBox="0 0 320 320" aria-hidden="true">
        <circle className={styles.track} cx="160" cy="160" r={RADIO} />

        {/*
          Cómo se dibuja el avance, que es el truco menos obvio del proyecto:

          strokeDasharray  = una raya punteada cuya raya mide EXACTO lo que
                             mide el círculo entero.
          strokeDashoffset = cuánto empujamos esa raya hacia atrás.

          progress = 0  ->  offset 854  ->  la raya está fuera, no se ve nada
          progress = 1  ->  offset 0    ->  la raya encaja, se ve el círculo lleno
        */}
        <circle
          className={styles.progress}
          cx="160"
          cy="160"
          r={RADIO}
          strokeDasharray={CONTORNO}
          strokeDashoffset={CONTORNO * (1 - progress)}
        />
      </svg>

      <div className={styles.readout}>
        <p className={styles.time}>{formatTime(secondsLeft)}</p>
        <p className={styles.phase}>{MODES[mode].label}</p>
      </div>
    </div>
  )
}
