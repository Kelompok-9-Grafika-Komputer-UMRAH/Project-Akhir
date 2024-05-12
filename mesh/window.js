import {
    BufferAttribute, BufferGeometry, Group,
    TextureLoader, SRGBColorSpace, DoubleSide,
    MeshLambertMaterial, Mesh, PlaneGeometry,
}from 'three'

import { 
	rotateMatrixX, rotateMatrixY, 
	rotateMatrixZ,scaleAll, scaleX,
	scaleY, scaleZ, translateAll
} from '../transformation-matrix';

const vertices = [
    // front
    { pos: [-5, -0.5,  0.5], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
    { pos: [ 5, -0.5,  0.5], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
    { pos: [-4.5,  0.5,  0.5], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
    { pos: [ 4.5,  0.5,  0.5], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
    // right
    { pos: [ 5, -0.5,  0.5], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
    { pos: [ 5, -0.5, -0.5], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
    { pos: [ 4.5,  0.5,  0.5], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
    { pos: [ 4.5,  0.5, -0.5], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
    // back
    { pos: [ 5, -0.5, -0.5], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
    { pos: [-5, -0.5, -0.5], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
    { pos: [ 4.5,  0.5, -0.5], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
    { pos: [-4.5,  0.5, -0.5], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
    // left
    { pos: [-5, -0.5, -0.5], norm: [-1,  0,  0], uv: [0, 0], }, // 12
    { pos: [-5, -0.5,  0.5], norm: [-1,  0,  0], uv: [1, 0], }, // 13
    { pos: [-4.5,  0.5, -0.5], norm: [-1,  0,  0], uv: [0, 1], }, // 14
    { pos: [-4.5,  0.5,  0.5], norm: [-1,  0,  0], uv: [1, 1], }, // 15
    // top
    { pos: [ 4.5,  0.5, -0.5], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
    { pos: [-4.5,  0.5, -0.5], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
    { pos: [ 4.5,  0.5,  0.5], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
    { pos: [-4.5,  0.5,  0.5], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
    // bottom
    { pos: [ 5, -0.5,  0.5], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
    { pos: [-5, -0.5,  0.5], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
    { pos: [ 5, -0.5, -0.5], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
    { pos: [-5, -0.5, -0.5], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
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
for (const vertex of vertices) {
  positions.push(...vertex.pos);
  normals.push(...vertex.norm);
  uvs.push(...vertex.uv);
}

function createWindowFrame(){
    const posAttribute = new BufferAttribute(
        new Float32Array(positions), 3
    );
    const normAttribute = new BufferAttribute(
        new Float32Array(normals), 3
    );
    const uvAttribute = new BufferAttribute(
        new Float32Array(uvs), 2
    );
    
    const windowFrameGeometry = new BufferGeometry();
    windowFrameGeometry.setAttribute('position', posAttribute);
    windowFrameGeometry.setAttribute('normal', normAttribute);
    windowFrameGeometry.setAttribute('uv', uvAttribute);
    windowFrameGeometry.setIndex(indices);
    
    const loader = new TextureLoader();
    const texture = loader.load( 'texture/wood_table_001_.jpg' );
    texture.colorSpace = SRGBColorSpace;
    const windowFrameMaterial = new MeshLambertMaterial({map:texture});
    
    const windowFrame = new Mesh(windowFrameGeometry, windowFrameMaterial);
    return windowFrame;
}

function createWindowGlass(){
    const glassGeometry = new PlaneGeometry( 1, 1 );
    //texture
    /*const loader = new TextureLoader();
    const texture = loader.load( '' );
    texture.colorSpace = SRGBColorSpace;*/
    const glassMaterial = new MeshLambertMaterial( {color:0x989EA1, side: DoubleSide} );
    //basic color
    //const floorMaterial = new MeshLambertMaterial({color: 0xB37B50, side: DoubleSide});
    const glass = new Mesh(glassGeometry, glassMaterial );
    return glass;
}

export function createWindow(){
    const windows = new Group();

    const windowFrameBottom = createWindowFrame();
    windowFrameBottom.applyMatrix4(translateAll(0, 0.5, 0));
    windowFrameBottom.applyMatrix4(scaleY(0.3));
    windows.add(windowFrameBottom);

    const windowFrameTop = createWindowFrame();
    windowFrameTop.applyMatrix4(rotateMatrixX(180));
    windowFrameTop.applyMatrix4(translateAll(0, 14.5, 0));
    windowFrameTop.applyMatrix4(scaleY(0.3));
    windows.add(windowFrameTop);

    const windowFrameLeft = createWindowFrame();
    windowFrameLeft.applyMatrix4(rotateMatrixZ(-90));
    windowFrameLeft.applyMatrix4(scaleY(0.45));
    windowFrameLeft.applyMatrix4(scaleX(0.5));
    windowFrameLeft.applyMatrix4(translateAll(-4.7, 2.25, 0));
    windows.add(windowFrameLeft);

    const windowFrameRight = createWindowFrame();
    windowFrameRight.applyMatrix4(rotateMatrixZ(90));
    windowFrameRight.applyMatrix4(scaleY(0.45));
    windowFrameRight.applyMatrix4(scaleX(0.5));
    windowFrameRight.applyMatrix4(translateAll(4.7, 2.25, 0));
    windows.add(windowFrameRight);

    //add window glass
    const windowGlass = createWindowGlass();
    windowGlass.applyMatrix4(scaleAll(9, 4, 1));
    windowGlass.applyMatrix4(translateAll(0, 2.1, 0));
    windows.add(windowGlass);

    return windows;
}

