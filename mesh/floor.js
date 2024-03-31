import { 
    PlaneGeometry, TextureLoader,
    MeshLambertMaterial, Mesh, 
    SRGBColorSpace, DoubleSide, MeshBasicMaterial
}from "three";

export function createFloor(){
    const floorGeometry = new PlaneGeometry( 1, 1 );
    //texture
    const loader = new TextureLoader();
    const texture = loader.load( 'texture/floor.jpg' );
    texture.colorSpace = SRGBColorSpace;
    const floorMaterial = new MeshLambertMaterial( {map:texture, side: DoubleSide} );
    //basic color
    //const floorMaterial = new MeshLambertMaterial({color: 0xB37B50, side: DoubleSide});
    const floor = new Mesh( floorGeometry, floorMaterial );
    return floor;
}
