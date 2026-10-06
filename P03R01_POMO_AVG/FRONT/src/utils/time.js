/**
 * Convierte segundos a texto tipo "25:00".
 *
 * Ejemplo con totalSegundos = 1485:
 *   1485 / 60            = 24.75
 *   Math.floor(24.75)    = 24        -> los minutos (tira el decimal)
 *   1485 % 60            = 45        -> los segundos (% da el RESIDUO)
 *   "24" y "45"                      -> "24:45"
 */
export function formatTime(totalSegundos) {
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = totalSegundos % 60

  // padStart(2, '0') rellena con un cero si el número mide un solo dígito.
  // Sin esto verías "4:5" en vez de "04:05".
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
}
