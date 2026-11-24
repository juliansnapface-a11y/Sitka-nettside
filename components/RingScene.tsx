"use client";
/* eslint-disable react-hooks/immutability -- three.js-objekter endres med vilje i hver frame */

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { LOADED_EVENT } from "./rings";

// En ekte stammeskive av gran som er i ferd med å bli til biokull:
// lyst treverk med årringer, forkullet kant med glør, og gnister som stiger opp.
// Teksturene er laget på forhånd og ligger i public/media/treskive/.

const T = "/media/treskive/";
const RED = "#E0201A";

function useLoaded() {
  const [loaded, setLoaded] = useState(
    () => typeof window !== "undefined" && !!(window as unknown as { __sitkaLoaded?: boolean }).__sitkaLoaded,
  );
  useEffect(() => {
    const on = () => setLoaded(true);
    window.addEventListener(LOADED_EVENT, on);
    return () => window.removeEventListener(LOADED_EVENT, on);
  }, []);
  return loaded;
}

function Disc() {
  const group = useRef<THREE.Group>(null);
  const glowLight = useRef<THREE.PointLight>(null);
  const loaded = useLoaded();
  const intro = useRef(0);
  const { viewport, gl } = useThree();

  const [face, glow, faceBump, bark, barkBump] = useLoader(THREE.TextureLoader, [
    T + "treskive.webp",
    T + "treskive-glod.webp",
    T + "treskive-relieff.webp",
    T + "bark.webp",
    T + "bark-relieff.webp",
  ]);

  const mats = useMemo(() => {
    const aniso = gl.capabilities.getMaxAnisotropy();
    for (const t of [face, glow]) t.colorSpace = THREE.SRGBColorSpace;
    bark.colorSpace = THREE.SRGBColorSpace;
    for (const t of [face, glow, faceBump]) t.anisotropy = aniso;
    for (const t of [bark, barkBump]) {
      t.wrapS = THREE.RepeatWrapping;
      t.anisotropy = aniso;
    }
    const faceMat = new THREE.MeshStandardMaterial({
      map: face,
      bumpMap: faceBump,
      bumpScale: 2.2,
      emissiveMap: glow,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 1.4,
      roughness: 0.82,
      metalness: 0,
    });
    const sideMat = new THREE.MeshStandardMaterial({
      map: bark,
      bumpMap: barkBump,
      bumpScale: 2,
      roughness: 0.95,
      metalness: 0,
    });
    return [sideMat, faceMat, faceMat];
  }, [face, glow, faceBump, bark, barkBump, gl]);

  // Smale skjermer (mobil): mindre skive, midtstilt og lenger ned, så den ikke dekker teksten
  const small = viewport.width < 6;
  const smallScale = THREE.MathUtils.clamp(viewport.width * 0.29, 0.5, 0.95);

  // Skiven er bare bakgrunn: den snurrer rolig av seg selv og reagerer ikke på mus eller scrolling
  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    intro.current = THREE.MathUtils.damp(intro.current, loaded ? 1 : 0, 1.4, dt);
    const k = intro.current;

    group.current.scale.setScalar((small ? smallScale : 1.1) * (0.6 + 0.4 * k));
    group.current.position.set(small ? 0 : 1.55, (small ? -0.2 * viewport.height : 0) + Math.sin(t * 0.5) * 0.05, 0);
    group.current.rotation.x = 0.32 + Math.sin(t * 0.3) * 0.04;
    // vipper rolig fram og tilbake, så forsiden med årringene alltid synes
    group.current.rotation.y = -0.45 + Math.sin(t * 0.22) * 0.5 + (1 - k) * 1.5;
    group.current.rotation.z = Math.sin(t * 0.22) * 0.05;

    // glørne blafrer svakt, som ekte glør
    const flick = 0.75 + 0.18 * Math.sin(t * 2.1) + 0.1 * Math.sin(t * 5.3 + 1) + 0.06 * Math.sin(t * 11.7);
    (mats[1] as THREE.MeshStandardMaterial).emissiveIntensity = (1.1 + 0.6 * flick) * k;
    if (glowLight.current) glowLight.current.intensity = (2.5 + 2 * flick) * k;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={mats}>
        <cylinderGeometry args={[1.5, 1.5, 0.38, 160, 1]} />
      </mesh>
      {/* varmt lys fra den forkullede siden */}
      <pointLight ref={glowLight} position={[-1.6, -0.9, 0.9]} color="#ff7a2e" distance={3.5} decay={1.8} />
      <Embers />
    </group>
  );
}

// Glør og gnister som stiger sakte opp fra den forkullede kanten og slukner
function Embers({ count = 90 }) {
  const ref = useRef<THREE.Points>(null);
  const { data, geo, mat } = useMemo(() => {
    let seed = 3;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const data = Array.from({ length: count }, () => ({
      x: -1.8 + rnd() * 2.4,
      z: (rnd() - 0.5) * 1.2,
      life: 3 + rnd() * 4,
      off: rnd() * 10,
      drift: (rnd() - 0.5) * 0.5,
      size: 0.5 + rnd() * 1.2,
    }));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    // rund, myk prikk
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.7)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const mat = new THREE.PointsMaterial({
      size: 0.085,
      map: new THREE.CanvasTexture(c),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    return { data, geo, mat };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const col = geo.attributes.color as THREE.BufferAttribute;
    data.forEach((d, i) => {
      const p = ((t + d.off) % d.life) / d.life; // 0 → 1 gjennom livet
      const y = -1.1 + p * 3.2;
      pos.setXYZ(i, d.x + Math.sin(t * 0.9 + i) * 0.12 + d.drift * p, y, d.z + Math.cos(t * 0.7 + i) * 0.1);
      const fade = Math.sin(Math.PI * Math.min(1, p * 1.2)) * (0.6 + 0.4 * Math.sin(t * 9 + i * 3));
      const b = Math.max(0, fade) * d.size;
      col.setXYZ(i, 1.0 * b, (0.38 + 0.25 * (1 - p)) * b, 0.08 * b);
    });
    pos.needsUpdate = true;
    col.needsUpdate = true;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Vises hvis nettleseren ikke støtter 3D: et stillbilde av stammeskiva
function Fallback() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/treskive/treskive.webp"
      alt=""
      className="absolute left-1/2 top-[60%] w-[70vmin] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full md:left-[70%] md:top-1/2"
    />
  );
}

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export default function RingScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [webgl] = useState(hasWebGL);

  // Stopper 3D-tegningen når helten er ute av syne (sparer batteri)
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0">
      {webgl ? (
        <Boundary>
          <Canvas
            frameloop={visible ? "always" : "never"}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 7], fov: 35 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
            }}
          >
            <ambientLight intensity={0.25} color="#ffe8d8" />
            {/* mykt dagslys ovenfra, og et svakt rødt kantlys bakfra (Sitka-rødt) */}
            <directionalLight position={[-3, 5, 6]} intensity={2.7} color="#fff1e4" />
            <directionalLight position={[4, -1, -4]} intensity={0.9} color={RED} />
            <Suspense fallback={null}>
              <Disc />
            </Suspense>
          </Canvas>
        </Boundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
