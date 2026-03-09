// Dynamically include footer links from a single source file.
// Place <div class="footer-links" data-include="footer-links"></div> in any page footer.

async function includeFooterLinks() {
  const containers = document.querySelectorAll('[data-include="footer-links"]');
  if (!containers.length) return;

  try {
    const response = await fetch('includes/footer-links.html');
    if (!response.ok) throw new Error(`Failed to load footer links: ${response.status}`);
    const html = await response.text();
    containers.forEach(el => {
      el.innerHTML = html;
    });
  } catch (err) {
    console.error('Footer include error', err);
  }
}

document.addEventListener('DOMContentLoaded', includeFooterLinks);
