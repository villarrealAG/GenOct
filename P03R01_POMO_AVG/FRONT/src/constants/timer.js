export const MODES = {
  focus: { label: 'Enfoque', minutes: 25 },
  short: { label: 'Pausa', minutes: 5 },
}

// Object.keys saca las llaves en un array: ['focus', 'short'].
// Sirve para recorrerlas con .map() y pintar los botones sin escribirlos a mano.
export const MODE_KEYS = Object.keys(MODES)

/** Rango de la meta de sesión que el usuario elige con el stepper. */
export const GOAL_MIN = 1
export const GOAL_MAX = 12
export const GOAL_DEFAULT = 4

/**
 * Minutos de un modo convertidos a segundos, que es como cuenta el timer.
 * segundosDe('focus') -> MODES['focus'].minutes -> 25 -> 25 * 60 = 1500
 */
export const segundosDe = (mode) => MODES[mode].minutes * 60
