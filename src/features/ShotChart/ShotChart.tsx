import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { css } from '@emotion/react';
import gsap from 'gsap';
import isFunction from 'lodash.isfunction';
import { teamColors } from '../../common/data';
import { Game, GameAction, GameClock } from '../../common/types';

type CamPosition = 'top' | 'side';

interface ShotChartProps {
  camPosition: CamPosition;
  awayTeam: Game['awayTeam'];
  homeTeam: Game['homeTeam'];
  shots: GameAction[];
  gameClock: GameClock;
}

const ShotChart: FC<ShotChartProps> = ({
  camPosition,
  awayTeam,
  homeTeam,
  shots,
  gameClock,
}) => {
  const awayTeamColor = teamColors[awayTeam.teamTricode]
    ? teamColors[awayTeam.teamTricode][0]
    : 'rgb(255,255,255)';
  const homeTeamColor = teamColors[homeTeam.teamTricode]
    ? teamColors[homeTeam.teamTricode][0]
    : 'rgb(0,0,0)';

  const mountRef = useRef<HTMLDivElement | null>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);

  const controls = useRef<{
    updateCamPosition: (camPosition: CamPosition) => void;
    setShots: (shots: GameAction[]) => void;
    updateGameClock: (gameClock: GameClock) => void;
  }>();

  useEffect(() => {
    const mount = mountRef.current;

    controls.current = { updateCamPosition, setShots, updateGameClock };

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;

    let shots: {
      data: GameAction;
      mesh: THREE.Mesh;
      shotTl: GSAPTimeline;
    }[] = [];

    let missShotGeometry: THREE.ExtrudeGeometry;
    let makeShotGeometry: THREE.CylinderGeometry;
    let awayTeamShotMaterial: THREE.MeshPhongMaterial;
    let homeTeamShotMaterial: THREE.MeshPhongMaterial;

    const aspectRatio = 2.75 / 1;

    init();
    animate();

    function init() {
      let awayHoop: THREE.Group;
      let hoop: THREE.Group;
      let courtLogo: THREE.Mesh;
      let courtLines: THREE.Mesh;
      let court: THREE.Mesh;

      /**
       * Loading manager
       */
      const loadingManager = new THREE.LoadingManager();
      loadingManager.onStart = () => {
        setLoadingProgress(0);
      };
      loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
        setLoadingProgress(itemsLoaded / itemsTotal);
      };
      loadingManager.onLoad = () => {
        setLoadingProgress(1);
        scene.add(awayHoop, hoop, courtLogo, courtLines, court);
      };
      loadingManager.onError = (error) => {
        console.log('Error loading textures', error);
      };

      /**
       * Textures
       */
      const textureLoader = new THREE.TextureLoader(loadingManager);

      const courtLogoColorTexture = textureLoader.load(
        `/images/teams/${homeTeam.teamTricode}.svg`
      );
      const courtLinesColorTexture = textureLoader.load(
        '/textures/court-lines-color.png'
      );
      const courtColorTexture = textureLoader.load(
        '/textures/court-color.jpg',
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(4, 2);
        }
      );
      const courtNormalTexture = textureLoader.load(
        '/textures/court-normal.png',
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(4, 2);
        }
      );
      const courtAmbientOcclusionTexture = textureLoader.load(
        '/textures/court-ao.jpg',
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(4, 2);
        }
      );

      /**
       * Renderer
       */
      const width = mount?.clientWidth || window.innerWidth;
      const height = width / aspectRatio;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      mount?.appendChild(renderer.domElement);

      /**
       * Scene
       */
      scene = new THREE.Scene();

      /**
       * Camera
       */
      camera = new THREE.PerspectiveCamera(25, width / height, 1, 1000);
      camera.position.set(0, Math.hypot(10, 10), 0);
      camera.lookAt(0, 0, 0);

      /**
       * Lights
       */
      // Ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      // Directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 5, 10);
      scene.add(directionalLight);

      /**
       * Objects
       */
      // Hoops
      const gltfLoader = new GLTFLoader(loadingManager);

      gltfLoader.load('/models/hoop.glb', (gltf) => {
        const meshes = gltf.scene.children;
        const frame = meshes.find((m) => m.name === 'Frame') as THREE.Mesh;
        const padding = meshes.find((m) => m.name === 'Padding') as THREE.Mesh;
        const glass = meshes.find((m) => m.name === 'Glass') as THREE.Mesh;
        const lgBox = meshes.find((m) => m.name === 'Large_Box') as THREE.Mesh;
        const box = meshes.find((m) => m.name === 'Box') as THREE.Mesh;
        const rimBox = meshes.find((m) => m.name === 'Rim_Box') as THREE.Mesh;
        const rimCir = meshes.find(
          (m) => m.name === 'Rim_Circle'
        ) as THREE.Mesh;
        const net = meshes.find((m) => m.name === 'Net') as THREE.Mesh;

        frame.geometry.computeVertexNormals();
        padding.geometry.computeVertexNormals();
        glass.geometry.computeVertexNormals();
        lgBox.geometry.computeVertexNormals();
        box.geometry.computeVertexNormals();
        rimBox.geometry.computeVertexNormals();
        rimCir.geometry.computeVertexNormals();
        net.geometry.computeVertexNormals();

        // Frame
        frame.material = new THREE.MeshPhongMaterial({
          color: 0xaaaaaa,
        });

        // Padding
        padding.material = new THREE.MeshPhongMaterial({
          color: 0x333333,
        });

        // Glass
        glass.material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.25,
          side: THREE.DoubleSide,
        });

        // Boxes
        const boxMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
        });
        boxMaterial.side = THREE.DoubleSide;
        lgBox.material = boxMaterial;
        box.material = boxMaterial;

        // Rim
        const rimMaterial = new THREE.MeshPhongMaterial({
          color: 0xff0000,
        });
        rimBox.material = rimMaterial;
        rimCir.material = rimMaterial;

        // Net
        net.material = new THREE.MeshPhongMaterial({
          color: 0xfafafa,
        });

        hoop = new THREE.Group();

        hoop.add(frame, padding, glass, lgBox, box, rimBox, rimCir, net);

        hoop.position.x = 4.4;
        hoop.rotation.y = -Math.PI / 2;
        hoop.scale.set(0.5, 0.5, 0.5);

        // Away hoop
        awayHoop = hoop.clone();
        awayHoop.position.x = -4.4;
        awayHoop.rotation.y = Math.PI / 2;
      });

      // Court
      courtLogo = new THREE.Mesh(
        new THREE.PlaneGeometry(2.5, 2.5),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: courtLogoColorTexture,
          transparent: true,
          opacity: 0.75,
        })
      );
      courtLogo.position.y = 0.027;
      courtLogo.rotation.x = -Math.PI / 2;

      courtLines = new THREE.Mesh(
        new THREE.PlaneGeometry(9.4, 5),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: courtLinesColorTexture,
          transparent: true,
          opacity: 1,
        })
      );
      courtLines.position.y = 0.026;
      courtLines.rotation.x = -Math.PI / 2;

      court = new THREE.Mesh(
        new THREE.BoxGeometry(12, 0.05, 5.5),
        new THREE.MeshPhongMaterial({
          specular: 0xffffff,
          shininess: 100,
          map: courtColorTexture,
          normalMap: courtNormalTexture,
          aoMap: courtAmbientOcclusionTexture,
          aoMapIntensity: 0.25,
        })
      );

      // Shots
      const shotSize = 0.1;
      const shotDepth = 0.05;
      const radialSegments = 24;

      const cylinderShape = new THREE.Shape()
        .moveTo(shotSize, 0)
        .absarc(0, 0, shotSize, 0, Math.PI * 2, false);

      const holePath = new THREE.Path()
        .moveTo(shotSize * 0.75, 0)
        .absarc(0, 0, shotSize * 0.75, 0, Math.PI * 2, false);

      cylinderShape.holes.push(holePath);

      missShotGeometry = new THREE.ExtrudeGeometry(cylinderShape, {
        curveSegments: radialSegments / 2,
        depth: shotDepth,
        bevelEnabled: false,
      });

      makeShotGeometry = new THREE.CylinderGeometry(
        shotSize,
        shotSize,
        shotDepth,
        radialSegments
      );

      awayTeamShotMaterial = new THREE.MeshPhongMaterial({
        color: awayTeamColor,
      });

      homeTeamShotMaterial = new THREE.MeshPhongMaterial({
        color: homeTeamColor,
      });
    }

    function updateCamPosition(camPosition: CamPosition) {
      if (camPosition === 'top') {
        gsap.to(camera.position, {
          y: Math.hypot(10, 10),
          z: 0,
          duration: 1,
          ease: 'power1.inOut',
          onUpdate: function () {
            camera.lookAt(new THREE.Vector3(0, 0, 0));
          },
        });
      } else {
        gsap.to(camera.position, {
          y: 10,
          z: 10,
          duration: 1,
          ease: 'power1.inOut',
          onUpdate: function () {
            camera.lookAt(new THREE.Vector3(0, 0, 0));
          },
        });
      }
    }

    function setShots(nextShots: GameAction[]) {
      /**
       * Remove any existing shot meshes
       */
      for (let i = 0; i < shots.length; i++) {
        const { mesh } = shots[i];

        scene.remove(mesh);
      }

      shots = [];

      if (!Array.isArray(nextShots) || !nextShots.length) return;

      /**
       * Draw shots
       */
      for (let i = 0; i < nextShots.length; i++) {
        const d = nextShots[i];

        const isAwayTeam = d.teamTricode === awayTeam.teamTricode;

        let x = -1 * (d.x ? (d.x - 50) / 100 : 0);
        const z = d.y ? (d.y - 50) / 100 : 0;

        if (d.periodType === 'REGULAR' && [1, 2].includes(d.period)) {
          x = -x;
        }

        const shotMaterial = isAwayTeam
          ? awayTeamShotMaterial
          : homeTeamShotMaterial;

        let mesh: THREE.Mesh;

        if (d.shotResult === 'Missed') {
          mesh = new THREE.Mesh(missShotGeometry, shotMaterial);

          mesh.position.y = 0.025;
          mesh.rotation.x = -Math.PI / 2;
        } else {
          mesh = new THREE.Mesh(makeShotGeometry, shotMaterial);

          mesh.position.y = 0.05;
        }

        mesh.position.x = x * (9.4 - 0.1);
        mesh.position.z = z * (5 - 0.1);

        scene.add(mesh);

        const shotTl = gsap.timeline({ paused: true });

        shotTl
          .from(mesh.position, {
            y: '-=0.1',
            duration: 1,
            ease: 'back.inOut',
          })
          .from(
            mesh.scale,
            {
              x: 0,
              y: 0,
              z: 0,
              duration: 1,
              ease: 'back.inOut',
            },
            '<'
          );

        shots.push({ data: d, mesh, shotTl });
      }
    }

    function updateGameClock(gameClock: GameClock) {
      for (let i = 0; i < shots.length; i++) {
        const { data, shotTl } = shots[i];

        const minutes = parseInt(data.clock.slice(2, 4));
        const seconds = parseInt(data.clock.slice(5, 9));

        if (
          (data.period < gameClock.period ||
            (data.period === gameClock.period &&
              minutes + seconds / 60 >=
                gameClock.minutes + gameClock.seconds / 60)) &&
          shotTl.progress() !== 1
        ) {
          shotTl.play();
        } else if (
          (data.period > gameClock.period ||
            (data.period === gameClock.period &&
              minutes + seconds / 60 <
                gameClock.minutes + gameClock.seconds / 60)) &&
          shotTl.progress() !== 0
        ) {
          shotTl.reverse();
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    function onResize() {
      const width = mount?.clientWidth || window.innerWidth;
      const height = width / aspectRatio;

      renderer.setSize(width, height);

      camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', onResize, false);

    return () => {
      mount?.removeChild(renderer.domElement);
      window.removeEventListener('resize', onResize);
    };
  }, [mountRef, awayTeam, awayTeamColor, homeTeam, homeTeamColor]);

  useEffect(() => {
    if (isFunction(controls.current?.updateCamPosition)) {
      controls.current?.updateCamPosition(camPosition);
    }
  }, [camPosition]);

  useEffect(() => {
    if (isFunction(controls.current?.setShots)) {
      controls.current?.setShots(shots);
    }
  }, [shots]);

  useEffect(() => {
    if (isFunction(controls.current?.updateGameClock)) {
      controls.current?.updateGameClock(gameClock);
    }
  }, [gameClock]);

  return (
    <div
      css={(theme) => css`
        position: relative;
        z-index: 1;
        width: ${theme.width.full};
        height: ${theme.height.full};

        & > div:first-of-type {
          position: absolute;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 ${theme.padding[20]};
          opacity: ${loadingProgress === 1 ? 0 : 1};
          transition: opacity 200ms ease-in-out;

          & > div {
            width: ${theme.width[24]};
            height: ${theme.height[2]};
            background: ${theme.colors.primary[50]};

            & > div {
              width: ${theme.width.full};
              height: ${theme.height.full};
              background: ${theme.colors.primary[500]};
              transform-origin: 0 0;
              transform: scaleX(${loadingProgress});
              transition: transform 200ms ease-in-out;
            }
          }
        }
      `}
    >
      <div>
        <div>
          <div />
        </div>
      </div>

      <div ref={mountRef} />
    </div>
  );
};

export default ShotChart;
