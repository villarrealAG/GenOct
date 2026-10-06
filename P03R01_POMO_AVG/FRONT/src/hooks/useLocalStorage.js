import { useEffect, useState } from 'react'

/**
 * Igual que useState, pero guarda el valor en el navegador para no perderlo
 * al recargar la página.
 *
 * Se usa idéntico a useState:
 *   const [goal, setGoal] = useLocalStorage('pomodoro.goal', 4)
 *
 * Ese es el chiste de los hooks propios: envuelves un comportamiento y lo
 * reutilizas sin tener que acordarte de los detalles cada vez.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Le pasamos una FUNCIÓN a useState, no un valor. Se llama inicializador
    // perezoso: React la ejecuta sólo en el primer render. Si pusiéramos
    // useState(localStorage.getItem(key)) iría a leer en cada render, de más.
    const saved = localStorage.getItem(key)

    // localStorage sólo guarda texto, así que JSON.parse lo convierte de
    // vuelta a array u objeto. Si es la primera visita getItem da null,
    // y entonces usamos el valor inicial.
    return saved ? JSON.parse(saved) : initialValue
  })

  // Cada vez que el valor cambia, lo escribimos. Gracias a esto no tienes que
  // acordarte de guardar en cada lugar donde modificas: pasa solo.
  // JSON.stringify hace lo contrario de parse: convierte el array a texto.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Devolvemos la misma pareja que useState, por eso se usa igual.
  return [value, setValue]
}
