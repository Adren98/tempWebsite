import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


import { VideoPanorama, ImagePanorama, Viewer } from 'panolens'


//360 VIDEO view
// const panoVideo = new VideoPanorama("assets/videos/test.mp4");
// const videoContainer = document.querySelector(".video-container");

// const viewer = new Viewer({
//     container: videoContainer,
//     autoRotate:true,
//     autoRotateSpeed: 0.2,
//     autoRotateActivationDuration: 30000,
// });

// viewer.add( panoVideo );
// viewer.setCameraFov(90);
// viewer.hideVideoWidget();


//360 IMAGE view
const panoImage = new ImagePanorama("assets/sample2.jpg");
const imageContainer = document.querySelector(".img-container");

const viewer2 = new Viewer({
  container: imageContainer,
  autoRotate:true,
  autoRotateSpeed: 0.2,
  autoRotateActivationDuration: 30000,
});

viewer2.add( panoImage );




//3D MODEL
let container = document.querySelector( '.threed-container' );
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( 300, 300 );
container.appendChild(renderer.domElement);


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const camera = new THREE.PerspectiveCamera(
  75,
  300/300,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

camera.position.set(10, 10, 10);
const hlight = new THREE.AmbientLight(0x404040,1);
scene.add(hlight);

const directionallight = new THREE.DirectionalLight(0xffffff,1);
directionallight.position.set(0,1,0)
directionallight.castshadow = true;
scene.add(directionallight);




orbit.update();

// const boxGeometry = new THREE.BoxGeometry();
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

function animate(){
  // box.rotation.x += 0.01;
  // box.rotation.y += 0.01;
  renderer.render(scene, camera);
}


renderer.setAnimationLoop(animate);

let loader = new GLTFLoader();
loader.load('assets/scene.gltf', function(gltf){
  scene.add(gltf.scene);
  renderer.render(scene, camera);
});
