# THREE.js



## 1基本概念

camera摄像头-视角

scene场景

renderer渲染





# 2程序架构

## 1场景Scene

- 网格模型Mesh 
  - 几何体geometry
  - 材质material
- 光照
  - 颜色
  - 分类

## 2相机Camera

- 位置
- 视线方向
- 投影方式
  - 投射
  - 正射

## 3渲染Renderer

- 渲染器创建 WebGLRenderer()
- 开始渲染 render()
- domElement属性-canvas对象



## 3请求动画帧



## 4鼠标控制三维场景





## DEMO

### 1全景图流程

1. init
   1. init camera
   2. init scene
   3. create css 3D object - 定义6个面 `+-X` `+-Y` `+-Z`
   4. add object to scene
   5. init renderer
   6. append renderer to body
2. animate
   1. requestAnimationFrame
   2. 将角度转换为弧度函数
   3. camera look at target
   4. renderer.render