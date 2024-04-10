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

function createCylinder(){
    const radiusTop = 4;  
    const radiusBottom = 4;  
    const height = 8;  
    const radialSegments = 8;
    const geometry = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const material = new MeshLambertMaterial({color:0xffffff});
    const cylinder = new Mesh(geometry, material);
    return cylinder;
}

export function createStool(){
    const stool = new Group();
    const stoolBottomPart = createCylinder();
    stoolBottomPart.applyMatrix4(translateAll(0, 2, 0));
    stoolBottomPart.applyMatrix4(scaleAll(0.4, 0.4, 0.4));
    stool.add(stoolBottomPart);

    const stoolTopPart = createCylinder();
    stoolTopPart.material.color.set(0xff22ff);
    stoolTopPart.applyMatrix4(scaleAll(0.4, 0.1, 0.4));
    stoolTopPart.applyMatrix4(translateAll(0, 2.8, 0));
    stool.add(stoolTopPart);
    return stool;
}