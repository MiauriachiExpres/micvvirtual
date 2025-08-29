console.log('script.js cargado');
// Importamos Three.js desde CDN
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js?module';
import { PointerLockControls } from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/PointerLockControls.js?module';

const canvas = document.getElementById('cv-canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111118);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 1.6;

const controls = new PointerLockControls(camera, document.body);

document.body.addEventListener('click', () => {
  controls.lock();
});

document.body.addEventListener('touchstart', () => {
  if (!controls.isLocked) {
    controls.lock();
  }
});

scene.add(controls.getObject());

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const move = { forward: false, backward: false, left: false, right: false };

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW': move.forward = true; break;
    case 'KeyS': move.backward = true; break;
    case 'KeyA': move.left = true; break;
    case 'KeyD': move.right = true; break;
  }
});
document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW': move.forward = false; break;
    case 'KeyS': move.backward = false; break;
    case 'KeyA': move.left = false; break;
    case 'KeyD': move.right = false; break;
  }
});

const light = new THREE.DirectionalLight(0xffffff, 0.15);
light.position.set(5, 10, 7.5);
light.color.set(0x8888aa);
scene.add(light);

const textureLoader = new THREE.TextureLoader();

const pisoTexture = textureLoader.load('textures/pisoModel02.jpg');
pisoTexture.wrapS = pisoTexture.wrapT = THREE.RepeatWrapping;
pisoTexture.repeat.set(20, 20);
pisoTexture.rotation = Math.PI / 2;
pisoTexture.center.set(0.5, 0.5);

const floorMaterial = new THREE.MeshStandardMaterial({ map: pisoTexture });
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const puertaTexture = textureLoader.load('textures/pModel01.png');
const puertaGeometry = new THREE.BoxGeometry(1.2, 2.7, 0.3);
const puertaMaterial = new THREE.MeshStandardMaterial({ map: puertaTexture });
const puerta = new THREE.Mesh(puertaGeometry, puertaMaterial);

const paredZ = -5.1;
puerta.position.set(0, 1.2, paredZ);
scene.add(puerta);

const marcoTexture = textureLoader.load('textures/pModel01.png');
const marcoAncho = 1.4;
const marcoAlto = 2.9;
const marcoGrosor = 0.1;
const marcoProfundidad = 0.25;

const marcoIzqGeometry = new THREE.BoxGeometry(marcoGrosor, marcoAlto, marcoProfundidad);
const marcoDerGeometry = new THREE.BoxGeometry(marcoGrosor, marcoAlto, marcoProfundidad);
const marcoMaterial = new THREE.MeshStandardMaterial({ map: marcoTexture });

const marcoIzq = new THREE.Mesh(marcoIzqGeometry, marcoMaterial);
const marcoDer = new THREE.Mesh(marcoDerGeometry, marcoMaterial);

const marcoHorGeometry = new THREE.BoxGeometry(marcoAncho - 2 * marcoGrosor, marcoGrosor, marcoProfundidad);
const marcoSup = new THREE.Mesh(marcoHorGeometry, marcoMaterial);
const marcoInf = new THREE.Mesh(marcoHorGeometry, marcoMaterial);

marcoIzq.position.set(puerta.position.x - (marcoAncho / 2) + (marcoGrosor / 2), puerta.position.y, puerta.position.z);
marcoDer.position.set(puerta.position.x + (marcoAncho / 2) - (marcoGrosor / 2), puerta.position.y, puerta.position.z);
marcoSup.position.set(puerta.position.x, puerta.position.y + (marcoAlto / 2) - (marcoGrosor / 2), puerta.position.z);
marcoInf.position.set(puerta.position.x, puerta.position.y - (marcoAlto / 2) + (marcoGrosor / 2), puerta.position.z);

scene.add(marcoIzq, marcoDer, marcoSup, marcoInf);

const paredTexture = textureLoader.load('textures/paredModel01.jpg');

const paredAncho = 6;
const paredAlto = 4;
const paredGrosor = 0.2;

const paredGeometry = new THREE.BoxGeometry(paredAncho, paredAlto, paredGrosor);
const paredMaterial = new THREE.MeshStandardMaterial({ map: paredTexture });
const pared = new THREE.Mesh(paredGeometry, paredMaterial);

pared.position.set(0, 1.2, -5.1);
scene.add(pared);

const paredIzqPerp = new THREE.Mesh(paredGeometry, paredMaterial);
paredIzqPerp.rotation.y = Math.PI / 2;
paredIzqPerp.position.set(
  -paredAncho / 2 + paredGrosor / 2,
  1.2,
  -8.5 + 8 / 2 - paredGrosor / 2
);
scene.add(paredIzqPerp);

const paredDerPerp = new THREE.Mesh(paredGeometry, paredMaterial);
paredDerPerp.rotation.y = Math.PI / 2;
paredDerPerp.position.set(
  .2 + paredAncho / 2 - paredGrosor / 2,
  1.2,
  -5.1 + paredAncho / 2 - paredGrosor / 2
);
scene.add(paredDerPerp);

const pasillo = new THREE.Mesh(paredGeometry, paredMaterial);
pasillo.position.set(0, 1.2, -7.5);
scene.add(pasillo);

const letreroTexture = textureLoader.load('textures/letrero01.png');

const letreroAncho = 0.6;
const letreroAlto = 0.3;
const letreroGeometry = new THREE.PlaneGeometry(letreroAncho, letreroAlto);
const letreroMaterial = new THREE.MeshBasicMaterial({ map: letreroTexture, transparent: true });
const letrero = new THREE.Mesh(letreroGeometry, letreroMaterial);

letrero.position.set(
  puerta.position.x,
  puerta.position.y + (puertaGeometry.parameters.height / 2) + (letreroAlto / 2) + 0.2,
  puerta.position.z + (puertaGeometry.parameters.depth / 2) + 0.01
);
scene.add(letrero);

const luzVerde = new THREE.PointLight(0x00ff00, 2, 5);
luzVerde.position.set(
  letrero.position.x,
  letrero.position.y,
  letrero.position.z + 0.1
);
scene.add(luzVerde);

const linterna = new THREE.SpotLight(0xffffff, 2, 15, Math.PI / 8, 0.4, 1.5);
linterna.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(linterna);
scene.add(linterna.target);

const ventanaTexture = textureLoader.load('textures/ventanaModel01.png');

const ventanaAncho = 1.8;
const ventanaAlto = 1.8;
const ventanaGeometry = new THREE.PlaneGeometry(ventanaAncho, ventanaAlto);
const ventanaMaterial = new THREE.MeshStandardMaterial({ map: ventanaTexture, transparent: true });
const ventana = new THREE.Mesh(ventanaGeometry, ventanaMaterial);

ventana.position.set(
  paredIzqPerp.position.x + (paredGrosor / 2) + 0.01,
  paredIzqPerp.position.y + 0.5,
  paredIzqPerp.position.z - 1.7
);
ventana.rotation.y = Math.PI / 2;
scene.add(ventana);

const mesaTexture = textureLoader.load('textures/mesaModel01.jpg');
const mesaMaterial = new THREE.MeshStandardMaterial({ map: mesaTexture });
const pataMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

const mesaAncho = 1.2;
const mesaProfundidad = 0.6;
const mesaAlto = 0.1;
const mesaGeometry = new THREE.BoxGeometry(mesaAncho, mesaAlto, mesaProfundidad);

const pataAncho = 0.05;
const pataAltura = 0.75;
const pataGeometry = new THREE.BoxGeometry(pataAncho, pataAltura, pataAncho);

const mesaGrupo = new THREE.Group();

const mesa = new THREE.Mesh(mesaGeometry, mesaMaterial);
mesa.position.y = 0.75;
mesaGrupo.add(mesa);

function crearPata(offsetX, offsetZ) {
  const pata = new THREE.Mesh(pataGeometry, pataMaterial);
  pata.position.set(offsetX, pataAltura / 2 - 0.05, offsetZ);
  mesaGrupo.add(pata);
}

crearPata(mesaAncho / 2 - pataAncho / 2, mesaProfundidad / 2 - pataAncho / 2);
crearPata(-mesaAncho / 2 + pataAncho / 2, mesaProfundidad / 2 - pataAncho / 2);
crearPata(mesaAncho / 2 - pataAncho / 2, -mesaProfundidad / 2 + pataAncho / 2);
crearPata(-mesaAncho / 2 + pataAncho / 2, -mesaProfundidad / 2 + pataAncho / 2);

mesaGrupo.position.set(
  ventana.position.x + 0.4,
  0,
  ventana.position.z
);
mesaGrupo.rotation.y = Math.PI / 2;
scene.add(mesaGrupo);

const papelTexture = textureLoader.load('textures/periodicoModel01.jpg');

const papelGeometry = new THREE.PlaneGeometry(0.4, 0.3);
const papelMaterial = new THREE.MeshStandardMaterial({ map: papelTexture, side: THREE.DoubleSide });

const papel = new THREE.Mesh(papelGeometry, papelMaterial);
papel.rotation.x = -Math.PI / 2;

papel.position.set(
  mesaGrupo.position.x,
  mesa.position.y + mesaAlto / 2 + 0.01,
  mesaGrupo.position.z
);

// papel.material.transparent = true;
// papel.material.opacity = 0.4;

scene.add(papel);

const textoDeBienvenida = `
  <p><strong>[ Documento encontrado: "Hoja de vida"]</strong></p>
  <p>
    Si estás leyendo esto... significa que has llegado lejos.<br>
    Muy pocos han cruzado el umbral de este mundo digital sin perderse en la oscuridad.
  </p>
  <p>
    Me llamo <strong>Daniel Mendoza Mancila</strong>, y esta no es solo una experiencia... es una puerta hacia mi historia, mis habilidades y mis logros.
  </p>
  <p>
    Este juego es mi carta de presentación. No una hoja estática, sino un mundo que refleja lo que puedo crear.<br>
    Sigue explorando. Observa los detalles. Todo tiene un propósito.
  </p>
  <p>
    Gracias por venir... ahora la pregunta es:<br>
    <em>¿Estás listo para descubrir más?</em>
  </p>
`;

const interactMsg = document.getElementById('interactMsg');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');

popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
  controls.lock();
});

// document.addEventListener('keydown', (event) => {
//   if (event.code === 'KeyX') {
//     const distanciaMinima = 1.2;
//     const distanciaAlPapel = camera.position.distanceTo(papel.position);
//     if (distanciaAlPapel < distanciaMinima) {
//       popupText.innerHTML = textoDeBienvenida;
//       popup.style.display = 'block';
//       controls.unlock();
//     }
//   }
//   if (event.code === 'Escape') {
//     popup.style.display = 'none';
//     controls.lock();
//   }
// });

// function animate() {
//   requestAnimationFrame(animate);

//   if (controls.isLocked) {
//     direction.z = Number(move.forward) - Number(move.backward);
//     direction.x = Number(move.right) - Number(move.left);
//     direction.normalize();

//     const speed = 0.08;
//     if (move.forward || move.backward) velocity.z = direction.z * speed;
//     if (move.left || move.right) velocity.x = direction.x * speed;

//     controls.moveRight(velocity.x);
//     controls.moveForward(velocity.z);

//     if (move.forward || move.backward || move.left || move.right) {
//       camera.position.y = 1.6 + Math.sin(Date.now() * 0.015) * 0.05;
//     } else {
//       camera.position.y = 1.6;
//     }

//     velocity.x *= 0.7;
//     velocity.z *= 0.7;
//   }

//   linterna.position.set(camera.position.x, camera.position.y, camera.position.z);
//   linterna.target.position.set(
//     camera.position.x + camera.getWorldDirection(new THREE.Vector3()).x,
//     camera.position.y + camera.getWorldDirection(new THREE.Vector3()).y,
//     camera.position.z + camera.getWorldDirection(new THREE.Vector3()).z
//   );

//   const distanciaMinima = 1.2;
//   const distanciaAlPapel = camera.position.distanceTo(papel.position);

//   if (distanciaAlPapel < distanciaMinima && popup.style.display === 'none') {
//     interactMsg.style.display = 'block';
//   } else {
//     interactMsg.style.display = 'none';
//   }

//   renderer.render(scene, camera);
// }

// animate();

// Texturas para los cuadros (puedes cambiar las URLs a tus imágenes)
const cuadroTexture1 = textureLoader.load('textures/cuadro1.jpg');
const cuadroTexture2 = textureLoader.load('textures/cuadro2.jpg');

const cuadroAncho = 0.6;
const cuadroAlto = 0.8;

const cuadroGeometry = new THREE.PlaneGeometry(cuadroAncho, cuadroAlto);

// Crear cuadros (pueden ser grupos si quieres marcos)
const cuadro1 = new THREE.Mesh(
  cuadroGeometry,
  new THREE.MeshStandardMaterial({ map: cuadroTexture1, side: THREE.DoubleSide })
);

const cuadro2 = new THREE.Mesh(
  cuadroGeometry,
  new THREE.MeshStandardMaterial({ map: cuadroTexture2, side: THREE.DoubleSide })
);

// Posicionar cuadros en la pared del pasillo
// Según tu escena, la pared del pasillo está en z = -7.5, y x va de -3 a 3 aprox
// La pared está alineada en el eje Z, así que rotamos para que miren al frente
cuadro1.position.set(-1.0, 1.6, pasillo.position.z + (paredGrosor / 2) + 0.01);
cuadro1.rotation.y = 0;

cuadro2.position.set(1.0, 1.6, pasillo.position.z + (paredGrosor / 2) + 0.01);
cuadro2.rotation.y = 0;

scene.add(cuadro1);
scene.add(cuadro2);

// Textos para los cuadros
const textoCuadro1 = `
  <p><strong>Cuadro 1: "Educacion"</strong></p>
`;

const textoCuadro2 = `
  <p><strong>Cuadro 2: "ESIME"</strong></p>
`;

// Variables para manejar la interacción con cuadros
let objetoInteractuable = null;

// Actualizar función animate para incluir cuadros
// function animate() {
//   requestAnimationFrame(animate);

//   if (controls.isLocked) {
//     direction.z = Number(move.forward) - Number(move.backward);
//     direction.x = Number(move.right) - Number(move.left);
//     direction.normalize();

//     const speed = 0.03;
//     if (move.forward || move.backward) velocity.z = direction.z * speed;
//     if (move.left || move.right) velocity.x = direction.x * speed;

//     controls.moveRight(velocity.x);
//     controls.moveForward(velocity.z);

//     if (move.forward || move.backward || move.left || move.right) {
//       camera.position.y = 1.6 + Math.sin(Date.now() * 0.015) * 0.05;
//     } else {
//       camera.position.y = 1.6;
//     }

//     velocity.x *= 0.7;
//     velocity.z *= 0.7;
//   }

//   linterna.position.set(camera.position.x, camera.position.y, camera.position.z);
//   linterna.target.position.set(
//     camera.position.x + camera.getWorldDirection(new THREE.Vector3()).x,
//     camera.position.y + camera.getWorldDirection(new THREE.Vector3()).y,
//     camera.position.z + camera.getWorldDirection(new THREE.Vector3()).z
//   );

//   const distanciaMinima = 1.2;

//   // Distancias para papel y cuadros
//   const distanciaAlPapel = camera.position.distanceTo(papel.position);
//   const distanciaAlCuadro1 = camera.position.distanceTo(cuadro1.position);
//   const distanciaAlCuadro2 = camera.position.distanceTo(cuadro2.position);

//   // Mostrar mensaje de interacción solo si está cerca de alguno y no hay popup abierto
//   if (popup.style.display === 'none') {
//     if (distanciaAlPapel < distanciaMinima) {
//       interactMsg.style.display = 'block';
//       objetoInteractuable = 'papel';
//     } else if (distanciaAlCuadro1 < distanciaMinima) {
//       interactMsg.style.display = 'block';
//       objetoInteractuable = 'cuadro1';
//     } else if (distanciaAlCuadro2 < distanciaMinima) {
//       interactMsg.style.display = 'block';
//       objetoInteractuable = 'cuadro2';
//     } else {
//       interactMsg.style.display = 'none';
//       objetoInteractuable = null;
//     }
//   } else {
//     interactMsg.style.display = 'none';
//   }

//   renderer.render(scene, camera);
// }

// animate();

// Modificar evento para abrir popup según el objeto
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyX' && objetoInteractuable !== null) {
    popup.style.display = 'block';
    controls.unlock();

    switch (objetoInteractuable) {
      case 'papel':
        popupText.innerHTML = textoDeBienvenida;
        break;
      case 'cuadro1':
        popupText.innerHTML = textoCuadro1 + `<img src="textures/cuadro1.jpg" style="max-width:100%;">`;
        break;
      case 'cuadro2':
        popupText.innerHTML = textoCuadro2 + `<img src="textures/cuadro2.jpg" style="max-width:100%;">`;
        break;
    }
  }
  if (event.code === 'Escape') {
    popup.style.display = 'none';
    controls.lock();
  }
});

// Textura para las escaleras (pon aquí tu textura)
const texturaEscaleras = textureLoader.load('textures/escalerasTexture.jpg');

// Parámetros de las escaleras
const escaleraAncho = 2;      // ancho total de las escaleras
const escaleraAlto = 1.5;     // altura total que cubrirán
const escaleraProfundidad = 2; // profundidad (hacia adelante)

// Número de peldaños
const numPeldaños = 6;

// Crear grupo para las escaleras
const escalerasGrupo = new THREE.Group();

// Altura y profundidad de cada peldaño
const alturaPeldaño = escaleraAlto / numPeldaños;
const profundidadPeldaño = escaleraProfundidad / numPeldaños;
const peldañoAncho = escaleraAncho;

// Geometría y material común para los peldaños
const peldañoGeometry = new THREE.BoxGeometry(peldañoAncho, alturaPeldaño, profundidadPeldaño);
const peldañoMaterial = new THREE.MeshStandardMaterial({ map: texturaEscaleras });

// Crear peldaños y posicionarlos escalonadamente
for (let i = 0; i < numPeldaños; i++) {
  const peldaño = new THREE.Mesh(peldañoGeometry, peldañoMaterial);
  peldaño.position.set(
    0,
    alturaPeldaño / 2 + i * alturaPeldaño,
    -escaleraProfundidad / 2 + profundidadPeldaño / 2 + i * profundidadPeldaño
  );
  escalerasGrupo.add(peldaño);
}

// Posicionar el grupo de escaleras al lado derecho de paredDerPerp
// paredDerPerp está rotada y posicionada así:
// paredDerPerp.rotation.y = Math.PI / 2;
// paredDerPerp.position.set(paredAncho / 2 - paredGrosor / 2, 1.2, -6.1 + paredAncho / 2 - paredGrosor / 2);

// Vamos a colocar las escaleras un poco a la derecha de paredDerPerp (en x),
// y con la base alineada al piso (y=0)
escalerasGrupo.position.set(
  paredDerPerp.position.x + paredGrosor / 2 + escaleraAncho / 2, // un poco afuera de la pared
  alturaPeldaño / 2 - .1, // empezamos desde el primer peldaño apoyado en el piso
  paredDerPerp.position.z - paredGrosor / 2 - escaleraProfundidad / 2 -.7 // al frente de la pared
);

// Para que miren hacia la misma dirección que la pared (para que el "frente" de las escaleras sea hacia el pasillo)
escalerasGrupo.rotation.y = 4 * Math.PI/2 ;

scene.add(escalerasGrupo);


// --- CONTROLES PARA MÓVILES ---
// Variables para el joystick
let joystickForward = 0;
let joystickRight = 0;

const joystickContainer = document.getElementById('joystick-container');
const interactButton = document.getElementById('interact-button');

// Inicializar nipplejs
const joystick = nipplejs.create({
  zone: joystickContainer,
  mode: 'static',
  position: { left: '75px', top: '75px' },
  color: 'gray',
  size: 120,
  restOpacity: 0.6,
});

// Escuchar eventos del joystick
joystick.on('move', (evt, data) => {
  const { x, y } = data.vector; // van de -1 a 1

  const threshold = 0.1;
  move.forward = y < -threshold;
  move.backward = y > threshold;
  move.right = x > threshold;
  move.left = x < -threshold;
});

joystick.on('end', () => {
  move.forward = move.backward = move.left = move.right = false;
});


// Control táctil para rotar cámara (touchmove)
let lastTouchX = null;
let lastTouchY = null;

function onTouchStart(event) {
  if (event.touches.length === 1) {
    lastTouchX = event.touches[0].clientX;
    lastTouchY = event.touches[0].clientY;
  }
}

function onTouchMove(event) {
  if (!controls.isLocked) return; // solo si el control está bloqueado (jugando)

  if (event.touches.length === 1) {
    const touch = event.touches[0];
    const movementX = touch.clientX - lastTouchX;
    const movementY = touch.clientY - lastTouchY;

    controls.getObject().rotation.y -= movementX * 0.002; // ajustar sensibilidad
    camera.rotation.x -= movementY * 0.002;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
  }
}

window.addEventListener('touchstart', onTouchStart, { passive: false });
window.addEventListener('touchmove', onTouchMove, { passive: false });

// Botón interactuar
interactButton.addEventListener('click', () => {
  const distanciaMinima = 1.2;
  const distanciaAlPapel = camera.position.distanceTo(papel.position);
  if (distanciaAlPapel < distanciaMinima) {
    popupText.innerHTML = textoDeBienvenida;
    popup.style.display = 'block';
    controls.unlock();
  }
});

// Ejemplo muy básico de joystick:  
// Asumo que tienes un objeto joystick con propiedades x, y (-1 a 1)
// donde y > 0 es adelante, y < 0 atrás, x > 0 derecha, x < 0 izquierda.
// Si no tienes joystick, estos valores serán 0.

// Aquí la función para actualizar move desde joystick:
function actualizarMovimientoDesdeJoystick() {
  if (joystick) {
    // Ajusta la sensibilidad si quieres:
    const threshold = 0.1;

    move.forward = joystick.y > threshold;
    move.backward = joystick.y < -threshold;
    move.right = joystick.x > threshold;
    move.left = joystick.x < -threshold;
  }
}

// Detectar si es móvil o tablet
const esMovil = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

// Tu función animate respetando todo, sólo añadiendo la llamada:
function animate() {
  requestAnimationFrame(animate);

  // actualizarMovimientoDesdeJoystick();

    if (esMovil) {
    actualizarMovimientoDesdeJoystick();
  }
  if (controls.isLocked) {
    direction.z = Number(move.forward) - Number(move.backward);
    direction.x = Number(move.right) - Number(move.left);
    direction.normalize();

    const speed = 0.03;
    if (move.forward || move.backward) velocity.z = direction.z * speed;
    if (move.left || move.right) velocity.x = direction.x * speed;

    controls.moveRight(velocity.x);
    controls.moveForward(velocity.z);

    if (move.forward || move.backward || move.left || move.right) {
      camera.position.y = 1.6 + Math.sin(Date.now() * 0.015) * 0.05;
    } else {
      camera.position.y = 1.6;
    }

    velocity.x *= 0.7;
    velocity.z *= 0.7;
  }

  linterna.position.set(camera.position.x, camera.position.y, camera.position.z);
  linterna.target.position.set(
    camera.position.x + camera.getWorldDirection(new THREE.Vector3()).x,
    camera.position.y + camera.getWorldDirection(new THREE.Vector3()).y,
    camera.position.z + camera.getWorldDirection(new THREE.Vector3()).z
  );

  const distanciaMinima = 1.2;

  const distanciaAlPapel = camera.position.distanceTo(papel.position);
  const distanciaAlCuadro1 = camera.position.distanceTo(cuadro1.position);
  const distanciaAlCuadro2 = camera.position.distanceTo(cuadro2.position);

  if (popup.style.display === 'none') {
    if (distanciaAlPapel < distanciaMinima) {
      interactMsg.style.display = 'block';
      objetoInteractuable = 'papel';
    } else if (distanciaAlCuadro1 < distanciaMinima) {
      interactMsg.style.display = 'block';
      objetoInteractuable = 'cuadro1';
    } else if (distanciaAlCuadro2 < distanciaMinima) {
      interactMsg.style.display = 'block';
      objetoInteractuable = 'cuadro2';
    } else {
      interactMsg.style.display = 'none';
      objetoInteractuable = null;
    }
  } else {
    interactMsg.style.display = 'none';
  }

  renderer.render(scene, camera);
}

animate();

