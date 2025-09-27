// main import
import * as THREE from 'three'

// addons such as controls, loaders, post-processing effects. No need to install separately but needs to be imported separately.
// https://threejs.org/manual/#en/libraries-and-plugins
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader();




//////////////////////////////////////////////
// Creating the basics

//Threejs projects needs at least a SCENE, a CAMERA and a RENDERER 
const scene = new THREE.Scene()

// There are different cameras in Threejs. Here we'll use Perspective camera
const camera = new THREE.PerspectiveCamera(
  75, //field of view (fov): is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
  window.innerWidth / window.innerHeight, //aspect-ratio: default= 1 
  0.1, //near: an object min distance from the camera needed to be rendered (helps to save performance)
  1000 //far: an object max distance from the camera needed to be rendered (helps to save performance)
)

const renderer = new THREE.WebGLRenderer()
//set the renderer size to fit the device screen. this could be anything where I need to render.
renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

//add the renderer elemment to the HTML document. This adds a canvas element
document.body.appendChild(renderer.domElement)



//////////////////////////////////////////////
// Adding a cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1); //A geometry that contains vertices and faces
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); //A material (in this case a color)
const cube = new THREE.Mesh(geometry, material); //A mesh that takes the geometry and applies the material to it
scene.add(cube);

// by default, the camera and the elements added to a scene starts both at coordinates (0,0,0), that's why we have to move the camera or the elements.
camera.position.z = 5;



//////////////////////////////////////////////
// Rendering the scene
function animate() {
  // At this point what I see is a screen with a cube facing front and inmobile. This could be misunderstanding as nothing is happening but the truth is 
  // that the renderer is constantly being re-rendered but the cube is doing nothing. 

  //////////////////////////////////////////////
  // Moving the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate); //As this needs to be constantly updating, setAnimationLoop function creates a loop that rerender the renderer