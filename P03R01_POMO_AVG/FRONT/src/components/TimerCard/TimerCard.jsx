import { ModeSwitch } from '../ModeSwitch/ModeSwitch'
import { Panel } from '../Panel/Panel'
import { SessionGoal } from '../SessionGoal/SessionGoal'
import { TimerControls } from '../TimerControls/TimerControls'
import { TimerDial } from '../TimerDial/TimerDial'
import styles from './TimerCard.module.css'

export function TimerCard({ timer, goal, onChangeGoal }) {
  return (
    <Panel className={styles.card}>
      <ModeSwitch mode={timer.mode} onSelect={timer.changeMode} />

      <TimerDial
        mode={timer.mode}
        secondsLeft={timer.secondsLeft}
        progress={timer.progress}
      />

      <TimerControls running={timer.running} onToggle={timer.toggle} onReset={timer.reset} />

      <SessionGoal completed={timer.completed} goal={goal} onChangeGoal={onChangeGoal} />
    </Panel>
  )
}
