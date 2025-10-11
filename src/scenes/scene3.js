import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(
    width,
    height
  )
})

// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

///////////////////////////
// Materials

//Not all materials reacts to the environment.
//  Non reactive: mesh basic, mesh matcap, mesh depth 
//  Reactive: mesh lambert, mesh phong, mesh standart, mesh physical (graphical accuracy low -> high)



const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const planeGeometry = new THREE.PlaneGeometry(1, 1);


// The next is equal as we have been doing
const material = new THREE.MeshBasicMaterial({
  color: 'limeGreen',
  // wireframe: true,
  // transparent: true, //Also needs to set an opacity
  // opacity: 0.5
});

//It is possible to change material properties from outside the definition
material.color = new THREE.Color('purple') //Override the limeGreen
material.side = THREE.DoubleSide //Threejs materials by default impacts only in one side of each face. This change that to doble face (it's an enum)
//If side prop is removed, the mesh3 plane will be visible only in one side
//For a geometry like a cube, the double side covers the interior side of the cube

//Using the same defined geometry with different materials in differente meshes
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material)
const mesh3 = new THREE.Mesh(planeGeometry, material)

mesh2.position.x = 1.5
mesh3.position.x = -1.5

const fog = new THREE.Fog('white', 1, 10)

scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);

//It is possible to change scene properties
scene.fog = fog
scene.background = new THREE.Color('white')

//It is also possible to remove fog effect from materials
// material.fog = false

camera.position.z = 2.5;

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock()
let previousTime = 0

function animate() {
  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previousTime
  previousTime = currentTime

  renderer.render(scene, camera);
}


renderer.setAnimationLoop(animate)