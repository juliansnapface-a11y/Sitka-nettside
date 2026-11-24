"use client";
/* eslint-disable react-hooks/immutability -- three.js-objekter endres med vilje i hver frame */

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { LOADED_EVENT, ringPoints } from "./rings";

const RED = "#E0201A";

// Tegner forsiden av stammeskiven (som logoen) på et lerret
function makeFaceTextures() {
  const S = 1024;
  const c = S / 2;
  const R = S * 0.49;

  const draw = (glowOnly: boolean) => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = S;
    const g = cv.getContext("2d")!;
    g.fillStyle = glowOnly ? "#000" : "#120808";
    g.fillRect(0, 0, S, S);

    if (!glowOnly) {
      // svak treverk-struktur (radielle sprekker og støy)
      for (let i = 0; i < 260; i++) {
        const a = Math.random() * Math.PI * 2;
        const r0 = Math.random() * R * 0.2;
        const r1 = R * (0.5 + Math.random() * 0.45);
        g.strokeStyle = `rgba(255,${80 + Math.random() * 60},60,${0.015 + Math.random() * 0.03})`;
        g.lineWidth = 1 + Math.random() * 2;
        g.beginPath();
        g.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
        g.lineTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
        g.stroke();
      }
      for (let i = 0; i < 9000; i++) {
        g.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`;
        g.fillRect(Math.random() * S, Math.random() * S, 2, 2);
      }
    }

    g.strokeStyle = RED;
    g.lineJoin = "round";
    g.lineWidth = R * 0.045;
    for (const ring of ringPoints(c, c, R, 8)) {
      g.beginPath();
      ring.points.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
      g.closePath();
      g.stroke();
    }
    g.lineWidth = R * 0.09;
    g.beginPath();
    g.arc(c, c, R * 0.955, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = RED;
    g.beginPath();
    g.arc(c - 0.08 * R, c + 0.05 * R, R * 0.05, 0, Math.PI * 2);
    g.fill();

    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  };
  return { map: draw(false), glow: draw(true) };
}

// Bark rundt kanten: mørk, ru, med røde glør
function makeBarkTexture() {
  const W = 1024;
  const H = 128;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const g = cv.getContext("2d")!;
  g.fillStyle = "#1a0b09";
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * W;
    const w = 2 + Math.random() * 10;
    const l = 20 + Math.random() * 40;
    g.fillStyle = `hsl(${4 + Math.random() * 14},${30 + Math.random() * 40}%,${3 + Math.random() * 12}%)`;
    g.fillRect(x, 0, w, H);
    if (Math.random() < 0.08) {
      g.fillStyle = `rgba(224,32,26,${0.2 + Math.random() * 0.4})`;
      g.fillRect(x, Math.random() * H, 2, l);
    }
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  return tex;
}

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
  const disc = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const loaded = useLoaded();
  const intro = useRef(0);
  const { viewport } = useThree();

  const { mats, haloTex } = useMemo(() => {
    const face = makeFaceTextures();
    const bark = makeBarkTexture();
    const faceMat = new THREE.MeshStandardMaterial({
      map: face.map,
      emissiveMap: face.glow,
      emissive: new THREE.Color(RED),
      emissiveIntensity: 0.55,
      roughness: 0.55,
      metalness: 0.15,
    });
    const sideMat = new THREE.MeshStandardMaterial({
      map: bark,
      roughness: 0.95,
      metalness: 0.05,
      bumpMap: bark,
      bumpScale: 3,
    });
    const hc = document.createElement("canvas");
    hc.width = hc.height = 256;
    const hg = hc.getContext("2d")!;
    const grad = hg.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(224,32,26,0.85)");
    grad.addColorStop(0.35, "rgba(224,32,26,0.25)");
    grad.addColorStop(1, "rgba(224,32,26,0)");
    hg.fillStyle = grad;
    hg.fillRect(0, 0, 256, 256);
    return { mats: [sideMat, faceMat, faceMat], haloTex: new THREE.CanvasTexture(hc) };
  }, []);

  // Smale skjermer (mobil): mindre skive, midtstilt og lenger ned, så den ikke dekker teksten
  const small = viewport.width < 6;
  const smallScale = THREE.MathUtils.clamp(viewport.width * 0.29, 0.5, 0.95);

  // Skiven er bare bakgrunn: den snurrer rolig av seg selv og reagerer ikke på mus eller scrolling
  useFrame((state, dt) => {
    if (!group.current || !disc.current) return;
    const t = state.clock.elapsedTime;
    intro.current = THREE.MathUtils.damp(intro.current, loaded ? 1 : 0, 1.6, dt);
    const k = intro.current;

    const baseScale = (small ? smallScale : 1.1) * (0.2 + 0.8 * k);
    group.current.scale.setScalar(baseScale);
    group.current.position.set(small ? 0 : 1.5, (small ? -0.2 * viewport.height : 0) + Math.sin(t * 0.5) * 0.06, 0);

    group.current.rotation.x = 0.25 + Math.sin(t * 0.3) * 0.05;
    group.current.rotation.y = t * 0.18 + (1 - k) * 4;
    group.current.rotation.z = Math.sin(t * 0.25) * 0.06;

    // Røde glør pulserer svakt
    const fm = mats[1] as THREE.MeshStandardMaterial;
    fm.emissiveIntensity = 0.4 + Math.sin(t * 1.2) * 0.1;

    if (halo.current) {
      halo.current.position.copy(group.current.position).add(new THREE.Vector3(0, 0, -1.2));
      halo.current.scale.setScalar((3.6 + Math.sin(t * 0.8) * 0.15) * k * (small ? smallScale : 1.1));
    }
  });

  return (
    <>
      <mesh ref={halo}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={haloTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <group ref={group}>
        <mesh ref={disc} rotation={[Math.PI / 2, 0, 0]} material={mats}>
          <cylinderGeometry args={[1.5, 1.5, 0.32, 160, 1]} />
        </mesh>
        <Granules />
      </group>
    </>
  );
}

// Biokull-korn som svever i bane rundt skiven
function Granules({ count = 260 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    return Array.from({ length: count }, () => ({
      r: 1.9 + rnd() * 1.6,
      a: rnd() * Math.PI * 2,
      y: (rnd() - 0.5) * 1.2,
      speed: 0.08 + rnd() * 0.25,
      size: 0.02 + Math.pow(rnd(), 3) * 0.08,
      spin: rnd() * 3,
      red: rnd() < 0.18,
    }));
  }, [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!mesh.current) return;
    const c = new THREE.Color();
    data.forEach((d, i) => {
      c.set(d.red ? RED : "#2a1512");
      mesh.current!.setColorAt(i, c);
    });
    mesh.current.instanceColor!.needsUpdate = true;
  }, [data]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      const a = d.a + t * d.speed;
      dummy.position.set(Math.cos(a) * d.r, d.y + Math.sin(t * 0.7 + i) * 0.08, Math.sin(a) * d.r * 0.55);
      dummy.rotation.set(t * d.spin, t * d.spin * 0.7, 0);
      dummy.scale.setScalar(d.size);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0.8} metalness={0.1} emissive={RED} emissiveIntensity={0.08} />
    </instancedMesh>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Vises hvis nettleseren ikke støtter 3D: logoen som snurrer sakte
function Fallback() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/sitka-ikon.svg"
      alt=""
      className="absolute left-1/2 top-[60%] w-[70vmin] max-w-[560px] -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] md:left-[70%] md:top-1/2"
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
    <div ref={wrap} className="pointer-events-none absolute inset-0 opacity-90">
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
            <ambientLight intensity={0.5} />
            <directionalLight position={[-4, 5, 6]} intensity={2.4} color="#fff3ec" />
            <pointLight position={[3, -2, -2]} intensity={40} color={RED} />
            <pointLight position={[-3, 2, 3]} intensity={8} color="#ffd9cc" />
            <Disc />
          </Canvas>
        </Boundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
