import styles from './Panel.module.css'

export function Panel({ className = '', children }) {
  return <section className={`${styles.panel} ${className}`}>{children}</section>
}
