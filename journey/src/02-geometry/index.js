/**
 * @description geometry bufferGeometry dat.gui
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap' //动画

import * as dat from 'dat.gui' //调试工具

/**
 * dat.gui
 */
const gui = new dat.GUI({ closed: false, width: 400 })
//处理颜色
const parameters = {
  color: 0x666600,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
  }
}
gui.addColor(parameters, 'color').onChange(() => {
  //threejs中color是一个类, 通过set()来修改
  console.log(material.color)
  material.color.set(parameters.color)
})

gui.add(parameters, 'spin')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//scene
const scene = new THREE.Scene()
const canvas = document.getElementById('canvas')

/**
 * ambientLight
 */
const light = {
  ambient: 0x404040
}
const ambientLight = new THREE.AmbientLight(light.color, 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
gui.addColor(light, 'ambient').onChange(() => {
  ambientLight.color.set(light.ambient)
})
scene.add(ambientLight)

/**
 * geometry
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

const material = new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: false })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(4, 0, 0)
scene.add(mesh)

/**
 * gui
 */
gui.add(mesh.position, 'y', -3, 2, 0.01) //min max step
gui.add(mesh.position, 'x').min(-3).max(2).step(0.01).name('x of mesh')
gui.add(mesh, 'visible').name('visible')
gui.add(material, 'wireframe').name('wireframe')

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(5, 2, 4)
camera.lookAt(mesh.position)
scene.add(camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

const renderer = new THREE.WebGLRenderer({
  canvas
})

scene.add(new THREE.AxesHelper(100))

renderer.setSize(sizes.width, sizes.height)

let clock = new THREE.Clock()
function animate() {
  const elapsedTime = clock.getElapsedTime()

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()
