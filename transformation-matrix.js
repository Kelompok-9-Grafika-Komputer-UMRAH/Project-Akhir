import { Matrix4 } from 'three';

//convert degrees to radians
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }
//convert radians to degree  
function radToDeg(rad) {
    return rad / (Math.PI / 180);
}  

//func to rotate around x axis
export function rotateMatrixX(degrees){
    const radians = degToRad(degrees);
    const rotationMatrixX = new Matrix4();
    rotationMatrixX.set(
        1, 0, 0, 0,
        0, Math.cos(radians), Math.sin(radians) * -1, 0,
        0, Math.sin(radians), Math.cos(radians), 0,
        0, 0, 0, 1
    );
    return rotationMatrixX;
}

//func to rotate around y axis
export function rotateMatrixY(degrees){
    const radians = degToRad(degrees);
    const rotationMatrixY = new Matrix4();
    rotationMatrixY.set(
        Math.cos(radians), 0, Math.sin(radians), 0,
        0, 1, 0, 0,
        Math.sin(radians) * -1, 0, Math.cos(radians), 0,
        0, 0, 0, 1
    );
    return rotationMatrixY;
}

//funct to rotate around z axis
export function rotateMatrixZ(degrees){
    const radians = degToRad(degrees);
    const rotationMatrixZ = new Matrix4();
    rotationMatrixZ.set(
       Math.cos(radians), Math.sin(radians)*-1, 0, 0,
       Math.sin(radians), Math.cos(radians), 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1
    );
    return rotationMatrixZ;
}

//funct to scale x axis
export function scaleX(scalar){
    const scalingMatrix = new Matrix4();
    scalingMatrix.set(
        scalar, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    return scalingMatrix;
}

//funct to scale y axis
export function scaleY(scalar){
    const scalingMatrix = new Matrix4();
    scalingMatrix.set(
        1, 0, 0, 0,
        0, scalar, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
    return scalingMatrix;
}

//funct to scale z axis
export function scaleZ(scalar){
    const scalingMatrix = new Matrix4();
    scalingMatrix.set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, scalar, 0,
        0, 0, 0, 1
    );
    return scalingMatrix;
}

//funct to scale all axis
export function scaleAll(x, y, z){
    const scalingMatrix = new Matrix4();
    scalingMatrix.set(
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    );
    return scalingMatrix;
}