import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Sunset,
  Camera, 
  Eye, 
  Layers, 
  Maximize2, 
  MapPin, 
  Play, 
  Pause, 
  Compass, 
  Sparkles,
  Info,
  CheckCircle2,
  Building2,
  Shield,
  Flag
} from 'lucide-react';

// =======================================================================
// TEXTURE GENERATION UTILITIES (Ultra-crisp procedural canvas textures)
// =======================================================================

// 1. Exact Front Facade Signboard ("R.V.R. & J.C. COLLEGE OF ENGINEERING")
function createMainSignboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Deep terracotta / maroon background (matching photo)
  ctx.fillStyle = '#8B2626';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top & bottom golden accent borders
  ctx.fillStyle = '#D4AF37';
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, canvas.height - 8, canvas.width, 8);

  // Main bold title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 96px "Arial Black", "Impact", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 8;
  ctx.fillText('R.V.R. & J.C. COLLEGE OF ENGINEERING', canvas.width / 2, 110);

  // Subtitle
  ctx.fillStyle = '#FFE500';
  ctx.font = 'bold 36px "Arial", sans-serif';
  ctx.shadowBlur = 4;
  ctx.fillText('(AUTONOMOUS)  •  NAAC "A" GRADE  •  ESTD 1985', canvas.width / 2, 185);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

// 2. Rooftop Central Crest Signboard ("RVR & JC" / "COLLEGE OF ENGINEERING")
function createRooftopCrestTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // White base
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Red bold header "R V R & J C"
  ctx.fillStyle = '#C8232C';
  ctx.font = 'bold 150px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('R V R & J C', canvas.width / 2, 160);

  // Navy blue plate
  ctx.fillStyle = '#1D3B7A';
  ctx.fillRect(40, 290, canvas.width - 80, 160);

  // White text inside blue plate
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 74px "Arial Black", sans-serif';
  ctx.fillText('COLLEGE OF ENGINEERING', canvas.width / 2, 375);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

// 3. Indian National Tricolor Flag Texture with Ashoka Chakra
function createIndianFlagTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // Saffron (Top)
  ctx.fillStyle = '#FF9933';
  ctx.fillRect(0, 0, 600, 133);

  // White (Middle)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 133, 600, 134);

  // Green (Bottom)
  ctx.fillStyle = '#138808';
  ctx.fillRect(0, 267, 600, 133);

  // Ashoka Chakra (Navy Blue 24-spoke wheel in center)
  const cx = 300;
  const cy = 200;
  const r = 50;

  ctx.strokeStyle = '#000080';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#000080';
  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 24; i++) {
    const angle = (i * Math.PI * 2) / 24;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

// 4. Side Wing Motto Banners
function createMottoBannerTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1E3A5F';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

// 5. Procedural Window Grid Texture
function createWindowGridTexture(cols = 8, rows = 3) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm ochre/cream wall background
  ctx.fillStyle = '#E8D8BA';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const padX = 24;
  const padY = 24;
  const slotW = (canvas.width - padX * 2) / cols;
  const slotH = (canvas.height - padY * 2) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = padX + c * slotW + 12;
      const y = padY + r * slotH + 12;
      const w = slotW - 24;
      const h = slotH - 24;

      // Dark window frame
      ctx.fillStyle = '#222933';
      ctx.fillRect(x, y, w, h);

      // Glass pane
      ctx.fillStyle = '#37475A';
      ctx.fillRect(x + 3, y + 3, w - 6, h - 6);

      // Glass highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.moveTo(x + 3, y + 3);
      ctx.lineTo(x + w / 2, y + 3);
      ctx.lineTo(x + 3, y + h / 2);
      ctx.closePath();
      ctx.fill();

      // Window sill
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x - 2, y + h, w + 4, 6);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

export default function ThreeCampusViewer({ selectedBlockId, onSelectBlock }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // References for animation
  const flagMeshRef = useRef(null);
  const toyCarRef = useRef(null);
  const wheelsRef = useRef([]);
  const carPathCurveRef = useRef(null);
  const interactablesRef = useRef([]);
  const labelsGroupRef = useRef(null);
  const sunLightRef = useRef(null);
  const hemiLightRef = useRef(null);

  // UI state
  const [activePreset, setActivePreset] = useState('toy-world'); // 'toy-world' | 'facade' | 'aerial' | 'digital' | 'cyber' | 'oat' | 'sports'
  const [lightingMode, setLightingMode] = useState('sunset'); // 'day' | 'sunset' | 'night'
  const [showLabels, setShowLabels] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [hoveredVenue, setHoveredVenue] = useState(null);

  // -------------------------------------------------------------
  // INITIALIZE THREE.JS ARCHITECTURAL SCENE
  // -------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xD2E0E8);
    scene.fog = new THREE.FogExp2(0xD2E0E8, 0.0028);
    sceneRef.current = scene;

    // 2. Camera - Initially set to FRONT FACADE CLONE angle (matching the user's photo!)
    const camera = new THREE.PerspectiveCamera(38, width / height, 1, 1200);
    // Positioned straight in front of Main Block portico at a dignified architectural angle
    camera.position.set(0, 18, 92);
    cameraRef.current = camera;

    // 3. Renderer with soft PCF shadow maps & ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera dipping below ground
    controls.minDistance = 15;
    controls.maxDistance = 260;
    controls.target.set(0, 14, 0); // Focus on the portico center
    controlsRef.current = controls;

    // 5. Architectural Lighting
    const hemiLight = new THREE.HemisphereLight(0xfffaed, 0x8a9985, 0.85);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const sunLight = new THREE.DirectionalLight(0xfff1dc, 1.4);
    sunLight.position.set(65, 110, 85);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 300;
    const d = 110;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const interactables = [];
    interactablesRef.current = interactables;

    // Floating 3D Text Labels Group
    const labelsGroup = new THREE.Group();
    scene.add(labelsGroup);
    labelsGroupRef.current = labelsGroup;

    // Helper: Add Floating Architectural Badge Label above a building
    const addBuildingLabel = (x, y, z, title, code, blockId) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');

      // Rounded badge card
      ctx.fillStyle = 'rgba(18, 18, 18, 0.92)';
      ctx.strokeStyle = '#CCFF00';
      ctx.lineWidth = 8;
      
      const r = 24;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(canvas.width - r, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
      ctx.lineTo(canvas.width, canvas.height - r);
      ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
      ctx.lineTo(r, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Title & Code text
      ctx.fillStyle = '#CCFF00';
      ctx.font = 'bold 36px "Courier New", monospace';
      ctx.fillText(code, 32, 54);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px "Arial", sans-serif';
      ctx.fillText(title, 32, 115);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(x, y, z);
      sprite.scale.set(16, 5, 1);
      sprite.userData = { id: blockId, name: title };
      labelsGroup.add(sprite);
    };

    // -------------------------------------------------------------
    // 6. GROUND SITE & GRAND ASPHALT FORECOURT (RVR&JC Campus Grounds)
    // -------------------------------------------------------------
    const groundGeo = new THREE.BoxGeometry(280, 2, 220);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x8DA988,
      roughness: 0.9,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grand Arrival Forecourt (Spacious asphalt square seen in front of the photo)
    const forecourtGeo = new THREE.PlaneGeometry(120, 70);
    const forecourtMat = new THREE.MeshStandardMaterial({
      color: 0x3A3E44, // dark asphalt from photo
      roughness: 0.85,
      metalness: 0.1
    });
    const forecourt = new THREE.Mesh(forecourtGeo, forecourtMat);
    forecourt.rotation.x = -Math.PI / 2;
    forecourt.position.set(0, 0.05, 36);
    forecourt.receiveShadow = true;
    scene.add(forecourt);

    // White parking bay stripes on the sides of the forecourt
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xEEEEEE });
    for (let i = -45; i <= -20; i += 5) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 7), stripeMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(i, 0.07, 45);
      scene.add(stripe);
    }
    for (let i = 20; i <= 45; i += 5) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 7), stripeMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(i, 0.07, 45);
      scene.add(stripe);
    }

    // Main Avenue Road running south from the forecourt toward the Main Gate
    const mainAvenue = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 90),
      new THREE.MeshStandardMaterial({ color: 0x3A3E44, roughness: 0.85 })
    );
    mainAvenue.rotation.x = -Math.PI / 2;
    mainAvenue.position.set(0, 0.04, 95);
    mainAvenue.receiveShadow = true;
    scene.add(mainAvenue);

    // Dashed white centerline on main avenue
    for (let z = 75; z <= 135; z += 6) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 3.5), stripeMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.07, z);
      scene.add(dash);
    }

    // East-West connector road behind the main block
    const northConnector = new THREE.Mesh(
      new THREE.PlaneGeometry(240, 12),
      new THREE.MeshStandardMaterial({ color: 0x42464D, roughness: 0.85 })
    );
    northConnector.rotation.x = -Math.PI / 2;
    northConnector.position.set(0, 0.03, -28);
    northConnector.receiveShadow = true;
    scene.add(northConnector);

    // =======================================================================
    // 7. THE MAIN ADMINISTRATIVE BLOCK (EXACT CLONE OF USER'S PHOTO!)
    // =======================================================================
    const mainBlockGroup = new THREE.Group();
    mainBlockGroup.position.set(0, 0, 0);
    mainBlockGroup.name = 'main-block';
    mainBlockGroup.userData = {
      id: 'main-block',
      name: 'Main Administrative Block (Sri Yarlagadda Block)',
      category: 'Campus Administrative Headquarters & EEE Wing',
      desc: 'The iconic flagship building with grand white entrance colonnade, maroon title fascia, upper academic floors, rooftop crest, and proud national tricolor flag.'
    };

    // A. Elevated Stone Plinth (Entrance Base from photo)
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xD6CDC0, roughness: 0.8 });
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(86, 1.2, 28), plinthMat);
    plinth.position.set(0, 0.6, 0);
    plinth.receiveShadow = true;
    mainBlockGroup.add(plinth);

    // Front access steps leading from asphalt up to plinth
    const stepsMat = new THREE.MeshStandardMaterial({ color: 0xBFB6A8, roughness: 0.8 });
    const steps = new THREE.Mesh(new THREE.BoxGeometry(32, 0.6, 3), stepsMat);
    steps.position.set(0, 0.3, 15);
    mainBlockGroup.add(steps);

    // B. Potted Green Plants along Plinth edge (prominent detail in photo!)
    const potMat = new THREE.MeshStandardMaterial({ color: 0x8C452A, roughness: 0.8 });
    const plantMat = new THREE.MeshStandardMaterial({ color: 0x2A6B22, roughness: 0.7 });
    for (let px = -38; px <= 38; px += 2.2) {
      if (Math.abs(px) < 1.5) continue; // leave center entrance clear
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 0.7, 8), potMat);
      pot.position.set(px, 1.55, 13.5);
      const bush = new THREE.Mesh(new THREE.SphereGeometry(0.65, 8, 6), plantMat);
      bush.position.set(px, 2.1, 13.5);
      bush.scale.set(1.2, 0.85, 1.2);
      mainBlockGroup.add(pot, bush);
    }

    // C. Ground Floor White Colonnade (8 grand pillars across the front portico)
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xFDFDFD,
      roughness: 0.3,
      metalness: 0.05
    });
    const pillarGeo = new THREE.BoxGeometry(1.6, 9.5, 1.6);
    const pillarXPositions = [-34, -24, -14, -4.5, 4.5, 14, 24, 34];

    pillarXPositions.forEach((x) => {
      const col = new THREE.Mesh(pillarGeo, pillarMat);
      col.position.set(x, 5.95, 13.2);
      col.castShadow = true;
      col.receiveShadow = true;
      mainBlockGroup.add(col);
    });

    // Side walkway canopies with cream pyramid roofs (visible on left and right in photo)
    const canopyRoofMat = new THREE.MeshStandardMaterial({ color: 0xDECEBA, roughness: 0.6 });
    [-24, 24].forEach((cx) => {
      const canopyRoof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 2.8, 4), canopyRoofMat);
      canopyRoof.position.set(cx, 11.2, 13.2);
      canopyRoof.rotation.y = Math.PI / 4;
      canopyRoof.castShadow = true;
      mainBlockGroup.add(canopyRoof);
    });

    // Left and Right Motto Banners under side canopies (from photo!)
    const leftMottoMat = new THREE.MeshBasicMaterial({ map: createMottoBannerTexture('A PASSPORT TO FREEDOM.') });
    const leftBanner = new THREE.Mesh(new THREE.PlaneGeometry(12, 1.8), leftMottoMat);
    leftBanner.position.set(-27, 8.8, 14.1);
    mainBlockGroup.add(leftBanner);

    const rightMottoMat = new THREE.MeshBasicMaterial({ map: createMottoBannerTexture('KNOWLEDGE EMPOWERS EXCELLENCE') });
    const rightBanner = new THREE.Mesh(new THREE.PlaneGeometry(12, 1.8), rightMottoMat);
    rightBanner.position.set(27, 8.8, 14.1);
    mainBlockGroup.add(rightBanner);

    // D. Ground Floor Recessed Entrance Lobby & Glass Doors
    const lobbyWallMat = new THREE.MeshStandardMaterial({ color: 0x3A3A3C, roughness: 0.7 });
    const lobbyWall = new THREE.Mesh(new THREE.BoxGeometry(78, 8.5, 4), lobbyWallMat);
    lobbyWall.position.set(0, 5.45, 9);
    mainBlockGroup.add(lobbyWall);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x1A222C,
      roughness: 0.1,
      metalness: 0.85
    });
    const centralGlass = new THREE.Mesh(new THREE.PlaneGeometry(18, 6.5), glassMat);
    centralGlass.position.set(0, 4.8, 11.1);
    mainBlockGroup.add(centralGlass);

    // E. THE MAIN MAROON FASCIA SIGNBOARD BEAM ("R.V.R. & J.C. COLLEGE OF ENGINEERING")
    const fasciaMat = new THREE.MeshStandardMaterial({
      map: createMainSignboardTexture(),
      roughness: 0.5,
      metalness: 0.1
    });
    const fasciaSignboard = new THREE.Mesh(new THREE.BoxGeometry(76, 3.2, 2.2), [
      new THREE.MeshStandardMaterial({ color: 0x8B2626 }), // right
      new THREE.MeshStandardMaterial({ color: 0x8B2626 }), // left
      new THREE.MeshStandardMaterial({ color: 0x8B2626 }), // top
      new THREE.MeshStandardMaterial({ color: 0x8B2626 }), // bottom
      fasciaMat, // front (displays the bold official college name)
      new THREE.MeshStandardMaterial({ color: 0x8B2626 }), // back
    ]);
    fasciaSignboard.position.set(0, 11.2, 13.5);
    fasciaSignboard.castShadow = true;
    mainBlockGroup.add(fasciaSignboard);

    // F. Upper Academic Floors (Floors 2, 3, 4 - Cream/Ochre Facade with Terracotta Framing)
    const upperWallMat = new THREE.MeshStandardMaterial({
      color: 0xE8DABF,
      roughness: 0.75,
      metalness: 0.05
    });
    const upperBlock = new THREE.Mesh(new THREE.BoxGeometry(84, 15, 20), upperWallMat);
    upperBlock.position.set(0, 19.5, 0);
    upperBlock.castShadow = true;
    upperBlock.receiveShadow = true;
    mainBlockGroup.add(upperBlock);

    // Apply Window Grid Texture to upper front facade
    const winTexture = createWindowGridTexture(14, 3);
    const winFrontMat = new THREE.MeshStandardMaterial({ map: winTexture, roughness: 0.5 });
    const winFront = new THREE.Mesh(new THREE.PlaneGeometry(82, 13.5), winFrontMat);
    winFront.position.set(0, 19.5, 10.1);
    mainBlockGroup.add(winFront);

    // Red/Terracotta Architectural Border Trim around windows (from photo)
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x963228, roughness: 0.6 });
    const topTrim = new THREE.Mesh(new THREE.BoxGeometry(84.4, 0.8, 20.4), trimMat);
    topTrim.position.set(0, 27, 0);
    mainBlockGroup.add(topTrim);

    const midTrim = new THREE.Mesh(new THREE.BoxGeometry(84.4, 0.6, 20.4), trimMat);
    midTrim.position.set(0, 21.8, 0);
    mainBlockGroup.add(midTrim);

    // G. Central Rooftop Crest Pediment & Sign ("RVR & JC / COLLEGE OF ENGINEERING")
    const crestMat = new THREE.MeshStandardMaterial({
      map: createRooftopCrestTexture(),
      roughness: 0.5
    });
    const crestBox = new THREE.Mesh(new THREE.BoxGeometry(18, 6.2, 1.8), [
      new THREE.MeshStandardMaterial({ color: 0xEEEEEE }),
      new THREE.MeshStandardMaterial({ color: 0xEEEEEE }),
      new THREE.MeshStandardMaterial({ color: 0xEEEEEE }),
      new THREE.MeshStandardMaterial({ color: 0xEEEEEE }),
      crestMat, // Front display
      new THREE.MeshStandardMaterial({ color: 0xEEEEEE }),
    ]);
    crestBox.position.set(0, 30.2, 8.5);
    crestBox.castShadow = true;
    mainBlockGroup.add(crestBox);

    // H. PROUD INDIAN NATIONAL FLAG (TRICOLOR) WAVING ATOP THE ROOF APEX!
    const flagPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.16, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xE0E0E0, metalness: 0.9, roughness: 0.2 })
    );
    flagPole.position.set(0, 39, 8.5);
    flagPole.castShadow = true;
    mainBlockGroup.add(flagPole);

    // Waving Cloth Geometry for the Indian Flag
    const flagGeo = new THREE.PlaneGeometry(6.4, 4.2, 16, 10);
    const flagMat = new THREE.MeshStandardMaterial({
      map: createIndianFlagTexture(),
      side: THREE.DoubleSide,
      roughness: 0.4
    });
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(3.2, 42.5, 8.5);
    flagMesh.castShadow = true;
    mainBlockGroup.add(flagMesh);
    flagMeshRef.current = flagMesh;

    scene.add(mainBlockGroup);
    interactables.push(mainBlockGroup);
    addBuildingLabel(0, 36, 0, 'Main Admin & EEE Block', 'ZONE A • MAIN', 'main-block');

    // =======================================================================
    // 8. CENTRAL LIBRARY BLOCK (West of Main Block)
    // =======================================================================
    const libraryGroup = new THREE.Group();
    libraryGroup.position.set(-68, 0, -5);
    libraryGroup.name = 'library';
    libraryGroup.userData = {
      id: 'library',
      name: 'Central Library Block',
      category: 'Knowledge Resource Hub & Digital Suites',
      desc: 'Three-story library block housing reference archives, DELNET digital suites, and reading lounges.'
    };

    const libBody = new THREE.Mesh(
      new THREE.BoxGeometry(38, 16, 26),
      new THREE.MeshStandardMaterial({ color: 0xD8CEBC, roughness: 0.7 })
    );
    libBody.position.y = 8;
    libBody.castShadow = true;
    libBody.receiveShadow = true;
    libraryGroup.add(libBody);

    // Glass frontage
    const libGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(34, 12),
      new THREE.MeshStandardMaterial({ color: 0x1E3B5C, metalness: 0.8, roughness: 0.2 })
    );
    libGlass.position.set(0, 8.5, 13.1);
    libraryGroup.add(libGlass);

    // Blue fascia sign: "CENTRAL LIBRARY"
    const libSign = new THREE.Mesh(
      new THREE.BoxGeometry(24, 2, 1),
      new THREE.MeshStandardMaterial({ color: 0x1A447A, roughness: 0.5 })
    );
    libSign.position.set(0, 15, 13.5);
    libraryGroup.add(libSign);

    scene.add(libraryGroup);
    interactables.push(libraryGroup);
    addBuildingLabel(-68, 22, -5, 'Central Library', 'LIB-01', 'library');

    // =======================================================================
    // 9. DIGITAL BLOCK (ECE) WITH ICONIC TERRACOTTA RED DOME & MAST
    // =======================================================================
    const digitalGroup = new THREE.Group();
    digitalGroup.position.set(65, 0, -8);
    digitalGroup.name = 'digital-block';
    digitalGroup.userData = {
      id: 'digital-block',
      name: 'Digital Block (ECE & Robotics)',
      category: 'Electronics & Communication Hub',
      desc: 'Distinguished by the monumental terracotta-red dome and towering telecommunications microwave antenna mast.'
    };

    const digBody = new THREE.Mesh(
      new THREE.BoxGeometry(42, 17, 26),
      new THREE.MeshStandardMaterial({ color: 0xE2D6C4, roughness: 0.75 })
    );
    digBody.position.y = 8.5;
    digBody.castShadow = true;
    digBody.receiveShadow = true;
    digitalGroup.add(digBody);

    // ICONIC ROOFTOP RED DOME (Terracotta Hemispherical Dome from photo)
    const domeGeo = new THREE.SphereGeometry(6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0xC43825, // rich terracotta red dome
      roughness: 0.45,
      metalness: 0.1
    });
    const redDome = new THREE.Mesh(domeGeo, domeMat);
    redDome.position.set(0, 17, 0);
    redDome.castShadow = true;
    digitalGroup.add(redDome);

    // Telecommunications Antenna Mast on top of dome
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.25, 14, 8),
      new THREE.MeshStandardMaterial({ color: 0xCCCCCC, metalness: 0.9 })
    );
    mast.position.set(0, 24, 0);
    digitalGroup.add(mast);

    // Microwave dish on mast
    const dish = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2.5),
      new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
    );
    dish.position.set(1.2, 26, 0);
    dish.rotation.z = Math.PI / 3;
    digitalGroup.add(dish);

    scene.add(digitalGroup);
    interactables.push(digitalGroup);
    addBuildingLabel(65, 26, -8, 'Digital Block (Red Dome)', 'ECE-DIGITAL', 'digital-block');

    // =======================================================================
    // 10. HI-TECH BLOCK (MCA & IT) WITH OCHRE PORTICO ARCH
    // =======================================================================
    const hitechGroup = new THREE.Group();
    hitechGroup.position.set(25, 0, -56);
    hitechGroup.name = 'hitech-block';
    hitechGroup.userData = {
      id: 'hitech-block',
      name: 'High-Tech Block (MCA & IT)',
      category: 'Software Engineering Labs',
      desc: 'Prominent computing block featuring the monumental ochre arched entrance portico boldly inscribed with "HI TECH BLOCK".'
    };

    const hitechBody = new THREE.Mesh(
      new THREE.BoxGeometry(48, 18, 24),
      new THREE.MeshStandardMaterial({ color: 0xDDD4C5, roughness: 0.75 })
    );
    hitechBody.position.y = 9;
    hitechBody.castShadow = true;
    hitechGroup.add(hitechBody);

    // Grand Ochre Portico Arch ("HI TECH BLOCK")
    const archMat = new THREE.MeshStandardMaterial({ color: 0xEAA232, roughness: 0.6 });
    const archL = new THREE.Mesh(new THREE.BoxGeometry(2.5, 9, 4), archMat);
    archL.position.set(-6, 4.5, 13);
    const archR = new THREE.Mesh(new THREE.BoxGeometry(2.5, 9, 4), archMat);
    archR.position.set(6, 4.5, 13);
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(15, 3, 4), archMat);
    archTop.position.set(0, 10.5, 13);
    hitechGroup.add(archL, archR, archTop);

    scene.add(hitechGroup);
    interactables.push(hitechGroup);
    addBuildingLabel(25, 24, -56, 'Hi-Tech Block', 'IT-MCA', 'hitech-block');

    // =======================================================================
    // 11. CYBER BLOCK (CSE & DATA SCIENCE) WITH FLORAL ROUNDABOUT
    // =======================================================================
    const cyberGroup = new THREE.Group();
    cyberGroup.position.set(78, 0, -58);
    cyberGroup.name = 'cyber-block';
    cyberGroup.userData = {
      id: 'cyber-block',
      name: 'Cyber Block (CSE, AI & Data Science)',
      category: 'Advanced Computing & Esports Hub',
      desc: 'Modern computing complex with pink entrance canopy and landscaped floral roundabout.'
    };

    const cyberBody = new THREE.Mesh(
      new THREE.BoxGeometry(44, 18, 26),
      new THREE.MeshStandardMaterial({ color: 0xDCD5CB, roughness: 0.8 })
    );
    cyberBody.position.y = 9;
    cyberBody.castShadow = true;
    cyberGroup.add(cyberBody);

    // Pink entrance portico canopy
    const pinkCanopy = new THREE.Mesh(
      new THREE.BoxGeometry(12, 1.8, 6),
      new THREE.MeshStandardMaterial({ color: 0xD94B76, roughness: 0.5 })
    );
    pinkCanopy.position.set(0, 6, 14);
    cyberGroup.add(pinkCanopy);

    // Floral Roundabout in front of Cyber Block
    const roundaboutMat = new THREE.MeshStandardMaterial({ color: 0x5C9450, roughness: 0.9 });
    const roundabout = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 0.8, 24), roundaboutMat);
    roundabout.position.set(0, 0.4, 26);
    cyberGroup.add(roundabout);

    const centralFlowerRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.5, 0.8, 8, 24),
      new THREE.MeshStandardMaterial({ color: 0xE84393, roughness: 0.8 })
    );
    centralFlowerRing.rotation.x = Math.PI / 2;
    centralFlowerRing.position.set(0, 0.9, 26);
    cyberGroup.add(centralFlowerRing);

    scene.add(cyberGroup);
    interactables.push(cyberGroup);
    addBuildingLabel(78, 24, -58, 'Cyber Block & Roundabout', 'CSE-AI', 'cyber-block');

    // =======================================================================
    // 12. OPEN AIR THEATRE (OAT AMPHITHEATER - DIRECTLY BEHIND MAIN BLOCK)
    // =======================================================================
    const oatGroup = new THREE.Group();
    oatGroup.position.set(-28, 0, -48);
    oatGroup.name = 'oat';
    oatGroup.userData = {
      id: 'oat',
      name: 'Open Air Theatre (OAT Amphitheater)',
      category: 'Flagship Cultural Amphitheater',
      desc: '3,500+ seat semicircular bowl with multi-tier stage, laser array trusses, and concert acoustics.'
    };

    // Tiered semicircular seating rings
    const oatTierMat = new THREE.MeshStandardMaterial({ color: 0xBFB7AA, roughness: 0.9 });
    for (let r = 1; r <= 4; r++) {
      const tier = new THREE.Mesh(
        new THREE.RingGeometry(r * 3.8, r * 3.8 + 2.5, 24, 1, 0, Math.PI),
        oatTierMat
      );
      tier.rotation.x = -Math.PI / 2;
      tier.rotation.z = Math.PI;
      tier.position.y = r * 0.7;
      oatGroup.add(tier);
    }

    // Elevated Stage Platform
    const stage = new THREE.Mesh(
      new THREE.BoxGeometry(22, 1.8, 12),
      new THREE.MeshStandardMaterial({ color: 0x2A2E35, roughness: 0.6 })
    );
    stage.position.set(0, 0.9, 4);
    oatGroup.add(stage);

    // Stage Lighting Truss Frame
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 });
    const trussTop = new THREE.Mesh(new THREE.BoxGeometry(20, 0.6, 0.6), trussMat);
    trussTop.position.set(0, 9, 8);
    const trussL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 9, 0.6), trussMat);
    trussL.position.set(-9.5, 4.5, 8);
    const trussR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 9, 0.6), trussMat);
    trussR.position.set(9.5, 4.5, 8);
    oatGroup.add(trussTop, trussL, trussR);

    scene.add(oatGroup);
    interactables.push(oatGroup);
    addBuildingLabel(-28, 15, -48, 'Open Air Theatre (OAT)', 'OAT-STAGE', 'oat');

    // =======================================================================
    // 13. ATHLETIC STADIUM & SPORTS ARENA (East Wing)
    // =======================================================================
    const stadiumGroup = new THREE.Group();
    stadiumGroup.position.set(100, 0, 36);
    stadiumGroup.name = 'sports-complex';
    stadiumGroup.userData = {
      id: 'sports-complex',
      name: 'Athletic Stadium & Sports Complex',
      category: 'Sports Arena & Athletic Ground',
      desc: '400m running track with cricket pitch, basketball courts, and indoor gym pavilions.'
    };

    // Red clay running track ring
    const trackShape = new THREE.Shape();
    trackShape.absellipse(0, 0, 24, 18, 0, Math.PI * 2, false, 0);
    const hole = new THREE.Path();
    hole.absellipse(0, 0, 19, 13, 0, Math.PI * 2, true, 0);
    trackShape.holes.push(hole);

    const trackMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(trackShape, 32),
      new THREE.MeshStandardMaterial({ color: 0xB5574A, roughness: 0.85, side: THREE.DoubleSide })
    );
    trackMesh.rotation.x = -Math.PI / 2;
    trackMesh.position.y = 0.06;
    stadiumGroup.add(trackMesh);

    // Inner green sports pitch
    const innerPitchShape = new THREE.Shape();
    innerPitchShape.absellipse(0, 0, 19, 13, 0, Math.PI * 2, false, 0);
    const innerPitchMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(innerPitchShape, 32),
      new THREE.MeshStandardMaterial({ color: 0x6DAA60, roughness: 0.9, side: THREE.DoubleSide })
    );
    innerPitchMesh.rotation.x = -Math.PI / 2;
    innerPitchMesh.position.y = 0.05;
    stadiumGroup.add(innerPitchMesh);

    // Covered Grandstand Pavilion
    const grandstand = new THREE.Mesh(
      new THREE.BoxGeometry(16, 4.5, 5),
      new THREE.MeshStandardMaterial({ color: 0xEDE8DC, roughness: 0.7 })
    );
    grandstand.position.set(0, 2.25, -21);
    stadiumGroup.add(grandstand);

    scene.add(stadiumGroup);
    interactables.push(stadiumGroup);
    addBuildingLabel(100, 16, 36, 'Sports Stadium & Courts', 'SPORTS', 'sports-complex');

    // =======================================================================
    // 14. MONUMENTAL MAIN ARCH GATE & CHECKPOINT (South Campus Boundary)
    // =======================================================================
    const mainGateGroup = new THREE.Group();
    mainGateGroup.position.set(0, 0, 128);
    mainGateGroup.name = 'main-gate';
    mainGateGroup.userData = {
      id: 'main-gate',
      name: 'Main Arch Gate & Highway Checkpoint',
      category: 'Campus Entry Portal',
      desc: 'The monumental entrance gateway on Guntur highway with security verification booths and visitor registration.'
    };

    const gateMat = new THREE.MeshStandardMaterial({ color: 0xE4D8C4, roughness: 0.6 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 12, 3.5), gateMat);
    p1.position.set(-8, 6, 0);
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 12, 3.5), gateMat);
    p2.position.set(8, 6, 0);
    const topArch = new THREE.Mesh(new THREE.BoxGeometry(22, 3.5, 4), gateMat);
    topArch.position.set(0, 13.5, 0);
    mainGateGroup.add(p1, p2, topArch);

    // Gate Signboard
    const gateSign = new THREE.Mesh(
      new THREE.BoxGeometry(16, 2, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x8C2626 })
    );
    gateSign.position.set(0, 13.5, 2.2);
    mainGateGroup.add(gateSign);

    scene.add(mainGateGroup);
    interactables.push(mainGateGroup);
    addBuildingLabel(0, 18, 128, 'Main Arch Gate', 'ENTRY', 'main-gate');

    // =======================================================================
    // 15. CAMPUS PALM TREES & LANDSCAPE SHRUBBERY
    // =======================================================================
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x544033, roughness: 0.9 });
    const palmMat = new THREE.MeshStandardMaterial({ color: 0x367A2E, roughness: 0.7 });

    const createCampusTree = (x, z) => {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 4, 8), trunkMat);
      trunk.position.y = 2;
      trunk.castShadow = true;
      tree.add(trunk);

      const crown = new THREE.Mesh(new THREE.ConeGeometry(2.8, 4.5, 8), palmMat);
      crown.position.y = 5.2;
      crown.castShadow = true;
      tree.add(crown);

      scene.add(tree);
    };

    // Trees lining Main Avenue (Left & Right)
    for (let z = 65; z <= 125; z += 12) {
      createCampusTree(-11, z);
      createCampusTree(11, z);
    }

    // Trees flanking the Forecourt
    createCampusTree(-55, 30);
    createCampusTree(-55, 45);
    createCampusTree(-55, 60);
    createCampusTree(55, 30);
    createCampusTree(55, 45);
    createCampusTree(55, 60);

    // =======================================================================
    // 15B. BRUNO SIMON TOY WORLD: ANIMATED MINIATURE CAR & FLUFFY TOY TREES
    // =======================================================================
    // Define closed loop road path for Bruno Simon Toy Car
    const roadPoints = [
      new THREE.Vector3(4, 0.6, 125),   // Main Gate Avenue South
      new THREE.Vector3(4, 0.6, 65),    // Approaching Main Block
      new THREE.Vector3(12, 0.6, 40),   // Turn toward East Forecourt
      new THREE.Vector3(42, 0.6, 38),   // East Forecourt Parking
      new THREE.Vector3(48, 0.6, 10),   // Turn North toward Hi-Tech
      new THREE.Vector3(30, 0.6, -26),  // East-West North Connector
      new THREE.Vector3(-10, 0.6, -26), // Passing Library & OAT
      new THREE.Vector3(-45, 0.6, -26), // Passing Silver Jubilee & Sports
      new THREE.Vector3(-45, 0.6, 15),  // West Loop Southbound
      new THREE.Vector3(-40, 0.6, 40),  // West Forecourt Parking
      new THREE.Vector3(-12, 0.6, 42),  // Merging back to Main Avenue
      new THREE.Vector3(-4, 0.6, 65),   // Avenue Southbound
      new THREE.Vector3(-4, 0.6, 125),  // Near Main Gate
      new THREE.Vector3(0, 0.6, 132),   // Gate turn-around
    ];
    const carPathCurve = new THREE.CatmullRomCurve3(roadPoints, true, 'centripetal', 0.2);
    carPathCurveRef.current = carPathCurve;

    // Build Bruno Simon Toy Car
    const carGroup = new THREE.Group();
    carGroup.name = 'toy-car';

    // Car Body - Cute rounded blue clay texture (matching generated toy world render)
    const carBodyMat = new THREE.MeshStandardMaterial({
      color: 0x2A75D3, // Vibrant Bruno Simon Blue
      roughness: 0.25,
      metalness: 0.1
    });
    const carBody = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.85, 1.4), carBodyMat);
    carBody.position.y = 0.55;
    carBody.castShadow = true;
    carGroup.add(carBody);

    // Car Cabin (white/cream with dark windows)
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0xF8F5EE, roughness: 0.3 });
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.75, 1.25), cabinMat);
    cabin.position.set(-0.2, 1.2, 0);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Dark glass front windshield
    const carGlassMat = new THREE.MeshBasicMaterial({ color: 0x1A2230 });
    const frontWindshield = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 1.15), carGlassMat);
    frontWindshield.rotation.y = Math.PI / 2;
    frontWindshield.position.set(0.56, 1.2, 0);
    carGroup.add(frontWindshield);

    // Headlights (glowing yellow dots)
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xFFFF55 });
    const hl1 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), headlightMat);
    hl1.position.set(1.31, 0.65, 0.45);
    const hl2 = hl1.clone();
    hl2.position.set(1.31, 0.65, -0.45);
    carGroup.add(hl1);
    carGroup.add(hl2);

    // Small headlight spot
    const carSpot = new THREE.SpotLight(0xFFFFAA, 2.5, 25, Math.PI / 5, 0.3);
    carSpot.position.set(1.3, 0.7, 0);
    carSpot.target.position.set(8, 0, 0);
    carGroup.add(carSpot);
    carGroup.add(carSpot.target);

    // Wheels
    const wheels = [];
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.28, 12);
    wheelGeo.rotateX(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.8 });
    const hubMat = new THREE.MeshBasicMaterial({ color: 0xDDDDDD });

    const wheelOffsets = [
      [-0.8, 0.35, 0.75],
      [-0.8, 0.35, -0.75],
      [0.8, 0.35, 0.75],
      [0.8, 0.35, -0.75]
    ];

    wheelOffsets.forEach(([ox, oy, oz]) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(ox, oy, oz);
      const wMesh = new THREE.Mesh(wheelGeo, wheelMat);
      wMesh.castShadow = true;
      wGroup.add(wMesh);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 8), hubMat);
      hub.rotateX(Math.PI / 2);
      wGroup.add(hub);
      carGroup.add(wGroup);
      wheels.push(wGroup);
    });

    wheelsRef.current = wheels;
    toyCarRef.current = carGroup;
    scene.add(carGroup);

    // Stylized Cute Fluffy Lollipop Trees (Toy World Aesthetic)
    const treeGroup = new THREE.Group();
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x6E4A35, roughness: 0.9 });
    const treeFoliageColors = [0x55A630, 0x2B9348, 0x80B918, 0xF4A261, 0xE76F51];

    const treePositions = [
      [15, 36], [22, 36], [32, 36], [42, 36],
      [-15, 36], [-22, 36], [-32, 36], [-42, 36],
      [12, 75], [12, 95], [12, 115],
      [-12, 75], [-12, 95], [-12, 115],
      [55, 10], [55, -15], [55, -35],
      [-55, 10], [-55, -15], [-55, -35],
      [10, -38], [-10, -38], [-30, -38],
    ];

    treePositions.forEach(([tx, tz], idx) => {
      const singleTree = new THREE.Group();
      singleTree.position.set(tx, 0, tz);

      // Trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 3.2, 8), treeTrunkMat);
      trunk.position.y = 1.6;
      trunk.castShadow = true;
      singleTree.add(trunk);

      // Fluffy round crown (smooth clay sphere)
      const foliageCol = treeFoliageColors[idx % treeFoliageColors.length];
      const foliageMat = new THREE.MeshStandardMaterial({
        color: foliageCol,
        roughness: 0.35,
        flatShading: true
      });
      const crown = new THREE.Mesh(new THREE.SphereGeometry(1.6 + (idx % 3) * 0.25, 12, 12), foliageMat);
      crown.position.y = 4.2;
      crown.castShadow = true;
      singleTree.add(crown);

      if (idx % 2 === 0) {
        const miniCrown = new THREE.Mesh(new THREE.SphereGeometry(1.0, 10, 10), foliageMat);
        miniCrown.position.set(0.6, 4.8, 0.4);
        singleTree.add(miniCrown);
      }

      treeGroup.add(singleTree);
    });
    scene.add(treeGroup);

    // -------------------------------------------------------------
    // 16. RAYCASTING & CLICK SELECTION
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactables, true);

      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== scene) {
          if (root.userData && root.userData.name) break;
          root = root.parent;
        }

        if (root && root.userData && root.userData.name) {
          setHoveredVenue(root.userData);
          container.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredVenue(null);
      container.style.cursor = 'default';
    };

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactables, true);

      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && root.parent !== scene) {
          if (root.userData && root.userData.id) break;
          root = root.parent;
        }

        if (root && root.userData && root.userData.id) {
          if (onSelectBlock) onSelectBlock(root.userData.id);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // -------------------------------------------------------------
    // 17. ANIMATION LOOP (Waving Tricolor Flag & Bruno Simon Car Patrol)
    // -------------------------------------------------------------
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Realistic cloth waving animation for the Indian Tricolor Flag
      if (flagMeshRef.current) {
        const pos = flagMeshRef.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const wave = Math.sin(t * 4.5 + u * 1.2) * 0.28 * (u / 6.4);
          pos.setZ(i, wave);
        }
        pos.needsUpdate = true;
      }

      // Animate Bruno Simon Toy Car along campus road
      if (carPathCurveRef.current && toyCarRef.current) {
        const loopDuration = 26; // 26 seconds per lap
        const progress = (t / loopDuration) % 1;
        const currentPos = carPathCurveRef.current.getPointAt(progress);
        const lookPos = carPathCurveRef.current.getPointAt((progress + 0.006) % 1);

        toyCarRef.current.position.copy(currentPos);
        toyCarRef.current.lookAt(lookPos);

        // Spin wheels proportional to driving movement
        wheelsRef.current.forEach(w => {
          w.rotation.x -= 0.35;
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 580;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        renderer.domElement.removeEventListener('click', onClick);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update labels visibility toggle
  useEffect(() => {
    if (labelsGroupRef.current) {
      labelsGroupRef.current.visible = showLabels;
    }
  }, [showLabels]);

  // Update auto-rotation
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
      controlsRef.current.autoRotateSpeed = 1.0;
    }
  }, [isAutoRotating]);

  // Lighting environment switcher
  useEffect(() => {
    const scene = sceneRef.current;
    const sunLight = sunLightRef.current;
    const hemiLight = hemiLightRef.current;
    if (!scene || !sunLight || !hemiLight) return;

    if (lightingMode === 'sunset') {
      // Golden hour sunset matching the warm skies in the user's photo
      scene.background.setHex(0xE0CDBA);
      if (scene.fog) scene.fog.color.setHex(0xE0CDBA);
      sunLight.color.setHex(0xFFB570);
      sunLight.intensity = 1.6;
      hemiLight.color.setHex(0xFFE5C4);
      hemiLight.groundColor.setHex(0x5E4C3E);
    } else if (lightingMode === 'day') {
      // Crisp midday sunlight
      scene.background.setHex(0xD2E0E8);
      if (scene.fog) scene.fog.color.setHex(0xD2E0E8);
      sunLight.color.setHex(0xFFF8E7);
      sunLight.intensity = 1.4;
      hemiLight.color.setHex(0xFFFFFF);
      hemiLight.groundColor.setHex(0x8A9985);
    } else if (lightingMode === 'night') {
      // Midnight festival glow
      scene.background.setHex(0x0C121E);
      if (scene.fog) scene.fog.color.setHex(0x0C121E);
      sunLight.color.setHex(0x4466AA);
      sunLight.intensity = 0.5;
      hemiLight.color.setHex(0x223355);
      hemiLight.groundColor.setHex(0x050A14);
    }
  }, [lightingMode]);

  // Camera presets
  const applyCameraPreset = (presetKey) => {
    setActivePreset(presetKey);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (presetKey === 'toy-world') {
      // THE BRUNO SIMON TOY WORLD ISOMETRIC MINIATURE VIEW
      camera.position.set(85, 78, 85);
      controls.target.set(0, 8, 12);
    } else if (presetKey === 'facade') {
      // EXACT FRONT VIEW MATCHING THE USER'S PHOTO!
      camera.position.set(0, 18, 92);
      controls.target.set(0, 14, 0);
    } else if (presetKey === 'aerial') {
      // Masterplan high-angle bird's eye view
      camera.position.set(0, 110, 160);
      controls.target.set(0, 8, 10);
    } else if (presetKey === 'digital') {
      // Close up of Digital Block with Red Dome
      camera.position.set(65, 34, 42);
      controls.target.set(65, 14, -8);
    } else if (presetKey === 'cyber') {
      // Close up of Cyber Block & Roundabout
      camera.position.set(78, 32, -15);
      controls.target.set(78, 12, -58);
    } else if (presetKey === 'oat') {
      // Focus on OAT Cultural Amphitheater
      camera.position.set(-28, 28, -12);
      controls.target.set(-28, 4, -48);
    } else if (presetKey === 'sports') {
      // Focus on Sports Stadium
      camera.position.set(100, 38, 90);
      controls.target.set(100, 4, 36);
    }
    controls.update();
  };

  const handleZoom = (dir) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const factor = dir === 'in' ? 0.8 : 1.25;
    camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);
    controls.update();
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[640px] rounded-3xl overflow-hidden brutal-border bg-[#D2E0E8] shadow-[6px_6px_0px_#121212] select-none">
      
      {/* 1. Main Three.js WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. Top Architectural Controls HUD */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-30">
        
        {/* Left: Building Presets */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md brutal-border-2 p-1.5 rounded-2xl shadow-[3px_3px_0px_#121212] pointer-events-auto">
          <span className="text-[10px] font-mono font-black text-[#121212] uppercase px-1.5 hidden sm:inline flex items-center gap-1">
            <Camera className="w-3 h-3 text-[#FF5A1F]" />
            Camera Angle:
          </span>

          <button
            onClick={() => applyCameraPreset('toy-world')}
            className={`px-3 py-1.5 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activePreset === 'toy-world'
                ? 'bg-[#CCFF00] text-[#121212] shadow-[2.5px_2.5px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-stone-700 hover:bg-[#CCFF00]'
            }`}
            title="Bruno Simon Toy World Isometric Miniature 3D View"
          >
            <span>🎮 Toy World (Bruno Simon)</span>
          </button>

          <button
            onClick={() => applyCameraPreset('facade')}
            className={`px-3 py-1.5 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer flex items-center gap-1 ${
              activePreset === 'facade'
                ? 'bg-[#FFE500] text-[#121212] shadow-[2.5px_2.5px_0px_#121212] -translate-y-0.5'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
            title="Exact Front View matching official RVR&JC facade photo"
          >
            <Flag className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Front Facade</span>
          </button>

          <button
            onClick={() => applyCameraPreset('aerial')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer ${
              activePreset === 'aerial'
                ? 'bg-[#FFE500] text-[#121212] shadow-[2.5px_2.5px_0px_#121212]'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            🗺️ Masterplan 3D
          </button>

          <button
            onClick={() => applyCameraPreset('digital')}
            className={`px-2 py-1.5 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer hidden md:flex ${
              activePreset === 'digital'
                ? 'bg-[#FF5A1F] text-white shadow-[2px_2px_0px_#121212]'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            🔴 Red Dome (ECE)
          </button>

          <button
            onClick={() => applyCameraPreset('cyber')}
            className={`px-2 py-1.5 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer hidden md:flex ${
              activePreset === 'cyber'
                ? 'bg-[#E8DEFF] text-[#121212] shadow-[2px_2px_0px_#121212]'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            🌸 Cyber Roundabout
          </button>

          <button
            onClick={() => applyCameraPreset('oat')}
            className={`px-2 py-1.5 rounded-xl text-xs font-display font-black brutal-border-2 transition-all cursor-pointer hidden lg:flex ${
              activePreset === 'oat'
                ? 'bg-[#FFDEEB] text-[#121212] shadow-[2px_2px_0px_#121212]'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            🎭 OAT Bowl
          </button>
        </div>

        {/* Right: Lighting Mode, Labels & Zoom */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md brutal-border-2 p-1.5 rounded-2xl shadow-[3px_3px_0px_#121212] pointer-events-auto">
          
          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-1 border-r border-stone-300 pr-1.5 mr-0.5">
            <button
              onClick={() => setLightingMode('sunset')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lightingMode === 'sunset' ? 'bg-[#FFE500] brutal-border-2 text-[#121212]' : 'text-stone-600 hover:bg-stone-100'
              }`}
              title="Warm Sunset Sky (matching photo)"
            >
              <Sunset className="w-3.5 h-3.5 text-orange-600" />
            </button>
            <button
              onClick={() => setLightingMode('day')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lightingMode === 'day' ? 'bg-[#CCFF00] brutal-border-2 text-[#121212]' : 'text-stone-600 hover:bg-stone-100'
              }`}
              title="Bright Daylight"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </button>
            <button
              onClick={() => setLightingMode('night')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lightingMode === 'night' ? 'bg-[#121212] text-white brutal-border-2' : 'text-stone-600 hover:bg-stone-100'
              }`}
              title="Night Fest Mode"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>

          {/* Toggle Labels */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2 py-1 rounded-xl brutal-border-2 text-xs font-mono font-bold transition-all cursor-pointer hidden sm:flex items-center gap-1 ${
              showLabels ? 'bg-[#CCFF00] text-[#121212]' : 'bg-white text-stone-500'
            }`}
            title="Toggle 3D Building Names"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Names</span>
          </button>

          {/* Auto Rotate Orbit */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-1.5 rounded-xl brutal-border-2 text-xs font-bold transition-all cursor-pointer ${
              isAutoRotating ? 'bg-[#CCFF00] text-[#121212]' : 'bg-white text-stone-700'
            }`}
            title={isAutoRotating ? 'Pause 360° Orbit' : 'Play 360° Orbit'}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Zoom controls */}
          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded-xl bg-white brutal-border-2 text-stone-800 hover:bg-[#FFE500] cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded-xl bg-white brutal-border-2 text-stone-800 hover:bg-[#FFE500] cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => applyCameraPreset('facade')}
            className="p-1.5 rounded-xl bg-white brutal-border-2 text-stone-800 hover:bg-[#CCFF00] cursor-pointer"
            title="Reset to Front Facade View"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 3. Floating Tooltip on Building Hover */}
      {hoveredVenue && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-[#121212] text-white px-4 py-2 rounded-2xl brutal-border shadow-[4px_4px_0px_#CCFF00] flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#CCFF00]" />
            <div>
              <div className="font-display font-black text-xs sm:text-sm text-white">
                {hoveredVenue.name}
              </div>
              <div className="text-[10px] font-mono text-[#CCFF00]">
                {hoveredVenue.category}
              </div>
            </div>
            <span className="bg-[#CCFF00] text-[#121212] text-[9px] font-mono font-bold px-2 py-0.5 rounded ml-1">
              Click to Inspect
            </span>
          </div>
        </div>
      )}

      {/* 4. Bottom Info Strip & Architectural Badges */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-30">
        
        {/* Navigation tips pill */}
        <div className="bg-white/95 backdrop-blur-md brutal-border-2 px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_#121212] pointer-events-auto flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#FF5A1F]" />
          <span className="text-[11px] font-mono font-bold text-stone-800 hidden sm:inline">
            🖱️ Drag to rotate 360° • Scroll to zoom • Right-click to pan • Click building to inspect
          </span>
          <span className="text-[10px] font-mono font-bold text-stone-800 sm:hidden">
            Touch & drag 360° • Click to view
          </span>
        </div>

        {/* Real Architectural Specs Pill */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md brutal-border-2 px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_#121212] pointer-events-auto text-[10px] font-mono font-bold">
          <span className="text-[#121212]">Digital Twin BIM:</span>
          <span className="bg-[#8B2626] text-white px-1.5 py-0.2 rounded font-black">
            RVR & JC College
          </span>
          <span className="hidden md:inline text-stone-500">• Autonomous • Estd 1985</span>
        </div>

      </div>

    </div>
  );
}
