// javascript here

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls;
controls = new THREE.OrbitControls( camera );
//controls.addEventListener( 'change', render );

//var moveRate = 0.3;
//var keyboard = new THREEx.KeyboardState();

// geometry's and materials
var sunGeometry = new THREE.SphereGeometry(5, 32, 32 );
var sunMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );

var earthGeometry = new THREE.SphereGeometry(2, 32, 32 );
var earthMaterial = new THREE.MeshBasicMaterial( {color: 0x0000FF} );

var moonGeometry = new THREE.SphereGeometry(0.4, 32, 32 );
var moonMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );


// initalise planets and positions
var sun = new THREE.Mesh( sunGeometry, sunMaterial );
var earth = new THREE.Mesh( earthGeometry, earthMaterial );
var moon = new THREE.Mesh( moonGeometry, moonMaterial );

earth.position.x = 18;
earth.position.y = 0;

moon.position.x = 5;
moon.position.y = 0;

scene.add( sun );
scene.add( earth );
scene.add( moon );

// add pivotss

var sunPivot = new THREE.Object3D();
sun.add( sunPivot );
sunPivot.add( earth );

var earthPivot = new THREE.Object3D();
earth.add( earthPivot );
earthPivot.add( moon );



function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  sunPivot.rotation.z += 0.05;
  earthPivot.rotation.z += 0.06;

/*
  if(keyboard.pressed("w"))
    camera.position.y += moveRate;
  if(keyboard.pressed("s"))
    camera.position.y -= moveRate;
  if(keyboard.pressed("d"))
    camera.position.x += moveRate;
  if(keyboard.pressed("a"))
    camera.position.x -= moveRate;
  if(keyboard.pressed("q"))
    camera.position.z += moveRate;
  if(keyboard.pressed("e"))
    camera.position.z -= moveRate;
*/
}
animate();
