//Here we dive into environment reacting materials: 2- Mesh Standard Material
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane'
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

const pane = new Pane({
  title: 'Material configs'
})
const phongMaterialPane = pane.addFolder({
  title: 'Torus - Phong material config'
})
const standardMaterialPane = pane.addFolder({
  title: 'Sphere - Standard material config'
})
const physicalMaterialPane = pane.addFolder({
  title: 'Octahedron - Physical material config'
})

///////////////////////////
// Materials

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphere = new THREE.SphereGeometry(0.5)
const torus = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16)
const octahedron = new THREE.OctahedronGeometry(0.5)

const basicMaterial = new THREE.MeshBasicMaterial({
  color: 'white',
  side: THREE.DoubleSide
})
const lambertMaterial = new THREE.MeshLambertMaterial({
  color: 'white',
  side: THREE.DoubleSide
});
const phongMaterial = new THREE.MeshPhongMaterial({
  color: 'white',
  side: THREE.DoubleSide,
  shininess: 500,
});


// These materials are commonly used and has a lot of inherit industry standard properties. These properties came from programs like unreal, blender, etc
const standardMaterial = new THREE.MeshStandardMaterial({
  color: 'white',
  side: THREE.DoubleSide,
  shininess: 500,
  metalness: 0.5,
  roughness: 0.5
})

const physicalMaterial = new THREE.MeshPhysicalMaterial({
  color: 'white',
  side: THREE.DoubleSide,
  shininess: 500,
  metalness: 0.5,
  roughness: 0.5,
  reflectivity: 0.5,
})



const light = new THREE.AmbientLight('white', 0.1)
scene.add(light)

const pointLight = new THREE.PointLight('cyan', 2)
pointLight.position.set(-1.5, 1, 1.5)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight('magenta', 2)
pointLight2.position.set(1.5, 1, 1.5)
scene.add(pointLight2)


const mesh = new THREE.Mesh(geometry, lambertMaterial); // Reacts to light but it has lower customization. It is a mathematical calc of how to react
const mesh2 = new THREE.Mesh(sphere, standardMaterial)  // Reacts to light in a more precise and realistic way
const mesh3 = new THREE.Mesh(planeGeometry, basicMaterial) //Does not reacts no light
const mesh4 = new THREE.Mesh(torus, phongMaterial) // Reacts to light with more customization than lambert. It is a mathematical calc of how to react
const mesh5 = new THREE.Mesh(octahedron, physicalMaterial)  // Reacts to light in a more precise and realistic way


mesh2.position.x = 1.5
mesh3.position.x = -1.5
mesh4.position.set(0, 1.5, 0)
mesh5.position.set(0, -1.5, 0)




scene.add(mesh);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);






///////////////////////////////////////
// unchange code between scenes

phongMaterialPane.addBinding(phongMaterial, 'shininess', {
  min: 0,
  max: 5000,
  step: 1
})

standardMaterialPane.addBinding(standardMaterial, 'metalness', {
  min: 0,
  max: 1,
  step: 0.1
})

standardMaterialPane.addBinding(standardMaterial, 'roughness', {
  min: 0,
  max: 1,
  step: 0.1
})

physicalMaterialPane.addBinding(physicalMaterial, 'metalness', {
  min: 0,
  max: 1,
  step: 0.1
})

physicalMaterialPane.addBinding(physicalMaterial, 'roughness', {
  min: 0,
  max: 1,
  step: 0.1
})

physicalMaterialPane.addBinding(physicalMaterial, 'reflectivity', {
  min: 0,
  max: 1,
  step: 0.1
})

physicalMaterialPane.addBinding(physicalMaterial, 'iridescence', {
  min: 0,
  max: 1,
  step: 0.1
})

physicalMaterialPane.addBinding(physicalMaterial, 'sheen', {
  min: 0,
  max: 1,
  step: 0.1
})

physicalMaterialPane.addBinding(physicalMaterial, 'thickness', {
  min: 0,
  max: 1,
  step: 0.1
})

physicalMaterialPane.addBinding(physicalMaterial, 'transmission', {
  min: 0,
  max: 1,
  step: 0.1
})




camera.position.z = 3;

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