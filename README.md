# The game of life - El juego de la vida
Ejercicio tomado de https://medium.com/javascript-in-plain-english/the-game-of-life-using-javascript-fc1aaec8274f fue disañado originamente por John Conway para estudiar los automatas celulares. 

## Premisa
Inicia con una "Configuración inicial" de "habitantes" la idea es observar como evolucionan por autoreplicacion a traves de "generaciones". De las reglas de aplicacion de algunos "vivir" y "morir.

### Normas
Se crea un mundo, la idea es poblar ese "mundo" con tantas celdas "vivas" como se elija "Configuracion inicial". Luego, segun las reglas mecionadas se vera como la poblacion crece, cambia y muere en la medida que pasan las generaciones.

* Cualquier célula viva con menos de dos vecinos -> muere, como causas de una poblacion insuficiente.
* Cualquier célula viva con dos o tres vecinos vivos -> vive, para la proxima generacion.
* Cualquier célula viva con más de tres vecinos vivos -> muere, por hacinamiento.
* Cualquier célula muerta con extactamente tres vecinos vivos se convierte en célula -> viva, por reproducción.
