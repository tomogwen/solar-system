// units -  thousands of km - kg/m^3
// g = 1

var stats = {
  sunR:12,
  sunD:1,

  venusR:2.5,
  venusD:1,

  earthR:4,
  earthD:1,

  jupiterR:7,
  jupiterD:1,

  saturnR:5.5,
  saturnD:1,

  moonR:1,

  sunToVenus:50,
  sunToEarth:80,
  earthToMoon:10,
  sunToJupiter:120,
  sunToSaturn:155

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
camera.position.z = 250;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

var settings = new function() {
  this.speed = 5;
  this.displayOrbits = true;
}
var gui = new dat.GUI();
gui.add(settings, 'displayOrbits');
gui.add(settings, 'speed').min(0).max(15).step(1);
gui.add(stats, 'sunR').min(0).max(50).step(5);
gui.add(stats, 'earthR').min(0).max(30).step(1);

var controls = new THREE.OrbitControls( camera, renderer.domElement );

/*
var light = new THREE.PointLight( 0xffffff, 500, 0 );
light.position.set(0,0,0);
scene.add( light ); //*/

// geometry's and materials
var sunGeometry = new THREE.SphereGeometry(stats.sunR, 32, 32 );
var sunMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );

var venusGeometry = new THREE.SphereGeometry(stats.venusR, 32, 32 );
var venusMaterial = new THREE.MeshBasicMaterial( {color: 0xA0522D} );

var earthGeometry = new THREE.SphereGeometry(stats.earthR, 32, 32 );
var earthMaterial = new THREE.MeshBasicMaterial( {color: 0x0000FF} );

var moonGeometry = new THREE.SphereGeometry(stats.moonR, 32, 32 );
var moonMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );

var jupiterGeometry = new THREE.SphereGeometry(stats.jupiterR, 32, 32 );
var jupiterMaterial = new THREE.MeshBasicMaterial( {color: 0xFF4500} );

var saturnGeometry = new THREE.SphereGeometry(stats.saturnR, 32, 32 );
var saturnMaterial = new THREE.MeshBasicMaterial( {color: 0xA9A9A9} );

// initalise planets and positions
var sun = new THREE.Mesh( sunGeometry, sunMaterial );
var venus = new THREE.Mesh( venusGeometry, venusMaterial );
var earth = new THREE.Mesh( earthGeometry, earthMaterial );
var moon = new THREE.Mesh( moonGeometry, moonMaterial );
var jupiter = new THREE.Mesh( jupiterGeometry, jupiterMaterial );
var saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );

// add orbit markers
var segments = 1024;
var venusGeometry = new THREE.CircleGeometry( stats.sunToVenus, segments ),
    venusMaterial = new THREE.LineBasicMaterial( { color: 0xA0522D } ),

    earthGeometry = new THREE.CircleGeometry( stats.sunToEarth, segments ),
    earthMaterial = new THREE.LineBasicMaterial( { color: 0x0000FF } ),

    jupiterGeometry = new THREE.CircleGeometry( stats.sunToJupiter, segments ),
    jupiterMaterial = new THREE.LineBasicMaterial( { color: 0xFF4500 } ),

    saturnGeometry = new THREE.CircleGeometry( stats.sunToSaturn, segments ),
    saturnMaterial = new THREE.LineBasicMaterial( { color: 0xA9A9A9 } );

venusGeometry.vertices.shift();
earthGeometry.vertices.shift();
jupiterGeometry.vertices.shift();
saturnGeometry.vertices.shift();

var venusOrbit = new THREE.Line( venusGeometry, venusMaterial );
var earthOrbit = new THREE.Line( earthGeometry, earthMaterial );
var jupiterOrbit = new THREE.Line( jupiterGeometry, jupiterMaterial );
var saturnOrbit = new THREE.Line( saturnGeometry, saturnMaterial );

/*
sun.castShadow = true;
sun.receiveShadow = true;
venus.castShadow = true;
venus.receiveShadow = true;
earth.castShadow = true;
earth.receiveShadow = true;
moon.castShadow = true;
moon.receiveShadow = true;
jupiter.castShadow = true;
jupiter.receiveShadow = true;
saturn.castShadow = true;
saturn.receiveShadow = true; //*/

venus.position.x = stats.sunToVenus
earth.position.x = stats.sunToEarth;
moon.position.x = stats.earthToMoon;
jupiter.position.x = stats.sunToJupiter;
saturn.position.x = stats.sunToSaturn;

scene.add( sun );
scene.add( venus );
scene.add( earth );
scene.add( moon );
scene.add( jupiter );
scene.add( saturn );

// add pivots
var earthPivot = new THREE.Object3D();
sun.add( earthPivot );
earthPivot.add( earth );

var moonPivot = new THREE.Object3D();
earth.add( moonPivot );
moonPivot.add( moon );

var venusPivot = new THREE.Object3D();
sun.add( venusPivot );
venusPivot.add( venus );

var jupiterPivot = new THREE.Object3D();
sun.add( jupiterPivot );
jupiterPivot.add( jupiter );

var saturnPivot = new THREE.Object3D();
sun.add( saturnPivot );
saturnPivot.add( saturn );


// begin
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  earthPivot.rotation.z += orbitalVelocity(mass(stats.sunR, stats.sunD), stats.sunToEarth)*settings.speed*0.01; //*/
  moonPivot.rotation.z += orbitalVelocity(mass(stats.earthR, stats.earthD), stats.earthToMoon)*settings.speed*0.01; //*/
  venusPivot.rotation.z += orbitalVelocity(mass(stats.sunR, stats.sunD), stats.sunToVenus)*settings.speed*0.01; //*/
  jupiterPivot.rotation.z += orbitalVelocity(mass(stats.sunR, stats.sunD), stats.sunToJupiter)*settings.speed*0.01; //*/
  saturnPivot.rotation.z += orbitalVelocity(mass(stats.sunR, stats.sunD), stats.sunToSaturn)*settings.speed*0.01; //*/

  if(settings.displayOrbits) {
    scene.add( venusOrbit );
    scene.add( earthOrbit );
    scene.add( jupiterOrbit );
    scene.add( saturnOrbit );
  }
  else {
    scene.remove( venusOrbit );
    scene.remove( earthOrbit );
    scene.remove( jupiterOrbit );
    scene.remove( saturnOrbit );
  }


}
animate();
