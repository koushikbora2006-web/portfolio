import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, ContactShadows, Environment } from "@react-three/drei";

function InteractiveBoysMesh() {
  const meshRef = useRef();
  const texture = useTexture("/avatar.jpg");

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    
    // 1. Base Float/Bobbing (gentle vertical movement)
    meshRef.current.position.y = Math.sin(t * 1.5) * 0.1;

    // 2. Cursor Tracking (react to mouse movement)
    // state.pointer ranges from -1 to 1 across the canvas
    const targetRotationX = (state.pointer.y * Math.PI) / 6; // Up/down tilt
    const targetRotationY = (state.pointer.x * Math.PI) / 4; // Left/right tilt

    // 3. Smooth Interpolation to target rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -targetRotationX,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY,
      0.1
    );
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[3, 4, 0.2]} />
      <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

export default function ModelBoy() {
  return (
    <div className="w-[280px] h-[400px] md:w-[350px] md:h-[500px] cursor-pointer relative z-20">
      {/* 
        Hovering over the canvas area updates pointer state,
        which triggers the tilt inside useFrame 
      */}
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <Environment preset="city" />
        <InteractiveBoysMesh />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
