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


const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);


// The next is equal as we have been doing
const material = new THREE.MeshBasicMaterial({ color: 'purple', wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


camera.position.z = 2;

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