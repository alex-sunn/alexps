import * as THREE from 'three';
import type { ScenePreset } from '../types/portfolio';

const ASCII_SHADER_VERTEX = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vPositionView;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vPositionView = mvPosition.xyz;
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const ASCII_SHADER_FRAGMENT = /* glsl */ `
  uniform float uAccent;
  uniform float uBoost;
  varying vec3 vNormalView;
  varying vec3 vPositionView;

  void main() {
    vec3 normalDir = normalize(vNormalView);
    vec3 viewDir = normalize(-vPositionView);

    vec3 keyLight = normalize(vec3(0.55, 0.72, 0.85));
    vec3 fillLight = normalize(vec3(-0.65, -0.35, 0.45));

    float diffKey = max(dot(normalDir, keyLight), 0.0);
    float diffFill = max(dot(normalDir, fillLight), 0.0) * 0.38;
    float fresnel = pow(1.0 - max(dot(normalDir, viewDir), 0.0), 2.1) * 0.65;

    float lum = clamp(0.16 + diffKey * 0.78 + diffFill + fresnel + uBoost, 0.0, 1.0);
    gl_FragColor = vec4(lum, 0.0, uAccent, 1.0);
  }
`;

function createAsciiMaterial(accent: number, boost = 0, wireframe = false): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: ASCII_SHADER_VERTEX,
    fragmentShader: ASCII_SHADER_FRAGMENT,
    uniforms: {
      uAccent: { value: accent },
      uBoost: { value: boost },
    },
    wireframe,
  });
}

function buildCapitalCore(): THREE.Group {
  const group = new THREE.Group();
  const silverMat = createAsciiMaterial(0.0, 0.04);
  const silverWire = createAsciiMaterial(0.0, 0.14, true);
  const amberMat = createAsciiMaterial(1.0, 0.15);

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.18, 1), silverMat);
  const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(1.42, 0), silverWire);

  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.085, 14, 72), amberMat);
  outerRing.rotation.x = Math.PI * 0.36;
  outerRing.rotation.y = Math.PI * 0.14;

  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.06, 12, 64), amberMat);
  innerRing.rotation.x = -Math.PI * 0.28;
  innerRing.rotation.z = Math.PI * 0.24;

  // Orbital telemetry nodes
  const nodeGeo = new THREE.OctahedronGeometry(0.16, 0);
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? amberMat : silverMat);
    node.position.set(Math.cos(angle) * 2.15, Math.sin(angle * 2) * 0.45, Math.sin(angle) * 2.15);
    group.add(node);
  }

  group.add(core, cage, outerRing, innerRing);
  return group;
}

function buildAgentLattice(): THREE.Group {
  const group = new THREE.Group();
  const silverMat = createAsciiMaterial(0.0, 0.06);
  const amberMat = createAsciiMaterial(1.0, 0.18);
  const wireMat = createAsciiMaterial(0.0, 0.12, true);

  const nodeGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
  const coreNodeGeo = new THREE.OctahedronGeometry(0.62, 0);

  // 3x3x3 distributed agent grid with amber core + corner focal nodes
  const spacing = 1.05;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const isDiagonalCorner = Math.abs(x) + Math.abs(y) + Math.abs(z) === 3;
        const mesh = new THREE.Mesh(nodeGeo, isDiagonalCorner ? amberMat : silverMat);
        mesh.position.set(x * spacing, y * spacing, z * spacing);
        group.add(mesh);
      }
    }
  }

  const centerCore = new THREE.Mesh(coreNodeGeo, amberMat);
  const outerShell = new THREE.Mesh(new THREE.BoxGeometry(2.65, 2.65, 2.65), wireMat);

  group.add(centerCore, outerShell);
  return group;
}

function buildSkylineSpire(): THREE.Group {
  const group = new THREE.Group();
  const silverMat = createAsciiMaterial(0.0, 0.05);
  const amberMat = createAsciiMaterial(1.0, 0.18);

  const pillars: Array<{ x: number; z: number; w: number; d: number; h: number; goldTop: boolean }> = [
    { x: 0, z: 0, w: 0.72, d: 0.72, h: 3.1, goldTop: true },
    { x: -0.95, z: 0.35, w: 0.62, d: 0.62, h: 2.3, goldTop: true },
    { x: 0.92, z: -0.25, w: 0.58, d: 0.58, h: 2.55, goldTop: true },
    { x: -0.45, z: -0.9, w: 0.52, d: 0.52, h: 1.75, goldTop: false },
    { x: 0.52, z: 0.88, w: 0.54, d: 0.54, h: 1.9, goldTop: false },
    { x: -1.55, z: -0.45, w: 0.44, d: 0.44, h: 1.3, goldTop: false },
    { x: 1.55, z: 0.45, w: 0.44, d: 0.44, h: 1.45, goldTop: false },
  ];

  for (const p of pillars) {
    const body = new THREE.Mesh(new THREE.BoxGeometry(p.w, p.h, p.d), silverMat);
    body.position.set(p.x, p.h * 0.5 - 1.45, p.z);
    group.add(body);

    if (p.goldTop) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(p.w * 1.06, 0.16, p.d * 1.06), amberMat);
      cap.position.set(p.x, p.h - 1.38, p.z);
      group.add(cap);
    }
  }

  const basePlate = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.25, 0.1, 8), amberMat);
  basePlate.position.y = -1.5;
  group.add(basePlate);

  return group;
}

function buildApexBeacon(): THREE.Group {
  const group = new THREE.Group();
  const silverMat = createAsciiMaterial(0.0, 0.05);
  const amberMat = createAsciiMaterial(1.0, 0.2);

  const outerCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.55, 0), silverMat);
  const innerCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.85, 0), amberMat);
  innerCore.rotation.y = Math.PI * 0.25;

  const haloA = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.07, 12, 68), amberMat);
  haloA.rotation.x = Math.PI * 0.5;

  const haloB = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.045, 10, 68), silverMat);
  haloB.rotation.y = Math.PI * 0.35;
  haloB.rotation.x = Math.PI * 0.18;

  group.add(outerCrystal, innerCore, haloA, haloB);
  return group;
}

export function createPresetSceneGroups(): Record<ScenePreset, THREE.Group> {
  return {
    'capital-core': buildCapitalCore(),
    'agent-lattice': buildAgentLattice(),
    'skyline-spire': buildSkylineSpire(),
    'apex-beacon': buildApexBeacon(),
  };
}
