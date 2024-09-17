'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MyBox from '@/components/MyBox/MyBox'
// import { useEffect } from "react"

export default function NotePage() {
    // const myCamera = <PerspectiveCamera/>

    // const myCamera = new PerspectiveCamera()
    // myCamera.position.set(0, 0, 2)

    // const state = useThree()

    return (
        <div className="h-screen w-full">
            <Canvas camera={{ position: [0, 0, 2] }}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight
                    position={[-10, -10, -10]}
                    decay={0}
                    intensity={Math.PI}
                />
                <MyBox position={[2.2, 0, 0]} />
                <MyBox position={[-2.2, 0, 0]} />
                <MyBox position={[0, 2.2, 0]} />
                <MyBox position={[0, -2.2, 0]} />
                <MyBox position={[0, 0, 2.2]} />
                <MyBox position={[0, 0, -2.2]} />
                <OrbitControls />
                {/* <PerspectiveCamera position={[0, 0, 2]}/> */}
            </Canvas>
        </div>
    )
}
