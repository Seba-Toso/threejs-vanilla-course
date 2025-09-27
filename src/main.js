// main import
import * as THREE from 'three'

// addons such as controls, loaders, post-processing effects. No need to install separately but needs to be imported separately.
// https://threejs.org/manual/#en/libraries-and-plugins
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// const loader = new GLTFLoader();


//////////////////////////////////////////////
// Creating the basics

//Threejs projects needs at least a SCENE, a CAMERA and a RENDERER 
const scene = new THREE.Scene()

// There are different cameras in Threejs. Here we'll use Perspective camera
const camera = new THREE.PerspectiveCamera(
  75, //field of view (fov): is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
  window.innerWidth / window.innerHeight, //aspect-ratio: default= 1 
  0.1, //near: an object min distance from the camera needed to be rendered (helps to save performance) min number to render is (camera distance - 0.5)
  1000 //far: an object max distance from the camera needed to be rendered (helps to save performance)
)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
//set the renderer size to fit the device screen. this could be anything where I need to render.
renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

//////////////////////////////////////////////
// Fix antialiasing issue (2 types of solution)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)  //type 1: by changing the quantity of pixels that the renders render
renderer.setPixelRatio(maxPixelRatio)
//type 2: by changing configure antialias to true in the renderer instance (new THREE.WebGLRenderer({antialias: true}))

//add the renderer elemment to the HTML document. This adds a canvas element
document.body.appendChild(renderer.domElement)


//////////////////////////////////////////////
// Change renderer size and camera ratio by maintaining the perspective when screen is resized
window.addEventListener('resize', () => {
  const width = window.innerWidth
  const height = window.innerHeight

  //set the camera aspect ratio
  camera.aspect = width / height
  //updates the perspective
  camera.updateProjectionMatrix()

  //set the renderer size
  renderer.setSize(
    width,
    height
  )
})

//////////////////////////////////////////////
// Adding axes helpers
const axesHelper = new THREE.AxesHelper(2) // the number of the param is the size of the axes
scene.add(axesHelper)
//Note that the axes will be moving as the camera is moving in circles. 
//If the camera is fixed and the cube rotates, the axes will be fixed.



//////////////////////////////////////////////
// Adding a cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1); //A geometry that contains vertices and faces
const material = new THREE.MeshBasicMaterial({ color: 'red' }); //A material (in this case a color)
const cube = new THREE.Mesh(geometry, material); //A mesh that takes the geometry and applies the material to it
const cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 'orange' })); //A mesh that takes the geometry and applies the material to it
const cube3 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 'cyan' })); //A mesh that takes the geometry and applies the material to it

const group = new THREE.Group()
group.add(cube)
group.add(cube2)
group.add(cube3)

scene.add(group);


//////////////////////////////////////////////
// Moving the cube through the axes and chaging its size with scale
cube.position.x = 2;
cube.position.y = 2;
cube.scale.set(1.5, 1.5, 1.5); //This changes 3 vector size. It is also posible to change them individualy like the position (default = 1,1,1)

cube2.position.x = 0.5;
cube2.position.y = 0.5;

cube3.position.x = -0.5;
cube3.position.y = -0.5;
cube3.scale.set(0.5, 0.5, 0.5); //This changes 3 vector size. It is also posible to change them individualy like the position

//By applying a modification to the group, all elements attached to it will suffer the modification according to the group in its relative way
group.position.set(0.5, 0.5, 0)
group.scale.set(1, 0.5, 1)

// by default, the camera and the elements added to a scene starts both at coordinates (0,0,0), that's why we have to move the camera or the elements.
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

//////////////////////////////////////////////
// Rendering the scene
function animate() {
  // At this point what I see is a screen with a cube facing front and inmobile. This could be misunderstanding as nothing is happening but the truth is 
  // that the renderer is constantly being re-rendered but the cube is doing nothing. 

  //////////////////////////////////////////////
  // Moving the cube with the camera fixed

  //By default, rotation has an implementation order (X -> Y -> Z). It doesn't matter if they are wrote in different order.
  //this can be change with the order or reorder property of rotation (always before changing the rotation)
  // cube3.rotation.order = 'ZXY'
  // cube3.rotation.reorder('YXZ')

  cube.rotation.x += 0.01;
  cube2.rotation.y += 0.01;
  cube3.rotation.z += 0.01;


  //////////////////////////////////////////////
  // Moving the camera instead of the cube
  // controls.enableDamping = true
  // controls.autoRotate = true
  // controls.update()

  renderer.render(scene, camera);
}


renderer.setAnimationLoop(animate); //As this needs to be constantly updating, setAnimationLoop function creates a loop that rerender the renderer