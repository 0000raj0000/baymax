/** Pricing Page */
import { gsap } from 'gsap';

const BASE_PRICE = 30000;

const ADDONS = [
    { id: 'whatsapp', label: 'WhatsApp Integration', price: 8000 },
    { id: 'slack', label: 'Slack Integration', price: 6000 },
    { id: 'telegram', label: 'Telegram Integration', price: 5000 },
    { id: 'email', label: 'Email Automation', price: 7000 },
    { id: 'ai-training', label: 'Custom AI Training', price: 15000 },
    { id: 'analytics', label: 'Advanced Analytics Dashboard', price: 10000 },
    { id: 'support-24', label: '24/7 Priority Support', price: 12000 },
    { id: 'crm', label: 'CRM Integration', price: 9000 },
];

function formatINR(num) {
    return '₹' + num.toLocaleString('en-IN');
}

export function renderPricing() {
    const addonItems = ADDONS.map(
        (a) => `
    <div class="addon-item" data-addon="${a.id}" data-price="${a.price}">
      <label>
        <input type="checkbox" id="addon-${a.id}" aria-label="${a.label}" />
        ${a.label}
      </label>
      <span class="addon-price">+${formatINR(a.price)}</span>
    </div>
  `
    ).join('');

    return `
    <section class="pricing-page" aria-label="Pricing">
      <div class="pricing-container">
        <header class="pricing-header reveal">
          <h1>Simple, Transparent Pricing</h1>
          <p>Our automation solutions start at a base price. Add only what you need — pay for what you use.</p>
        </header>

        <article class="pricing-card reveal" style="transition-delay:200ms">
          <div class="pricing-base">
            <div class="pricing-base-label">
              <h3>Base Package</h3>
              <p>Core automation setup & AI agent</p>
            </div>
            <div class="pricing-base-amount">${formatINR(BASE_PRICE)} <span>/ project</span></div>
          </div>

          <div class="pricing-features">
            <h4>Included in base:</h4>
            <div class="feature-list">
              <div class="feature-item"><span class="check">✓</span> AI Agent Setup & Configuration</div>
              <div class="feature-item"><span class="check">✓</span> 1 Communication Channel</div>
              <div class="feature-item"><span class="check">✓</span> Basic Workflow Automation</div>
              <div class="feature-item"><span class="check">✓</span> Dashboard Access</div>
              <div class="feature-item"><span class="check">✓</span> 30 Days Support</div>
            </div>
          </div>

          <div class="addon-section">
            <h4>Add-ons:</h4>
            <div class="addon-list" id="addon-list">
              ${addonItems}
            </div>
          </div>

          <div class="pricing-total">
            <h3>Estimated Total</h3>
            <div class="total-amount" id="total-amount">${formatINR(BASE_PRICE)}</div>
          </div>

          <div class="pricing-cta">
            <a href="#contact" class="btn-primary">Get Started →</a>
          </div>
        </article>
      </div>
    </section>
  `;
}

export function initPricingInteractions() {
    // Reveals
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Pricing calculator
    const addonList = document.getElementById('addon-list');
    const totalEl = document.getElementById('total-amount');
    if (!addonList || !totalEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    addonList.addEventListener('change', () => {
        let total = BASE_PRICE;
        const checkboxes = addonList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb) => {
            const item = cb.closest('.addon-item');
            if (cb.checked) {
                total += parseInt(item.dataset.price, 10);
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        // Animate total
        if (!prefersReducedMotion) {
            gsap.fromTo(
                totalEl,
                { scale: 1.08, opacity: 0.7 },
                { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' }
            );
        }
        totalEl.textContent = formatINR(total);
    });

    // Also handle clicking the entire addon-item row
    addonList.querySelectorAll('.addon-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            if (e.target.tagName === 'INPUT') return; // let checkbox handle it
            const cb = item.querySelector('input[type="checkbox"]');
            cb.checked = !cb.checked;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });
}
