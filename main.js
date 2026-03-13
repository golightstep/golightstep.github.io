import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {

  // SDK Reference Tabs
  const refTabBtns = document.querySelectorAll('.ref-tab-btn');
  const refPanes = document.querySelectorAll('.ref-pane');

  refTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.ref;
      refTabBtns.forEach(b => {
        b.style.color = 'var(--text-secondary)';
        b.style.borderBottomColor = 'transparent';
      });
      btn.style.color = 'var(--accent-color)';
      btn.style.borderBottomColor = 'var(--accent-color)';
      refPanes.forEach(p => p.style.display = p.id === `ref-${target}` ? 'block' : 'none');
      logEvent(analytics, 'sdk_tab_click', { language: target });
    });
  });

  // Set initial active tab style
  const firstBtn = document.querySelector('.ref-tab-btn.active');
  if (firstBtn) {
    firstBtn.style.color = 'var(--accent-color)';
    firstBtn.style.borderBottomColor = 'var(--accent-color)';
  }

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
