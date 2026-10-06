import styles from './AuroraBackground.module.css'

/** Tres manchas desenfocadas en loops desfasados: el patrón nunca se repite a la vista. */
export function AuroraBackground() {
  return (
    <div className={styles.aurora} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blobA}`} />
      <span className={`${styles.blob} ${styles.blobB}`} />
      <span className={`${styles.blob} ${styles.blobC}`} />
    </div>
  )
}
