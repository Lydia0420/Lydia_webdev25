// Intro Animation

const frameCount = 344;
const framePath = "./assets/home/video_"; 

const frameContainer = document.getElementById("frame-container");
const textContainer = document.querySelector(".text-container");
const sections = document.querySelectorAll(".text-section");
const timelineSection = document.getElementById("timeline-section");

document.addEventListener("DOMContentLoaded", () => {
  // timeline jump logic
  const detailPageMap = {
    "to-elementary": "details/elementary.html",
    "to-middle": "details/middle.html",
    "to-high": "details/high.html",
    "to-university": "details/university.html"
  };

  Object.keys(detailPageMap).forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(img => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("scrollBeforeEnteringDetails", window.scrollY);
        window.location.href = detailPageMap[className] + "#return";
      });
    });
  });

  // gallery jump Logic
  const galleryLinks = document.querySelectorAll("#gallery .artwork a");
  galleryLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      localStorage.setItem("scrollBeforeEnteringGallery", window.scrollY);
      window.location.href = `${href}#return-from-gallery`;
    });
  });
});

window.addEventListener("load", () => {
  const isReturn = window.location.hash === "#return";
  const savedScroll = localStorage.getItem("scrollBeforeEnteringDetails");

  const isReturnFromGallery = window.location.hash === "#return-from-gallery";
  const savedGalleryScroll = localStorage.getItem("scrollBeforeEnteringGallery");

  //returning to the original position
  if (isReturn && savedScroll) {
    setTimeout(() => {
      window.scrollTo({ top: parseInt(savedScroll), behavior: "auto" });
    }, 0);
    localStorage.removeItem("scrollBeforeEnteringDetails");
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (isReturnFromGallery && savedGalleryScroll) {
    setTimeout(() => {
      window.scrollTo({ top: parseInt(savedGalleryScroll), behavior: "auto" });
    }, 0);
    localStorage.removeItem("scrollBeforeEnteringGallery");
    window.history.replaceState({}, document.title, window.location.pathname);
    } else if (window.location.hash && document.querySelector(window.location.hash)) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: "auto" });
    }, 0);
  } else {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  preloadFrames();
  const initialFrame = getCurrentFrameByScroll();
  updateFrame(initialFrame);
  checkTextSection(initialFrame);
});


const scrollMaxHeight = window.innerHeight * 4.8;
let lastRenderedFrame = -1;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Get the current frame number (based on the scroll position)
function getCurrentFrameByScroll() {
  const scrollTop = window.scrollY;
  const progress = Math.min(scrollTop / scrollMaxHeight, 1);
  return Math.floor(progress * frameCount);
}

// update background
function updateFrame(frame) {
  if (frame === lastRenderedFrame) return;
  lastRenderedFrame = frame;

  const padded = String(frame).padStart(3, '0');
  const imagePath = `${framePath}${padded}.webp`;

  const img = new Image();
  img.onload = () => {
    frameContainer.style.backgroundImage = `url(${imagePath})`;
  };
  img.src = imagePath;
}


// determine which text appear based on the number of scrolling frames
function checkTextSection(frame) {
  frameTriggers.forEach(({ section, startFrame, endFrame }) => {
    const sectionElement = document.getElementById(section);
    if (frame >= startFrame && frame <= endFrame) {
      const progress = (frame - startFrame) / (endFrame - startFrame);
      sectionElement.classList.add("active");
      sectionElement.style.opacity = Math.min(1, progress * 1.3);
      sectionElement.style.transform = `translateX(${(1 - progress) * -40}px)`;
      const pElement = sectionElement.querySelector("p");
      if (pElement) {
        pElement.style.opacity = Math.min(1, progress * 1.3);
        pElement.style.transform = `translateY(${(1 - progress) * 30}px)`;
      }
    } else {
      sectionElement.classList.remove("active");
      sectionElement.style.opacity = 0;
      sectionElement.style.transform = "translateX(-50px)";
    }
  });
}


// frame range for each paragraph
const frameTriggers = [
  { section: "section1", startFrame: 1, endFrame: 150 },
  { section: "section2", startFrame: 151, endFrame: 240 },
  { section: "section3", startFrame: 241, endFrame: 344 }
];

// Preload all frames
function preloadFrames() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `${framePath}${String(i).padStart(3, "0")}.webp`;
  }
  console.log("All frames have been preloaded");
}



window.addEventListener('scroll', () => {
  const frame = getCurrentFrameByScroll();
  updateFrame(frame);
  checkTextSection(frame);

  if (frame >= frameCount - 1) {
    textContainer.classList.add("hidden");
    frameContainer.classList.add("hidden");
  } else {
    textContainer.classList.remove("hidden");
    frameContainer.classList.remove("hidden");
  }
});





//  Timeline + Quote

const bg = document.getElementById('bg-inner');
const items = document.querySelectorAll('.work-item');
let isHovering = false;
let bgChangeTimeout;

function smoothSetBackground(newUrl) {
  if (bgChangeTimeout) clearTimeout(bgChangeTimeout);

  const img = new Image();
  img.src = newUrl;

  img.onload = () => {
    bgChangeTimeout = setTimeout(() => {
      bg.style.opacity = '0'; // fade out
      setTimeout(() => {
        bg.style.backgroundImage = `url(${newUrl})`;
        bg.style.opacity = '0.8'; // fade in
      }, 150); 
    }, 80); 
  };
}

items.forEach(item => {
  const wrapper = item.querySelector('.main-image-wrapper');
  const bgUrl = item.dataset.bg;

  item.addEventListener('mouseenter', () => {
    isHovering = true;
    smoothSetBackground(bgUrl);
    bg.style.filter = 'blur(20px) brightness(0.9)';
  });

  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 150;
    const rotateY = (x - centerX) / 150;

    gsap.to(wrapper, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.01,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.2
    });
  });

  item.addEventListener('mouseleave', () => {
    isHovering = false;
    bg.style.opacity = '0';
    bg.style.filter = 'blur(0px) brightness(1)';

    gsap.to(wrapper, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: 'power2.out',
      duration: 0.4
    });
  });

  // scroll in（when no hove)
  ScrollTrigger.create({
    trigger: item,
    start: "top 90%",
    end: "top 10%",
    scrub: false,
    onEnter: () => {
      if (!isHovering) {
        smoothSetBackground(bgUrl);
        bg.style.filter = 'blur(20px) brightness(0.9)';
      }
    },
    onLeaveBack: () => {
      if (!isHovering) {
        bg.style.opacity = '0';
        bg.style.filter = 'blur(0px) brightness(1)';
      }
    }
  });
});

gsap.utils.toArray(".main-image-wrapper").forEach((wrapper) => {
  gsap.fromTo(wrapper,
    {
      rotateX: 10,
      rotateY: 8,
      scale: 0.95,
      transformPerspective: 1000,
    },
    {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: wrapper.parentElement,
        start: "top 90%",
        end: "top 5%",
        scrub: 0.1,
      }
    });
});

// Locate the icon based on the timeline image
const icons = document.querySelectorAll('.icon');
const workItems = document.querySelectorAll('.work-item');
const timelineTop = timelineSection.getBoundingClientRect().top + window.scrollY;

icons.forEach((icon, i) => {
  const target = workItems[i];
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  const top = (rect.top + scrollTop - timelineTop) - 30; 
  icon.style.top = `${top}px`;
});




gsap.utils.toArray(".main-image").forEach((img) => {
  gsap.fromTo(img,
    { yPercent: 0 },
    {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: img.closest(".work-item"),
        start: "top bottom",
        end: "bottom top",
        scrub: 0
      }
    });
});



gsap.fromTo('.icon-3d-wrapper', 
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 0.3 }
);

gsap.to('.icon-3d-wrapper', {
  rotationY: "+=360",
  duration: 3,
  ease: "linear",
  repeat: -1
});


// Quote text typing effect
function typeLine(lineElem, text, speed = 40) {
  lineElem.textContent = '';
  let i = 0;

  function typeChar() {
    if (i < text.length) {
      lineElem.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    }
  }

  typeChar();
}

// line by line
document.querySelectorAll('.icon-description .line').forEach((line, index) => {
  const fullText = line.textContent;
  line.textContent = ''; 

  setTimeout(() => {
    typeLine(line, fullText, 60);
  }, index * 1500); 
});



// change Nav color
const nav = document.querySelector("nav");
const frameSection = document.getElementById("frame-section"); 
const timeline = document.getElementById("timeline-section");

// Intro animation - white, other - black
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.classList.remove("nav-dark"); 
      } else {
        nav.classList.add("nav-dark"); 
      }
    });
  },
  { threshold: 0.1 }
);
observer.observe(frameSection);

// timeline hover - white
const timelineImages = timeline.querySelectorAll("img");

timelineImages.forEach(img => {
  img.addEventListener("mouseenter", () => {
    if (nav.classList.contains("nav-dark")) {
      nav.classList.add("hover-white");
    }
  });
  img.addEventListener("mouseleave", () => {
    nav.classList.remove("hover-white");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".sub-name");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = toggle.closest(".sub-dropdown");
      parent.classList.toggle("open");
    });
  });
});




const bgInner = document.getElementById("bg-inner");
const timelineSection1 = document.getElementById("timeline-section");
const gallery = document.getElementById("gallery");

// for the timeline to appear/leave
if (timelineSection) {
  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        bgInner.classList.add("hidden");
      } else {
        bgInner.classList.remove("hidden");
      }
    });
  }, { threshold: 0.1 });

  observer1.observe(timelineSection1);
}

// for gallery
if (gallery) {
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bgInner.classList.add("hidden");
      }
    });
  }, { threshold: 0.05 });

  observer2.observe(gallery);
}


// hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const overlayMenu = document.getElementById("overlayMenu");
  const closeBtn = document.getElementById("closeOverlay");

  if (hamburger && overlayMenu) {
    hamburger.addEventListener("click", () => {
      overlayMenu.classList.add("show");
      document.body.classList.add("no-scroll");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        overlayMenu.classList.remove("show");
        document.body.classList.remove("no-scroll");
      });
    }

    overlayMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        overlayMenu.classList.remove("show");
        document.body.classList.remove("no-scroll");
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  document.querySelectorAll(".overlay-content a").forEach(link => {
    link.classList.remove("active");
  });

  // determine the current page
  if (currentPath.endsWith("index.html") || currentPath === "/") {
    if (currentHash === "#gallery") {
      document.getElementById("nav-work")?.classList.add("active");
    } else {
      document.getElementById("nav-home")?.classList.add("active");
    }
  } else if (currentPath.includes("about.html")) {
    document.getElementById("nav-about")?.classList.add("active");
  } else if (currentPath.includes("contact.html")) {
    document.getElementById("nav-contact")?.classList.add("active");
  }
});


