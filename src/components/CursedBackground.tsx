import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function InnerBackground({ theme }: { theme: 'gojo' | 'sukuna' }) {
  const pointsRef1 = useRef<THREE.Points>(null!);
  const pointsRef2 = useRef<THREE.Points>(null!);
  const pointsRef3 = useRef<THREE.Points>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  
  const colors = {
    sukuna: { primary: '#ff2d2d', secondary: '#c41e3a', accent: '#d4a017' },
    gojo: { primary: '#00d2ff', secondary: '#005bbb', accent: '#00b4d8' }
  };
  const activeColors = theme === 'sukuna' ? colors.sukuna : colors.gojo;

  const particles1 = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 15;
    return pos;
  }, []);

  const particles2 = useMemo(() => {
    const count = theme === 'sukuna' ? 400 : 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 15;
    return pos;
  }, [theme]);

  const particles3 = useMemo(() => {
    // Sukuna Ash / Gojo Spatial Dust
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    return pos;
  }, []);

  useFrame((state) => {
    const t = performance.now() * 0.0001;
    
    // Mouse movement
    const mouseX = state.mouse.x * 0.2;
    const mouseY = state.mouse.y * 0.2;

    if (pointsRef1.current) {
      pointsRef1.current.rotation.y = t * 1.2;
      pointsRef1.current.rotation.x = t * 0.5;
      pointsRef1.current.position.x = THREE.MathUtils.lerp(pointsRef1.current.position.x, mouseX, 0.05);
      pointsRef1.current.position.y = THREE.MathUtils.lerp(pointsRef1.current.position.y, mouseY, 0.05);
    }
    
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y = theme === 'sukuna' ? t * 1.5 : -t * 0.8;
      pointsRef2.current.position.x = THREE.MathUtils.lerp(pointsRef2.current.position.x, mouseX * 1.5, 0.05);
    }

    if (pointsRef3.current) {
      pointsRef3.current.rotation.x = t * 0.3;
      // Flickering effect for Sukuna Ash
      if (theme === 'sukuna') {
        const mat = pointsRef3.current.material as THREE.PointsMaterial;
        mat.opacity = 0.2 + Math.sin(t * 50) * 0.1;
      }
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 2;
    }

    if (sphereRef.current && theme === 'gojo') {
      sphereRef.current.rotation.y = t * 0.5;
      sphereRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={theme === 'sukuna' ? 0.5 : 1.5} />
      
      {/* Base Particles */}
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles1.length / 3}
            array={particles1}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color={activeColors.primary}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Secondary Fragments / Sukuna Slashes */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles2.length / 3}
            array={particles2}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={theme === 'sukuna' ? 0.08 : 0.05}
          color={theme === 'sukuna' ? activeColors.secondary : activeColors.secondary}
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          // Custom Sukuna Slash Texture look (simulated via point size/type)
        />
      </points>

      {/* Sukuna Ash / Gojo Spatial Dust */}
      <points ref={pointsRef3}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles3.length / 3}
            array={particles3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={theme === 'sukuna' ? activeColors.accent : activeColors.primary}
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Spatial Rings */}
      <group ref={ringsRef}>
        {[0.5, 1, 1.5, 2].map((scale, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + (theme === 'sukuna' ? i : 0), 0, i]}>
            <ringGeometry args={[2 + scale, 2.02 + (theme === 'sukuna' ? scale + 0.05 : scale), 64]} />
            <meshBasicMaterial 
              color={theme === 'sukuna' ? activeColors.secondary : activeColors.primary} 
              transparent 
              opacity={theme === 'sukuna' ? 0.15 - i * 0.03 : 0.1 - i * 0.02} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        ))}
      </group>

      {/* Infinite Void Sphere */}
      {theme === 'gojo' && (
        <mesh ref={sphereRef}>
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial color={activeColors.secondary} wireframe opacity={0.02} transparent />
        </mesh>
      )}

      {/* Malevolent Shrine Ambience */}
      {theme === 'sukuna' && (
        <fog attach="fog" args={['#080608', 5, 15]} />
      )}
    </>
  );
}

export default function CursedBackground({ theme }: { theme: 'gojo' | 'sukuna' }) {
  return (
    <div className="cursed-canvas">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={[theme === 'sukuna' ? '#080608' : '#f8faff']} />
        <InnerBackground theme={theme} />
      </Canvas>
    </div>
  );
}
