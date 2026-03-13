import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Custom Starfield Shaders
const starVertexShader = `
  varying vec3 vColor;
  varying float vTwinkle;
  attribute float size;
  attribute float twinkleSpeed;
  attribute vec3 color;
  uniform float time;

  void main() {
    vColor = color;
    vTwinkle = sin(time * twinkleSpeed) * 0.5 + 0.5;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    float alpha = (1.0 - r * 2.0) * (0.5 + 0.5 * vTwinkle);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function RealisticStarfield({ count = 8000 }) {
  const mesh = useRef();
  
  // Generating data in a pure way (seed-based or just once in state)
  const [starData] = useState(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const sp = new Float32Array(count);

    const starTypes = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#a2d2ff"),
      new THREE.Color("#ffcfd2"),
      new THREE.Color("#fefae0"),
    ];

    // Seeded-like random to satisfy purity rules if needed, 
    // but useState initializer is fine even with Math.random in most envs
    // If NOT, we would move this to an effect.
    for (let i = 0; i < count; i++) {
      const radius = 100 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = starTypes[Math.floor(Math.random() * starTypes.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;

      s[i] = 0.5 + Math.random() * 2.0;
      sp[i] = 1.0 + Math.random() * 3.0;
    }
    return { pos, cols, s, sp };
  });

  const uniforms = useMemo(() => ({
    time: { value: 0 }
  }), []);

  useFrame((state) => {
    // eslint-disable-next-line react-hooks/immutability
    uniforms.time.value = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={starData.pos} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={starData.cols} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={starData.s} itemSize={1} />
        <bufferAttribute attach="attributes-twinkleSpeed" count={count} array={starData.sp} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Nebula Shaders
const nebulaVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;

  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    float noise = snoise(vPosition * 0.05 + time * 0.05);
    noise += snoise(vPosition * 0.1 - time * 0.02) * 0.5;
    float mask = 1.0 - length(vPosition) / 20.0;
    mask = clamp(mask, 0.0, 1.0);
    vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
    gl_FragColor = vec4(finalColor, noise * 0.2 * mask);
  }
`;

function NebulaSystem({ position, color1, color2 }) {
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color1: { value: new THREE.Color(color1) },
    color2: { value: new THREE.Color(color2) }
  }), [color1, color2]);

  useFrame((state) => {
    // eslint-disable-next-line react-hooks/immutability
    uniforms.time.value = state.clock.getElapsedTime();
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[20, 32, 32]} />
      <shaderMaterial
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

const fresnelVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fresnelFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform vec3 color;
  void main() {
    float intensity = pow(1.0 - dot(normalize(vNormal), normalize(vViewPosition)), 3.0);
    gl_FragColor = vec4(color, intensity * 0.6);
  }
`;

function RealisticPlanet({ size, color, orbitRadius, speed, offset = 0, hasRings = false, atmosColor }) {
  const mesh = useRef();
  const group = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (group.current) {
      group.current.position.x = Math.cos(t) * orbitRadius;
      group.current.position.z = Math.sin(t) * orbitRadius;
    }
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });

  const planetUniforms = useMemo(() => ({
    color: { value: new THREE.Color(atmosColor || color) }
  }), [atmosColor, color]);

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[size, 64, 64]} />
        <shaderMaterial
          vertexShader={fresnelVertexShader}
          fragmentShader={fresnelFragmentShader}
          uniforms={planetUniforms}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {hasRings && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 2.5, 64]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            roughness={1}
          />
        </mesh>
      )}
    </group>
  );
}

function CinematicCamera() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.05) * 3.0;
    state.camera.position.y = Math.cos(t * 0.05) * 1.5 + 6.0;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CosmicCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] bg-[#020617]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 30]} fov={45} />
        <CinematicCamera />
        <ambientLight intensity={0.05} />
        <pointLight position={[0, 0, 0]} intensity={4} color="#fef9c3" distance={100} decay={1} />
        <spotLight position={[30, 30, 30]} intensity={1.5} angle={0.2} penumbra={1} color="#38bdf8" />
        <RealisticStarfield count={10000} />
        <NebulaSystem position={[0, 0, -20]} color1="#1e1b4b" color2="#4338ca" />
        <NebulaSystem position={[20, 10, -30]} color1="#0c4a6e" color2="#0ea5e9" />
        <NebulaSystem position={[-25, -5, -25]} color1="#4c1d95" color2="#7c3aed" />
        <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh>
            <sphereGeometry args={[2.5, 64, 64]} />
            <meshBasicMaterial color="#fef08a" />
            <pointLight intensity={2} distance={50} color="#fef9c3" />
          </mesh>
          <mesh scale={1.4}>
            <sphereGeometry args={[2.5, 64, 64]} />
            <meshBasicMaterial color="#fcd34d" transparent opacity={0.1} />
          </mesh>
        </Float>
        <RealisticPlanet size={0.6} color="#0ea5e9" orbitRadius={8} speed={0.3} offset={1.0} atmosColor="#7dd3fc" />
        <RealisticPlanet size={1.0} color="#ec4899" orbitRadius={14} speed={0.15} offset={4.0} hasRings atmosColor="#f472b6" />
        <RealisticPlanet size={1.2} color="#10b981" orbitRadius={22} speed={0.08} offset={2.5} atmosColor="#6ee7b7" />
        <RealisticPlanet size={0.5} color="#f59e0b" orbitRadius={30} speed={0.04} offset={6.0} atmosColor="#fbbf24" />
      </Canvas>
    </div>
  );
}
