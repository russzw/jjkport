import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function InnerBackground({ theme }: { theme: 'gojo' | 'sukuna' }) {
  const pointsRef1 = useRef<THREE.Points>(null!);
  const pointsRef2 = useRef<THREE.Points>(null!);
  const pointsRef3 = useRef<THREE.Points>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const cubesRef = useRef<THREE.Group>(null!);
  
  const colors = {
    sukuna: { primary: '#ff2d2d', secondary: '#c41e3a', accent: '#d4a017' },
    gojo: { primary: '#00d2ff', secondary: '#005bbb', accent: '#00b4d8' }
  };
  const activeColors = theme === 'sukuna' ? colors.sukuna : colors.gojo;

  const particles1 = useMemo(() => {
    const count = 2500; // Increased count
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    return pos;
  }, []);

  const particles2 = useMemo(() => {
    const count = theme === 'sukuna' ? 600 : 300; // Increased count
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 15;
    return pos;
  }, [theme]);

  const particles3 = useMemo(() => {
    const count = 800; // Increased count
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 25;
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Mouse movement
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;

    if (pointsRef1.current) {
      pointsRef1.current.rotation.y = t * 0.05;
      pointsRef1.current.rotation.x = t * 0.02;
    }
    
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y = theme === 'sukuna' ? t * 0.1 : -t * 0.05;
    }

    if (pointsRef3.current) {
      pointsRef3.current.rotation.x = t * 0.01;
      if (theme === 'sukuna') {
        const mat = pointsRef3.current.material as THREE.PointsMaterial;
        mat.opacity = 0.2 + Math.sin(t * 2) * 0.1;
      }
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.1;
      ringsRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }

    if (sphereRef.current && theme === 'gojo') {
      sphereRef.current.rotation.y = t * 0.2;
      sphereRef.current.rotation.z = t * 0.1;
    }

    if (cubesRef.current) {
      cubesRef.current.rotation.y = t * 0.1;
      cubesRef.current.children.forEach((child, i) => {
        child.rotation.x = t * (0.2 + i * 0.1);
        child.rotation.y = t * (0.3 + i * 0.05);
        child.position.y += Math.sin(t + i) * 0.002;
      });
    }
  });

  return (
    <>
      <ambientLight intensity={theme === 'sukuna' ? 0.3 : 0.8} />
      <pointLight position={[10, 10, 10]} intensity={theme === 'sukuna' ? 50 : 20} color={activeColors.primary} />
      <spotLight 
        position={[-10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={theme === 'sukuna' ? 100 : 40} 
        color={activeColors.secondary} 
      />
      
      {/* Cursed "Cubes" to fill the space */}
      <group ref={cubesRef}>
        {[...Array(6)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 1) * 5
            ]}
          >
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial 
              color={activeColors.primary} 
              transparent 
              opacity={0.3} 
              wireframe={i % 2 === 0}
            />
          </mesh>
        ))}
      </group>

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
          size={0.02}
          color={activeColors.primary}
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={theme === 'sukuna' ? THREE.AdditiveBlending : THREE.NormalBlending}
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
          size={theme === 'sukuna' ? 0.1 : 0.06}
          color={activeColors.secondary}
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Spatial Dust */}
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
          size={0.04}
          color={theme === 'sukuna' ? activeColors.accent : activeColors.primary}
          transparent
          opacity={0.2}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Spatial Rings */}
      <group ref={ringsRef}>
        {[0.5, 1, 1.5, 2, 2.5].map((scale, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + (theme === 'sukuna' ? i : 0), 0, i]}>
            <ringGeometry args={[2 + scale, 2.02 + (theme === 'sukuna' ? scale + 0.1 : scale), 64]} />
            <meshBasicMaterial 
              color={theme === 'sukuna' ? activeColors.secondary : activeColors.primary} 
              transparent 
              opacity={theme === 'sukuna' ? 0.1 - i * 0.02 : 0.05 - i * 0.01} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        ))}
      </group>

      {/* Infinite Void Sphere */}
      {theme === 'gojo' && (
        <mesh ref={sphereRef}>
          <sphereGeometry args={[12, 64, 64]} />
          <meshBasicMaterial color={activeColors.secondary} wireframe opacity={0.01} transparent />
        </mesh>
      )}

      {/* Malevolent Shrine Ambience */}
      {theme === 'sukuna' && (
        <fog attach="fog" args={['#080608', 2, 10]} />
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
