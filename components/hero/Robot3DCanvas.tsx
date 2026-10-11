"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSound } from "@/hooks/useSound";
import { useUniversalLoader } from "@/components/loader/UniversalLoaderWrapper";

// Suppress internal Three.js r186 / R3F deprecation warnings (THREE.Clock -> THREE.Timer, PCFSoftShadowMap -> PCFShadowMap)
if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("THREE.Clock: This module has been deprecated") ||
        args[0].includes("PCFSoftShadowMap has been removed"))
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   CRT SCREEN CANVAS TEXTURE
   Matches the reference image exactly:
   - Dark blue-grey CRT glass background (#0c1220)
   - TV power-on horizontal beam flash
   - Typewriter intro → services menu
   - "JUNCA OS  v0.1" / "AU REPCS" bottom labels
═══════════════════════════════════════════════════════════════════════════ */
function useCrtScreenTexture() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const isFinishedRef = useRef<boolean>(false);

  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 320;
    canvasRef.current = c;
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame(() => {
    if (isFinishedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas || !texture) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = performance.now();
    if (startTimeRef.current === null) startTimeRef.current = now;

    // Throttle 2D canvas execution to ~22fps during animation to save CPU
    if (now - lastTickRef.current < 45) return;
    lastTickRef.current = now;

    const elapsed = (now - startTimeRef.current) * 0.001;
    const W = canvas.width;
    const H = canvas.height;

    // BG: dark blue-grey CRT glass color matching reference
    ctx.fillStyle = "#0c1220";
    ctx.fillRect(0, 0, W, H);

    // TV POWER-ON flash beam (0–0.5s)
    if (elapsed < 0.5) {
      const p = elapsed / 0.5;
      const bw = p * W;
      const bh = 2 + p * 6;
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 20;
      ctx.fillRect((W - bw) / 2, (H - bh) / 2, bw, bh);
      ctx.restore();
      texture.needsUpdate = true;
      return;
    }

    // Vertical unfold (0.5–0.9s)
    if (elapsed < 0.9) {
      const p = (elapsed - 0.5) / 0.4;
      const sh = p * H;
      ctx.fillStyle = "#0c1220";
      ctx.fillRect(0, (H - sh) / 2, W, sh);
      const flash = (1 - p) * 0.4;
      ctx.fillStyle = `rgba(180,200,255,${flash})`;
      ctx.fillRect(0, (H - sh) / 2, W, sh);
      texture.needsUpdate = true;
      return;
    }

    // Subtle scanlines
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    for (let y = 0; y < H; y += 4) {
      ctx.fillRect(0, y, W, 1);
    }

    const active = elapsed - 0.9;

    // PHASE 1: Typewriter intro (0–3s)
    if (active < 3.0) {
      const line1 = "I'm the Junca assistant.";
      const line2 = "Here to help you build.";
      const total = Math.floor(active * 22);
      ctx.font = "bold 22px 'Courier New', monospace";
      ctx.fillStyle = "#c8d8e8";
      const l1 = line1.substring(0, Math.min(total, line1.length));
      ctx.fillText(l1, 28, 80);
      if (total > line1.length + 4) {
        const l2 = line2.substring(0, Math.min(total - line1.length - 4, line2.length));
        ctx.fillText(l2, 28, 115);
      }
      if (Math.floor(active * 3) % 2 === 0) {
        ctx.fillText("\u2588", 28 + ctx.measureText(l1).width + 2, 80);
      }
    } else {
      // PHASE 2: Services menu matching reference image exactly
      const st = active - 3.0;
      ctx.font = "bold 20px 'Courier New', monospace";
      ctx.fillStyle = "#e8402a";
      ctx.fillText("> services", 28, 55);
      ctx.fillRect(28, 62, 190, 2);

      const services = [
        "01  Web design & UX",
        "02  Framer & custom builds",
        "03  3D & motion design",
        "04  Brand identity",
        "05  SEO & GEO",
      ];
      ctx.font = "15px 'Courier New', monospace";
      services.forEach((line, i) => {
        if (st > i * 0.18) {
          const a = Math.min(1, (st - i * 0.18) / 0.25);
          ctx.fillStyle = `rgba(190,205,220,${a})`;
          ctx.fillText(line, 28, 90 + i * 26);
        }
      });

      // Once all services have rendered, mark finished to stop CPU load entirely
      if (st > 5 * 0.18 + 0.3) {
        isFinishedRef.current = true;
      }
    }

    // CRT glass reflection band (top-left bright arc)
    const grad = ctx.createLinearGradient(0, 0, W * 0.6, H * 0.4);
    grad.addColorStop(0, "rgba(140,170,210,0.18)");
    grad.addColorStop(0.35, "rgba(100,130,170,0.06)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(W, 0);
    ctx.lineTo(W * 0.55, H * 0.4);
    ctx.lineTo(0, H * 0.2);
    ctx.closePath();
    ctx.fill();

    // Bottom labels
    ctx.font = "11px 'Courier New', monospace";
    ctx.fillStyle = "rgba(120,140,165,0.6)";
    ctx.fillText("JUNCA OS  v0.1", 28, H - 20);
    ctx.font = "bold 11px 'Courier New', monospace";
    ctx.fillStyle = "#e8402a";
    ctx.fillText("AU REPCS", W - 105, H - 20);

    texture.needsUpdate = true;
  });

  return texture;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Build octagonal shape for ExtrudeGeometry
═══════════════════════════════════════════════════════════════════════════ */
function buildOctagonShape(w: number, h: number, bevel: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + bevel, h / 2);
  shape.lineTo(w / 2 - bevel, h / 2);
  shape.lineTo(w / 2, h / 2 - bevel);
  shape.lineTo(w / 2, -h / 2 + bevel);
  shape.lineTo(w / 2 - bevel, -h / 2);
  shape.lineTo(-w / 2 + bevel, -h / 2);
  shape.lineTo(-w / 2, -h / 2 + bevel);
  shape.lineTo(-w / 2, h / 2 - bevel);
  shape.closePath();
  return shape;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROBOT HEAD — octagonal beveled CRT monitor with glass overlay
═══════════════════════════════════════════════════════════════════════════ */
function RobotHead({ headRef }: { headRef: React.RefObject<THREE.Group | null> }) {
  const screenTexture = useCrtScreenTexture();

  // Near-black housing
  const shellMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111218",
        metalness: 0.55,
        roughness: 0.35,
        envMapIntensity: 1.2,
      }),
    []
  );

  // Dark crimson edge trim
  const edgeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8c1818",
        metalness: 0.88,
        roughness: 0.15,
        envMapIntensity: 2.0,
      }),
    []
  );

  // Bronze/copper hood
  const hoodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8a3010",
        metalness: 0.92,
        roughness: 0.14,
        envMapIntensity: 2.5,
      }),
    []
  );

  // Deep red bezel
  const bezelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4a0a0a",
        metalness: 0.75,
        roughness: 0.25,
        envMapIntensity: 1.5,
      }),
    []
  );

  // White/silver side ear panels
  const earWhiteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c8c8cc",
        metalness: 0.5,
        roughness: 0.25,
        envMapIntensity: 1.8,
      }),
    []
  );

  // Dark glass overlay material for CRT screen
  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a2540",
        metalness: 0.1,
        roughness: 0.05,
        transparent: true,
        opacity: 0.35,
        envMapIntensity: 2.0,
      }),
    []
  );

  // Octagonal geometries (optimized bevel segments to cut vertex processing by 50%)
  const headGeo = useMemo(() => {
    const shape = buildOctagonShape(1.76, 1.22, 0.28);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 1.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 2,
    });
  }, []);

  const rimGeo = useMemo(() => {
    const shape = buildOctagonShape(1.88, 1.34, 0.31);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 1,
    });
  }, []);

  const bezelGeo = useMemo(() => {
    const shape = buildOctagonShape(1.72, 1.18, 0.26);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.01,
      bevelSegments: 1,
    });
  }, []);

  // Screen octagon glass shape (slightly inset)
  const screenGlassGeo = useMemo(() => {
    const shape = buildOctagonShape(1.56, 1.08, 0.22);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.03,
      bevelEnabled: false,
    });
  }, []);

  return (
    <group ref={headRef} position={[0, 0.52, 0]}>
      {/* Red edge rim (outermost) */}
      <mesh geometry={rimGeo} material={edgeMat} position={[0, 0, -0.6]} castShadow />

      {/* Main dark octagonal shell */}
      <mesh geometry={headGeo} material={shellMat} position={[0, 0, -0.58]} castShadow />

      {/* Top bronze hood visor — slightly angled forward */}
      <mesh position={[0, 0.72, 0.0]} rotation={[0.06, 0, 0]} material={hoodMat} castShadow>
        <boxGeometry args={[1.96, 0.24, 1.32]} />
      </mesh>

      {/* Front face bezel ring */}
      <mesh geometry={bezelGeo} material={bezelMat} position={[0, 0, 0.46]} />

      {/* CRT Screen texture (emissive so it glows) */}
      {screenTexture && (
        <mesh position={[0, 0, 0.555]}>
          <planeGeometry args={[1.48, 1.02]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>
      )}

      {/* Glass overlay on top of screen for realistic CRT glass look */}
      <mesh geometry={screenGlassGeo} material={glassMat} position={[0, 0, 0.55]} />

      {/* Side ear panels — white upper + bronze lower clamp (matching ref) */}
      {([-1, 1] as const).map((side) => (
        <group key={side} position={[side * 1.0, 0.04, -0.02]}>
          <mesh material={earWhiteMat} castShadow>
            <boxGeometry args={[0.14, 0.64, 0.92]} />
          </mesh>
          <mesh position={[0, -0.3, 0.06]} material={hoodMat} castShadow>
            <boxGeometry args={[0.16, 0.3, 1.02]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FULL ROBOT MODEL
═══════════════════════════════════════════════════════════════════════════ */
function RobotModel() {
  const headGroupRef = useRef<THREE.Group>(null!);
  const bodyGroupRef = useRef<THREE.Group>(null!);
  const fanBladesRef = useRef<THREE.Group>(null!);
  const { soundOn } = useSound();

  // Deep glossy crimson body
  const redBodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7a0e0e",
        metalness: 0.72,
        roughness: 0.18,
        envMapIntensity: 2.0,
      }),
    []
  );

  // Bronze/copper accents
  const bronzeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8b2e08",
        metalness: 0.9,
        roughness: 0.16,
        envMapIntensity: 2.5,
      }),
    []
  );

  // Chrome neck
  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4d4d8",
        metalness: 0.96,
        roughness: 0.08,
        envMapIntensity: 3.0,
      }),
    []
  );

  // Dark interior / fan housing
  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0a0e",
        metalness: 0.85,
        roughness: 0.35,
        envMapIntensity: 1.0,
      }),
    []
  );

  // Glowing orange LED
  const ledMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff6000",
        emissive: "#ff4400",
        emissiveIntensity: 6,
      }),
    []
  );

  // RED fan blades (matching reference image — they are dark red, not chrome)
  const fanBladeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6b1010",
        metalness: 0.7,
        roughness: 0.22,
        envMapIntensity: 1.8,
      }),
    []
  );

  useFrame(({ pointer }, delta) => {
    const t = performance.now() * 0.001;

    // Fan spin
    if (fanBladesRef.current) {
      fanBladesRef.current.rotation.z += delta * (soundOn ? 18 : 1.2);
    }

    // Head cursor tracking
    if (headGroupRef.current) {
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        pointer.x * 0.55,
        0.08
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        -pointer.y * 0.28,
        0.08
      );
    }

    // Body float + slight rotation
    if (bodyGroupRef.current) {
      bodyGroupRef.current.position.y = THREE.MathUtils.lerp(
        bodyGroupRef.current.position.y,
        Math.sin(t * 1.5) * 0.05 - 0.3,
        0.05
      );
      bodyGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyGroupRef.current.rotation.y,
        pointer.x * 0.18,
        0.04
      );
    }
  });

  return (
    <group ref={bodyGroupRef} position={[0.85, -0.25, 0]} scale={[0.9, 0.9, 0.9]}>
      {/* ═══ TORSO ═══ */}
      <mesh position={[0, -1.32, 0]} material={redBodyMat} castShadow receiveShadow>
        <boxGeometry args={[1.9, 1.82, 1.42]} />
      </mesh>

      {/* Top collar bevel */}
      <mesh position={[0, -0.33, 0]} material={bronzeMat} castShadow>
        <boxGeometry args={[1.96, 0.22, 1.48]} />
      </mesh>

      {/* Orange LED badge */}
      <mesh position={[0.66, -1.97, 0.72]} material={ledMat}>
        <boxGeometry args={[0.4, 0.09, 0.05]} />
      </mesh>

      {/* Bottom vent holes */}
      <group position={[0, -2.07, 0.72]}>
        {[-0.55, -0.44, -0.33, -0.22, -0.11, 0, 0.11, 0.22, 0.33, 0.44, 0.55].map(
          (x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={darkMat}>
              <cylinderGeometry args={[0.022, 0.022, 0.04, 12]} />
            </mesh>
          )
        )}
      </group>

      {/* ═══ FAN ASSEMBLY ═══ */}
      <group position={[-0.33, -1.32, 0.72]}>
        {/* Dark recessed housing */}
        <mesh material={darkMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.08, 32]} />
        </mesh>
        {/* Chrome outer ring */}
        <mesh material={chromeMat} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.03, 12, 32]} />
        </mesh>
        {/* Chrome centre hub */}
        <mesh material={chromeMat} position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 20]} />
        </mesh>
        {/* RED fan blades (matching reference) */}
        <group ref={fanBladesRef} position={[0, 0, 0.04]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]} material={fanBladeMat}>
              <boxGeometry args={[0.09, 0.3, 0.025]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ═══ CHROME NECK ═══ */}
      <group position={[0, -0.15, 0]}>
        <mesh material={chromeMat} castShadow>
          <cylinderGeometry args={[0.38, 0.5, 0.28, 32]} />
        </mesh>
        <mesh position={[0, -0.12, 0]} material={bronzeMat} castShadow>
          <cylinderGeometry args={[0.56, 0.56, 0.07, 32]} />
        </mesh>
      </group>

      {/* ═══ HEAD ═══ */}
      <RobotHead headRef={headGroupRef} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CAMERA CONTROLLER
═══════════════════════════════════════════════════════════════════════════ */
function CameraController() {
  const { camera } = useThree();
  const innerHeightRef = useRef(typeof window !== "undefined" ? window.innerHeight : 800);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    scrollYRef.current = window.scrollY;
    innerHeightRef.current = window.innerHeight;

    const onResize = () => {
      innerHeightRef.current = window.innerHeight;
    };
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(() => {
    const h = innerHeightRef.current || 800;
    const p = Math.min(1, Math.max(0, scrollYRef.current / (h * 0.9)));
    const tz = THREE.MathUtils.lerp(4.2, 0.85, p);
    const tx = THREE.MathUtils.lerp(0, 0.75, p);
    const ty = THREE.MathUtils.lerp(0.2, 0.3, p);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz, 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.08);
  });
  return null;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT — with Environment for realistic reflections
═══════════════════════════════════════════════════════════════════════════ */
export default function Robot3DCanvas() {
  const { isLoading } = useUniversalLoader();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setMounted(true);
    }
  }, [isLoading]);

  if (isLoading || !mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-auto z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 4.2], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        {/* Studio lighting: zero CubeCamera / PMREM overhead */}
        <hemisphereLight args={["#ffffff", "#2a0505", 1.2]} />
        <directionalLight position={[0, 6, -2]} intensity={2.0} color="#ffffff" />

        {/* Key light — white from upper-right */}
        <directionalLight position={[4, 6, 5]} intensity={3.5} color="#ffffff" />

        {/* Red fill from left */}
        <directionalLight position={[-5, 2, 3]} intensity={2.8} color="#cc2020" />

        {/* Front highlight */}
        <pointLight position={[0.8, 0.8, 3.5]} intensity={5} color="#ffffff" distance={8} />

        {/* Under-body red bounce */}
        <pointLight position={[-0.5, -2, 2]} intensity={2.5} color="#cc2020" distance={6} />

        {/* Subtle ambient */}
        <ambientLight intensity={0.4} />

        <CameraController />
        <RobotModel />
      </Canvas>
    </div>
  );
}
