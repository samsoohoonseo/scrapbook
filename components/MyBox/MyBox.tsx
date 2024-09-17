import { useRef, useState } from 'react'
import { MeshProps, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

const MyBox = (props: MeshProps) => {
    // const ref = useRef<Mesh>(null!)
    const ref = useRef<Mesh>(null!)

    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    useFrame((_, delta) => (ref.current.rotation.x += delta))

    const WIDTH = 1
    const HEIGHT = 1
    const DEPTH = 1

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
            <meshStandardMaterial color={hovered ? 'red' : 'blue'} />
        </mesh>
    )
}

export default MyBox
