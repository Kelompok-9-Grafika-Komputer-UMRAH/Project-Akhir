import {
    BufferAttribute, BufferGeometry,
    TextureLoader, SRGBColorSpace,
    Mesh, MeshLambertMaterial, Group,
    CylinderGeometry
}from 'three';

import { 
	rotateMatrixX, rotateMatrixY, 
	rotateMatrixZ,scaleAll, scaleX,
	scaleY, scaleZ, translateAll 
} from '../transformation-matrix.js';

const trapezoidVertices = [
    // front
    { pos: [-1, -0.2,  1], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
    { pos: [ 1.2, -0.2,  1], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
    { pos: [-1,  0.2,  1], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
    { pos: [ 1,  0.2,  1], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
    // right
    { pos: [ 1.2, -0.2,  1], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
    { pos: [ 1.2, -0.2, -1], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
    { pos: [ 1,  0.2,  1], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
    { pos: [ 1,  0.2, -1], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
    // back
    { pos: [ 1.2, -0.2, -1], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
    { pos: [-1, -0.2, -1], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
    { pos: [ 1,  0.2, -1], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
    { pos: [-1,  0.2, -1], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
    // left
    { pos: [-1, -0.2, -1], norm: [-1,  0,  0], uv: [0, 0], }, // 12
    { pos: [-1, -0.2,  1], norm: [-1,  0,  0], uv: [1, 0], }, // 13
    { pos: [-1,  0.2, -1], norm: [-1,  0,  0], uv: [0, 1], }, // 14
    { pos: [-1,  0.2,  1], norm: [-1,  0,  0], uv: [1, 1], }, // 15
    // top
    { pos: [ 1,  0.2, -1], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
    { pos: [-1,  0.2, -1], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
    { pos: [ 1,  0.2,  1], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
    { pos: [-1,  0.2,  1], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
    // bottom
    { pos: [ 1.2, -0.2,  1], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
    { pos: [-1, -0.2,  1], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
    { pos: [ 1.2, -0.2, -1], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
    { pos: [-1, -0.2, -1], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
];

const indices = [
    0,  1,  2,   2,  1,  3,  // front
   4,  5,  6,   6,  5,  7,  // right
   8,  9, 10,  10,  9, 11,  // back
  12, 13, 14,  14, 13, 15,  // left
  16, 17, 18,  18, 17, 19,  // top
  20, 21, 22,  22, 21, 23,  // bottom
];

export function createTrapezoid(){

    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of trapezoidVertices) {
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
    const loader = new TextureLoader();
    const texture = loader.load( 'texture/oak-veneer-1.jpg' );
    texture.colorSpace = SRGBColorSpace;
    const material = new MeshLambertMaterial({
        map:texture
    });

    const trapezoid = new Mesh(geometry, material);
    return trapezoid;
}

export function createChairLeg(){
    const radiusTop = 1;
    const radiusBottom = 0.8;
    const height = 5;
    const radialSegments = 12;
    const geometry = new CylinderGeometry(
        radiusTop, radiusBottom, height, radialSegments );
    const loader = new TextureLoader();
    const texture = loader.load( 'texture/oak-veneer-1.jpg' );
    texture.colorSpace = SRGBColorSpace;
    const material = new MeshLambertMaterial({
            map:texture
    });

    const chairLeg = new Mesh(geometry, material);
    return chairLeg;
}

export function createChair(){
    const chair = new Group();

    const chairSeat = createTrapezoid();
    chairSeat.applyMatrix4(translateAll(0, 2, 0));
    chairSeat.applyMatrix4(scaleAll(1.5, 1.5, 1.5));
    chair.add(chairSeat);

    const chairBackRest = createTrapezoid();
    chairBackRest.applyMatrix4(rotateMatrixY(180));
    chairBackRest.applyMatrix4(rotateMatrixZ(90));
    chairBackRest.applyMatrix4(translateAll(1, 2.44, 0));
    chairBackRest.applyMatrix4(scaleAll(1.5, 2.2, 1.5));
    chair.add(chairBackRest);

    const frontLeft = createChairLeg();
    frontLeft.applyMatrix4(scaleAll(0.3, 0.6, 0.3));
    frontLeft.applyMatrix4(translateAll(-1, 1.5, 1));
    chair.add(frontLeft);

    const frontRight = createChairLeg();
    frontRight.applyMatrix4(scaleAll(0.3, 0.6, 0.3));
    frontRight.applyMatrix4(translateAll(-1, 1.5, -1));
    chair.add(frontRight);

    const BackLeft = createChairLeg();
    BackLeft.applyMatrix4(scaleAll(0.3, 0.6, 0.3));
    BackLeft.applyMatrix4(translateAll(1, 1.5, 1));
    chair.add(BackLeft);

    const BackRight = createChairLeg();
    BackRight.applyMatrix4(scaleAll(0.3, 0.6, 0.3));
    BackRight.applyMatrix4(translateAll(1, 1.5, -1));
    chair.add(BackRight);

    return chair;
}