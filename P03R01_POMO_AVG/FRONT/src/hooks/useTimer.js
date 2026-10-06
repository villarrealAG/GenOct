import { useEffect, useRef, useState } from 'react'
import { segundosDe } from '../constants/timer'

const UN_SEGUNDO = 1000

export function useTimer() {

  const [mode, setMode] = useState('focus') // fase actual: 'focus' | 'short'
  const [secondsLeft, setSecondsLeft] = useState(segundosDe('focus'))
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(0)
  const restanteRef = useRef(UN_SEGUNDO)


  function changeMode(nextMode) {
    setMode(nextMode) // 1. cuál fase es ahora
    setSecondsLeft(segundosDe(nextMode)) // 2. el reloj a su valor completo
    setRunning(false) // 3. en pausa: no arranca solo
    restanteRef.current = UN_SEGUNDO // 4. fase nueva, el primer segundo va entero
  }

  useEffect(() => {
    if (!running || secondsLeft === 0) return

    const inicio = Date.now()

    const id = setTimeout(() => setSecondsLeft(secondsLeft - 1), restanteRef.current)

    // La LIMPIEZA: React la corre antes de volver a montar el efecto y al
    // desmontar. Cancela el timeout pendiente y apunta cuánto le faltaba.
    return () => {
      clearTimeout(id)

      const restante = restanteRef.current - (Date.now() - inicio)


      restanteRef.current = restante > 0 ? restante : UN_SEGUNDO
    }
  }, [running, secondsLeft])

  useEffect(() => {
    if (secondsLeft > 0) return

    if (mode === 'focus') {
      setCompleted((n) => n + 1) // el enfoque que acaba cuenta como pomodoro
      changeMode('short')
    } else {
      changeMode('focus')
    }
  }, [secondsLeft, mode])

  function toggle() {
    setRunning(!running)
  }

  function reset() {
    setSecondsLeft(segundosDe(mode))
    setRunning(false)
    restanteRef.current = UN_SEGUNDO
  }

  const progress = 1 - secondsLeft / segundosDe(mode)

  return { mode, secondsLeft, running, completed, progress, toggle, reset, changeMode }
}
