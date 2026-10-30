/* ==========================================================
   ABOUT ME — INTERACTIVE AVATAR
   ========================================================== */

(() => {
  // 1. Find the avatar button and greeting.
  const avatarButton = document.getElementById("pp-about-wave");
  const greeting = document.getElementById("pp-about-greeting");

  // Stop safely if the avatar isn't on this page.
  if (!avatarButton || !greeting) return;

  // 2. Find the eyes inside the SVG.
  const svg = avatarButton.querySelector(".pp-about__svg");

  const leftEye = svg?.querySelector(
    "#svga-group-eyesiriscontrol-left"
  );

  const rightEye = svg?.querySelector(
    "#svga-group-eyesiriscontrol-right"
  );

  // Check whether the visitor prefers less animation.
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let waveTimeout;

  // 3. Wave and display the greeting when clicked.
  avatarButton.addEventListener("click", () => {
    // Reveal the written greeting.
    greeting.hidden = false;

    // Tell assistive technology that the greeting is open.
    avatarButton.setAttribute("aria-expanded", "true");

    // Restart the wave animation on every click.
    avatarButton.classList.remove("is-waving");

    // Force the browser to recognise the animation reset.
    void avatarButton.offsetWidth;

    avatarButton.classList.add("is-waving");

    // Remove the animation class after it finishes.
    clearTimeout(waveTimeout);

    waveTimeout = setTimeout(() => {
      avatarButton.classList.remove("is-waving");
    }, 1350);
  });

  // 4. Return the eyes to their normal position.
  function resetEyes() {
    avatarButton.style.setProperty("--pp-eye-x", "0px");
    avatarButton.style.setProperty("--pp-eye-y", "0px");
  }

  // 5. Make the eyes follow the mouse slightly.
  avatarButton.addEventListener("pointermove", (event) => {
    // Skip eye tracking for touch or reduced motion.
    if (
      reducedMotion.matches ||
      event.pointerType !== "mouse" ||
      !leftEye ||
      !rightEye
    ) {
      return;
    }

    const rect = avatarButton.getBoundingClientRect();

    // Find the pointer's position relative to the centre.
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;

    const relativeX = (event.clientX - centreX) / (rect.width / 2);
    const relativeY = (event.clientY - centreY) / (rect.height / 2);

    // Limit eye movement to a very small distance.
    const eyeX = Math.max(-1, Math.min(1, relativeX)) * 2.5;
    const eyeY = Math.max(-1, Math.min(1, relativeY)) * 1.5;

    // Pass the coordinates to CSS.
    avatarButton.style.setProperty("--pp-eye-x", `${eyeX}px`);
    avatarButton.style.setProperty("--pp-eye-y", `${eyeY}px`);
  });

  // 6. Reset the eyes when the mouse leaves.
  avatarButton.addEventListener("pointerleave", resetEyes);

  // Respect changes to reduced-motion settings.
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      resetEyes();
    }
  });
})();
