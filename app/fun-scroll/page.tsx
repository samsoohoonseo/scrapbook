'use client'
import * as THREE from 'three'
import {
    Canvas,
    useFrame,
    useThree,
    MeshProps,
    Vector3,
} from '@react-three/fiber'
import {
    Scroll,
    ScrollControls,
    useIntersect,
    Image as ImageImpl,
    useScroll,
    useVideoTexture,
} from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'

// interface ItemProps extends GroupProps {
//     url: string
//     scale: number | [number, number] | undefined
//     position: [number, number, number]
//     // scale: number[]
// }

interface MyImageProps {
    url: string
    scale: number | [number, number] | undefined
    position: Vector3
    c?: THREE.Color
}

const MyImage = ({
    url,
    scale,
    position,
    c = new THREE.Color(),
}: MyImageProps) => {
    const visible = useRef(false)
    // const ref = useRef<THREE.Mesh>(null!)
    const ref = useIntersect((isVisible) => (visible.current = isVisible))
    const [hovered, setHovered] = useState(false)
    const { height } = useThree((state) => state.viewport)
    useFrame((_, delta) => {
        ref.current.material.color.lerp(
            c.set(hovered ? 'white' : '#ccc'),
            hovered ? 0.4 : 0.05,
        )
        // test start
        ref.current.position.y = THREE.MathUtils.damp(
            ref.current.position.y,
            visible.current ? 0 : -height / 2,
            4,
            delta,
        )
        ref.current.material.zoom = THREE.MathUtils.damp(
            ref.current.material.zoom,
            visible.current ? 1 : 1.5,
            4,
            delta,
        )
        // test end
    })
    return (
        <group position={position}>
            <ImageImpl
                ref={ref}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                // {...props}
                url={url}
                scale={scale}
                // position={position}
            />
        </group>
    )
}

interface MyGifImageProps {
    url: string
    scale: Vector3
    position: Vector3
    c?: THREE.Color
}

const GifImage = ({
    url,
    scale,
    position,
    c = new THREE.Color(),
}: MyGifImageProps) => {
    const visible = useRef(false)
    // const ref = useRef<THREE.Mesh>(null!)
    const ref = useIntersect((isVisible) => (visible.current = isVisible))
    const [hovered, setHovered] = useState(false)
    const { height } = useThree((state) => state.viewport)
    useFrame((_, delta) => {
        ref.current.material.color.lerp(
            c.set(hovered ? 'white' : '#ccc'),
            hovered ? 0.4 : 0.05,
        )
        // test start
        ref.current.position.y = THREE.MathUtils.damp(
            ref.current.position.y,
            visible.current ? 0 : -height / 2,
            4,
            delta,
        )
        ref.current.material.zoom = THREE.MathUtils.damp(
            ref.current.material.zoom,
            visible.current ? 1 : 1.5,
            4,
            delta,
        )
        // test end
    })

    // const [video] = useState(() => {
    //     const vid = document.createElement('video')
    //     // vid.src = url
    //     vid.src = '/luna/luna-web-login-to-table.mp4'
    //     vid.crossOrigin = 'Anonymous'
    //     vid.loop = true
    //     vid.muted = true
    //     vid.play()
    //     vid.autoplay = true
    //     return vid
    // })
    // const texture = useVideoTexture('/luna/luna-web-login-to-table.mp4')
    const texture = useVideoTexture(url)
    return (
        <group position={position}>
            {/* <ImageImpl
                ref={ref}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                // {...props}
                url={url}
                scale={scale}
                // position={position}
            /> */}
            <mesh rotation={[0, 0, 0]} ref={ref}>
                {/* <planeGeometry args={[3.2, 1.9]} /> */}
                {/* <planeGeometry args={[6, 3.5]} /> */}
                <planeGeometry args={[10, 5.5]} />
                <meshBasicMaterial map={texture} />
                {/* <meshStandardMaterial>
                    <videoTexture attach="map" args={[video]} />
                    <videoTexture attach="emissiveMap" args={[video]} />
                </meshStandardMaterial> */}
            </mesh>
        </group>
    )
}

const Images = () => {
    const { width, height } = useThree((state) => state.viewport)
    // const data = useScroll()
    // // const group = useRef<THREE.Mesh>(null!)
    // const group = useRef<THREE.Mesh>(null!)

    // // hook which gets called on scroll change (?)
    // useFrame(() => {
    //     // group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
    //     // group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
    //     // group.current.children[2].material.zoom =
    //     //     1 + data.range(1.15 / 3, 1 / 3) / 3
    //     // group.current.children[3].material.zoom =
    //     //     1 + data.range(1.15 / 3, 1 / 3) / 2
    //     // group.current.children[4].material.zoom =
    //     //     1 + data.range(1.25 / 3, 1 / 3) / 1
    //     // group.current.children[5].material.zoom =
    //     //     1 + data.range(1.8 / 3, 1 / 3) / 3
    //     // group.current.children[5].material.grayscale =
    //     //     1 - data.range(1.6 / 3, 1 / 3)
    //     // group.current.children[6].material.zoom =
    //     //     1 + (1 - data.range(2 / 3, 1 / 3)) / 3
    // })

    return (
        <Scroll>
            <MyImage
                position={[-4, 0, 0]}
                scale={[6, height]}
                url="/luna/Luna_Web_RecoverClinic.png"
            />
            <MyImage
                position={[2, 0, 1]}
                scale={3}
                url="/luna/Luna_Web_RecoverClinic.png"
            />
            <MyImage
                position={[2, 3.5, 1]}
                scale={3}
                url="/luna/Luna_Web_RecoverClinic.png"
            />
            <MyImage
                position={[-6, -height, 2]}
                scale={[1, 3]}
                url="/luna/Luna_Web_RecoverClinic.png"
            />
            <Suspense fallback={null}>
                <GifImage
                    position={[3, -height, 2]}
                    scale={[1.5, 1.3, 0]}
                    url="/luna/luna-web-login-to-table.mp4"
                />
            </Suspense>
            <MyImage
                position={[-width / 6, -height * 4.1, 0]}
                scale={[width / 2.5, width / 2]}
                url="/luna/Luna_Web_RecoverClinic.png"
            />
        </Scroll>
    )
}

type ScrollControlsProps = {
    /** Precision, default 0.00001 */
    eps?: number
    /** Horizontal scroll, default false (vertical) */
    horizontal?: boolean
    /** Infinite scroll, default false (experimental!) */
    infinite?: boolean
    /** Defines the length of the scroll area, each page is height:100%, default 1 */
    pages?: number
    /** A factor that increases scroll bar travel, default 1 */
    distance?: number
    /** Friction in seconds, default: 0.2 (1/5 second) */
    damping?: number
    /** maxSpeed optionally allows you to clamp the maximum speed. If damping is 0.2s and looks OK
     *  going between, say, page 1 and 2, but not for pages far apart as it'll move very rapid,
     *  then a maxSpeed of e.g. 0.1 which will clamp the speed to 0.1 units per second, it may now
     *  take much longer than damping to reach the target if it is far away. Default: Infinity */
    maxSpeed?: number
    /** If true attaches the scroll container before the canvas */
    prepend?: boolean
    enabled?: boolean
    style?: React.CSSProperties
    children: React.ReactNode
}

const Stuff = (props: MeshProps) => {
    const ref = useRef<THREE.Mesh>(null!)
    const data = useScroll()
    useFrame(() => {
        // Will be 0 when the scrollbar is at the starting position,
        // then increase to 1 until 1 / 3 of the scroll distance is reached
        const a = data.range(0, 1 / 3)
        console.log(a)
        // Will start increasing when 1 / 3 of the scroll distance is reached,
        // and reach 1 when it reaches 2 / 3rds.
        const b = data.range(1 / 3, 1 / 3)
        console.log(b)
        // Same as above but with a margin of 0.1 on both ends
        const c = data.range(1 / 3, 1 / 3, 0.1)
        console.log(c)
        // Will move between 0-1-0 for the selected range
        const d = data.curve(1 / 3, 1 / 3)
        console.log(d)
        // Same as above, but with a margin of 0.1 on both ends
        const e = data.curve(1 / 3, 1 / 3, 0.1)
        console.log(e)
        // Returns true if the offset is in range and false if it isn't
        const f = data.visible(2 / 3, 1 / 3)
        console.log(f)
        // The visible function can also receive a margin
        const g = data.visible(2 / 3, 1 / 3, 0.1)
        console.log(g)
    })
    return <mesh ref={ref} {...props} />
}

export default function FunScrollPage() {
    // const myCamera = <PerspectiveCamera/>

    // const myCamera = new PerspectiveCamera()
    // myCamera.position.set(0, 0, 2)

    // const state = useThree()

    return (
        <div className="h-screen">
            {/* code below works */}
            {/* <video autoPlay={true} loop={true} muted={true}> 
                <source
                    src="/luna/luna-web-login-to-table.mp4"
                    type="video/mp4"
                />
            </video> */}
            <Canvas
                orthographic
                camera={{ zoom: 80 }}
                gl={{
                    alpha: false,
                    antialias: false,
                    stencil: false,
                    depth: false,
                }}
                dpr={[1, 1.5]}
            >
                {/* <Items /> */}
                <color attach="background" args={['rgb(105,105,105)']} />
                {/* <ambientLight intensity={Math.PI / 2} /> */}
                {/* Suggesteed damping from the sample code is 6 */}
                <ScrollControls damping={1} pages={5}>
                    {/* <Scroll> */}
                    <Images />
                    {/* </Scroll> */}
                    <Scroll html style={{ width: '100%' }}>
                        {/* <Stuff ref={ref} /> */}
                        <p
                            style={{
                                position: 'absolute',
                                top: '100vh',
                                right: '20vw',
                                fontSize: '2rem',
                                transform: 'translate3d(0,-100%,0)',
                            }}
                        >
                            From UI/UX design
                        </p>
                        <h1
                            style={{
                                position: 'absolute',
                                top: '180vh',
                                left: '10vw',
                                fontSize: '2rem',
                            }}
                        >
                            To a responsive website
                        </h1>
                        <h1
                            style={{
                                position: 'absolute',
                                top: '260vh',
                                right: '10vw',
                            }}
                        >
                            This
                        </h1>
                        <h1
                            style={{
                                position: 'absolute',
                                top: '350vh',
                                left: '10vw',
                            }}
                        >
                            Is
                        </h1>
                        <h1
                            style={{
                                position: 'absolute',
                                top: '450vh',
                                right: '10vw',
                            }}
                        >
                            {' '}
                            Sam{' '}
                        </h1>
                        {/* <img
                            height={10}
                            src="/luna/luna-web-login-to-table.gif"
                            alt="test"
                        /> */}
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    )
}
