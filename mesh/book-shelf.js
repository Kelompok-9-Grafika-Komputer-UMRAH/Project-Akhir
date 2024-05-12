import {
    BufferAttribute, BufferGeometry, Group,
    TextureLoader, SRGBColorSpace, DoubleSide,
    MeshLambertMaterial, Mesh
}from 'three'

import { 
	rotateMatrixX, rotateMatrixY, 
	rotateMatrixZ,scaleAll, scaleX,
	scaleY, scaleZ, translateAll
} from '../transformation-matrix';

const shelfVertices = [
    // front
    { pos: [-4, -0.1,  0.8], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
    { pos: [ 4, -0.1,  0.8], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
    { pos: [-4,  0.1,  0.8], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
    { pos: [ 4,  0.1,  0.8], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
    // right
    { pos: [ 4, -0.1,  0.8], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
    { pos: [ 4, -0.1, -0.8], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
    { pos: [ 4,  0.1,  0.8], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
    { pos: [ 4,  0.1, -0.8], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
    // back
    { pos: [ 4, -0.1, -0.8], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
    { pos: [-4, -0.1, -0.8], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
    { pos: [ 4,  0.1, -0.8], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
    { pos: [-4,  0.1, -0.8], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
    // left
    { pos: [-4, -0.1, -0.8], norm: [-1,  0,  0], uv: [0, 0], }, // 12
    { pos: [-4, -0.1,  0.8], norm: [-1,  0,  0], uv: [1, 0], }, // 13
    { pos: [-4,  0.1, -0.8], norm: [-1,  0,  0], uv: [0, 1], }, // 14
    { pos: [-4,  0.1,  0.8], norm: [-1,  0,  0], uv: [1, 1], }, // 15
    // top
    { pos: [ 4,  0.1, -0.8], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
    { pos: [-4,  0.1, -0.8], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
    { pos: [ 4,  0.1,  0.8], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
    { pos: [-4,  0.1,  0.8], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
    // bottom
    { pos: [ 4, -0.1,  0.8], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
    { pos: [-4, -0.1,  0.8], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
    { pos: [ 4, -0.1, -0.8], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
    { pos: [-4, -0.1, -0.8], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
];

const sideFrameVertices = [
        // front
        { pos: [-0.1, -5,  0.8], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
        { pos: [ 0.1, -5,  0.8], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
        { pos: [-0.1,  5,  0.8], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
        { pos: [ 0.1,  5,  0.8], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
        // right
        { pos: [ 0.1, -5,  0.8], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
        { pos: [ 0.1, -5, -0.8], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
        { pos: [ 0.1,  5,  0.8], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
        { pos: [ 0.1,  5, -0.8], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
        // back
        { pos: [ 0.1, -5, -0.8], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
        { pos: [-0.1, -5, -0.8], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
        { pos: [ 0.1,  5, -0.8], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
        { pos: [-0.1,  5, -0.8], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
        // left
        { pos: [-0.1, -5, -0.8], norm: [-1,  0,  0], uv: [0, 0], }, // 12
        { pos: [-0.1, -5,  0.8], norm: [-1,  0,  0], uv: [1, 0], }, // 13
        { pos: [-0.1,  5, -0.8], norm: [-1,  0,  0], uv: [0, 1], }, // 14
        { pos: [-0.1,  5,  0.8], norm: [-1,  0,  0], uv: [1, 1], }, // 15
        // top
        { pos: [ 0.1,  5, -0.8], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
        { pos: [-0.1,  5, -0.8], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
        { pos: [ 0.1,  5,  0.8], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
        { pos: [-0.1,  5,  0.8], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
        // bottom
        { pos: [ 0.1, -5,  0.8], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
        { pos: [-0.1, -5,  0.8], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
        { pos: [ 0.1, -5, -0.8], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
        { pos: [-0.1, -5, -0.8], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
];

const backFrameVertices = [
        // front
        { pos: [-4.09, -5,  0.1], norm: [ 0,  0,  1], uv: [0, 0], }, // 0
        { pos: [ 4.09, -5,  0.1], norm: [ 0,  0,  1], uv: [1, 0], }, // 1
        { pos: [-4.09,  5,  0.1], norm: [ 0,  0,  1], uv: [0, 1], }, // 2
        { pos: [ 4.09,  5,  0.1], norm: [ 0,  0,  1], uv: [1, 1], }, // 3
        // right
        { pos: [ 4.09, -5,  0.1], norm: [ 1,  0,  0], uv: [0, 0], }, // 4
        { pos: [ 4.09, -5, -0.1], norm: [ 1,  0,  0], uv: [1, 0], }, // 5
        { pos: [ 4.09,  5,  0.1], norm: [ 1,  0,  0], uv: [0, 1], }, // 6
        { pos: [ 4.09,  5, -0.1], norm: [ 1,  0,  0], uv: [1, 1], }, // 7
        // back
        { pos: [ 4.09, -5, -0.1], norm: [ 0,  0, -1], uv: [0, 0], }, // 8
        { pos: [-4.09, -5, -0.1], norm: [ 0,  0, -1], uv: [1, 0], }, // 9
        { pos: [ 4.09,  5, -0.1], norm: [ 0,  0, -1], uv: [0, 1], }, // 10
        { pos: [-4.09,  5, -0.1], norm: [ 0,  0, -1], uv: [1, 1], }, // 11
        // left
        { pos: [-4.09, -5, -0.1], norm: [-1,  0,  0], uv: [0, 0], }, // 12
        { pos: [-4.09, -5,  0.1], norm: [-1,  0,  0], uv: [1, 0], }, // 13
        { pos: [-4.09,  5, -0.1], norm: [-1,  0,  0], uv: [0, 1], }, // 14
        { pos: [-4.09,  5,  0.1], norm: [-1,  0,  0], uv: [1, 1], }, // 15
        // top
        { pos: [ 4.09,  5, -0.1], norm: [ 0,  1,  0], uv: [0, 0], }, // 16
        { pos: [-4.09,  5, -0.1], norm: [ 0,  1,  0], uv: [1, 0], }, // 17
        { pos: [ 4.09,  5,  0.1], norm: [ 0,  1,  0], uv: [0, 1], }, // 18
        { pos: [-4.09,  5,  0.1], norm: [ 0,  1,  0], uv: [1, 1], }, // 19
        // bottom
        { pos: [ 4.09, -5,  0.1], norm: [ 0, -1,  0], uv: [0, 0], }, // 20
        { pos: [-4.09, -5,  0.1], norm: [ 0, -1,  0], uv: [1, 0], }, // 21
        { pos: [ 4.09, -5, -0.1], norm: [ 0, -1,  0], uv: [0, 1], }, // 22
        { pos: [-4.09, -5, -0.1], norm: [ 0, -1,  0], uv: [1, 1], }, // 23
    ];

const indices = [
    0,  1,  2,   2,  1,  3,  // front
   4,  5,  6,   6,  5,  7,  // right
   8,  9, 10,  10,  9, 11,  // back
  12, 13, 14,  14, 13, 15,  // left
  16, 17, 18,  18, 17, 19,  // top
  20, 21, 22,  22, 21, 23,  // bottom
];

const loader = new TextureLoader();
const texture = loader.load( 'texture/laminate_floor_02_diff_2k.jpg' );
texture.colorSpace = SRGBColorSpace;

function createShelves(){
        const positions = [];
        const normals = [];
        const uvs = [];
        for (const vertex of shelfVertices) {
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

        const material = new MeshLambertMaterial({map:texture});
        const shelf = new Mesh(geometry, material);
        return shelf;       
}

function createSideFrame(){
        const positions = [];
        const normals = [];
        const uvs = [];
        for (const vertex of sideFrameVertices) {
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

        const material = new MeshLambertMaterial({map:texture});
        const sideFrame = new Mesh(geometry, material);
        return sideFrame;          
}

function createBackFrame(){
        const positions = [];
        const normals = [];
        const uvs = [];
        for (const vertex of backFrameVertices) {
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

        const material = new MeshLambertMaterial({color:0xD4BFA4});
        const backFrame = new Mesh(geometry, material);
        return backFrame;          
}


export function createBookShelf(){
    const bookShelf = new Group();

    const bottomFrame = createShelves();
    bottomFrame.applyMatrix4(translateAll(0, 0.1, 0));
    bookShelf.add(bottomFrame);

    const topFrame = createShelves();
    topFrame.applyMatrix4(translateAll(0, 9.85, 0));
    bookShelf.add(topFrame);

    const shelves = [];
    let shelvesSpace = 1;
    for (let i = 0; i < 5; i++) {
            shelves[i] = createShelves(); 
            shelves[i].applyMatrix4(translateAll(0, shelvesSpace, 0));
            bookShelf.add(shelves[i]);
            shelvesSpace += 2;
    }

    const rightFrame = createSideFrame();
    rightFrame.applyMatrix4(translateAll(4, 4.96, 0));
    bookShelf.add(rightFrame);

    const leftFrame = createSideFrame();
    leftFrame.applyMatrix4(translateAll(-4, 4.96, 0));
    bookShelf.add(leftFrame);

    const backFrame = createBackFrame();
    backFrame.applyMatrix4(translateAll(0, 4.96, -0.9));
    bookShelf.add(backFrame);

    return bookShelf;
};