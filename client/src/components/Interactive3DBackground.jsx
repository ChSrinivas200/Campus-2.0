import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Sparkles, Move } from 'lucide-react';

export default function Interactive3DBackground() {
  const containerRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isInteractiveHintVisible, setIsInteractiveHintVisible] = useState(true);

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const container = containerRef.current;
    let animationFrameId;

    // --- 1. Scene, Camera & WebGL Renderer ---
    const scene = new THREE.Scene();
    // Warm atmospheric fog that matches Colorido's warm bone canvas
    scene.fog = new THREE.FogExp2('#F8F5EE', 0.022);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // --- 2. Lighting Rig (Fest Stage Atmosphere) ---
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#CCFF00', 2.0); // Electric lime
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#FF5A1F', 1.8); // Vibrant orange
    fillLight.position.set(-10, -10, 10);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#00E5FF', 1.5); // Cyan stage backlight
    rimLight.position.set(0, 10, -10);
    scene.add(rimLight);

    // Dynamic cursor spotlight that follows mouse in 3D
    const cursorSpot = new THREE.PointLight('#CCFF00', 3, 15);
    cursorSpot.position.set(0, 0, 5);
    scene.add(cursorSpot);

    // --- 3. Interactive 3D Festival Objects ---
    const interactiveObjects = [];

    // Helper: Neo-brutalist material generator
    const createBrutalMaterial = (color, roughness = 0.3, metalness = 0.1) => {
      return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        flatShading: true
      });
    };

    // A. 3D Basketball (Sports Arena)
    const basketballGroup = new THREE.Group();
    const ballGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const ballMat = createBrutalMaterial('#FF5A1F', 0.4, 0.05);
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    basketballGroup.add(ballMesh);

    // Rib seams
    const seamMat = new THREE.MeshBasicMaterial({ color: '#121212', wireframe: true });
    const seamMesh = new THREE.Mesh(new THREE.SphereGeometry(1.21, 16, 16), seamMat);
    basketballGroup.add(seamMesh);

    basketballGroup.position.set(-6.5, 3.5, -2);
    scene.add(basketballGroup);
    interactiveObjects.push({
      group: basketballGroup,
      basePos: new THREE.Vector3(-6.5, 3.5, -2),
      rotSpeed: { x: 0.015, y: 0.02, z: 0.008 },
      bounceSpeed: 2.2,
      bounceAmp: 0.8
    });

    // B. 3D Championship Trophy (Winner Podium)
    const trophyGroup = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#FFE500',
      metalness: 0.85,
      roughness: 0.15,
      emissive: '#FF8800',
      emissiveIntensity: 0.15
    });

    // Cup bowl
    const cupBowl = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.5, 1.4, 16, 1, true), goldMat);
    cupBowl.position.y = 0.8;
    trophyGroup.add(cupBowl);

    // Cup stem
    const cupStem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 12), goldMat);
    cupStem.position.y = -0.2;
    trophyGroup.add(cupStem);

    // Cup base
    const baseMat = createBrutalMaterial('#121212', 0.2, 0.5);
    const cupBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 1.4), baseMat);
    cupBase.position.y = -0.7;
    trophyGroup.add(cupBase);

    // Star on top
    const starMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), goldMat);
    starMesh.position.y = 1.7;
    trophyGroup.add(starMesh);

    trophyGroup.position.set(6.8, 2.8, -1.5);
    scene.add(trophyGroup);
    interactiveObjects.push({
      group: trophyGroup,
      basePos: new THREE.Vector3(6.8, 2.8, -1.5),
      rotSpeed: { x: 0.005, y: 0.018, z: 0.003 },
      bounceSpeed: 1.8,
      bounceAmp: 0.5
    });

    // C. 3D Musical Quaver Notes (Battle of Bands & Choreoday)
    const createMusicNote = (x, y, z, color) => {
      const noteGroup = new THREE.Group();
      const noteMat = createBrutalMaterial(color, 0.2, 0.3);

      // Note head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 12), noteMat);
      head.scale.set(1.2, 0.8, 0.8);
      head.rotation.z = Math.PI / 6;
      noteGroup.add(head);

      // Stem
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.4, 8), noteMat);
      stem.position.set(0.4, 0.65, 0);
      noteGroup.add(stem);

      // Flag
      const flag = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.05), noteMat);
      flag.position.set(0.6, 1.3, 0);
      flag.rotation.z = -Math.PI / 8;
      noteGroup.add(flag);

      noteGroup.position.set(x, y, z);
      scene.add(noteGroup);
      return {
        group: noteGroup,
        basePos: new THREE.Vector3(x, y, z),
        rotSpeed: { x: 0.01, y: 0.025, z: 0.015 },
        bounceSpeed: 2.5,
        bounceAmp: 0.6
      };
    };

    interactiveObjects.push(createMusicNote(-7.2, -4.0, -1, '#CCFF00'));
    interactiveObjects.push(createMusicNote(7.5, -3.2, -2.5, '#FF5A1F'));

    // D. 3D Gaming Gem / D20 (Digital Club & Hackathons)
    const gemGroup = new THREE.Group();
    const gemGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: '#00E5FF',
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemGroup.add(gemMesh);

    // Glowing wireframe cage
    const wireMat = new THREE.MeshBasicMaterial({ color: '#CCFF00', wireframe: true });
    const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), wireMat);
    gemGroup.add(wireMesh);

    gemGroup.position.set(0, -6.5, -1);
    scene.add(gemGroup);
    interactiveObjects.push({
      group: gemGroup,
      basePos: new THREE.Vector3(0, -6.5, -1),
      rotSpeed: { x: 0.02, y: 0.025, z: 0.01 },
      bounceSpeed: 1.5,
      bounceAmp: 0.4
    });

    // E. 3D Floating Cyber Torus Ring
    const torusGroup = new THREE.Group();
    const torusGeo = new THREE.TorusGeometry(1.3, 0.28, 12, 32);
    const torusMat = createBrutalMaterial('#CCFF00', 0.25, 0.4);
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusGroup.add(torusMesh);
    torusGroup.position.set(-2.5, 6.0, -3.5);
    scene.add(torusGroup);
    interactiveObjects.push({
      group: torusGroup,
      basePos: new THREE.Vector3(-2.5, 6.0, -3.5),
      rotSpeed: { x: 0.02, y: 0.015, z: 0.02 },
      bounceSpeed: 1.4,
      bounceAmp: 0.5
    });

    // F. Ambient Floating Fest Confetti Particles & Confetti Ribbons
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorChoices = [
      new THREE.Color('#CCFF00'), // Lime
      new THREE.Color('#FF5A1F'), // Orange
      new THREE.Color('#00E5FF'), // Cyan
      new THREE.Color('#FFE500'), // Yellow
      new THREE.Color('#121212')  // Contrast Black
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circle particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, Math.PI * 2);
    ctx.fill();
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      alphaTest: 0.01
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // G. Click Burst Sparks Container
    const burstSparks = [];
    const createBurstAt = (x, y, z) => {
      const sparkCount = 30;
      const sparkGroup = new THREE.Group();

      for (let i = 0; i < sparkCount; i++) {
        const geom = new THREE.TetrahedronGeometry(0.12, 0);
        const col = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        const mat = new THREE.MeshBasicMaterial({ color: col });
        const mesh = new THREE.Mesh(geom, mat);

        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        );

        sparkGroup.add(mesh);
        burstSparks.push({
          mesh,
          group: sparkGroup,
          vel: velocity,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.03
        });
      }

      sparkGroup.position.set(x, y, z);
      scene.add(sparkGroup);
    };

    // --- 4. Cursor Tracking & Physics (Bruno Simon Damping) ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      worldX: 0,
      worldY: 0
    };

    const handleMouseMove = (e) => {
      // Normalized coordinates (-1 to +1)
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Project into approximate 3D world space coordinates
      mouse.worldX = mouse.targetX * 10;
      mouse.worldY = mouse.targetY * 6;

      // Hide hint after first intentional mouse exploration
      if (Math.abs(mouse.targetX) > 0.3 || Math.abs(mouse.targetY) > 0.3) {
        setIsInteractiveHintVisible(false);
      }
    };

    const handlePointerDown = (e) => {
      // Trigger festival spark explosion on click
      const rayX = ((e.clientX / window.innerWidth) * 2 - 1) * 8;
      const rayY = (-(e.clientY / window.innerHeight) * 2 + 1) * 5;
      createBurstAt(rayX, rayY, 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- 5. 60 FPS Render Loop with Smooth Spring Physics ---
    const clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth Bruno Simon Camera Lerp (Inertia Damping)
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      camera.position.x = mouse.x * 2.8;
      camera.position.y = mouse.y * 2.0;
      camera.lookAt(0, 0, 0);

      // Move 3D cursor spotlight
      cursorSpot.position.x = mouse.x * 12;
      cursorSpot.position.y = mouse.y * 8;

      // Animate Festival Objects with Rhythmic Floating & Cursor Repulsion
      interactiveObjects.forEach((item) => {
        // Natural rotation
        item.group.rotation.x += item.rotSpeed.x;
        item.group.rotation.y += item.rotSpeed.y;
        item.group.rotation.z += item.rotSpeed.z;

        // Harmonic bobbing (Music rhythm)
        const bounce = Math.sin(elapsedTime * item.bounceSpeed) * item.bounceAmp;
        
        // Cursor proximity elastic repulsion
        const dx = item.group.position.x - mouse.worldX;
        const dy = item.group.position.y - mouse.worldY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let repelX = 0;
        let repelY = 0;
        if (dist < 4.5 && dist > 0.01) {
          const force = (4.5 - dist) * 0.35;
          repelX = (dx / dist) * force;
          repelY = (dy / dist) * force;
        }

        // Apply smooth target positioning
        item.group.position.x = item.basePos.x + repelX;
        item.group.position.y = item.basePos.y + bounce + repelY;
      });

      // Slowly rotate confetti particles
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

      // Animate spark burst particles
      for (let i = burstSparks.length - 1; i >= 0; i--) {
        const s = burstSparks[i];
        s.life -= s.decay;
        s.mesh.position.addScaledVector(s.vel, 0.05);
        s.mesh.rotation.x += 0.1;
        s.mesh.rotation.y += 0.1;
        s.mesh.scale.setScalar(Math.max(0.001, s.life));

        if (s.life <= 0) {
          s.group.remove(s.mesh);
          burstSparks.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isEnabled]);

  return (
    <>
      {/* Fixed 3D WebGL Canvas Layer positioned behind all UI */}
      {isEnabled && (
        <div
          ref={containerRef}
          className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
          style={{
            zIndex: -1,
            contain: 'strict'
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating 3D Background Arena Controller Badge */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`px-3.5 py-2 rounded-2xl brutal-border font-display font-black text-xs flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#121212] transition-all hover:-translate-y-0.5 ${
            isEnabled
              ? 'bg-[#121212] text-[#CCFF00]'
              : 'bg-white text-stone-700'
          }`}
          title="Toggle interactive 3D festival background scene"
        >
          {isEnabled ? (
            <>
              <Eye className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>3D Arena Live ⚡</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>3D Arena Off</span>
            </>
          )}
        </button>

        {isEnabled && isInteractiveHintVisible && (
          <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm brutal-border text-[11px] font-mono font-bold text-[#121212] flex items-center gap-1.5 shadow-[2px_2px_0px_#121212] animate-pulse">
            <Move className="w-3 h-3 text-[#FF5A1F]" />
            <span>Move cursor to tilt 3D world • Click for sparks!</span>
          </div>
        )}
      </div>
    </>
  );
}
