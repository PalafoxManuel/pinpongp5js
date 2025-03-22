// Variables de la pelota
let xPelota, yPelota;
let xVelocidad, yVelocidad; // Velocidades
let diametro = 20;

// Variables de las paletas
let altoPaleta = 80;
let anchoPaleta = 10;

// Posiciones de las paletas
let xPaleta1 = 30;
let yPaleta1;

let xPaleta2;
let yPaleta2;

// Velocidad de movimiento de paletas
let velocidadPaleta = 5;

// Puntuaciones
let puntaje1 = 0;
let puntaje2 = 0;
let puntajeMaximo = 10; // Puntaje maximo

function setup() {
  createCanvas(600, 400);

  // Inicializar pelota al centro
  xPelota = width / 2;
  yPelota = height / 2;

  // Velocidad inicial aleatoria
  xVelocidad = random([-4, 4]);
  yVelocidad = random([-2, 2]);

  // Posicionar paletas
  yPaleta1 = height / 2 - altoPaleta / 2;
  xPaleta2 = width - 30 - anchoPaleta;
  yPaleta2 = height / 2 - altoPaleta / 2;

  //boton para volver a jugar
  botonReiniciar = createButton('Volver a jugar');
  botonReiniciar.position(width / 2 - 50, height / 2 + 20);
  botonReiniciar.mousePressed(reiniciarJuegoCompleto);
  botonReiniciar.hide();
}

function draw() {
  background(0);

  // Línea divisoria
  stroke(255);
  line(width / 2, 0, width / 2, height);

  // Mostrar la puntuación
  textSize(32);
  fill(255);
  text(puntaje1, width / 2 - 50, 50);
  text(puntaje2, width / 2 + 30, 50);

  // Verificar si alguien ha ganado
  if (puntaje1 === puntajeMaximo || puntaje2 === puntajeMaximo) {
    textSize(40);
    fill(255, 0, 0);
    if (puntaje1 === puntajeMaximo) {
      text("¡Jugador 1 gana!", width / 2 - 130, height / 2);
    } else {
      text("¡Jugador 2 gana!", width / 2 - 130, height / 2);
    }
    // Mostrar botón para volver a jugar
    botonReiniciar.show();
    noLoop();  // Detenemos el juego
    return;
  }

  // Dibujar la pelota
  ellipse(xPelota, yPelota, diametro);

  // Mover la pelota
  xPelota += xVelocidad;
  yPelota += yVelocidad;

  // Rebote en los bordes superior e inferior
  if (yPelota < 0 || yPelota > height) {
    yVelocidad *= -1;
  }

  // Paletas
  rect(xPaleta1, yPaleta1, anchoPaleta, altoPaleta);
  rect(xPaleta2, yPaleta2, anchoPaleta, altoPaleta);

  // Controles jugador 1 (Teclas W y S)
  if (keyIsDown(87)) {
    yPaleta1 -= velocidadPaleta;
  } 
  if (keyIsDown(83)) {
    yPaleta1 += velocidadPaleta;
  }

  // Controles jugador 2 (Flecha arriba y abajo)
  if (keyIsDown(UP_ARROW)) {
    yPaleta2 -= velocidadPaleta;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yPaleta2 += velocidadPaleta;
  }

  // Colisiones paletas
  if (yPaleta1 < 0) {
    yPaleta1 = 0;
  } else if (yPaleta1 + altoPaleta > height) {
    yPaleta1 = height - altoPaleta;
  }

  if (yPaleta2 < 0) {
    yPaleta2 = 0;
  } else if (yPaleta2 + altoPaleta > height) {
    yPaleta2 = height - altoPaleta;
  }

  // Verificar colisión con la paleta 1
  if (
    xPelota - diametro / 2 <= xPaleta1 + anchoPaleta &&
    yPelota + diametro / 2 >= yPaleta1 &&
    yPelota - diametro / 2 <= yPaleta1 + altoPaleta
  ) {
    xVelocidad *= -1;
    xVelocidad *= 1.05;
    yVelocidad *= 1.05;
  }

  // Verificar colisión con la paleta 2
  if (
    xPelota + diametro / 2 >= xPaleta2 &&
    yPelota + diametro / 2 >= yPaleta2 &&
    yPelota - diametro / 2 <= yPaleta2 + altoPaleta
  ) {
    xVelocidad *= -1;
    xVelocidad *= 1.05;
    yVelocidad *= 1.05;
  }

  // Verificar si la pelota sale por la izquierda o la derecha
  if (xPelota < 0) {
    puntaje2++;
    reiniciarPelota();
  }
  if (xPelota > width) {
    puntaje1++;
    reiniciarPelota();
  }
}

// Función para reiniciar la pelota al centro tras un punto
function reiniciarPelota() {
  xPelota = width / 2;
  yPelota = height / 2;
  xVelocidad = random([-4, 4]);
  yVelocidad = random([-2, 2]);
}

function reiniciarJuegoCompleto() {
    // Reinicio de los puntajes
    puntaje1 = 0;
    puntaje2 = 0;
    // Reiniciar la pelota
    reiniciarPelota();
  
    // Ocultamos el botón de reinicio
    botonReiniciar.hide();
  
    // Volvemos a arrancar el bucle
    loop();
}