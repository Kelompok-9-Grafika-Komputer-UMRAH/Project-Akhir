import { 
    BoxGeometry, TextureLoader,
    MeshLambertMaterial, Mesh, MeshBasicMaterial,
    SRGBColorSpace
}from "three";

export function createWalls(){
    const wallsGeometry = new BoxGeometry(1, 1, 1);
    //texture
    const loader = new TextureLoader();
    const texture = loader.load( 'texture/brickwall.png' );
    texture.colorSpace = SRGBColorSpace;
    const wallsMaterial = new MeshLambertMaterial( {map:texture} );
    //basic color
    //const wallsMaterial = new MeshLambertMaterial({color: 0x00ff00});
    const walls = new Mesh(wallsGeometry, wallsMaterial);
    return walls;
}