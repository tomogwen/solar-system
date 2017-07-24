// units -  thousands of km - kg/m^3
// g = 1

var stats = {
  sunR:15,
  sunD: 1,

  earthR:3,
  earthD:1,

  moonR:5,

  sunToEarth:40,
  earthToMoon:10,

  speedMultiplier:5
}; // */


function mass(radius, density) {
  return 4/3 * Math.PI * radius^3 * density;
}

function orbitalVelocity(mass, distance) {
  return Math.sqrt(mass/distance);
}

// inital setup

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 2*stats.sunR;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var settings = new function() {
  this.speed = 5;
}
var gui = new dat.GUI();
gui.add(settings, 'speed').min(0).max(15).step(1);

var controls = new THREE.OrbitControls( camera, renderer.domElement );

// geometry's and materials
var sunGeometry = new THREE.SphereGeometry(stats.sunR, 32, 32 );
var sunMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );

var earthGeometry = new THREE.SphereGeometry(stats.earthR, 32, 32 );
var earthMaterial = new THREE.MeshBasicMaterial( {color: 0x0000FF} );

var moonGeometry = new THREE.SphereGeometry(stats.moonR, 32, 32 );
var moonMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );


// initalise planets and positions
var sun = new THREE.Mesh( sunGeometry, sunMaterial );
var earth = new THREE.Mesh( earthGeometry, earthMaterial );
var moon = new THREE.Mesh( moonGeometry, moonMaterial );

earth.position.x = stats.sunToEarth;
earth.position.y = 0;

moon.position.x = stats.suntoEarth + stats.earthToMoon + stats.earthR;
moon.position.y = 0;

scene.add( sun );
scene.add( earth );
scene.add( moon );

// add pivots
var sunPivot = new THREE.Object3D();
sun.add( sunPivot );
sunPivot.add( earth );

var earthPivot = new THREE.Object3D();
earth.add( earthPivot );
earthPivot.add( moon );

// begin
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  sunPivot.rotation.z += orbitalVelocity(mass(stats.sunR, stats.sunD), stats.sunToEarth)*settings.speed;
  earthPivot.rotation.z += orbitalVelocity(mass(stats.earthR, stats.earthD), stats.earthToMoon)*settings.speed; //*/


}
animate();
