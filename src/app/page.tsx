import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const Espacio = require('../../public/space.jpg')
const Yo = require('../../public/yo.jpg')
const Luna = require('../../public/moon.jpg')
const Normal = require('../../public/normal.jpg')

export default function Home() {

	//#region Setup

	const Escena =  new THREE.Scene()

	const Camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

	let Renderizador = new THREE.WebGLRenderer({

		canvas: document.querySelector('#bg') as HTMLCanvasElement//Ref.current ?? undefined,
		
	})


	Renderizador.setPixelRatio(window.devicePixelRatio)

	Renderizador.setSize(window.innerWidth, window.innerHeight)

	Camara.position.setZ(30)

	Camara.position.setX(-3)

	Renderizador.render(Escena, Camara)

	//#endregion

	//#region Torus 

	const Geometria = new THREE.TorusGeometry(10, 3, 16, 100)

	// const Material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } )

	const Material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } )

	const Torus = new THREE.Mesh(Geometria, Material)

	Escena.add(Torus)

	//#endregion

	//#region Iluminacion

	const LuzPosicionada = new THREE.PointLight(0xffffff)

	LuzPosicionada.position.set(5, 5, 5)

	const LuzAmbiente = new THREE.AmbientLight(0xffffff)

	Escena.add(LuzAmbiente)

	Escena.add(LuzPosicionada)

	//#endregion

	//#region Helpers

	const LuzHelper = new THREE.PointLightHelper(LuzPosicionada)

	const GridHelper = new THREE.GridHelper(200, 50)

	Escena.add(LuzHelper, GridHelper)

	//#endregion

	function AgregarEstrellas () {

		const GeometriaEstrella = new THREE.SphereGeometry(0.25, 24, 24)

		const MaterialEstrella = new THREE.MeshStandardMaterial( { color: 0xffffff } )

		const Estrella = new THREE.Mesh(GeometriaEstrella, MaterialEstrella)

		const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100))

		Estrella.position.set(x, y, z)

		Escena.add(Estrella)

	}

	Array(200).fill(0).forEach(AgregarEstrellas);

	//#region Background

	const TexturaEspacio = new THREE.TextureLoader().load(Espacio)

	Escena.background = TexturaEspacio

	//#endregion

	//#region Lucas

	const TexturaLucas = new THREE.TextureLoader().load(Yo)

	const Lucas = new THREE.Mesh(

		new THREE.BoxGeometry(3,3,3),

		new THREE.MeshBasicMaterial( { map: TexturaLucas } )

	)

	Escena.add(Lucas)

	//#endregion

	//#region Luna

	const TexturaLuna = new THREE.TextureLoader().load(Luna)

	const TexturaNormal = new THREE.TextureLoader().load(Normal)

	const LunaObjeto = new THREE.Mesh(

		new THREE.SphereGeometry(3,32,32),

		new THREE.MeshStandardMaterial( { map: TexturaLuna, normalMap: TexturaNormal } ) // Normal map sirve para darle textura.

	)

	Escena.add(LunaObjeto)

	LunaObjeto.position.z = 30

	LunaObjeto.position.setX(-10)

	Lucas.position.z = -5;

	Lucas.position.x = 2
	
	//#endregion

	let Controles = new OrbitControls(Camara, Renderizador.domElement)


	function MoverCamara () {

		const t = document.body.getBoundingClientRect().top

		LunaObjeto.rotation.x += 0.05

		LunaObjeto.rotation.y += 0.075

		LunaObjeto.rotation.z += 0.05

		Lucas.rotation.y += 0.01

		Lucas.rotation.z += 0.01

		Camara.position.z = t * -0.01

		Camara.position.x = t * -0.0002

		Camara.position.y = t * -0.0002

	}

	document.body.onscroll = MoverCamara;

	MoverCamara();

	function animate () {

		requestAnimationFrame(animate)

		Torus.rotation.x += 0.01

		Torus.rotation.y += 0.005

		Torus.rotation.z += 0.01

		LunaObjeto.rotation.x += 0.005

		// Controles.update()

		Renderizador.render(Escena, Camara)

	}

	animate()

	return (

		<canvas id="bg">a</canvas>


	)

}
