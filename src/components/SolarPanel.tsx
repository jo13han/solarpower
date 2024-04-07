"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function SolarPanel() {
  useEffect(() => {
    // Canvas
    const canvas = document.querySelector("canvas.webgl");
    const parent = canvas?.parentElement as HTMLElement;
    // Scene
    const scene = new THREE.Scene();

    /**
     * Models
     */
    const gltfLoader = new GLTFLoader();
    let solarPanel: any; // Declare the variable to store the solar panel object

    const startRotation = -Math.PI / 2;
    gltfLoader.load("/models/SolarPanel/scene.gltf", (gltf: any) => {
      solarPanel = gltf.scene.children[0]; // Assign the loaded model to the variable
      scene.add(solarPanel);
      solarPanel.position = new THREE.Vector3(0, -5, 0);
      solarPanel.rotation.x = startRotation;
    });

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    /**
     * Sizes
     */
    const sizes = {
      width: parent.clientWidth,
      height: parent.clientHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = parent.clientWidth;
      sizes.height = parent.clientHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.position.set(0, 0, 4);
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const animate = () => {
      // Render
      renderer.render(scene, camera);

      // Call animate again on the next frame
      requestAnimationFrame(animate);
    };

    animate();

    // Detect scroll event
    let previousScrollY = 0; // Variable to store the previous scroll position
    let solarPanelVisible = false; // Variable to track if the solar panel section is visible

    document.addEventListener("scroll", () => {
    if (!solarPanel) return; // Return early if the solar panel is not loaded yet

    // Check if the solar panel section is in the viewport
    const solarPanelSection = document.getElementById("Process");
    if (!solarPanelSection) return; // Return early if the solar panel section is not found

    const solarPanelSectionRect = solarPanelSection.getBoundingClientRect();
    const solarPanelSectionTop = solarPanelSectionRect.top;
    const solarPanelSectionBottom = solarPanelSectionRect.bottom;

    const isSolarPanelSectionVisible =
        solarPanelSectionTop < window.innerHeight &&
        solarPanelSectionBottom >= 0;

      if (isSolarPanelSectionVisible && !solarPanelVisible) {
        // If the solar panel section becomes visible for the first time, start the rotation
        solarPanelVisible = true;
      } else if (!isSolarPanelSectionVisible && solarPanelVisible) {
        // If the solar panel section becomes invisible again, stop the rotation
        solarPanelVisible = false;
      }

      if (!solarPanelVisible) return; // Return early if the solar panel section is not visible

      // Get the current scroll position
      const currentScrollY = document.documentElement.scrollTop;

      // Check the scroll direction
      const scrollDirection =
        currentScrollY > previousScrollY ? "down" : "up";

      // Define the maximum scroll value where the rotation is complete
      const maxScroll = 200; // Adjust as needed

      // Calculate the normalized scroll value (0 to 1)
      const normalizedScroll = Math.min(currentScrollY, maxScroll) / maxScroll;

      // Define the target tilt angle for the solar panel based on the scroll direction
      let targetTiltAngle;
      if (scrollDirection === "down") {
        targetTiltAngle = startRotation + Math.PI / 3; // Rotate down
      } else {
        // Reverse animation when scrolling up
        const reversedScroll = maxScroll - currentScrollY;
        targetTiltAngle =
          startRotation - (reversedScroll * Math.PI) / (10 * maxScroll);
      }

      // Interpolate between the current rotation and the target rotation
      const currentRotation = solarPanel.rotation.x;
      const targetRotation = targetTiltAngle;
      const interpolatedRotation = THREE.MathUtils.lerp(
        currentRotation,
        targetRotation,
        normalizedScroll
      );

      // Update the rotation of the solar panel
      solarPanel.rotation.x = interpolatedRotation;

      // Store the current scroll position for the next iteration
      previousScrollY = currentScrollY;
    });
  }, []);
  return <canvas className="webgl"></canvas>;
}
