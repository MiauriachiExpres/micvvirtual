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


//Puerta2
const puerta2 = new THREE.Mesh(puertaGeometry, puertaMaterial);
puerta2.position.set(4.1, 1.2, -13.5);
scene.add(puerta2);

const marcoTexture2 = textureLoader.load('textures/pModel01.png');
const marcoAncho2 = 1.4;
const marcoAlto2 = 2.9;
const marcoGrosor2 = 0.1;
const marcoProfundidad2 = 0.25;

const marcoIzqGeometry2 = new THREE.BoxGeometry(marcoGrosor2, marcoAlto2, marcoProfundidad2);
const marcoDerGeometry2 = new THREE.BoxGeometry(marcoGrosor2, marcoAlto2, marcoProfundidad2);
const marcoMaterial2 = new THREE.MeshStandardMaterial({ map: marcoTexture2 });

const marcoIzq2 = new THREE.Mesh(marcoIzqGeometry2, marcoMaterial2);
const marcoDer2 = new THREE.Mesh(marcoDerGeometry2, marcoMaterial2);

const marcoHorGeometry2 = new THREE.BoxGeometry(marcoAncho - 2 * marcoGrosor2, marcoGrosor2, marcoProfundidad2);
const marcoSup2 = new THREE.Mesh(marcoHorGeometry2, marcoMaterial2);
const marcoInf2 = new THREE.Mesh(marcoHorGeometry2, marcoMaterial2);

marcoIzq2.position.set(puerta2.position.x - (marcoAncho2 / 2) + (marcoGrosor2 / 2), puerta2.position.y, puerta2.position.z);
marcoDer2.position.set(puerta2.position.x + (marcoAncho2 / 2) - (marcoGrosor2 / 2), puerta2.position.y, puerta2.position.z);
marcoSup2.position.set(puerta2.position.x, puerta2.position.y + (marcoAlto2 / 2) - (marcoGrosor2 / 2), puerta2.position.z);
marcoInf2.position.set(puerta2.position.x, puerta2.position.y - (marcoAlto2 / 2) + (marcoGrosor2 / 2), puerta2.position.z);

scene.add(marcoIzq2, marcoDer2, marcoSup2, marcoInf2);


const paredTexture = textureLoader.load('textures/paredModel01.jpg');

const paredAncho = 6;
const paredAlto = 4;
const paredGrosor = 0.2;

const paredGeometry = new THREE.BoxGeometry(paredAncho, paredAlto, paredGrosor);
const paredMaterial = new THREE.MeshStandardMaterial({ map: paredTexture });
const pared = new THREE.Mesh(paredGeometry, paredMaterial);

pared.position.set(0, 1.2, -5.1);
scene.add(pared);

//Pared pruerta 2

const paredFondo = new THREE.Mesh(paredGeometry, paredMaterial);

paredFondo.position.set(4, 1.2, -13.5);
scene.add(paredFondo);


const paredIzqPerp = new THREE.Mesh(paredGeometry, paredMaterial);
paredIzqPerp.rotation.y = Math.PI / 2;
paredIzqPerp.position.set(
  -paredAncho / 2 + paredGrosor / 2,
  1.2,
  -8.5 + 8 / 2 - paredGrosor / 2
);
scene.add(paredIzqPerp);

const paredDerLarge = new THREE.Mesh(paredGeometry, paredMaterial);
paredDerLarge.rotation.y = Math.PI / 2;
paredDerLarge.position.set(
  -paredAncho / 2 + paredGrosor / 2 + 10,
  1.2,
  -8.5 + 8 / 2 - paredGrosor / 2
);
scene.add(paredDerLarge);

const paredDerLarge2 = new THREE.Mesh(paredGeometry, paredMaterial);
paredDerLarge2.rotation.y = Math.PI / 2;
paredDerLarge2.position.set(
  -paredAncho / 2 + paredGrosor / 2 + 6,
  1.2,
  -14.3 + 8 / 2 - paredGrosor / 2
);
scene.add(paredDerLarge2);

const paredIzqLarge2 = new THREE.Mesh(paredGeometry, paredMaterial);
paredIzqLarge2.rotation.y = Math.PI / 2;
paredIzqLarge2.position.set(
  -paredAncho / 2 + paredGrosor / 2 + 8,
  1.2,
  -14.3 + 8 / 2 - paredGrosor / 2
);
scene.add(paredIzqLarge2);

const paredDerPerp = new THREE.Mesh(paredGeometry, paredMaterial);
paredDerPerp.rotation.y = Math.PI / 2;
paredDerPerp.position.set(
  .2 + paredAncho / 2 - paredGrosor / 2,
  1.2,
  -5.1 + paredAncho / 2 - paredGrosor / 2
);
scene.add(paredDerPerp);

const paredSmall = new THREE.Mesh(paredGeometry, paredMaterial);

paredSmall.position.set(8.2, 1.2, -7.5);
scene.add(paredSmall);

const paredSmall2 = new THREE.Mesh(paredGeometry, paredMaterial);

paredSmall2.position.set(8.2, 1.2, -3.3);
scene.add(paredSmall2);


const paredGeometryTemp = new THREE.BoxGeometry(2, 2, 0.2);

const paredSmall3 = new THREE.Mesh(paredGeometryTemp, paredMaterial);

paredSmall3.position.set(4.2, .25, -3.3);
scene.add(paredSmall3);


const pasillo = new THREE.Mesh(paredGeometry, paredMaterial);
pasillo.position.set(0, 1.2, -7.5);
scene.add(pasillo);


//Cajas
const cajaAncho = .5;
const cajaAlto = .5;
const cajaProfundidad = .5;

// Textura de la caja
const texturaCaja = textureLoader.load('textures/oldbox.jpg');
const materialCaja = new THREE.MeshBasicMaterial({ map: texturaCaja, side: THREE.DoubleSide });

// Crear las caras principales (caja abierta arriba)
const geometriaCara = new THREE.PlaneGeometry(cajaAncho, cajaAlto);

// Cara frontal
const caraFrontal = new THREE.Mesh(geometriaCara, materialCaja);
caraFrontal.position.set(5, 0, cajaProfundidad / 2 - 3.8);
scene.add(caraFrontal);

// Cara trasera
const caraTrasera = new THREE.Mesh(geometriaCara, materialCaja);
caraTrasera.rotation.y = Math.PI;
caraTrasera.position.set(5, 0, -cajaProfundidad / 2 - 3.8);
scene.add(caraTrasera);

// Cara izquierda
const caraIzquierda = new THREE.Mesh(geometriaCara, materialCaja);
caraIzquierda.rotation.y = Math.PI / 2;
caraIzquierda.position.set(-cajaAncho / 2 + 5, 0, -3.8);
scene.add(caraIzquierda);

// Cara derecha
const caraDerecha = new THREE.Mesh(geometriaCara, materialCaja);
caraDerecha.rotation.y = -Math.PI / 2;
caraDerecha.position.set(cajaAncho / 2 + 5, 0, -3.8);
scene.add(caraDerecha);

// Cara inferior (suelo de la caja)
const caraInferior = new THREE.Mesh(geometriaCara, materialCaja);
caraInferior.rotation.x = -Math.PI / 2;
caraInferior.position.set(5, -cajaAlto / 2 + .3, -3.8);
scene.add(caraInferior);

// === Pestañas abiertas (4 solapas en la parte superior) ===

const anchoPestana = cajaAncho;
const altoPestana = .2; // altura pequeña
const geometriaPestana = new THREE.PlaneGeometry(anchoPestana, altoPestana);

// Ángulo de apertura en radianes (30 grados aprox)
const anguloApertura = Math.PI / 3;

// Pestana frontal (semi abierta hacia adelante)
const pestanaFrontal = new THREE.Mesh(geometriaPestana, materialCaja);
pestanaFrontal.rotation.x = -anguloApertura; // inclinada 30° hacia afuera
pestanaFrontal.position.set(5, cajaAlto / 2 + (altoPestana / 2) * Math.sin(anguloApertura) - .05, cajaProfundidad / 2 + (altoPestana / 2) * Math.cos(anguloApertura) - 4.4);
scene.add(pestanaFrontal);

// Pestana trasera (semi abierta hacia atrás)
const pestanaTrasera = new THREE.Mesh(geometriaPestana, materialCaja);
pestanaTrasera.rotation.x = anguloApertura; // inclinada 30° hacia afuera
pestanaTrasera.position.set(5, cajaAlto / 2 + (altoPestana / 2) * Math.sin(anguloApertura) - .05, -cajaProfundidad / 2 - (altoPestana / 2) * Math.cos(anguloApertura) + -3.2);
scene.add(pestanaTrasera);

// Pestana izquierda
// const pestanaIzquierda = new THREE.Mesh(geometriaPestana, materialCaja);
// pestanaIzquierda.rotation.z = Math.PI / 2;
// pestanaIzquierda.rotation.y = Math.PI / 2;
// pestanaIzquierda.position.set(-cajaAncho / 2 - altoPestana / 2, cajaAlto / 2, 0);
// scene.add(pestanaIzquierda);

// // Pestana derecha
// const pestanaDerecha = new THREE.Mesh(geometriaPestana, materialCaja);
// pestanaDerecha.rotation.z = -Math.PI / 2;
// pestanaDerecha.rotation.y = -Math.PI / 2;
// pestanaDerecha.position.set(cajaAncho / 2 + altoPestana / 2, cajaAlto / 2, 0);
// scene.add(pestanaDerecha);


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

scene.add(papel);

const papelPuzzle = new THREE.Mesh(papelGeometry, papelMaterial);
papelPuzzle.rotation.z = -Math.PI / 2;

papelPuzzle.position.set(
  4,
  1.5,
  -17.43
);
// papel.material.transparent = true;
// papel.material.opacity = 0.4;

scene.add(papelPuzzle);

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

const textoPuzzle = `
  <p><strong>Empece en el área de almacen</strong></p>
  <p>
    Mi primer empleo como egresado no estuvo relacionado con la programación, debido a que no contaba con la experiencia necesaria.
    Termine trabajando en el área de almacén de esta empresa. Fue una gran experiencia para mi, y me hizo valorar lo que es el trabajo duro.
  </p>
  <p>
    Toma las cajas que estan en el suelo y colocalas en el rack para continuar, pero agrupalas segun "El número que indico mi inicio laboral".
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
const cuadroTexture3 = textureLoader.load('textures/cuadro3.png');

const cuadroAncho = 0.6;
const cuadroAlto = 0.8;

const cuadroAncho2 = 2;
const cuadroAlto2 = 1.3;


const cuadroGeometry = new THREE.PlaneGeometry(cuadroAncho, cuadroAlto);
const cuadroGeometry2 = new THREE.PlaneGeometry(cuadroAncho2, cuadroAlto2);


// Crear cuadros (pueden ser grupos si quieres marcos)
const cuadro1 = new THREE.Mesh(
  cuadroGeometry,
  new THREE.MeshStandardMaterial({ map: cuadroTexture1, side: THREE.DoubleSide })
);

const cuadro2 = new THREE.Mesh(
  cuadroGeometry,
  new THREE.MeshStandardMaterial({ map: cuadroTexture2, side: THREE.DoubleSide })
);

const cuadro3 = new THREE.Mesh(
  cuadroGeometry2,
  new THREE.MeshStandardMaterial({ map: cuadroTexture3, side: THREE.DoubleSide })
);

// Posicionar cuadros en la pared del pasillo
// Según tu escena, la pared del pasillo está en z = -7.5, y x va de -3 a 3 aprox
// La pared está alineada en el eje Z, así que rotamos para que miren al frente
cuadro1.position.set(-1.0, 1.6, pasillo.position.z + (paredGrosor / 2) + 0.01);
cuadro1.rotation.y = 0;

cuadro2.position.set(1.0, 1.6, pasillo.position.z + (paredGrosor / 2) + 0.01);
cuadro2.rotation.y = 0;

cuadro3.position.set(3.22, 1.6, pasillo.position.z + (paredGrosor / 2) - 2);
cuadro3.rotation.y = (90 * Math.PI) / 180;
cuadro3.scale.z = 2; // duplica el largo
scene.add(cuadro1);
scene.add(cuadro2);
scene.add(cuadro3);

// Textos para los cuadros
const textoCuadro1 = `
  <p><strong>Cuadro 1: "Educacion"</strong></p>
`;

const textoCuadro2 = `
  <p><strong>Cuadro 2: "ESIME"</strong></p>
`;

const textoCuadro3 = `
  <p><strong>Cuadro 3: "Mi Primera Chamba"</strong></p>
  <p>Mi primer empleo fue para una empresa llamada "Techcomm Wireless México" en la cual comence mis labores en Diciembre del 2016.</p>
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



  // if (event.code === 'KeyX' && objetoInteractuable !== null) {
  if (event.code === 'KeyX') {

  console.log("Tecla presionada:", event.code);
console.log("Caja cargada:", cajaCargada);
console.log("Cerca del rack:", estaCercaDelRack());

    if (cajaCargada && estaCercaDelRack()) {
      // Soltar caja
      soltarCajaEnRack(cajaCargada);
      scene.attach(cajaCargada);
      cajaCargada = null;
      objetoInteractuable = null;
      return; // Evitamos seguir con otras interacciones
    }

    if (cajaCargada) {
      scene.attach(cajaCargada);
      cajaCargada = null;
      objetoInteractuable = null;
      return;
    }
    if (cajaCercana) {
      // Cargar caja
      cajaCargada = cajaCercana;
      camera.add(cajaCargada);
      cajaCargada.position.set(0, -0.5, -2);
      orientarCajaAlJugador(cajaCargada);

      objetoInteractuable = null;

      return; // Evitamos seguir con otras interacciones
    }

    if (cajaCercana || cajaCargada) return;
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
      case 'cuadro3':
        popupText.innerHTML = textoCuadro3 + `<img src="textures/cuadro3.png" style="max-width:100%;">`;
        break;
      case 'papelPuzzle':
        popupText.innerHTML = textoPuzzle;
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
  paredDerPerp.position.z - paredGrosor / 2 - escaleraProfundidad / 2 - .7 // al frente de la pared
);

// Para que miren hacia la misma dirección que la pared (para que el "frente" de las escaleras sea hacia el pasillo)
escalerasGrupo.rotation.y = 4 * Math.PI / 2;

scene.add(escalerasGrupo);


//CUARTOTECHCOMM
const paredDerTech = new THREE.Mesh(paredGeometry, paredMaterial);
paredDerTech.rotation.y = Math.PI / 2;
paredDerTech.position.set(
  3.8 + paredAncho / 2 - paredGrosor / 2,
  1.2,
  -19.5 + paredAncho / 2 - paredGrosor / 2
);
scene.add(paredDerTech);

const paredIzqTech = new THREE.Mesh(paredGeometry, paredMaterial);
paredIzqTech.rotation.y = Math.PI / 2;
paredIzqTech.position.set(
  -2 + paredAncho / 2 - paredGrosor / 2,
  1.2,
  -19.5 + paredAncho / 2 - paredGrosor / 2
);
scene.add(paredIzqTech);

//RACK
function crearRack({ ancho = 3, profundidad = 1, altura = 4, niveles = 2, posicion = new THREE.Vector3(0, 0, 0), rotacion = new THREE.Euler(0, 0, 0), texturaURL = null }) {
  const grupoRack = new THREE.Group();

  // Textura
  const textureLoader = new THREE.TextureLoader();
  const rackMaterial = new THREE.MeshStandardMaterial({
    map: texturaURL ? textureLoader.load(texturaURL) : null,
    color: texturaURL ? 0xffffff : 0x888888,
    side: THREE.DoubleSide
  });

  // Geometrías
  const posteAncho = 0.1;
  const posteGeometry = new THREE.BoxGeometry(posteAncho, altura, posteAncho);
  const barraGeometry = new THREE.BoxGeometry(ancho, 0.05, 0.05);
  const barraLatGeometry = new THREE.BoxGeometry(0.05, 0.05, profundidad);
  const baseGeometry = new THREE.BoxGeometry(ancho - 0.1, 0.05, profundidad - 0.1);

  // Crear postes (4 esquinas)
  const posicionesPostes = [
    [0, 0, 0],
    [ancho, 0, 0],
    [0, 0, profundidad],
    [ancho, 0, profundidad],
  ];

  for (const [x, y, z] of posicionesPostes) {
    const poste = new THREE.Mesh(posteGeometry, rackMaterial);
    poste.position.set(x, altura / 2, z);
    grupoRack.add(poste);
  }

  // Crear niveles
  const travesañoAltura = altura / (niveles + 1);

  for (let i = 1; i <= niveles; i++) {
    const nivelY = travesañoAltura * i;

    // Barras frontales y traseras
    const barraF = new THREE.Mesh(barraGeometry, rackMaterial);
    barraF.position.set(ancho / 2, nivelY, 0);
    grupoRack.add(barraF);

    const barraB = new THREE.Mesh(barraGeometry, rackMaterial);
    barraB.position.set(ancho / 2, nivelY, profundidad);
    grupoRack.add(barraB);

    // Barras laterales
    const barraL = new THREE.Mesh(barraLatGeometry, rackMaterial);
    barraL.position.set(0, nivelY, profundidad / 2);
    grupoRack.add(barraL);

    const barraR = new THREE.Mesh(barraLatGeometry, rackMaterial);
    barraR.position.set(ancho, nivelY, profundidad / 2);
    grupoRack.add(barraR);

    // Base del nivel
    const base = new THREE.Mesh(baseGeometry, rackMaterial);
    base.position.set(ancho / 2, nivelY - 0.025, profundidad / 2);
    grupoRack.add(base);
  }

  // Posicionar todo el rack
  grupoRack.position.copy(posicion);
  grupoRack.rotation.copy(rotacion); // ← AQUÍ


  return grupoRack;
}

const rack1 = crearRack({
  ancho: 3,
  profundidad: 1.2,
  altura: 4,
  niveles: 3,
  posicion: new THREE.Vector3(0, 0, 0),
  texturaURL: 'textures/metal.jpg'
});

// scene.add(rack1);

// Otro rack más chico y en otra posición
const rack2 = crearRack({
  ancho: 3,
  profundidad: 0.8,
  altura: 3,
  niveles: 2,
  posicion: new THREE.Vector3(1, 0, -14),
  rotacion: new THREE.Euler(0, Math.PI / 2, 0), // ← rotado en Y

});

scene.add(rack2);

//Reja de presion
function crearRejaPrision({
  ancho = 3,
  alto = 3,
  profundidad = 0.1,
  cantidadBarras = 5,
  cantidadHorizontales = 3,
  posicion = new THREE.Vector3(0, 0, 0),
  rotacion = new THREE.Euler(0, 0, 0),
  texturaURL = null
}) {
  const grupoReja = new THREE.Group();

  // Cargar textura o color base
  const textureLoader = new THREE.TextureLoader();
  const material = new THREE.MeshStandardMaterial({
    map: texturaURL ? textureLoader.load(texturaURL) : null,
    color: texturaURL ? 0xffffff : 0x666666,
    metalness: 0.6,
    roughness: 0.4
  });

  // Dimensiones de barras
  const barraAncho = 0.05;
  const barraProfundidad = profundidad;

  // Geometría vertical
  const barraVerticalGeometry = new THREE.BoxGeometry(barraAncho, alto, barraProfundidad);

  // Espaciado entre barras
  const espacio = ancho / (cantidadBarras - 1);

  for (let i = 0; i < cantidadBarras; i++) {
    const x = i * espacio;
    const barra = new THREE.Mesh(barraVerticalGeometry, material);
    barra.position.set(x, alto / 2, 0);
    grupoReja.add(barra);
  }

  // Geometría horizontal (traves)
  const barraHorizontalGeometry = new THREE.BoxGeometry(ancho, barraAncho, barraProfundidad);

  // Posiciones verticales de los travesaños
  const espacioH = alto / (cantidadHorizontales + 1);

  for (let i = 1; i <= cantidadHorizontales; i++) {
    const y = espacioH * i;
    const barra = new THREE.Mesh(barraHorizontalGeometry, material);
    barra.position.set(ancho / 2, y, 0);
    grupoReja.add(barra);
  }

  // Posicionar y rotar la reja
  grupoReja.position.copy(posicion);
  grupoReja.rotation.copy(rotacion);

  return grupoReja;
}

const reja = crearRejaPrision({
  ancho: 5.5,
  alto: 3,
  cantidadBarras: 8,
  cantidadHorizontales: 3,
  posicion: new THREE.Vector3(1.1, 0, -17.5),
  rotacion: new THREE.Euler(0, 0, 0),
  texturaURL: null // O pon la URL de tu textura metálica aquí
});

scene.add(reja);



// CAJA DE CARTON CON POSIBILIDAD DE MOVIMIENTO 

const cajas = []; // Donde guardarás todas las cajas
let cajaCercana = null;
let cajaCargada = null;
const distanciaInteraccion = 2.5; // Puedes ajustarla


function crearCajaCartonConNumero_BoxGeometry({
  ancho = 2,
  alto = 1.5,
  profundo = 2,
  colorCarton = 0xa0522d,
  numero = "42",
  caraNumero = "derecha", // "frente", "izquierda", etc.
  posicion = new THREE.Vector3(0, 0, 0),
  rotacion = new THREE.Euler(0, 0, 0)
}) {
  const grupoCaja = new THREE.Group();

  // Crear textura con número en canvas
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#a0522d"; // color cartón
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.font = "bold 200px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(numero, canvas.width / 2, canvas.height / 2);

  const texturaNumero = new THREE.CanvasTexture(canvas);

  // Crear materiales para cada cara del cubo
  const materiales = [];

  const materialCarton = new THREE.MeshStandardMaterial({
    color: colorCarton,
    metalness: 0.1,
    roughness: 0.9
  });

  const materialConNumero = new THREE.MeshStandardMaterial({
    map: texturaNumero,
    metalness: 0.1,
    roughness: 0.9
  });

  // Mapear caras de BoxGeometry
  // Orden: [px, nx, py, ny, pz, nz]
  //        [+X, -X, +Y, -Y, +Z, -Z]
  // Elegimos en cuál cara va el número

  const caras = ["derecha", "izquierda", "arriba", "abajo", "frente", "atras"];

  for (let i = 0; i < 6; i++) {
    if (caras[i] === caraNumero) {
      materiales.push(materialConNumero);
    } else {
      materiales.push(materialCarton);
    }
  }

  // Crear caja con materiales
  const caja = new THREE.Mesh(
    new THREE.BoxGeometry(ancho, alto, profundo),
    materiales
  );

  // Permitir sombras si estás usándolas
  caja.castShadow = true;
  caja.receiveShadow = true;

  // Añadir a grupo
  grupoCaja.add(caja);

  // Posicionar y rotar el grupo
  grupoCaja.position.copy(posicion);
  grupoCaja.rotation.copy(rotacion);

  grupoCaja.userData.caraNumero = caraNumero;
  grupoCaja.userData.numero = numero;


  return grupoCaja;
}


const caja = crearCajaCartonConNumero_BoxGeometry({
  ancho: .5,
  alto: .5,
  profundo: .5,
  numero: "1",
  caraNumero: "frente", // puede ser "derecha", "izquierda", etc.
  posicion: new THREE.Vector3(3, .5, -15),
  rotacion: new THREE.Euler(0, Math.PI / 4, 0)
});

const caja2 = crearCajaCartonConNumero_BoxGeometry({
  ancho: .5,
  alto: .5,
  profundo: .7,
  numero: "2",
  caraNumero: "frente", // puede ser "derecha", "izquierda", etc.
  posicion: new THREE.Vector3(4, .5, -15),
  rotacion: new THREE.Euler(0, 0, 0)
});

caja2.rotation.y = 20 * Math.PI / 4; // 45 grados

const caja3 = crearCajaCartonConNumero_BoxGeometry({
  ancho: .5,
  alto: .5,
  profundo: .5,
  numero: "0",
  caraNumero: "frente", // puede ser "derecha", "izquierda", etc.
  posicion: new THREE.Vector3(4.8, .5, -15.5),
  rotacion: new THREE.Euler(0, 0, 0)
});

caja3.rotation.y = 50 * Math.PI / 4;

const caja4 = crearCajaCartonConNumero_BoxGeometry({
  ancho: .5,
  alto: .5,
  profundo: .5,
  numero: "1",
  caraNumero: "frente", // puede ser "derecha", "izquierda", etc.
  posicion: new THREE.Vector3(5.5, .5, -14.5),
  rotacion: new THREE.Euler(0, 0, 0)
});

caja4.rotation.y = 10 * Math.PI / 4;

const caja5 = crearCajaCartonConNumero_BoxGeometry({
  ancho: .5,
  alto: .5,
  profundo: .5,
  numero: "2",
  caraNumero: "frente", // puede ser "derecha", "izquierda", etc.
  posicion: new THREE.Vector3(5.5, .5, -16),
  rotacion: new THREE.Euler(0, 0, 0)
});

caja5.rotation.y = 10 * Math.PI / 4;

const caja6 = crearCajaCartonConNumero_BoxGeometry({
  ancho: .5,
  alto: .5,
  profundo: .5,
  numero: "6",
  caraNumero: "frente", // puede ser "derecha", "izquierda", etc.
  posicion: new THREE.Vector3(4.5, .5, -16.5),
  rotacion: new THREE.Euler(0, 0, 0)
});

caja6.rotation.y = 80 * Math.PI / 4;

scene.add(caja);
scene.add(caja2);
scene.add(caja3);
scene.add(caja4);
scene.add(caja5);
scene.add(caja6);

cajas.push(caja);
cajas.push(caja2);
cajas.push(caja3);
cajas.push(caja4);
cajas.push(caja5);
cajas.push(caja6);


function detectarCajaCercana() {
  cajaCercana = null;

  for (const caja of cajas) {
    const distancia = caja.position.distanceTo(camera.position);

    if (distancia < distanciaInteraccion) {
      cajaCercana = caja;
      break;
    }
  }

  // Mostrar u ocultar el mensaje
  const msg = document.getElementById("interactMsg");
  if (cajaCercana && !cajaCargada) {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
  }
}

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
  const distanciaAlPapelPuzzle = camera.position.distanceTo(papelPuzzle.position);
  if (distanciaAlPapelPuzzle < distanciaMinima) {
    popupText.innerHTML = textoPuzzle;
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

  detectarCajaCercana(); // Detecta cada frame

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
  const distanciaAlCuadro3 = camera.position.distanceTo(cuadro3.position);
  const distanciaAlPapelPuzzle = camera.position.distanceTo(papelPuzzle.position);


  if (popup.style.display === 'none') {
    if (cajaCercana && !cajaCargada) {
      // interactMsg.style.display = 'block';
      objetoInteractuable = 'caja'; // Sobrescribe o gestiona esto según tu lógica
    }
    else if (!cajaCargada) { // 👈 Solo si no hay caja en mano

      if (distanciaAlPapel < distanciaMinima) {
        interactMsg.style.display = 'block';
        objetoInteractuable = 'papel';
      } else if (distanciaAlCuadro1 < distanciaMinima) {
        interactMsg.style.display = 'block';
        objetoInteractuable = 'cuadro1';
      } else if (distanciaAlCuadro2 < distanciaMinima) {
        interactMsg.style.display = 'block';
        objetoInteractuable = 'cuadro2';
      }
      else if (distanciaAlCuadro3 < distanciaMinima) {
        interactMsg.style.display = 'block';
        objetoInteractuable = 'cuadro3';
      }
      else if (distanciaAlPapelPuzzle < distanciaMinima) {
        interactMsg.style.display = 'block';
        objetoInteractuable = 'papelPuzzle';
      }
      else {
        interactMsg.style.display = 'none';
        objetoInteractuable = null;
      }
    } else {
      interactMsg.style.display = 'none';
    }
  }

  renderer.render(scene, camera);
}

function orientarCajaAlJugador(caja) {
  const cara = caja.userData.caraNumero;

  if (!cara) return;

  const rotaciones = {
    frente: 0,
    atras: Math.PI,
    derecha: -Math.PI / 2,
    izquierda: Math.PI / 2
    // Puedes agregar "arriba" y "abajo" si lo necesitas
  };

  // Resetear rotación
  caja.rotation.set(0, 0, 0);

  // Rotar solo en el eje Y
  if (rotaciones[cara] !== undefined) {
    caja.rotation.y = rotaciones[cara];
  }
}


animate();


// window.addEventListener('keydown', (event) => {
//   if (event.key.toLowerCase() === 'x') {
//     if (cajaCargada && estaCercaDelRack()) {
//       soltarCajaEnRack(cajaCargada);
//       cajaCargada = null;
//     }
//   }
// });

function estaCercaDelRack() {
  // Ajusta esta lógica según cómo y dónde esté tu rack
  const rackPos = new THREE.Vector3(1, 0, -14); // 🧱 Posición de ejemplo del rack
  const distancia = camera.position.distanceTo(rackPos);
  return distancia < 2.5; // Ajusta según lo que consideres "cerca"
}

function soltarCajaEnRack(caja) {
  // Ejemplo: posición fija de una tarima del rack
  const posicionTarima = new THREE.Vector3(1, 2, -14); // 🟫 Ajusta esto a la posición real de la tarima

  caja.position.copy(posicionTarima);

  orientarCajaAlFrenteDelRack(caja); // Aquí orientamos la caja para que la cara con número mire al frente
  caja.userData.enRack = true;

  verificarCombinacionDeCajas(); // 👈 lo llamamos aquí
}

function orientarCajaAlFrenteDelRack(caja) {
  const cara = caja.userData.caraNumero;

  const rotaciones = {
    frente: 0,
    atras: Math.PI,
    derecha: Math.PI / 2,
    izquierda: -Math.PI / 2
  };

  const frenteDelRack = 0; // La dirección en radianes hacia la que mira el rack (ajusta si necesario)

  // Rota la caja para que su cara con número quede mirando hacia el frente del rack
  if (rotaciones[cara] !== undefined) {
    const rotacionNecesaria = frenteDelRack - rotaciones[cara];
    caja.rotation.set(0, rotacionNecesaria, 0);
  }
}

function verificarCombinacionDeCajas() {
  console.log("si entro");
  const cajasEnRack = cajas.filter(c => c.userData.enRack);

  if (cajasEnRack.length < 3) return; // Asegura que haya al menos 3

  // Ordenar por posición X (ajusta si tu rack está en otro eje)
  cajasEnRack.sort((a, b) => a.position.x - b.position.x);

  // Obtener los números
  const codigoActual = cajasEnRack.map(c => {
    const canvas = c.children[0]?.material.map?.image;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Aquí podrías hacer OCR si fuera complejo, pero como tú mismo le pusiste el número:
      return c.children[0]?.material.map ? c.children[0].material.map.image.textContent || c.userData.numero : "?";
    }
    return c.userData.numero || "?"; // 👈 asegúrate de guardar el número aquí
  }).join("");

  console.log("Código formado:", codigoActual);

  if (codigoActual === "122016") {
    abrirReja();
  }
}

function abrirReja() {
  console.log("¡Código correcto! Abriendo reja...");

  // Movimiento simple hacia arriba
  const alturaFinal = 5;
  const velocidad = 0.05;

  const animacion = () => {
    if (reja.position.y < alturaFinal) {
      reja.position.y += velocidad;
      requestAnimationFrame(animacion);
    }
  };

  animacion();
}
