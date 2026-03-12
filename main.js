import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsQCGIS4Uc0IKHSuzvtwcEwdA9Ci56A8U",
  authDomain: "superbrainwebsite-4161f.firebaseapp.com",
  projectId: "superbrainwebsite-4161f",
  storageBucket: "superbrainwebsite-4161f.firebasestorage.app",
  messagingSenderId: "1048392558114",
  appId: "1:1048392558114:web:f987d3658b85cac5c3cc7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active pane
      tabPanes.forEach(pane => {
        if (pane.id === target) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });

      // Log tab click event
      logEvent(analytics, 'install_tab_click', {
        tab_name: target
      });
    });
  });

  // Track Waitlist Clicks
  const waitlistBtns = document.querySelectorAll('a[href="https://binary.so/bC7zobC"]');
  waitlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      logEvent(analytics, 'waitlist_click', {
        location: btn.classList.contains('primary-btn') ? 'footer' : 'navbar'
      });
    });
  });

  // Track GitHub SDK Clicks
  const githubBtns = document.querySelectorAll('a[href="https://github.com/golightstep/superbrainSdk"]');
  githubBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      logEvent(analytics, 'github_sdk_click');
    });
  });

  // Track CrewAI Demo Repo Clicks
  const demoRepoBtns = document.querySelectorAll('a[href="https://github.com/golightstep/superbrainSdk/blob/main/python/examples/crewai_shared_memory/README.md"]');
  demoRepoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      logEvent(analytics, 'crewai_demo_repo_click');
    });
  });

  // Sticky Nav background transition
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(8, 8, 8, 0.9)';
      nav.style.padding = '10px 5%';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.03)';
      nav.style.padding = '0 5%';
    }
  });
});
