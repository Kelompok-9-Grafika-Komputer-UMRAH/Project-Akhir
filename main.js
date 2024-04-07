import * as THREE from 'three';
import { 
	rotateMatrixX, rotateMatrixY, 
	rotateMatrixZ,scaleAll, scaleX,
	scaleY, scaleZ, translateAll } from './transformation-matrix.js';
import {createFloor} from './mesh/floor.js';
import { createWalls } from './mesh/wall.js';
import { createWindow } from './mesh/window.js';

//settin up the scene
const scene = new THREE.Scene();
/*const axesHelper = new THREE.AxesHelper( 7 );
scene.add( axesHelper );*/
/*const gridHelper = new THREE.GridHelper( 20, 20 );
scene.add( gridHelper );*/

//setting up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-1, 3, 11);
//camera.lookAt(0,0,0);

//setting up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//setting up light
const light = new THREE.AmbientLight( 0xffffff, 0.6 ); 
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
directionalLight.position.y = 15;
directionalLight.position.z = -15;
directionalLight.position.x = 15;
directionalLight.lookAt(0, 0, 0);
scene.add( directionalLight );

//adding the floor
const floor = createFloor();
floor.applyMatrix4(scaleAll(10,10,10));
floor.applyMatrix4(rotateMatrixX(90));

//adding the walls
const firstWall = createWalls();
firstWall.position.y = 0.5;
firstWall.position.x = -10;
firstWall.applyMatrix4(scaleZ(10));
firstWall.applyMatrix4(scaleX(0.5));
firstWall.applyMatrix4(scaleY(6));

const secondWall = createWalls();
secondWall.position.y = 0.5;
secondWall.position.z = -10;
secondWall.applyMatrix4(scaleZ(0.5));
secondWall.applyMatrix4(scaleX(10));
secondWall.applyMatrix4(scaleY(6));

//adding the window
const secondWindows = createWindow();
secondWindows.applyMatrix4(scaleAll(0.5, 0.5, 0.5));
secondWindows.applyMatrix4(translateAll(1, 2.5, -4.7));

const firstWindows = createWindow();
firstWindows.applyMatrix4(scaleAll(0.5, 0.5, 0.5));
firstWindows.applyMatrix4(rotateMatrixY(90));
firstWindows.applyMatrix4(translateAll(-4.7, 2.5,1 ));

const objectArray = [
	floor, firstWall, secondWall,
	firstWindows, secondWindows];
const room = new THREE.Group();
for (const object of objectArray) {
	room.add(object);
}

scene.add(room);


//rendering
function animate() {
	requestAnimationFrame( animate );
	room.applyMatrix4(rotateMatrixY(1));
	renderer.render( scene, camera );
}
animate();