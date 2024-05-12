import {
    BufferAttribute, BufferGeometry,
    TextureLoader, SRGBColorSpace,
    Mesh, MeshLambertMaterial, Group,
    SphereGeometry
}from 'three';

import { 
	rotateMatrixX, rotateMatrixY, 
	rotateMatrixZ,scaleAll, scaleX,
	scaleY, scaleZ, translateAll 
} from '../transformation-matrix.js';

const cubeVertices = [
    // front
    { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
    { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
    { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
    { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
    // right
    { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
    { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
    { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
    { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
    // back
    { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
    { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
    { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
    { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
    // left
    { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], }, // 12
    { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], }, // 13
    { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], }, // 14
    { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], }, // 15
    // top
    { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
    { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
    // bottom
    { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
    { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
    { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
    { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
];

const indices = [
    0,  1,  2,   2,  1,  3,  // front
   4,  5,  6,   6,  5,  7,  // right
   8,  9, 10,  10,  9, 11,  // back
  12, 13, 14,  14, 13, 15,  // left
  16, 17, 18,  18, 17, 19,  // top
  20, 21, 22,  22, 21, 23,  // bottom
];

const positions = [];
const normals = [];
const uvs = [];
for (const vertex of cubeVertices) {
	positions.push(...vertex.pos);
	normals.push(...vertex.norm);
	uvs.push(...vertex.uv);
}

const posAttribute = new BufferAttribute(
        new Float32Array(positions), 3
);
const normAttribute = new BufferAttribute(
        new Float32Array(normals), 3
);
const uvAttribute = new BufferAttribute(
        new Float32Array(uvs), 2
);

function createBox(){
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', posAttribute);
        geometry.setAttribute('normal', normAttribute);
        geometry.setAttribute('uv', uvAttribute);
        geometry.setIndex(indices);
        const material = new MeshLambertMaterial({
                color : 0xffffff
        });
        const mesh = new Mesh(geometry, material);
        return mesh;
}

function createDrawer(){
        const drawer = new Group();

        //create drawer cube
        const cube = createBox();
        const loader = new TextureLoader();
        const texture = loader.load( 'texture/rectangular_parquet_diff_2k.jpg' );
        texture.colorSpace = SRGBColorSpace;
        cube.material.color.set(null);
        cube.material.map = texture;
        cube.applyMatrix4(scaleAll(1.2, 0.5, 0.3));
        drawer.add(cube);

        //create drawer knob
        const radius =  1.5;  
        const widthSegments = 10;  
        const heightSegments =  10;
        const knobGeometry = new SphereGeometry(radius, widthSegments, heightSegments);
        /*const loader = new TextureLoader();
        const texture = loader.load( '' );
        texture.colorSpace = SRGBColorSpace;*/
        const knobMaterial = new MeshLambertMaterial({
                color : 0x9F643C
        });
        const drawerKnob = new Mesh(knobGeometry, knobMaterial);
        drawerKnob.applyMatrix4(scaleAll(0.13, 0.1, 0.1));
        drawerKnob.applyMatrix4(translateAll(0, 0, 0.35));
        drawer.add(drawerKnob);

        return drawer;
}

function createTableDrawerSection(){
        const drawerSection = new Group();

        const cube = createBox();
        /*const loader = new TextureLoader();
        const texture = loader.load( 'concrete.png' );
        texture.colorSpace = SRGBColorSpace;
        cube.material.color.set(null);
        cube.material.map = texture;*/
        cube.material.color.set(0x623633);
        cube.applyMatrix4(translateAll(0, 1, 0));
        cube.applyMatrix4(scaleAll(1.4, 2.025, 1));
        drawerSection.add(cube);

        const lowerDrawer = createDrawer();
        lowerDrawer.applyMatrix4(translateAll(0, 1, 0.75));
        drawerSection.add(lowerDrawer);

        const middleDrawer = createDrawer();
        middleDrawer.applyMatrix4(translateAll(0, 2.2, 0.75));
        drawerSection.add(middleDrawer);

        const upperDrawer = createDrawer();
        upperDrawer.applyMatrix4(translateAll(0, 3.4, 0.75));
        drawerSection.add(upperDrawer);

        return drawerSection;
}

export function createStudyTable(){
        const studyTable = new Group()

        const drawerSide = createTableDrawerSection();
        drawerSide.applyMatrix4(translateAll(-3.1, 0, 0));
        studyTable.add(drawerSide);
        
        const tableRightSide = createBox();
        /*const loader = new TextureLoader();
         const texture = loader.load( '' );
        texture.colorSpace = SRGBColorSpace;
        cube.material.color.set(null);
        cube.material.map = texture;*/
        tableRightSide.material.color.set(0x623633);
        tableRightSide.applyMatrix4(scaleAll(0.2, 1, 1));
        tableRightSide.applyMatrix4(translateAll(4.3, 1, 0));
        tableRightSide.applyMatrix4(scaleY(2.025));
        studyTable.add(tableRightSide);
        
        const tableSurface = createBox();
        const loader = new TextureLoader();
        const texture = loader.load( 'texture/rectangular_parquet_diff_2k.jpg');
        texture.colorSpace = SRGBColorSpace;
        tableSurface.material.color.set(null);
        tableSurface.material.map = texture;
        tableSurface.applyMatrix4(scaleAll(4.5, 0.05, 1));
        tableSurface.applyMatrix4(translateAll(0, 4.1, 0));
        studyTable.add(tableSurface); 

        return studyTable;
}