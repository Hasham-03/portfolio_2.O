import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const initializedRef = useRef(false);

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (!canvasDiv.current || initializedRef.current) return;
    initializedRef.current = true;
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 600);
          window.addEventListener("resize", onResize, { passive: true });
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: ReturnType<typeof setTimeout> | undefined;
      let touchMoveTarget: HTMLElement | null = null;
      let onTouchMove: ((e: TouchEvent) => void) | null = null;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          touchMoveTarget = element;
          onTouchMove = (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }));
          touchMoveTarget?.addEventListener("touchmove", onTouchMove, { passive: true });
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
        if (touchMoveTarget && onTouchMove) {
          touchMoveTarget.removeEventListener("touchmove", onTouchMove);
        }
        touchMoveTarget = null;
        onTouchMove = null;
      };

      document.addEventListener("mousemove", onMouseMove, { passive: true });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
        landingDiv.addEventListener("touchend", onTouchEnd, { passive: true });
      }
      const onResize = () => {
        if (!canvasDiv.current || !character) return;
        handleResize(renderer, camera, canvasDiv, character);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      };

      let rafId = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };

      rafId = requestAnimationFrame(animate);
      return () => {
        if (debounce) clearTimeout(debounce);
        cancelAnimationFrame(rafId);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        landingDiv?.removeEventListener("touchstart", onTouchStart);
        landingDiv?.removeEventListener("touchend", onTouchEnd);
        if (touchMoveTarget && onTouchMove) {
          touchMoveTarget.removeEventListener("touchmove", onTouchMove);
        }
        initializedRef.current = false;
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
