console.log('script.js cargado');
// Importamos Three.js desde CDN
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js?module';
import { PointerLockControls } from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/PointerLockControls.js?module';


const canvas = document.getElementById('cv-canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111118); // Más oscuro

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 1.6; // Altura de "ojos"

const controls = new PointerLockControls(camera, document.body);

document.body.addEventListener('click', () => {
  controls.lock();
});

scene.add(controls.getObject());

// Movimiento básico tipo FPS
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

// Agrega una luz direccional
const light = new THREE.DirectionalLight(0xffffff, 0.15); // Antes era 1
light.position.set(5, 10, 7.5);
light.color.set(0x8888aa); // Cambia el color de la luz
scene.add(light);

// Crea el loader ANTES de cargar cualquier textura
const textureLoader = new THREE.TextureLoader();

// Carga la textura del piso
const pisoTexture = textureLoader.load('textures/pisoModel02.jpg'); // Cambia el nombre según tu archivo

// Opcional: Repite la textura para que no se vea estirada
pisoTexture.wrapS = pisoTexture.wrapT = THREE.RepeatWrapping;
pisoTexture.repeat.set(20, 20);

// Rota la textura 90 grados (π/2 radianes)
pisoTexture.rotation = Math.PI / 2;

// Opcional: ajusta el centro de rotación al medio de la textura
pisoTexture.center.set(0.5, 0.5);

// Crea el material del piso con la textura
const floorMaterial = new THREE.MeshStandardMaterial({ map: pisoTexture });

// Crea el piso (ya existe, solo reemplaza la línea del material)
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Carga la textura de la puerta
const puertaTexture = textureLoader.load('textures/pModel01.png');

// Crea la geometría y el material de la puerta
const puertaGeometry = new THREE.BoxGeometry(1.2, 2.7, 0.3); // ancho, alto, grosor
const puertaMaterial = new THREE.MeshStandardMaterial({ map: puertaTexture });
const puerta = new THREE.Mesh(puertaGeometry, puertaMaterial);

// Posiciona la puerta frente al jugador
const paredZ = -5.1; // Usa la misma Z que la pared

puerta.position.set(0, 1.2, paredZ);
scene.add(puerta);

// Carga la textura del marco (puedes usar la misma que la puerta o una diferente)
const marcoTexture = textureLoader.load('textures/pModel01.png');

// Dimensiones del marco
const marcoAncho = 1.4;
const marcoAlto = 2.9;
const marcoGrosor = 0.1;
const marcoProfundidad = 0.25;

// Lados verticales
const marcoIzqGeometry = new THREE.BoxGeometry(marcoGrosor, marcoAlto, marcoProfundidad);
const marcoDerGeometry = new THREE.BoxGeometry(marcoGrosor, marcoAlto, marcoProfundidad);
const marcoMaterial = new THREE.MeshStandardMaterial({ map: marcoTexture });

const marcoIzq = new THREE.Mesh(marcoIzqGeometry, marcoMaterial);
const marcoDer = new THREE.Mesh(marcoDerGeometry, marcoMaterial);

// Lados horizontales (superior e inferior) - AJUSTE: restar el doble del grosor al ancho
const marcoHorGeometry = new THREE.BoxGeometry(marcoAncho - 2 * marcoGrosor, marcoGrosor, marcoProfundidad);
const marcoSup = new THREE.Mesh(marcoHorGeometry, marcoMaterial);
const marcoInf = new THREE.Mesh(marcoHorGeometry, marcoMaterial);

// Posiciona los marcos alrededor de la puerta
marcoIzq.position.set(puerta.position.x - (marcoAncho / 2) + (marcoGrosor / 2), puerta.position.y, puerta.position.z);
marcoDer.position.set(puerta.position.x + (marcoAncho / 2) - (marcoGrosor / 2), puerta.position.y, puerta.position.z);
marcoSup.position.set(puerta.position.x, puerta.position.y + (marcoAlto / 2) - (marcoGrosor / 2), puerta.position.z);
marcoInf.position.set(puerta.position.x, puerta.position.y - (marcoAlto / 2) + (marcoGrosor / 2), puerta.position.z);

// Agrega los marcos a la escena
scene.add(marcoIzq, marcoDer, marcoSup, marcoInf);

// Carga la textura de la pared
const paredTexture = textureLoader.load('textures/paredModel01.jpg');

// Dimensiones de la pared
const paredAncho = 6;
const paredAlto = 4;
const paredGrosor = 0.2;

// Crea la geometría y el material de la pared
const paredGeometry = new THREE.BoxGeometry(paredAncho, paredAlto, paredGrosor); // ancho, alto, grosor
const paredMaterial = new THREE.MeshStandardMaterial({ map: paredTexture });
const pared = new THREE.Mesh(paredGeometry, paredMaterial);

// Posiciona la pared detrás de la puerta
pared.position.set(0, 1.2, -5.1);
scene.add(pared);

// Pared perpendicular a la izquierda (esquina izquierda)
const paredIzqPerp = new THREE.Mesh(paredGeometry, paredMaterial);
paredIzqPerp.rotation.y = Math.PI / 2;
paredIzqPerp.position.set(
  -paredAncho / 2 + paredGrosor / 2, // X: al borde izquierdo de la pared central
  1.2,
  -8.5 + 8 / 2 - paredGrosor / 2 // Z: HACIA ADELANTE
);
scene.add(paredIzqPerp);

// Pared perpendicular a la derecha (esquina derecha)
const paredDerPerp = new THREE.Mesh(paredGeometry, paredMaterial);
paredDerPerp.rotation.y = Math.PI / 2;
paredDerPerp.position.set(
  paredAncho / 2 - paredGrosor / 2, // X: al borde derecho de la pared central
  1.2,
  -6.1 + paredAncho / 2 - paredGrosor / 2 // Z: HACIA ADELANTE
);
scene.add(paredDerPerp);

const pasillo = new THREE.Mesh(paredGeometry,paredMaterial);
pasillo.position.set(0,1.2,-7.5);
scene.add(pasillo);

// Carga la textura del letrero de emergencia
const letreroTexture = textureLoader.load('textures/letrero01.png');

// Crea la geometría y el material del letrero
const letreroAncho = 0.6;
const letreroAlto = 0.3;
const letreroGeometry = new THREE.PlaneGeometry(letreroAncho, letreroAlto);
const letreroMaterial = new THREE.MeshBasicMaterial({ map: letreroTexture, transparent: true });
const letrero = new THREE.Mesh(letreroGeometry, letreroMaterial);

// Posiciona el letrero justo arriba de la puerta, separado por un pequeño espacio
letrero.position.set(
  puerta.position.x,
  puerta.position.y + (puertaGeometry.parameters.height / 2) + (letreroAlto / 2) + 0.2, // 0.05 es el espacio extra
  puerta.position.z + (puertaGeometry.parameters.depth / 2) + 0.01 // Un poco al frente para evitar z-fighting
);
scene.add(letrero);

// Agrega una luz verde tipo PointLight sobre el letrero
const luzVerde = new THREE.PointLight(0x00ff00, 2, 5); // color, intensidad, distancia
luzVerde.position.set(
  letrero.position.x,
  letrero.position.y,
  letrero.position.z + 0.1 // Un poco al frente del letrero
);
scene.add(luzVerde);

// Opcional: agrega un pequeño helper para ver la luz
// const luzHelper = new THREE.PointLightHelper(luzVerde, 0.1);
// scene.add(luzHelper);

// Linterna tipo RE7: SpotLight que sigue la cámara
const linterna = new THREE.SpotLight(0xffffff, 2, 15, Math.PI / 8, 0.4, 1.5);
// color, intensidad, distancia, ángulo, penumbra, decay
linterna.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(linterna);
scene.add(linterna.target);

// Opcional: helper para ver el haz de la linterna
// const spotHelper = new THREE.SpotLightHelper(linterna);
// scene.add(spotHelper);

// Carga la textura de la ventana
const ventanaTexture = textureLoader.load('textures/ventanaModel01.png');

// Crea la geometría y el material de la ventana
const ventanaAncho = 1.8;
const ventanaAlto = 1.8;
const ventanaGeometry = new THREE.PlaneGeometry(ventanaAncho, ventanaAlto);
const ventanaMaterial = new THREE.MeshStandardMaterial({ 
  map: ventanaTexture, 
  transparent: true // por si tu textura tiene transparencia
});
const ventana = new THREE.Mesh(ventanaGeometry, ventanaMaterial);

// Posiciona la ventana embebida en la pared izquierda (al ras hacia la derecha)
ventana.position.set(
  paredIzqPerp.position.x + (paredGrosor / 2) + 0.01, // justo al ras hacia la derecha, 0.01 para evitar z-fighting
  paredIzqPerp.position.y + 0.5, // altura (ajusta si quieres)
  paredIzqPerp.position.z - 1.7 // misma profundidad que la pared izquierda
);
ventana.rotation.y = Math.PI / 2; // igual que la pared izquierda

scene.add(ventana);

function animate() {
  requestAnimationFrame(animate);

  // Movimiento tipo FPS
  if (controls.isLocked) {
    direction.z = Number(move.forward) - Number(move.backward);
    direction.x = Number(move.right) - Number(move.left);
    direction.normalize();

    const speed = 0.08;
    if (move.forward || move.backward) velocity.z = direction.z * speed;
    if (move.left || move.right) velocity.x = direction.x * speed;

    controls.moveRight(velocity.x);
    controls.moveForward(velocity.z);

    // Simulación de "head bobbing" (cámara brincando)
    if (move.forward || move.backward || move.left || move.right) {
      camera.position.y = 1.6 + Math.sin(Date.now() * 0.015) * 0.05;
    } else {
      camera.position.y = 1.6;
    }

    velocity.x *= 0.7;
    velocity.z *= 0.7;
  }

  // Haz que la linterna siga la cámara
  linterna.position.copy(camera.position);
  // El target de la linterna es un punto al frente de la cámara
  const linternaTarget = new THREE.Vector3();
  camera.getWorldDirection(linternaTarget);
  linterna.target.position.copy(camera.position.clone().add(linternaTarget.multiplyScalar(10)));

  renderer.render(scene, camera);
}


// --- Relámpagos tipo tormenta natural ---
// Luz del relámpago (empieza apagada)
const relampago = new THREE.PointLight(0x99ccff, 0, 300);
relampago.position.set(0, 30, -10); // alto en el "cielo"
scene.add(relampago);

function lanzarRelampago() {
  // 1. Primer destello fuerte
  relampago.intensity = 8;

  // 2. Baja rápido
  setTimeout(() => { relampago.intensity = 2; }, 100);

  // 3. Otro parpadeo más débil
  setTimeout(() => { relampago.intensity = 6; }, 200);
  setTimeout(() => { relampago.intensity = 0; }, 400);

  // Repite entre 6 y 12 segundos de forma aleatoria
  setTimeout(lanzarRelampago, 6000 + Math.random() * 6000);
}

// Inicia la secuencia de relámpagos (fuera de animate)
lanzarRelampago();


animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
