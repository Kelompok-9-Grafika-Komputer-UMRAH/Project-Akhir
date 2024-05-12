import * as THREE from 'three';
import { 
	rotateMatrixX, rotateMatrixY, 
	rotateMatrixZ,scaleAll, scaleX,
	scaleY, scaleZ, translateAll } from './transformation-matrix.js';
import { createFloor } from './mesh/floor.js';
import { createWalls } from './mesh/wall.js';
import { createWindow } from './mesh/window.js';
import { createTable} from './mesh/table.js';
import { createChair} from './mesh/chair.js';
import { createStool } from './mesh/stool.js';
import { createStudyTable } from './mesh/study-table.js';
import { createBookShelf } from './mesh/book-shelf.js';

//setting up the scene
const scene = new THREE.Scene();
/*const axesHelper = new THREE.AxesHelper( 7 );
scene.add( axesHelper );*/
/*const gridHelper = new THREE.GridHelper( 20, 20 );
scene.add( gridHelper );*/

//setting up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);

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
floor.applyMatrix4(scaleAll(15,15,15));
floor.applyMatrix4(rotateMatrixX(90));

//adding the walls
const firstWall = createWalls();
firstWall.applyMatrix4(translateAll(-15, 0.5, 0));
firstWall.applyMatrix4(scaleZ(15));
firstWall.applyMatrix4(scaleX(0.5));
firstWall.applyMatrix4(scaleY(8));

const secondWall = createWalls();
secondWall.applyMatrix4(translateAll(0, 0.5, -15));
secondWall.applyMatrix4(scaleZ(0.5));
secondWall.applyMatrix4(scaleX(15));
secondWall.applyMatrix4(scaleY(8));

//adding the window
const secondWindows = createWindow();
secondWindows.applyMatrix4(scaleAll(0.5, 0.5, 0.5));
secondWindows.applyMatrix4(translateAll(2, 4.5, -7.22));

const firstWindows = createWindow();
firstWindows.applyMatrix4(scaleAll(0.5, 0.5, 0.5));
firstWindows.applyMatrix4(rotateMatrixY(90));
firstWindows.applyMatrix4(translateAll(-7.22, 4.5, 2 ));

//adding the table
const table = createTable();

//adding the chair
const firstChair = createChair();
firstChair.applyMatrix4(rotateMatrixY(90));
firstChair.applyMatrix4(scaleAll(0.6, 0.6, 0.6));
firstChair.applyMatrix4(translateAll(0, 0, -2.5));

const secondChair = createChair();
secondChair.applyMatrix4(rotateMatrixY(-90));
secondChair.applyMatrix4(scaleAll(0.6, 0.6, 0.6));
secondChair.applyMatrix4(translateAll(0, 0, 2.5));

//adding the stools
const firstStool = createStool();
firstStool.applyMatrix4(translateAll(4.5, 0, 0));
firstStool.applyMatrix4(scaleAll(0.6, 0.7, 0.6));

const secondStool = createStool();
secondStool.applyMatrix4(translateAll(-4.5, 0, 0));
secondStool.applyMatrix4(scaleAll(0.6, 0.7, 0.6));

//adding study table
const studyTable = createStudyTable();
studyTable.applyMatrix4(translateAll(3.8, 0, -6.4));
studyTable.applyMatrix4(scaleAll(0.9, 0.9, 1));

//adding bookshelf
const bookShelf = createBookShelf();
bookShelf.applyMatrix4(scaleAll(0.7, 0.7, 0.7));
bookShelf.applyMatrix4(translateAll(-4, 0, -6.5));

//put all object or mesh into array
const objectArray = [
	floor, firstWall, secondWall,
	firstWindows, secondWindows, table, 
	firstChair, secondChair, firstStool,
	secondStool, studyTable, bookShelf];

//group all object
const room = new THREE.Group();
for (const object of objectArray) {
	room.add(object);
}

scene.add(room);

console.log(camera.projectionMatrixInverse);
//rendering
function animate() {
	requestAnimationFrame( animate );
	room.applyMatrix4(rotateMatrixY(0.5));
	renderer.render( scene, camera );
}
animate();