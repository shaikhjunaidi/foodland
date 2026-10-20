import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Layers, RotateCcw, Eye, ChevronDown, ChevronUp, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface ComponentInfo {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  dietaryNote: string;
}

const COMPONENT_DETAILS: Record<string, ComponentInfo> = {
  dosa: {
    id: 'dosa',
    name: 'Set Dosa',
    subtitle: 'Fermented Rice & Lentil Crepes',
    description: 'Light, soft fermented rice and lentil crepes served fresh with coconut chutney and vegetable saagu.',
    dietaryNote: '100% Vegetarian · No Eggs'
  },
  rice: {
    id: 'rice',
    name: 'Vegetable Fried Rice',
    subtitle: 'Basmati & Fresh Seasonal Vegetables',
    description: 'Steamed long-grain basmati rice cooked with fresh seasonal vegetables and aromatic seasonings.',
    dietaryNote: '100% Vegetarian · No Eggs'
  },
  chai: {
    id: 'chai',
    name: 'Freshly Brewed Chai',
    subtitle: 'Regular ₹15 · Special ₹30',
    description: 'Freshly brewed hot tea prepared with milk and aromatic spices, available in Regular (₹15) and Special (₹30).',
    dietaryNote: '100% Vegetarian · No Eggs'
  },
  jamun: {
    id: 'jamun',
    name: 'Gulab Jamun',
    subtitle: 'Traditional Sweet Confection',
    description: 'Classic sweet milk dumplings gently soaked in warm cardamom sugar nectar.',
    dietaryNote: '100% Vegetarian · No Eggs'
  },
  salad: {
    id: 'salad',
    name: 'Fresh Salad',
    subtitle: 'Fresh Cut Vegetables',
    description: 'A crisp, refreshing selection of freshly cut garden vegetables and greens.',
    dietaryNote: '100% Vegetarian · No Eggs'
  },
  juice: {
    id: 'juice',
    name: 'Fresh Fruit Juice',
    subtitle: 'Seasonal Fruit Juice',
    description: 'Freshly prepared seasonal fruit juice served chilled.',
    dietaryNote: '100% Vegetarian · No Eggs'
  },
  spices: {
    id: 'spices',
    name: 'Aromatic Spices',
    subtitle: 'Cardamom & Cinnamon Flavors',
    description: 'Traditional aromatic spices used to bring authentic flavor to our vegetarian delicacies.',
    dietaryNote: '100% Vegetarian · No Eggs'
  }
};

interface ExplodeSceneProps {
  externalScrollProgress?: number;
  onExplodeChange?: (progress: number) => void;
}

export const CulinaryExplodeScene: React.FC<ExplodeSceneProps> = ({
  externalScrollProgress,
  onExplodeChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [explodeValue, setExplodeValue] = useState<number>(0);
  const [selectedPart, setSelectedPart] = useState<ComponentInfo | null>(null);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [cameraView, setCameraView] = useState<'perspective' | 'top' | 'close' | 'macro'>('perspective');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  // Mutable animation references
  const targetExplodeRef = useRef<number>(0);
  const currentExplodeRef = useRef<number>(0);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 4.2, 7.5));
  const autoRotateRef = useRef<boolean>(true);
  const sceneElementsRef = useRef<{
    thaliGroup: THREE.Group;
    dosaGroup: THREE.Group;
    riceGroup: THREE.Group;
    chaiGroup: THREE.Group;
    jamunGroup: THREE.Group;
    saladGroup: THREE.Group;
    juiceGroup: THREE.Group;
    spicesGroup: THREE.Group;
    steamPoints: THREE.Points;
  } | null>(null);

  // Sync autoRotate state to ref
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Sync external scroll progress if provided
  useEffect(() => {
    if (externalScrollProgress !== undefined) {
      // Map scroll progress (0 to 1) to explode amount
      targetExplodeRef.current = Math.min(Math.max(externalScrollProgress, 0), 1);
      setExplodeValue(targetExplodeRef.current);
    }
  }, [externalScrollProgress]);

  // Update target camera position based on view mode
  const handleViewChange = (view: 'perspective' | 'top' | 'close' | 'macro') => {
    setCameraView(view);
    if (view === 'perspective') {
      targetCamPosRef.current.set(0, 4.2, 7.5);
    } else if (view === 'top') {
      targetCamPosRef.current.set(0, 9.5, 0.5);
    } else if (view === 'close') {
      targetCamPosRef.current.set(3.2, 2.8, 4.5);
    } else if (view === 'macro') {
      targetCamPosRef.current.set(-2.5, 2.0, 3.8);
    }
  };

  // Three.js Mount & Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      60
    );
    camera.position.copy(targetCamPosRef.current);
    camera.lookAt(0, 0.5, 0);

    // Studio Environment (Mandatory RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnvironment = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rig (3-Point Studio + Grounding)
    const keyLight = new THREE.DirectionalLight(0xffecd0, 2.4);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8fa8c0, 1.2);
    fillLight.position.set(-6, 5, -5);
    scene.add(fillLight);

    const warmRim = new THREE.DirectionalLight(0xd6a75d, 2.0);
    warmRim.position.set(0, 8, -8);
    scene.add(warmRim);

    const hemiLight = new THREE.HemisphereLight(0xfff3e0, 0x121216, 0.7);
    scene.add(hemiLight);

    // Soft Contact Shadow Plane directly beneath the thali
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.65
    });
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.02;
    scene.add(shadowPlane);

    // Master Assemblage Root
    const masterAssemblage = new THREE.Group();
    scene.add(masterAssemblage);

    // Materials Palette
    const hammeredGoldBrass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#D6A75D'),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.3,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95
    });

    const brushedSilver = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#DFE2E8'),
      metalness: 0.92,
      roughness: 0.28,
      clearcoat: 0.2
    });

    const darkCeramic = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1A191D'),
      roughness: 0.35,
      metalness: 0.15
    });

    // 1. Thali Base Platter Group
    const thaliGroup = new THREE.Group();
    const plateGeo = new THREE.CylinderGeometry(3.6, 3.4, 0.12, 64);
    const plateMesh = new THREE.Mesh(plateGeo, hammeredGoldBrass);
    plateMesh.receiveShadow = true;
    plateMesh.castShadow = true;
    thaliGroup.add(plateMesh);

    // Raised Decorative Rim
    const rimGeo = new THREE.TorusGeometry(3.52, 0.08, 16, 64);
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, hammeredGoldBrass);
    rimMesh.position.y = 0.08;
    thaliGroup.add(rimMesh);

    // Center Inner Concentric Ring
    const innerRingGeo = new THREE.TorusGeometry(1.6, 0.03, 16, 64);
    innerRingGeo.rotateX(Math.PI / 2);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, hammeredGoldBrass);
    innerRingMesh.position.y = 0.07;
    thaliGroup.add(innerRingMesh);

    masterAssemblage.add(thaliGroup);

    // 2. Set Dosa Group (Triple Layer Spongy Golden Crepes)
    const dosaGroup = new THREE.Group();
    dosaGroup.userData = { componentId: 'dosa', name: 'Set Dosa' };
    
    // Create authentic dosa batter procedural canvas
    const dosaCanvas = document.createElement('canvas');
    dosaCanvas.width = 512;
    dosaCanvas.height = 512;
    const dCtx = dosaCanvas.getContext('2d')!;
    dCtx.fillStyle = '#F5DEB3';
    dCtx.fillRect(0, 0, 512, 512);
    // Draw golden brown griddle roast spots
    for (let i = 0; i < 280; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 5 + 1;
      const alpha = Math.random() * 0.45 + 0.1;
      dCtx.fillStyle = `rgba(180, 105, 35, ${alpha})`;
      dCtx.beginPath();
      dCtx.arc(x, y, r, 0, Math.PI * 2);
      dCtx.fill();
    }
    // Subtle golden central ring
    const dGrad = dCtx.createRadialGradient(256, 256, 40, 256, 256, 220);
    dGrad.addColorStop(0, 'rgba(215, 140, 50, 0.25)');
    dGrad.addColorStop(0.7, 'rgba(180, 95, 20, 0.45)');
    dGrad.addColorStop(1, 'rgba(245, 222, 179, 0.1)');
    dCtx.fillStyle = dGrad;
    dCtx.fillRect(0, 0, 512, 512);

    const dosaTexture = new THREE.CanvasTexture(dosaCanvas);
    dosaTexture.colorSpace = THREE.SRGBColorSpace;

    const dosaMat = new THREE.MeshStandardMaterial({
      map: dosaTexture,
      roughness: 0.85,
      metalness: 0.05
    });

    // 3 stacked fluffy set dosas slightly offset
    for (let i = 0; i < 3; i++) {
      const dosaDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85 - i * 0.04, 0.88 - i * 0.04, 0.07, 32),
        dosaMat
      );
      dosaDisc.position.set(
        Math.cos(i * 1.8) * 0.08,
        0.1 + i * 0.075,
        Math.sin(i * 1.8) * 0.08
      );
      dosaDisc.rotation.y = i * 0.7;
      dosaDisc.castShadow = true;
      dosaDisc.receiveShadow = true;
      dosaGroup.add(dosaDisc);
    }
    // Butter dollop on top
    const butterGeo = new THREE.BoxGeometry(0.22, 0.1, 0.22);
    const butterMat = new THREE.MeshStandardMaterial({
      color: 0xfff0aa,
      roughness: 0.3,
      metalness: 0.05
    });
    const butterMesh = new THREE.Mesh(butterGeo, butterMat);
    butterMesh.position.set(0, 0.38, 0);
    butterMesh.rotation.y = 0.4;
    butterMesh.castShadow = true;
    dosaGroup.add(butterMesh);

    // Initial position on the plate: front-left
    dosaGroup.position.set(-1.4, 0.08, 0.8);
    masterAssemblage.add(dosaGroup);

    // 3. Basmati Fried Rice Group (Dome with emerald cilantro herbs)
    const riceGroup = new THREE.Group();
    riceGroup.userData = { componentId: 'rice', name: 'Fried Rice' };

    // Textured rice bowl mound
    const riceCanvas = document.createElement('canvas');
    riceCanvas.width = 256;
    riceCanvas.height = 256;
    const rCtx = riceCanvas.getContext('2d')!;
    rCtx.fillStyle = '#FAF0D7';
    rCtx.fillRect(0, 0, 256, 256);
    // Grains & carrot flecks
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * 256;
      const ry = Math.random() * 256;
      if (Math.random() > 0.6) {
        // carrot/green pea fleck
        rCtx.fillStyle = Math.random() > 0.5 ? '#E06D20' : '#4C8A36';
        rCtx.fillRect(rx, ry, 3, 3);
      } else {
        rCtx.fillStyle = 'rgba(180, 150, 110, 0.4)';
        rCtx.fillRect(rx, ry, 4, 1.5);
      }
    }
    const riceTex = new THREE.CanvasTexture(riceCanvas);
    riceTex.colorSpace = THREE.SRGBColorSpace;

    const riceMat = new THREE.MeshStandardMaterial({
      map: riceTex,
      roughness: 0.75,
      metalness: 0.02
    });

    const riceMound = new THREE.Mesh(
      new THREE.SphereGeometry(0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      riceMat
    );
    riceMound.castShadow = true;
    riceMound.receiveShadow = true;
    riceGroup.add(riceMound);

    // Fresh coriander herb leaves on top
    const leafGeo = new THREE.ConeGeometry(0.12, 0.28, 4);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2e7d32,
      roughness: 0.4
    });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(
        Math.cos(i * 1.3) * 0.18,
        0.95 + Math.sin(i * 0.8) * 0.05,
        Math.sin(i * 1.3) * 0.18
      );
      leaf.rotation.set(0.4, i * 1.2, 0.5);
      riceGroup.add(leaf);
    }

    // Rice katori bowl base
    const riceBowl = new THREE.Mesh(
      new THREE.CylinderGeometry(1.02, 0.85, 0.35, 32),
      hammeredGoldBrass
    );
    riceBowl.position.y = 0.16;
    riceGroup.add(riceBowl);

    riceGroup.position.set(0, 0.08, -1.2);
    masterAssemblage.add(riceGroup);

    // 4. Artisanal Chai & Davarah Tumbler Group
    const chaiGroup = new THREE.Group();
    chaiGroup.userData = { componentId: 'chai', name: 'Artisan Chai' };

    // Davarah base saucer (flanged bowl)
    const davarahSaucer = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.6, 0.38, 32),
      hammeredGoldBrass
    );
    davarahSaucer.position.y = 0.18;
    davarahSaucer.castShadow = true;
    chaiGroup.add(davarahSaucer);

    // Tumbler (ribbed brass cup)
    const tumbler = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.38, 0.85, 32),
      hammeredGoldBrass
    );
    tumbler.position.y = 0.58;
    tumbler.castShadow = true;
    chaiGroup.add(tumbler);

    // Chai liquid inside tumbler
    const chaiLiquid = new THREE.Mesh(
      new THREE.CircleGeometry(0.44, 32),
      new THREE.MeshStandardMaterial({
        color: 0xc48b48,
        roughness: 0.2,
        metalness: 0.1
      })
    );
    chaiLiquid.rotation.x = -Math.PI / 2;
    chaiLiquid.position.y = 0.98;
    chaiGroup.add(chaiLiquid);

    // Gentle rising steam particle system
    const steamParticleCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamVelocities: number[] = [];

    for (let i = 0; i < steamParticleCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.25;
      steamPositions[i * 3 + 1] = 1.0 + Math.random() * 0.8;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
      steamVelocities.push(0.006 + Math.random() * 0.008);
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xf3ede0,
      size: 0.06,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    chaiGroup.add(steamPoints);

    chaiGroup.position.set(1.5, 0.08, -0.6);
    masterAssemblage.add(chaiGroup);

    // 5. Shahi Gulab Jamun Katori Group
    const jamunGroup = new THREE.Group();
    jamunGroup.userData = { componentId: 'jamun', name: 'Shahi Gulab Jamun' };

    const jamunBowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.5, 0.35, 32),
      hammeredGoldBrass
    );
    jamunBowl.position.y = 0.18;
    jamunBowl.castShadow = true;
    jamunGroup.add(jamunBowl);

    // Rose & saffron sugar syrup pool
    const syrupPool = new THREE.Mesh(
      new THREE.CircleGeometry(0.68, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0xb57024,
        roughness: 0.08,
        metalness: 0.1,
        transmission: 0.4,
        thickness: 0.2
      })
    );
    syrupPool.rotation.x = -Math.PI / 2;
    syrupPool.position.y = 0.3;
    jamunGroup.add(syrupPool);

    // 2 Luscious warm caramelized Jamun spheres
    const jamunMat = new THREE.MeshPhysicalMaterial({
      color: 0x5a2307,
      roughness: 0.28,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1
    });

    const jamun1 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 32), jamunMat);
    jamun1.position.set(-0.16, 0.42, 0.05);
    jamun1.castShadow = true;
    jamunGroup.add(jamun1);

    const jamun2 = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), jamunMat);
    jamun2.position.set(0.18, 0.4, -0.05);
    jamun2.castShadow = true;
    jamunGroup.add(jamun2);

    // Edible Silver Leaf (Vark) highlight
    const varkMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.1
    });
    const vark1 = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.07), varkMat);
    vark1.position.set(-0.14, 0.65, 0.12);
    vark1.rotation.set(0.2, 0.3, 0.1);
    jamunGroup.add(vark1);

    jamunGroup.position.set(1.4, 0.08, 1.1);
    masterAssemblage.add(jamunGroup);

    // 6. Garden Harvest Salad Katori Group
    const saladGroup = new THREE.Group();
    saladGroup.userData = { componentId: 'salad', name: 'Garden Salad' };

    const saladBowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.55, 0.36, 32),
      hammeredGoldBrass
    );
    saladBowl.position.y = 0.18;
    saladBowl.castShadow = true;
    saladGroup.add(saladBowl);

    // Cucumber slices (translucent green discs)
    const cukeMat = new THREE.MeshStandardMaterial({
      color: 0x81c784,
      roughness: 0.3,
      metalness: 0.05
    });
    for (let i = 0; i < 4; i++) {
      const cuke = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 24), cukeMat);
      cuke.position.set(
        Math.cos(i * 1.5) * 0.22,
        0.32 + i * 0.04,
        Math.sin(i * 1.5) * 0.22
      );
      cuke.rotation.set(0.2, i * 0.8, 0.15);
      saladGroup.add(cuke);
    }

    // Tomato wedges (ruby red)
    const tomatoMat = new THREE.MeshStandardMaterial({
      color: 0xd32f2f,
      roughness: 0.35,
      metalness: 0.05
    });
    for (let i = 0; i < 3; i++) {
      const tomato = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.28), tomatoMat);
      tomato.position.set(
        Math.cos(i * 2.1 + 1) * 0.25,
        0.36 + i * 0.03,
        Math.sin(i * 2.1 + 1) * 0.25
      );
      tomato.rotation.set(0.3, i * 1.6, 0.2);
      saladGroup.add(tomato);
    }

    saladGroup.position.set(-1.6, 0.08, -0.7);
    masterAssemblage.add(saladGroup);

    // 7. Cold-Pressed Pure Fruit Juice (Fluted Crystal Glassware)
    const juiceGroup = new THREE.Group();
    juiceGroup.userData = { componentId: 'juice', name: 'Fruit Juice' };

    // Glass body
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      thickness: 0.8,
      clearcoat: 1.0
    });
    const glassMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.26, 1.1, 32, 1, true),
      glassMat
    );
    glassMesh.position.y = 0.58;
    glassMesh.castShadow = true;
    juiceGroup.add(glassMesh);

    // Glass Foot/Base
    const glassBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.34, 0.06, 32),
      glassMat
    );
    glassBase.position.y = 0.05;
    juiceGroup.add(glassBase);

    // Fresh citrus nectar liquid column
    const juiceLiquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xf57c00,
      transmission: 0.65,
      roughness: 0.15,
      thickness: 0.5
    });
    const juiceLiquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.25, 0.95, 32),
      juiceLiquidMat
    );
    juiceLiquid.position.y = 0.54;
    juiceGroup.add(juiceLiquid);

    // Lime wheel garnish perched on rim
    const limeMat = new THREE.MeshStandardMaterial({
      color: 0x9ccc65,
      roughness: 0.4
    });
    const limeWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24), limeMat);
    limeWheel.rotation.x = Math.PI / 2;
    limeWheel.position.set(0.35, 1.1, 0);
    juiceGroup.add(limeWheel);

    juiceGroup.position.set(0, 0.08, 1.7);
    masterAssemblage.add(juiceGroup);

    // 8. Levitating Spice Halo (Cardamom, Star Anise, Cinnamon Quills)
    const spicesGroup = new THREE.Group();
    spicesGroup.userData = { componentId: 'spices', name: 'Spice Halo' };

    // Star Anise (procedural 8-point flower)
    const aniseMat = new THREE.MeshStandardMaterial({
      color: 0x4e2715,
      roughness: 0.85
    });
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const aniseArm = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.36, 5), aniseMat);
      aniseArm.rotation.z = angle;
      spicesGroup.add(aniseArm);
    }

    // Cardamom pods (green ovals)
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x558b2f,
      roughness: 0.6
    });
    for (let i = 0; i < 6; i++) {
      const card = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), cardMat);
      card.scale.set(0.7, 1.6, 0.7);
      const theta = (i / 6) * Math.PI * 2;
      card.position.set(Math.cos(theta) * 2.2, 0.4 + (i % 2) * 0.2, Math.sin(theta) * 2.2);
      card.rotation.set(0.4, theta, 0.3);
      spicesGroup.add(card);
    }

    // Cinnamon quills
    const cinnMat = new THREE.MeshStandardMaterial({
      color: 0x795548,
      roughness: 0.9
    });
    const cinn1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.65, 16), cinnMat);
    cinn1.position.set(-1.8, 0.25, 1.4);
    cinn1.rotation.set(0.3, 0.6, 1.2);
    spicesGroup.add(cinn1);

    masterAssemblage.add(spicesGroup);

    // Save references for animation
    sceneElementsRef.current = {
      thaliGroup,
      dosaGroup,
      riceGroup,
      chaiGroup,
      jamunGroup,
      saladGroup,
      juiceGroup,
      spicesGroup,
      steamPoints
    };

    // Pre-allocated vectors for 0-GC loop
    const _targetPos = new THREE.Vector3();
    const _currentPos = new THREE.Vector3();

    // Raycaster for interactive component clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(masterAssemblage.children, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.componentId && obj !== masterAssemblage) {
          obj = obj.parent;
        }
        if (obj?.userData?.componentId) {
          const compId = obj.userData.componentId;
          const details = COMPONENT_DETAILS[compId];
          if (details) {
            setSelectedPart(details);
          }
        }
      }
    };

    renderer.domElement.addEventListener('click', handlePointerDown);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Warm-up compilation
    renderer.compile(scene, camera);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Silky exponential damping for explode progression
      const targetExplode = prefersReducedMotion ? 0 : targetExplodeRef.current;
      currentExplodeRef.current = THREE.MathUtils.damp(
        currentExplodeRef.current,
        targetExplode,
        4.8,
        delta
      );
      const e = currentExplodeRef.current;

      // Smooth camera position damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPosRef.current.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPosRef.current.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPosRef.current.z, 3.5, delta);
      camera.lookAt(0, 0.4 + e * 0.4, 0);

      // Subtle slow auto-rotation if enabled
      if (autoRotateRef.current && !prefersReducedMotion) {
        masterAssemblage.rotation.y += delta * 0.12;
      }

      // Explode Disassembly & Reassembly Kinematics
      // 1. Thali plate gently descends and tilts down
      thaliGroup.position.y = -e * 0.8;
      thaliGroup.rotation.x = e * 0.12;

      // 2. Set Dosa separates diagonally upwards and forwards
      dosaGroup.position.set(
        -1.4 - e * 1.6,
        0.08 + e * 1.8,
        0.8 + e * 1.5
      );
      dosaGroup.rotation.y = e * 0.6;
      dosaGroup.rotation.z = -e * 0.35;

      // 3. Fried Rice elevates directly up and backwards with rotational flare
      riceGroup.position.set(
        0 - e * 0.4,
        0.08 + e * 2.4,
        -1.2 - e * 1.8
      );
      riceGroup.rotation.x = -e * 0.4;
      riceGroup.rotation.y = e * 0.8;

      // 4. Artisanal Chai floats upward and right
      chaiGroup.position.set(
        1.5 + e * 1.7,
        0.08 + e * 2.1,
        -0.6 - e * 1.2
      );
      chaiGroup.rotation.z = e * 0.25;

      // 5. Gulab Jamun elevates forwards and right, tilting sweet profile
      jamunGroup.position.set(
        1.4 + e * 1.6,
        0.08 + e * 1.6,
        1.1 + e * 1.6
      );
      jamunGroup.rotation.y = -e * 0.5;

      // 6. Crisp Garden Salad separates back-left
      saladGroup.position.set(
        -1.6 - e * 1.8,
        0.08 + e * 1.5,
        -0.7 - e * 1.4
      );
      saladGroup.rotation.y = e * 0.4;

      // 7. Fruit Juice elevates forwards
      juiceGroup.position.set(
        0 + e * 0.3,
        0.08 + e * 1.9,
        1.7 + e * 2.1
      );
      juiceGroup.rotation.x = e * 0.3;

      // 8. Spice Halo expands radially outward and ascends into cosmic circle
      spicesGroup.position.y = 0.5 + e * 2.8;
      spicesGroup.scale.setScalar(1 + e * 1.6);
      spicesGroup.rotation.y += delta * (0.2 + e * 0.8);

      // Animate rising steam particles inside Chai tumbler
      const positions = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamParticleCount; i++) {
        positions[i * 3 + 1] += steamVelocities[i];
        if (positions[i * 3 + 1] > 1.9) {
          positions[i * 3 + 1] = 1.0;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handlePointerDown);
      renderer.dispose();
      pmremGenerator.dispose();
      plateGeo.dispose();
      dosaTexture.dispose();
      riceTex.dispose();
      shadowTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle manual explode slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExplodeValue(val);
    targetExplodeRef.current = val;
    onExplodeChange?.(val);
  };

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[720px] select-none">
      {/* WebGL Canvas isolated mount */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
        title="Interactive 3D Food Land Culinary Assemblage — Drag to rotate, scroll or use slider to explode"
      />

      {/* Subtle top spec / cinematic indicator badge */}
      <div className="absolute top-6 left-6 z-10 pointer-events-auto">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#121216]/80 border border-[#D6A75D]/20 text-xs text-[#E5D2B8] shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6A75D]" />
          <span className="font-medium tracking-wide">3D Pure Vegetarian Assemblage</span>
          <span className="text-[#8E8B82]">·</span>
          <span className="text-[#D6A75D]">Scroll to Explode</span>
        </div>
      </div>

      {/* Selected Component Inspection Popover Card */}
      {selectedPart && (
        <div className="absolute top-6 right-6 z-20 max-w-sm pointer-events-auto bg-[#141419]/95 border border-[#D6A75D]/30 p-5 rounded-lg shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-[11px] tracking-wider text-[#D6A75D] uppercase font-semibold">
                Inspected Element
              </span>
              <h4 className="text-lg font-serif font-bold text-[#FAF8F5] leading-tight">
                {selectedPart.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedPart(null)}
              className="text-[#8E8B82] hover:text-[#FAF8F5] text-xs p-1 transition-colors"
              aria-label="Close component detail"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-[#D6A75D]/90 italic mb-2">
            {selectedPart.subtitle}
          </p>
          <p className="text-xs text-[#C6C2B6] leading-relaxed mb-3">
            {selectedPart.description}
          </p>
          <div className="pt-2.5 border-t border-[#D6A75D]/15 text-[11px] text-[#A6A296] flex items-center gap-1.5">
            <span className="text-[#D6A75D]">✦</span>
            <span>{selectedPart.dietaryNote}</span>
          </div>
        </div>
      )}

      {/* Collapsible Unified Bottom Control Dock (Follows Three.js skill specification) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[840px] pointer-events-auto">
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-[#C6C2B6] bg-[#141419]/90 hover:text-[#FAF8F5] border border-[#D6A75D]/25 rounded-t-md transition-all shadow-md"
            title={isDockCollapsed ? 'Expand 3D Controls' : 'Collapse to Cinema Mode'}
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#D6A75D]" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#D6A75D]" />
                <span>Cinema Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Surface */}
        {!isDockCollapsed && (
          <div className="bg-[#121217]/95 border border-[#D6A75D]/30 rounded-lg p-3.5 shadow-2xl transition-all">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Explode Slider Control */}
              <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                <span className="text-xs text-[#D6A75D] font-medium whitespace-nowrap flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Exploded View:</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeValue}
                  onChange={handleSliderChange}
                  className="w-full accent-[#D6A75D] h-1.5 bg-[#25252D] rounded-lg cursor-pointer"
                  aria-label="Explode and reassemble slider"
                />
                <span className="text-xs text-[#FAF8F5] font-mono tabular-nums w-10 text-right">
                  {Math.round(explodeValue * 100)}%
                </span>
              </div>

              {/* View Angles & Rotation Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <div className="flex items-center gap-1 p-0.5 bg-[#1B1B22] rounded-md border border-[#D6A75D]/15 text-xs">
                  <button
                    onClick={() => handleViewChange('perspective')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      cameraView === 'perspective'
                        ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold'
                        : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
                    }`}
                  >
                    Cinematic
                  </button>
                  <button
                    onClick={() => handleViewChange('top')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      cameraView === 'top'
                        ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold'
                        : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
                    }`}
                  >
                    Top
                  </button>
                  <button
                    onClick={() => handleViewChange('close')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      cameraView === 'close'
                        ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold'
                        : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
                    }`}
                  >
                    Macro
                  </button>
                </div>

                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-1.5 rounded-md border text-xs flex items-center gap-1 transition-colors ${
                    autoRotate
                      ? 'border-[#D6A75D]/50 text-[#D6A75D] bg-[#D6A75D]/10'
                      : 'border-[#33333F] text-[#8E8B82] hover:text-[#FAF8F5]'
                  }`}
                  title={autoRotate ? 'Pause 3D auto-orbit' : 'Resume 3D auto-orbit'}
                  aria-label="Toggle auto rotation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
