function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// Handle donation button - connects to Vercel backend checkout endpoint
document.addEventListener('DOMContentLoaded', function() {
    const donateBtn = document.querySelector(".btn-primary");
    if (donateBtn) {
        donateBtn.addEventListener("click", function(e) {
            e.preventDefault();
            handleDonation();
        });
    }
});

async function handleDonation() {
    try {
        // Call the Vercel backend endpoint for checkout
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 5000, // Default amount in cents ($50)
                currency: 'usd',
                success_url: window.location.origin + '/success.html',
                cancel_url: window.location.href
            })
        });

        const data = await response.json();
        
        if (data.url) {
            // Redirect to Stripe checkout
            window.location.href = data.url;
        } else if (data.error) {
            console.error('Checkout error:', data.error);
            alert('Unable to process donation. Please try again.');
        }
    } catch (error) {
        console.error('Donation error:', error);
        alert('Connection error. Please try again later.');
    }
}

// Hero enhancements: count-up, parallax, reveal
(function () {
  // Respect reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Count-up animation
  function animateCount(el, target, duration = 1800) {
    if (reduceMotion) {
      el.textContent = target.toLocaleString();
      return;
    }
    let start = null;
    const initial = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(progress * (target - initial) + initial);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  }

  // Reveal elements on intersection and trigger counters once
  const hero = document.getElementById('home-hero');
  const stats = hero ? hero.querySelectorAll('.stat-card') : [];
  const counts = hero ? hero.querySelectorAll('.count') : [];
  const heroImage = hero ? hero.querySelector('.hero-image img') : null;
  let countersStarted = false;

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.25 };
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // reveal hero text and image
        const text = hero.querySelector('.hero-text');
        if (text) text.classList.add('visible');
        if (heroImage) heroImage.parentElement.classList.add('visible');

        // reveal stat cards
        stats.forEach((s, idx) => {
          setTimeout(() => s.classList.add('visible'), idx * 120);
        });

        // start counters once
        if (!countersStarted) {
          countersStarted = true;
          counts.forEach(c => {
            const target = parseInt(c.getAttribute('data-target'), 10) || 0;
            animateCount(c, target, 1600);
          });
        }
        obs.disconnect();
      }
    });
  }, observerOptions);

  if (hero) revealObserver.observe(hero);

  // Parallax image movement on scroll (subtle)
  if (!reduceMotion && heroImage) {
    const maxTranslate = 18; // px
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const height = rect.height || 1;
      // percentage the hero is within the viewport from -1 to 1
      const pct = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + height), 0), 1);
      const translate = (pct - 0.5) * 2 * maxTranslate; // centered around 0
      heroImage.style.transform = `translateY(${translate}px) scale(1.02)`;
    };
    // throttle rAF
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { onScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    // initial position
    onScroll();
  }

})();
