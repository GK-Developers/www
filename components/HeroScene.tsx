"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function WireframeSphere() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / size.width - 0.5;
      mouse.current.y = -(e.clientY / size.height - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size.width, size.height]);

  useFrame(({ clock }) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const torus = torusRef.current;
    const group = groupRef.current;

    if (outer) {
      outer.rotation.y += (mouse.current.x * 0.8 - outer.rotation.y) * 0.05;
      outer.rotation.x += (mouse.current.y * 0.5 - outer.rotation.x) * 0.05;
      outer.rotation.y += 0.001;
    }

    if (inner) {
      inner.rotation.y +=
        (mouse.current.x * 0.6 - inner.rotation.y) * 0.035;
      inner.rotation.x +=
        (mouse.current.y * 0.35 - inner.rotation.x) * 0.035;
      inner.rotation.y += 0.0007;
    }

    if (torus) {
      torus.rotation.y +=
        (mouse.current.x * 0.8 - torus.rotation.y) * 0.05;
      torus.rotation.x +=
        (mouse.current.y * 0.5 - torus.rotation.x) * 0.05;
      torus.rotation.y += 0.001;
    }

    if (group) {
      group.position.y =
        Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#3dd68c"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Inner sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial
          color="#2a9e6e"
          wireframe
          transparent
          opacity={0.10}
        />
      </mesh>

      {/* Outer ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[2.8, 0.008, 16, 120]} />
        <meshBasicMaterial color="#1a6b4a" transparent opacity={0.20} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ toneMapping: 0, alpha: true }}
      frameloop="always"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} color="#3dd68c" intensity={0.5} />
      <WireframeSphere />
    </Canvas>
  );
}
