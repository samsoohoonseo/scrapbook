import { useRef } from 'react'
import { Mesh } from 'three'

const CameraTestPage = () => {
    const ref = useRef<Mesh>(null!)

    return (
        // <div>
        //     This is a CameraTestPage
        // </div>

        <mesh ref={ref}></mesh>
    )
}

export default CameraTestPage
