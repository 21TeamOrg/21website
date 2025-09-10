import React, {
  Suspense,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Object3D } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";

function LogoModel({ autoRotate }: { autoRotate: boolean }) {
  const { scene } = useGLTF("/images/3D/logo.gltf");
  const ref = useRef<Object3D>(null);
  // Default to facing camera
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(0, Math.PI, 0);
    }
  }, []);
  useFrame((_, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.25;
    }
  });
  return <primitive object={scene} ref={ref} />;
}

const Team21Logo3D: React.FC = () => {
  // Controls auto-rotation state
  const [autoRotate, setAutoRotate] = useState(true);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);
  const controlsRef = useRef<typeof OrbitControls | null>(null);

  // Pause auto-rotate on user interaction, resume after 3s idle
  const handleStart = useCallback(() => {
    setAutoRotate(false as unknown);
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
  }, []);
  const handleEnd = useCallback(() => {
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(
      () => setAutoRotate(true as unknown),
      3000
    );
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: "100%", height: "400px" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <LogoModel autoRotate={autoRotate} />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.3}
          scale={10}
          blur={2.5}
          far={2.5}
        />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </Canvas>
  );
};

export default Team21Logo3D;
