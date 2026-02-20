/** What We Do Page */
import { gsap } from 'gsap';

export function renderWhatWeDo() {
    return `
    <section class="wwd-hero" aria-label="What We Do">
      <div class="container">
        <h1 class="reveal">What We Do</h1>
        <p class="reveal" style="transition-delay:150ms">We build intelligent automation systems that connect your communication channels, automate data workflows, and let AI handle what humans shouldn't have to.</p>
      </div>
    </section>

    <section class="wwd-section" aria-label="Communication Channel Integration">
      <div class="wwd-card-grid container">
        <div class="wwd-text reveal">
          <h2>Communication Channel Integration</h2>
          <p>Connect WhatsApp, Slack, Telegram, Email, and more — all into one AI-powered hub. Your customers reach out on their favorite platform; your AI responds instantly on all of them.</p>
          <p>No more juggling dashboards. One brain, every channel.</p>
        </div>
        <div class="wwd-visual reveal" style="transition-delay:200ms">
          <div class="channel-hub" id="channel-hub">
            <div class="hub-center">AI</div>
            <div class="channel-node" data-anim="channel">💬</div>
            <div class="channel-node" data-anim="channel">📱</div>
            <div class="channel-node" data-anim="channel">✉️</div>
            <div class="channel-node" data-anim="channel">💼</div>
            <div class="channel-node" data-anim="channel">📞</div>
            <div class="channel-node" data-anim="channel">🔔</div>
          </div>
        </div>
      </div>
    </section>

    <section class="wwd-section" aria-label="Data Task Automation">
      <div class="wwd-card-grid reverse container">
        <div class="wwd-text reveal">
          <h2>Data Task Automation</h2>
          <p>From raw data ingestion to analysis and reporting — our AI pipelines transform how you handle information. Automated scoring, categorization, and insight generation, all running in the background.</p>
          <p>Your data works for you, not the other way around.</p>
        </div>
        <div class="wwd-visual reveal" style="transition-delay:200ms">
          <div class="pipeline-visual" id="pipeline-visual">
            <div class="pipeline-stage" data-anim="pipeline">
              <div class="pipeline-icon">📥</div>
              <div class="pipeline-text">
                <h4>Data Ingestion</h4>
                <p>Collect from APIs, forms, emails</p>
              </div>
            </div>
            <div class="pipeline-arrow" data-anim="pipeline">↓</div>
            <div class="pipeline-stage" data-anim="pipeline">
              <div class="pipeline-icon">🔄</div>
              <div class="pipeline-text">
                <h4>AI Processing</h4>
                <p>Clean, classify, enrich</p>
              </div>
            </div>
            <div class="pipeline-arrow" data-anim="pipeline">↓</div>
            <div class="pipeline-stage" data-anim="pipeline">
              <div class="pipeline-icon">📊</div>
              <div class="pipeline-text">
                <h4>Analysis & Insights</h4>
                <p>Trends, scores, predictions</p>
              </div>
            </div>
            <div class="pipeline-arrow" data-anim="pipeline">↓</div>
            <div class="pipeline-stage" data-anim="pipeline">
              <div class="pipeline-icon">📤</div>
              <div class="pipeline-text">
                <h4>Automated Actions</h4>
                <p>Reports, alerts, follow-ups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initWhatWeDoAnimations() {
    // Reveals
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    // Channel hub
    initChannelAnimation();
    // Pipeline
    initPipelineAnimation();
}

function initChannelAnimation() {
    const hub = document.getElementById('channel-hub');
    if (!hub) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const nodes = hub.querySelectorAll('.channel-node');
                    nodes.forEach((node, i) => {
                        gsap.to(node, {
                            opacity: 1,
                            scale: 1,
                            duration: prefersReducedMotion ? 0.01 : 0.5,
                            delay: 0.3 + i * 0.15,
                            ease: 'back.out(1.4)',
                            clearProps: 'transform',
                            onComplete: () => {
                                // Preserve the positioning transforms after animation
                                node.classList.add('visible');
                            }
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    observer.observe(hub);
}

function initPipelineAnimation() {
    const pipeline = document.getElementById('pipeline-visual');
    if (!pipeline) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const items = pipeline.querySelectorAll('[data-anim="pipeline"]');
                    items.forEach((item, i) => {
                        gsap.to(item, {
                            opacity: 1,
                            y: 0,
                            duration: prefersReducedMotion ? 0.01 : 0.5,
                            delay: 0.2 + i * 0.2,
                            ease: 'power3.out',
                            onComplete: () => item.classList.add('visible'),
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    observer.observe(pipeline);
}
