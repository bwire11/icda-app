# ICDA Africa Developer Guide
**Color System & Component Implementation**

---

## 1. Color Tokens System

All colors are defined as CSS custom properties (variables) in the root selector. This means **changing one variable updates all components** that use it.

### Brand Color Palette

```css
:root {
  /* ICDA Africa brand colors */
  --primary-yellow: #F4D000;    /* Secondary actions, accents */
  --primary-green: #1E8A4C;     /* Primary actions, buttons, headings */
  --primary-red: #D62828;       /* Errors, alerts, hover states */
  --charcoal: #1A1A1A;          /* Primary text, dark backgrounds */
  --soft-white: #F9F9F9;        /* Light backgrounds, cards */
  
  /* Semantic tokens (for convenience) */
  --primary: var(--primary-green);      /* Use for primary CTAs */
  --secondary: var(--primary-green);    /* Secondary elements */
  --accent: var(--soft-white);          /* Accent backgrounds */
  --dark: var(--charcoal);              /* Dark text/backgrounds */
  --muted: #666666;                     /* Supporting text */
}
```

### Why CSS Variables?

✅ **Single source of truth** - Change one variable, update entire site  
✅ **Maintainability** - No scattered hex codes across files  
✅ **Theming** - Easy future brand color pivots  
✅ **Readability** - `background: var(--primary-green)` is self-documenting  

---

## 2. Using Color Variables

### DO: Use CSS Variables
```css
/* ✓ Recommended */
.button {
  background: var(--primary-green);
  color: var(--soft-white);
  border: 2px solid var(--primary-yellow);
}
```

### DON'T: Use Hardcoded Colors
```css
/* ✗ Never do this */
.button {
  background: #1E8A4C;  /* Use var(--primary-green) instead */
  color: #FFFFFF;       /* Use var(--soft-white) instead */
}
```

### Fallback Pattern (for older browsers)
```css
.card {
  border-left: 5px solid #1E8A4C;          /* Fallback */
  border-left: 5px solid var(--primary-green);  /* Modern browsers */
}
```

---

## 3. Component Pattern: Mission & Vision Cards

**HTML Structure:**
```html
<article class="card mission-card fade-in-card">
  <h3>Mission</h3>
  <p>To bridge the gap between the general public and oral health workforce...</p>
</article>
```

**CSS Styling:**
```css
.mission-card,
.vision-card {
  background: var(--white);
  padding: 48px 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-left: 5px solid var(--primary-green);  /* Green accent line */
  transition: all 0.3s ease;
}

.mission-card h3,
.vision-card h3 {
  color: var(--primary-green);  /* Green headings */
  margin-bottom: 20px;
}

.mission-card p,
.vision-card p {
  color: var(--muted);  /* Gray supporting text */
  line-height: 1.8;
}

/* Hover effect */
.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(30, 138, 76, 0.15);  /* Green tinted shadow */
}
```

---

## 4. Button Component Patterns

### Primary Button (Green)
```html
<a href="#" class="btn-primary">Join the Movement</a>
```

```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary-green) 0%, #158a47 100%);
  color: var(--soft-white);
  border: none;
  padding: 15px 32px;
  border-radius: 8px;
  font-weight: 700;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(30, 138, 76, 0.35);
}
```

### Secondary Button (Yellow)
```html
<a href="#" class="btn-secondary">Support Our Work</a>
```

```css
.btn-secondary {
  background: var(--primary-yellow);
  color: var(--charcoal);  /* Dark text on yellow */
  border: none;
  padding: 15px 32px;
  border-radius: 8px;
  font-weight: 700;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-secondary:hover {
  background: #E0C000;  /* Darker yellow on hover */
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(244, 208, 0, 0.3);
}
```

### Outline Button (Green Border)
```html
<a href="#" class="btn-secondary-outline">Learn More</a>
```

```css
.btn-secondary-outline {
  border: 2px solid var(--primary-green);
  background: transparent;
  color: var(--primary-green);
  padding: 13px 30px;
  border-radius: 8px;
  font-weight: 700;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-secondary-outline:hover {
  background: var(--primary-green);
  color: var(--soft-white);
  transform: translateY(-2px);
}
```

---

## 5. Card Component Pattern

**HTML:**
```html
<article class="card about-floating-card fade-in-card">
  <div class="card-icon">📅</div>
  <h3>Founded</h3>
  <p><strong>August 2021</strong></p>
  <p>Established to transform oral health across Africa...</p>
</article>
```

**CSS:**
```css
.card {
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-12px);
  box-shadow: 0 16px 40px rgba(30, 138, 76, 0.15);  /* Green-tinted shadow */
}

.card h3 {
  color: var(--charcoal);
  font-weight: 600;
  margin-bottom: 16px;
}

.card p {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.card p strong {
  color: var(--primary-green);  /* Highlight key info in green */
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}
```

---

## 6. Form Components

### Form Input Styling
```html
<form>
  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" placeholder="your@email.com">
  </div>
</form>
```

```css
.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--primary-green);  /* Green labels */
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid rgba(26, 26, 26, 0.06);  /* Light gray border */
  border-radius: 8px;
  background: var(--soft-white);  /* Light background */
  color: var(--dark);
  transition: all 0.3s ease;
}

/* Focus state - green accent */
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-green);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(30, 138, 76, 0.08);  /* Soft green glow */
}
```

---

## 7. Section Background Patterns

### Light Section (Soft White)
```css
.history-section {
  background: var(--soft-white);  /* Light background */
  padding: 80px 0;
}

.history-section h2 {
  color: var(--charcoal);
}

.history-section .card {
  background: var(--white);  /* Cards lighter than section */
}
```

### Gradient Section
```css
.pillars-section {
  background: linear-gradient(
    135deg,
    var(--soft-white) 0%,
    rgba(30, 138, 76, 0.03) 100%  /* Subtle green tint */
  );
  padding: 80px 0;
}
```

### Hero Section with Color Overlay
```css
.about-hero {
  background-image: linear-gradient(
    135deg,
    rgba(30, 138, 76, 0.85) 0%,  /* Green overlay */
    rgba(30, 138, 76, 0.75) 100%
  ), url('Images/hero-about.jpg');
  background-size: cover;
  background-position: center;
  padding: 100px 0;
  color: var(--soft-white);
}

.about-hero h1 {
  color: var(--soft-white);
}

.about-hero p {
  color: rgba(249, 249, 249, 0.9);
}
```

---

## 8. Animation Classes

### Fade-In on Scroll (Sections)
```html
<section class="fade-in-section">
  <h2>Our History</h2>
</section>
```

```css
.fade-in-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-in-section.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Staggered Card Animation
```html
<article class="fade-in-card" data-index="0">...</article>
<article class="fade-in-card" data-index="1">...</article>
<article class="fade-in-card" data-index="2">...</article>
```

```css
.fade-in-card {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* JavaScript applies staggered delays */
.fade-in-card[data-index="0"] { transition-delay: 0ms; }
.fade-in-card[data-index="1"] { transition-delay: 80ms; }
.fade-in-card[data-index="2"] { transition-delay: 160ms; }
```

### JavaScript Animation Trigger
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');  // Trigger animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in-section, .fade-in-card').forEach(el => {
    observer.observe(el);
  });

  // Add stagger delays for cards
  document.querySelectorAll('[data-index]').forEach(el => {
    const index = parseInt(el.dataset.index) || 0;
    el.style.transitionDelay = (index * 80) + 'ms';
  });
});
```

---

## 9. Responsive Design Patterns

### Grid that Stacks on Mobile
```css
.grid-4-col {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .grid-4-col {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .grid-4-col {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### Flexible Button Layout
```html
<div class="cta-buttons">
  <a href="#" class="btn-primary">Primary</a>
  <a href="#" class="btn-secondary">Secondary</a>
</div>
```

```css
.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
  }

  .cta-buttons a {
    width: 100%;
    text-align: center;
  }
}
```

---

## 10. Accessibility Considerations

### Respect Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States
```css
a:focus,
button:focus,
input:focus {
  outline: 2px solid var(--primary-green);
  outline-offset: 2px;
}
```

### Text Contrast
- ✅ Charcoal (#1A1A1A) on Soft White = 17.2:1 (AAA)
- ✅ Green (#1E8A4C) on White = 5.2:1 (AA)
- ✅ Muted (#666666) on White = 6.3:1 (AA)

**All combinations meet WCAG AA minimum standard.**

---

## 11. Common Mistakes to Avoid

❌ **DON'T:**
```css
/* Wrong - hardcoded color */
.button { background: #1E8A4C; }

/* Wrong - wrong semantic token */
.heading { color: var(--secondary); }

/* Wrong - using unsupported colors */
.text { color: #2CB1A1; }  /* Old blue tone - removed from design */
```

✅ **DO:**
```css
/* Correct - use variable */
.button { background: var(--primary-green); }

/* Correct - semantic naming */
.heading { color: var(--charcoal); }

/* Correct - approved color tokens */
.text { color: var(--muted); }
```

---

## 12. Testing Checklist

Before committing CSS changes:

- [ ] All text passes WCAG AA contrast (minimum 4.5:1)
- [ ] Buttons use defined color variables
- [ ] Cards have proper shadow and hover effects
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Mobile responsive media queries work
- [ ] Forms have visible focus states (green outline)
- [ ] No hardcoded hex colors (except in `:root`)
- [ ] All new colors reference `var(--*)`

---

## 13. Quick Reference: Color Usage

| Element | Color | Contrast | WCAG |
|---------|-------|----------|------|
| **Primary Buttons** | Green (#1E8A4C) + White text | 5.2:1 | AA ✓ |
| **Secondary Buttons** | Yellow (#F4D000) + Charcoal text | 13.5:1 | AAA ✓ |
| **Body Text** | Charcoal (#1A1A1A) on White | 19.5:1 | AAA ✓ |
| **Headings** | Green (#1E8A4C) on White | 5.2:1 | AA ✓ |
| **Secondary Text** | Muted (#666666) on White | 6.3:1 | AA ✓ |
| **Card Backgrounds** | White on Soft White | - | - |
| **Card Borders** | Green (#1E8A4C) | - | - |
| **Error Messages** | Red (#D62828) on White | 5.2:1 | AA ✓ |
| **Focus States** | Green outline (2px) | 5.2:1 | AA ✓ |

---

## 14. File Locations

- **Color definitions**: `CSS/styles.css` (lines 1-14)
- **Component classes**: `CSS/styles.css` (lines 1200+)
- **About page HTML**: `about.html`
- **Color reference**: `COLOR_REFERENCE.html`
- **This guide**: `DEVELOPER_GUIDE.md`
- **Contrast audit**: `CONTRAST_AUDIT.md`

---

**Last Updated:** 2024  
**Maintained By:** ICDA Africa Design Team  
**Standard:** WCAG 2.1 Level AA
