"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  LIGHT BEAM — mouse-tracking line from cursor toward sphere center */
/* ------------------------------------------------------------------ */

function LightBeam() {
  const dotRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const mouse = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const opacity = useRef(0.35);
  const targetOpacity = useRef(0.35);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints([
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(0, 0, 0),
    ]);
    return geo;
  }, []);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#3dd68c",
        transparent: true,
        opacity: 0.35,
      }),
    []
  );

  const lineObj = useMemo(
    () => new THREE.Line(lineGeo, lineMat),
    [lineGeo, lineMat]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;

      // Reset opacity on move
      targetOpacity.current = 0.35;

      // Reset idle timer
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        targetOpacity.current = 0;
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [size.width, size.height]);

  useFrame(() => {
    // Smooth lerp toward mouse
    smoothPos.current.x += (mouse.current.x - smoothPos.current.x) * 0.08;
    smoothPos.current.y += (mouse.current.y - smoothPos.current.y) * 0.08;

    // Smooth opacity
    opacity.current += (targetOpacity.current - opacity.current) * 0.04;

    const positions = lineGeo.attributes.position as THREE.BufferAttribute;
    if (positions) {
      // Beam start (near camera, follows mouse)
      positions.setXYZ(0, smoothPos.current.x * 4, smoothPos.current.y * 4, 2);
      // Beam end (sphere center)
      positions.setXYZ(1, 0, 0, 0);
      positions.needsUpdate = true;
    }

    lineMat.opacity = opacity.current;

    // Move dot to beam start
    if (dotRef.current) {
      dotRef.current.position.set(
        smoothPos.current.x * 4,
        smoothPos.current.y * 4,
        2
      );
      const dotMat = dotRef.current.material as THREE.MeshBasicMaterial;
      dotMat.opacity = opacity.current * (0.8 / 0.35);
    }
  });

  return (
    <>
      <primitive object={lineObj} />
      {/* Small glow dot at beam origin */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#3dd68c" transparent opacity={0.8} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  WIREFRAME SPHERE — Interactions & Scroll                          */
/* ------------------------------------------------------------------ */

function WireframeSphere() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const { size, camera, scene } = useThree();
  
  // State refs (no useState to avoid re-renders)
  const mouse = useRef(new THREE.Vector2(0, 0));
  const scrollProgress = useRef(0);
  const cameraTargetZ = useRef(5.0);
  const isHovered = useRef(false);
  const explodePhase = useRef(0); // 0=idle, 1=explode, 2=reassemble
  const particles = useRef<THREE.Mesh[]>([]);

  // Reusable raycaster tools
  const raycaster = useRef(new THREE.Raycaster());

  // === EVENT LISTENERS ===
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };

    const handleScroll = () => {
      scrollProgress.current = Math.min(
        window.scrollY / window.innerHeight,
        1
      );
    };

    // Interaction 1: Wheel Zoom
    const handleWheel = (e: WheelEvent) => {
      cameraTargetZ.current -= e.deltaY * 0.005;
      // Clamp between -1.5 (inside) and 8.0 (far)
      // sphere outer radius is 2.2, inner is 1.4
      if (cameraTargetZ.current < -1.5) cameraTargetZ.current = -1.5;
      if (cameraTargetZ.current > 8.0) cameraTargetZ.current = 8.0;
    };

    // Interaction 3: Click Explode
    const handleClick = () => {
      if (explodePhase.current !== 0 || !outerRef.current) return;
      
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(outerRef.current);
      if (intersects.length > 0) {
        // Start explosion Phase 1
        explodePhase.current = 1;
        
        // Hide original meshes
        if (outerRef.current) outerRef.current.visible = false;
        if (innerRef.current) innerRef.current.visible = false;
        if (torusRef.current) torusRef.current.visible = false;

        // Create 80 particles
        const geo = new THREE.SphereGeometry(0.03, 4, 4);
        const mat = new THREE.MeshBasicMaterial({ color: "#3dd68c", transparent: true, opacity: 1 });
        
        for (let i = 0; i < 80; i++) {
          const mesh = new THREE.Mesh(geo, mat);
          // random velocity
          const v = new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
          ).normalize().multiplyScalar(Math.random() * 4 + 2);
          
          mesh.userData.velocity = v;
          scene.add(mesh);
          particles.current.push(mesh);
        }

        // Schedule Phase 2 (Reassemble)
        setTimeout(() => {
          explodePhase.current = 2;
          
          // Cleanup particles
          particles.current.forEach((p) => {
            scene.remove(p);
          });
          particles.current = [];
          geo.dispose();
          mat.dispose();

          // Show original meshes at scale 0
          if (outerRef.current) {
            outerRef.current.visible = true;
            outerRef.current.scale.setScalar(0);
            outerRef.current.userData.scaleVelocity = 0;
          }
          if (innerRef.current) {
            innerRef.current.visible = true;
            innerRef.current.scale.setScalar(0);
          }
          if (torusRef.current) {
            torusRef.current.visible = true;
            torusRef.current.scale.setScalar(0);
          }

          // Schedule end of Phase 2
          setTimeout(() => {
            explodePhase.current = 0;
          }, 800);
        }, 800);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("click", handleClick);
      
      // Cleanup particles if unmounted during animation
      particles.current.forEach(p => scene.remove(p));
    };
  }, [size.width, size.height, camera, scene]);

  // === RENDER LOOP ===
  useFrame(({ clock, scene, camera }, delta) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const torus = torusRef.current;
    const group = groupRef.current;
    const pl = pointLightRef.current;
    const p = scrollProgress.current;

    // --- Interaction 1: Camera Zoom & Fog ---
    camera.position.z += (cameraTargetZ.current - camera.position.z) * 0.08;
    const isInside = camera.position.z < 2.2;
    
    if (isInside && !scene.fog) {
      scene.fog = new THREE.FogExp2("#0d1a14", 0.15);
    } else if (!isInside && scene.fog) {
      scene.fog = null;
    }

    // --- Interaction 4: Scroll FOV Shift ---
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = 75 + (p * 10); // 75 to 85
      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov += (targetFov - camera.fov) * 0.04;
        camera.updateProjectionMatrix();
      }
    }

    // Base Rotations
    if (outer) {
      outer.rotation.y += (mouse.current.x * 0.4 - outer.rotation.y) * 0.05;
      outer.rotation.x += (mouse.current.y * 0.25 - outer.rotation.x) * 0.05;
      outer.rotation.y += 0.001;
    }
    if (inner) {
      inner.rotation.y += (mouse.current.x * 0.3 - inner.rotation.y) * 0.035;
      inner.rotation.x += (mouse.current.y * 0.17 - inner.rotation.x) * 0.035;
      inner.rotation.y += 0.0007;
    }
    if (torus) {
      torus.rotation.y += (mouse.current.x * 0.4 - torus.rotation.y) * 0.05;
      torus.rotation.x += (mouse.current.y * 0.25 - torus.rotation.x) * 0.05;
      torus.rotation.y += 0.001;
    }
    if (group) {
      group.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
    }

    // --- Interaction 2: Hover Pulse ---
    let hoverOpacityOuter = isInside ? 0.35 : 0.18;
    let hoverOpacityInner = isInside ? 0.25 : 0.10;
    let hoverScale = 1.0;
    let lightIntensity = 0;
    let outerColor = "#3dd68c"; // default inner vivid

    if (explodePhase.current === 0 && outer) {
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(outer);
      isHovered.current = intersects.length > 0;
      
      if (isHovered.current) {
        hoverOpacityOuter = 0.15 + (Math.sin(clock.getElapsedTime() * 3) * 0.5 + 0.5) * 0.3; // pulse 0.15 to 0.45
        hoverScale = 1.08;
        outerColor = "#3dd68c";
        lightIntensity = 1.5;
      } else {
        outerColor = isInside ? "#3dd68c" : "#1a6b4a"; // base outer color
      }
    }

    if (pl) {
      pl.intensity += (lightIntensity - pl.intensity) * 0.1;
    }

    // --- Interaction 3: Explode/Reassemble ---
    if (explodePhase.current === 1) {
      // Particles exploding
      particles.current.forEach((pMesh) => {
        pMesh.position.add(pMesh.userData.velocity.clone().multiplyScalar(delta));
        pMesh.userData.velocity.multiplyScalar(0.95); // decay
        const pMat = pMesh.material as THREE.MeshBasicMaterial;
        pMat.opacity -= delta * 1.25; // fade out over 800ms
        if (pMat.opacity < 0) pMat.opacity = 0;
      });
    }

    // --- Apply Transforms (Scroll + Hover + Reveal) ---
    if (outer && inner && torus) {
      const oMat = outer.material as THREE.MeshBasicMaterial;
      const iMat = inner.material as THREE.MeshBasicMaterial;
      
      const targetOuterZ = -p * 8;
      const targetInnerZ = -p * 10;
      const targetTorusZ = -p * 6;

      outer.position.z += (targetOuterZ - outer.position.z) * 0.04;
      inner.position.z += (targetInnerZ - inner.position.z) * 0.04;
      torus.position.z += (targetTorusZ - torus.position.z) * 0.04;

      if (explodePhase.current === 2) {
        // Reassemble spring
        const target = 1 - p * 0.4; // Base scale including scroll
        let v = outer.userData.scaleVelocity || 0;
        v += (target - outer.scale.x) * 0.15;
        v *= 0.75;
        outer.userData.scaleVelocity = v;
        
        const nextScale = outer.scale.x + v;
        outer.scale.setScalar(nextScale);
        
        // sync others relative to outer
        inner.scale.setScalar(nextScale * (1 - p * 0.5) / (1 - p * 0.4));
        torus.scale.setScalar(nextScale * (1 - p * 0.3) / (1 - p * 0.4));
        
        // fade in
        oMat.opacity += (hoverOpacityOuter - oMat.opacity) * 0.1;
        iMat.opacity += (hoverOpacityInner - iMat.opacity) * 0.1;

      } else if (explodePhase.current === 0) {
        // Normal scale
        const curOutScale = outer.scale.x;
        const tgtOutScale = (1 - p * 0.4) * hoverScale;
        outer.scale.setScalar(curOutScale + (tgtOutScale - curOutScale) * 0.04);

        const curInnScale = inner.scale.x;
        const tgtInnScale = (1 - p * 0.5) * hoverScale;
        inner.scale.setScalar(curInnScale + (tgtInnScale - curInnScale) * 0.04);

        const curTorScale = torus.scale.x;
        const tgtTorScale = (1 - p * 0.3) * hoverScale;
        torus.scale.setScalar(curTorScale + (tgtTorScale - curTorScale) * 0.04);

        // Opacities & Colors
        oMat.opacity += (hoverOpacityOuter - oMat.opacity) * 0.1;
        iMat.opacity += (hoverOpacityInner - iMat.opacity) * 0.1;
        
        const curColor = new THREE.Color(oMat.color);
        curColor.lerp(new THREE.Color(outerColor), 0.1);
        oMat.color.copy(curColor);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight ref={pointLightRef} position={[0, 0, 0]} color="#3dd68c" intensity={0} />
      {/* Outer sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#1a6b4a"
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

/* ------------------------------------------------------------------ */
/*  CANVAS EXPORT                                                      */
/* ------------------------------------------------------------------ */

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
        // MUST BE AUTO to receive hover/wheel/click events
        pointerEvents: "auto",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.1} />
      <WireframeSphere />
      <LightBeam />
    </Canvas>
  );
}
