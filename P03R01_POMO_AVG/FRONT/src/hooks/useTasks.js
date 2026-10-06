import { useLocalStorage } from './useLocalStorage'

export function useTasks() {
  // Arranca como array vacío y, gracias al hook, queda guardado solo.
  const [tasks, setTasks] = useLocalStorage('pomodoro.tasks', [])

  function addTask(title) {
    // .trim() quita los espacios de los extremos.
    const texto = title.trim()

    // Si escribiste puros espacios, texto queda "" y no agregamos nada.
    if (!texto) return

    const nueva = { id: Date.now(), title: texto, done: false }

    setTasks([...tasks, nueva])
  }

  function toggleTask(id) {
    // .map() recorre y devuelve un array nuevo del mismo tamaño.
    const actualizadas = tasks.map((task) =>
      // ¿Eres la tarea del id? Entonces una COPIA de ti con done invertido.
      // {...task} copia todos los campos y luego done: los pisa.
      // ¿No? Te dejo tal cual.
      task.id === id ? { ...task, done: !task.done } : task,
    )

    setTasks(actualizadas)
  }

  // .filter() devuelve un array nuevo sólo con los que cumplen la condición.
  // Borrar una tarea = quedarse con todas MENOS esa.
  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function clearDone() {
    setTasks(tasks.filter((task) => !task.done))
  }

  // Valor derivado, igual que progress en useTimer: no hay un useState
  // contando completadas, se cuentan al vuelo en cada render.
  const doneCount = tasks.filter((task) => task.done).length

  return { tasks, doneCount, addTask, toggleTask, removeTask, clearDone }
}
