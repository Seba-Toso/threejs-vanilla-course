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

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

///////////////////////////
// Create custom geometry

//A custom geometry needs the position of each vertex in a TypedArray (in this case a Float32Array)
//The vertex is defined like -> (x, y, z).
//Is not important the order of the vertex in the array 
const vertices = new Float32Array([
  0, 0, 0,
  0, 2, 0,
  2, 0, 0
]) //This creates a 2D triangle

//A buffer attribute is some information we pass to the custom geometry such as the position, the color, the behaviour of each corner, etc
//In this case we are creating the attribyte for the position which asks for the vertex array and the number of points in a vertex (3 in this case)
const bufferAttribute = new THREE.BufferAttribute(vertices, 3)
const geometry = new THREE.BufferGeometry();

//Attributes can be set in a geometry by using the setAttribute method, and passing the attribute name as a string and the bufferAttribute as second value
geometry.setAttribute('position', bufferAttribute)


// The next is equal as we have been doing
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


camera.position.z = 5;

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