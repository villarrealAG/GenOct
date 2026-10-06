import { useState } from 'react'
import { Button } from '../Button/Button'
import styles from './TaskForm.module.css'

export function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    // Sin esto el navegador recarga la página, que es lo que hace un <form>
    // por default al enviarse.
    event.preventDefault()

    onAdd(title)
    setTitle('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Input "controlado": no guarda su propio texto, muestra lo que dice
          title y en cada tecla avisa para actualizarlo. Por eso setTitle('')
          allá arriba lo deja vacío. */}
      <input
        className={styles.input}
        type="text"
        value={title}
        placeholder="¿En qué vas a trabajar?"
        maxLength={120}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Button
        type="submit"
        className={styles.add}
        disabled={title.trim() === ''}
        ariaLabel="Agregar tarea"
      >
        +
      </Button>
    </form>
  )
}
