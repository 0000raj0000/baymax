/** Contact Us Page */

export function renderContact() {
    return `
    <section class="contact-hero" aria-label="Contact Us">
      <div class="container">
        <h1 class="reveal">Get In Touch</h1>
        <p class="reveal" style="transition-delay:150ms">Have a project in mind? Let's talk about how we can automate your workflows.</p>
      </div>
    </section>

    <section class="contact-info-section" aria-label="Contact Details">
      <div class="contact-grid container">
        <!-- Company & CEO -->
        <article class="company-card reveal">
          <h2>Baymax Automations</h2>
          <div class="ceo-block">
            <div class="ceo-avatar" aria-hidden="true">👤</div>
            <div class="ceo-info">
              <h3>Raj Narayan</h3>
              <p>Founder & CEO</p>
            </div>
          </div>
          <p>We are an AI-based system automation company specializing in intelligent communication, data automation, and workflow orchestration for businesses of all sizes.</p>
          
          <nav class="contact-channels" aria-label="Communication channels">
            <a href="https://wa.me/" class="channel-item" target="_blank" rel="noopener">
              <span class="channel-icon" aria-hidden="true">💬</span>
              WhatsApp
            </a>
            <a href="mailto:contact@baymaxautomations.com" class="channel-item">
              <span class="channel-icon" aria-hidden="true">✉️</span>
              contact@baymaxautomations.com
            </a>
            <a href="tel:+91" class="channel-item">
              <span class="channel-icon" aria-hidden="true">📞</span>
              +91 XXXXXXXXXX
            </a>
            <a href="https://linkedin.com/" class="channel-item" target="_blank" rel="noopener">
              <span class="channel-icon" aria-hidden="true">💼</span>
              LinkedIn
            </a>
          </nav>
        </article>

        <!-- Contact Form -->
        <article class="contact-form-card reveal" style="transition-delay:200ms">
          <h2>Send us a message</h2>
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-group">
              <label for="contact-name">Full Name</label>
              <input type="text" id="contact-name" name="name" placeholder="Your name" required />
            </div>
            <div class="form-group">
              <label for="contact-phone">Phone Number</label>
              <input type="tel" id="contact-phone" name="phone" placeholder="+91 XXXXXXXXXX" required />
            </div>
            <div class="form-group">
              <label for="contact-address">Address</label>
              <input type="text" id="contact-address" name="address" placeholder="City, State" />
            </div>
            <div class="form-group">
              <label for="contact-desc">How can we help?</label>
              <textarea id="contact-desc" name="description" placeholder="Describe your project or question..." required></textarea>
            </div>
            <input type="text" name="website" id="contact-website" style="display:none;">
            <button type="submit" class="btn-submit">Send Message →</button>
          </form>
        </article>
      </div>
    </section>
  `;
}

export function initContactPage() {
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

    // Form handler (client side only)
    const form = document.getElementById('contact-form');
    if (form) {
        // form.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     const btn = form.querySelector('.btn-submit');
        //     btn.textContent = 'Message Sent ✓';
        //     btn.style.background = 'var(--color-success)';
        //     setTimeout(() => {
        //         btn.textContent = 'Send Message →';
        //         btn.style.background = '';
        //         form.reset();
        //     }, 2500);
        // });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const btn = form.querySelector('.btn-submit');
            btn.disabled = true;
            btn.textContent = 'Sending...';
        
            const formData = {
                name: document.getElementById('contact-name').value.trim(),
                phone: document.getElementById('contact-phone').value.trim(),
                address: document.getElementById('contact-address').value.trim(),
                message: document.getElementById('contact-desc').value.trim(),
                website: document.getElementById('contact-website').value.trim()
            };
        
            try {
                const response = await fetch("https://contact-api.rajnamadev0.workers.dev", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
        
                if (response.ok) {
                    btn.textContent = 'Message Sent ✓';
                    btn.style.background = 'var(--color-success)';
                    form.reset();
                } else {
                    btn.textContent = 'Failed. Try Again';
                }
        
            } catch (error) {
                btn.textContent = 'Error. Try Again';
            }
        
            setTimeout(() => {
                btn.textContent = 'Send Message →';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    }
}
