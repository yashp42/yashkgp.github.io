particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 90,
      "density": {
        "enable": true,
        "value_area": 900
      }
    },
    "color": {
      "value": "#00ffe7"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000"
      }
    },
    "opacity": {
      "value": 0.45,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 0.8,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 3,
        "size_min": 0.5,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00ffe7",
      "opacity": 0.25,
      "width": 1.2
    },
    "move": {
      "enable": true,
      "speed": 2.5,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "repulse": {
        "distance": 120,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});

// Vanta.js background
window.addEventListener('DOMContentLoaded', () => {
  VANTA.WAVES({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x00ffe7,
    shininess: 50.00,
    waveHeight: 20.00,
    waveSpeed: 0.7,
    zoom: 1.1,
    backgroundColor: 0x0a0a0f
  });
});

// Custom cursor orb
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('.glitch').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.background = 'radial-gradient(circle, #ff00c8 60%, #00ffe7 100%)';
    cursor.style.width = '54px';
    cursor.style.height = '54px';
    cursor.style.opacity = '1';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.background = 'radial-gradient(circle, #00ffe7 60%, #0ff 100%)';
    cursor.style.width = '36px';
    cursor.style.height = '36px';
    cursor.style.opacity = '0.7';
  });
});

// Optional: soft ambient sound (uncomment to enable)
/*
const audio = new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b9b4e3.mp3');
audio.loop = true;
audio.volume = 0.12;
window.addEventListener('click', () => {
  if (audio.paused) audio.play();
}, { once: true });
*/

// Subtle parallax for floating images
const floats = document.querySelectorAll('.float-img');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  floats.forEach((img, i) => {
    const base = (i + 1) * 0.18;
    img.style.transform = `translateY(${scrollY * base}px) rotate(${Math.sin(scrollY/200 + i) * 3}deg)`;
  });
});

// Animate floating images on load (gentle float)
floats.forEach((img, i) => {
  let t = 0;
  function animate() {
    t += 0.008 + i * 0.001;
    img.style.transform = `translateY(${Math.sin(t + i) * 12}px) rotate(${Math.sin(t/2 + i) * 2.5}deg)`;
    requestAnimationFrame(animate);
  }
  animate();
});

// Smooth scroll for touch devices
document.documentElement.style.scrollBehavior = 'smooth';

const mainContent = document.getElementById('main-content');
const modeToggle = document.getElementById('mode-toggle');
const toggleLabel = document.getElementById('toggle-label');

// Theme toggle
modeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light', modeToggle.checked);
  toggleLabel.textContent = modeToggle.checked ? 'Light' : 'Dark';
});

// Parallax effect using deviceorientation
let lastX = 0, lastY = 0;
let targetX = 0, targetY = 0;

function applyParallax(x, y) {
  mainContent.style.transform = `translate(${x}px, ${y}px)`;
}

function animate() {
  // Smoothly interpolate to target
  lastX += (targetX - lastX) * 0.12;
  lastY += (targetY - lastY) * 0.12;
  applyParallax(lastX, lastY);
  requestAnimationFrame(animate);
}
animate();

function handleOrientation(event) {
  // gamma: left-right [-90,90], beta: front-back [-180,180]
  let x = event.gamma || 0;
  let y = event.beta || 0;
  // Clamp and scale for subtle effect
  targetX = Math.max(-30, Math.min(30, x)) * 0.7;
  targetY = Math.max(-30, Math.min(30, y - 90)) * 0.3;
}

// iOS 13+ permission request
function enableMotion() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("deviceorientation", handleOrientation, true);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", handleOrientation, true);
  }
}

// Ask for permission on user gesture (iOS)
window.addEventListener("click", enableMotion, { once: true });
window.addEventListener("touchstart", enableMotion, { once: true });