import {
    BufferAttribute, BufferGeometry,
    TextureLoader, SRGBColorSpace,
    Mesh, MeshLambertMaterial, Group
}from 'three';

import { 
	rotateMatrixX, rotateMatrixY, 
	rotateMatrixZ,scaleAll, scaleX,
	scaleY, scaleZ, translateAll 
} from '../transformation-matrix.js';


//table leg
const tableLegVertices = [
    // front
    { pos: [-0.5, -1,  0.5], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
    { pos: [ 0.5, -1,  0.5], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
    { pos: [-1,  6,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
    { pos: [ 1,  6,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
    // right
    { pos: [ 0.5, -1,  0.5], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
    { pos: [ 0.5, -1, -0.5], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
    { pos: [ 1,  6,  1], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
    { pos: [ 1,  6, -1], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
    // back
    { pos: [ 0.5, -1, -0.5], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
    { pos: [-0.5, -1, -0.5], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
    { pos: [ 1,  6, -1], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
    { pos: [-1,  6, -1], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
    // left
    { pos: [-0.5, -1, -0.5], norm: [-1,  0,  0], uv: [0, 0], }, // 12
    { pos: [-0.5, -1,  0.5], norm: [-1,  0,  0], uv: [1, 0], }, // 13
    { pos: [-1,  6, -1], norm: [-1,  0,  0], uv: [0, 1], }, // 14
    { pos: [-1,  6,  1], norm: [-1,  0,  0], uv: [1, 1], }, // 15
    // top
    { pos: [ 1,  6, -1], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
    { pos: [-1,  6, -1], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
    { pos: [ 1,  6,  1], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
    { pos: [-1,  6,  1], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
    // bottom
    { pos: [ 0.5, -1,  0.5], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
    { pos: [-0.5, -1,  0.5], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
    { pos: [ 0.5, -1, -0.5], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
    { pos: [-0.5, -1, -0.5], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
];

//desk

const deskVertices = [
    // front
    { pos: [-5, -0.5,  5], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
    { pos: [ 5, -0.5,  5], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
    { pos: [-5,  0.5,  5], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
    { pos: [ 5,  0.5,  5], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
    // right
    { pos: [ 5, -0.5,  5], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
    { pos: [ 5, -0.5, -5], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
    { pos: [ 5,  0.5,  5], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
    { pos: [ 5,  0.5, -5], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
    // back
    { pos: [ 5, -0.5, -5], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
    { pos: [-5, -0.5, -5], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
    { pos: [ 5,  0.5, -5], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
    { pos: [-5,  0.5, -5], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
    // left
    { pos: [-5, -0.5, -5], norm: [-1,  0,  0], uv: [0, 0], }, // 12
    { pos: [-5, -0.5,  5], norm: [-1,  0,  0], uv: [1, 0], }, // 13
    { pos: [-5,  0.5, -5], norm: [-1,  0,  0], uv: [0, 1], }, // 14
    { pos: [-5,  0.5,  5], norm: [-1,  0,  0], uv: [1, 1], }, // 15
    // top
    { pos: [ 5,  0.5, -5], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
    { pos: [-5,  0.5, -5], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
    { pos: [ 5,  0.5,  5], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
    { pos: [-5,  0.5,  5], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
    // bottom
    { pos: [ 5, -0.5,  5], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
    { pos: [-5, -0.5,  5], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
    { pos: [ 5, -0.5, -5], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
    { pos: [-5, -0.5, -5], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
];

const indices = [
    0,  1,  2,   2,  1,  3,  // front
   4,  5,  6,   6,  5,  7,  // right
   8,  9, 10,  10,  9, 11,  // back
  12, 13, 14,  14, 13, 15,  // left
  16, 17, 18,  18, 17, 19,  // top
  20, 21, 22,  22, 21, 23,  // bottom
];

function createTableLeg(){
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of tableLegVertices) {
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

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', posAttribute);
    geometry.setAttribute('normal', normAttribute);
    geometry.setAttribute('uv', uvAttribute);
    geometry.setIndex(indices);

    /*const loader = new TextureLoader();
    const texture = loader.load( 'concrete.png' );
    texture.colorSpace = SRGBColorSpace;*/
    const material = new MeshLambertMaterial({
        color : 0xffffff
    });

    const mesh = new Mesh(geometry, material);
    return mesh;
}

function createDesk(){
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of deskVertices) {
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

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', posAttribute);
    geometry.setAttribute('normal', normAttribute);
    geometry.setAttribute('uv', uvAttribute);
    geometry.setIndex(indices);

    /*const loader = new TextureLoader();
    const texture = loader.load( 'concrete.png' );
    texture.colorSpace = SRGBColorSpace;*/
    const material = new MeshLambertMaterial({
        color : 0xffffff
    });

    const mesh = new Mesh(geometry, material);
    return mesh;
}

export function createTable(){
    const table = new Group();

    const deskBottom = createDesk();
    deskBottom.applyMatrix4(scaleAll(0.2, 0.2, 0.2));
    deskBottom.applyMatrix4(translateAll(0, 1, 0));
    table.add(deskBottom);

    const legFrontLeft = createTableLeg();
    legFrontLeft.applyMatrix4(scaleAll(0.4, 0.5, 0.4));
    legFrontLeft.applyMatrix4(translateAll(-0.85, 0, 0.85));
    table.add(legFrontLeft);

    const legFrontRight = createTableLeg();
    legFrontRight.applyMatrix4(scaleAll(0.4, 0.5, 0.4));
    legFrontRight.applyMatrix4(translateAll(0.85, 0, 0.85));
    table.add(legFrontRight);

    const legBackLeft = createTableLeg();
    legBackLeft.applyMatrix4(scaleAll(0.4, 0.5, 0.4));
    legBackLeft.applyMatrix4(translateAll(-0.85, 0, -0.85));
    table.add(legBackLeft);

    const legBackRight = createTableLeg();
    legBackRight.applyMatrix4(scaleAll(0.4, 0.5, 0.4));
    legBackRight.applyMatrix4(translateAll(0.85, 0, -0.85));
    table.add(legBackRight);

    const deskTop = createDesk();
    deskTop.applyMatrix4(scaleAll(0.3, 0.3, 0.3));
    deskTop.applyMatrix4(translateAll(0, 3, 0));
    table.add(deskTop);

    return table;
}


