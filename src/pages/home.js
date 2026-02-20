/** Home Page — render & animations */
import { gsap } from 'gsap';

export function renderHome() {
    return `
    <section class="hero" aria-label="Hero section">
      <h1 class="hero-tagline reveal">
        WHAT YOU <span class="stroke-text">THINK</span> IS<br>
        WHAT WE <span class="stroke-text">MAKE</span>
      </h1>
      <div class="hero-video-card reveal" style="transition-delay:200ms"></div>
      <a href="#contact" class="hero-cta-mobile reveal" style="transition-delay:400ms">CONTACT US</a>
    </section>

    <!-- Ideology 1: Reply at Midnight -->
    <section class="ideology-section" id="ideology-chat" aria-label="24/7 AI Customer Service">
      <div class="ideology-inner">
        <div class="ideology-text reveal">
          <h2>Want your users replied to,<br>even at midnight?</h2>
          <p>Your AI customer-service agent never sleeps. It answers questions, handles complaints, and closes queries — at 3 PM or 12 AM, it doesn't matter.</p>
        </div>
        <div class="phone-mockup reveal" style="transition-delay:200ms">
          <div class="phone-notch"></div>
          <div class="chat-area" id="chat-animation">
            <div class="chat-time" id="chat-time-start">11:58 PM</div>
            <div class="chat-bubble user" id="chat-user-1">Hey, I placed an order #4521 but haven't received any update yet?</div>
            <div class="typing-indicator" id="chat-typing">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <div class="chat-bubble ai" id="chat-ai-1">Hi! Let me check that for you. Order #4521 has been dispatched and will arrive by tomorrow morning 🚀</div>
            <div class="chat-bubble user" id="chat-user-2">That's great, thanks!</div>
            <div class="chat-time" id="chat-time-end">12:01 AM</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ideology 2: Scheduling & Reports -->
    <section class="ideology-section" id="ideology-schedule" aria-label="AI Scheduling & Reports">
      <div class="ideology-inner">
        <div class="schedule-mockup reveal">
          <div class="schedule-header">
            <h3>📋 Daily Report</h3>
            <span class="badge">AI Generated</span>
          </div>
          <div id="schedule-items">
            <div class="schedule-item" data-anim="schedule">
              <span class="schedule-dot"></span>
              <div class="schedule-item-content">
                <h4>Morning Briefing Sent</h4>
                <p>9:00 AM — 3 tasks, 2 follow-ups</p>
              </div>
            </div>
            <div class="schedule-item" data-anim="schedule">
              <span class="schedule-dot"></span>
              <div class="schedule-item-content">
                <h4>Customer Analysis Complete</h4>
                <p>12:30 PM — 47 leads scored</p>
              </div>
            </div>
            <div class="schedule-item" data-anim="schedule">
              <span class="schedule-dot"></span>
              <div class="schedule-item-content">
                <h4>End-of-Day Summary</h4>
                <p>6:00 PM — Revenue +12% this week</p>
              </div>
            </div>
            <div class="schedule-item" data-anim="schedule">
              <span class="schedule-dot"></span>
              <div class="schedule-item-content">
                <h4>Automated Follow-ups</h4>
                <p>8:00 PM — 5 emails sent</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ideology-text reveal" style="transition-delay:200ms">
          <h2>Scheduling work tasks<br>like a personal assistant</h2>
          <p>Your AI assistant sends daily reports, performs customer analysis, triggers follow-ups — all on schedule, without you lifting a finger.</p>
        </div>
      </div>
    </section>

    <!-- Ideology 3: Agent doing tasks -->
    <section class="ideology-section" id="ideology-agent" aria-label="AI Agent Task Management">
      <div class="ideology-inner">
        <div class="ideology-text reveal">
          <h2>Want somebody to<br>just look for you?</h2>
          <p>Tell your AI agent what to do and when. It will remind you, execute tasks, send messages, and handle things on your behalf — like your own digital right hand.</p>
        </div>
        <div class="agent-flow reveal" style="transition-delay:200ms" id="agent-flow">
          <div class="agent-node" data-anim="agent">
            <div class="node-icon">👤</div>
            Boss gives a command
          </div>
          <div class="agent-connector" data-anim="agent"></div>
          <div class="agent-node" data-anim="agent">
            <div class="node-icon">🤖</div>
            AI Agent receives task
          </div>
          <div class="agent-connector" data-anim="agent"></div>
          <div class="agent-node" data-anim="agent">
            <div class="node-icon">📅</div>
            Waits for scheduled date
          </div>
          <div class="agent-connector" data-anim="agent"></div>
          <div class="agent-node" data-anim="agent">
            <div class="node-icon">✅</div>
            Task executed & reported
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initHomeAnimations() {
    // Reveal on scroll via IntersectionObserver
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
        { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Chat animation
    initChatAnimation();
    // Schedule animation
    initScheduleAnimation();
    // Agent flow animation
    initAgentAnimation();
}

function initChatAnimation() {
    const chatSection = document.getElementById('ideology-chat');
    if (!chatSection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runChatTimeline(prefersReducedMotion);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    observer.observe(chatSection);
}

function runChatTimeline(reduced) {
    const tl = gsap.timeline({ delay: 0.5 });
    const dur = reduced ? 0.01 : 0.4;

    tl.to('#chat-time-start', { opacity: 1, duration: dur })
        .to('#chat-user-1', { opacity: 1, duration: dur, y: 0 }, '+=0.3')
        .to('#chat-typing', { opacity: 1, duration: dur * 0.5 }, '+=0.4')
        .to('#chat-typing', { opacity: 0, duration: dur * 0.5 }, '+=1')
        .to('#chat-ai-1', { opacity: 1, duration: dur }, '+=0.1')
        .to('#chat-user-2', { opacity: 1, duration: dur }, '+=0.5')
        .to('#chat-time-end', { opacity: 1, duration: dur }, '+=0.3');
}

function initScheduleAnimation() {
    const section = document.getElementById('ideology-schedule');
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const items = section.querySelectorAll('.schedule-item');
                    items.forEach((item, i) => {
                        gsap.to(item, {
                            opacity: 1,
                            x: 0,
                            duration: prefersReducedMotion ? 0.01 : 0.5,
                            delay: 0.3 + i * 0.25,
                            ease: 'power3.out',
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    observer.observe(section);
}

function initAgentAnimation() {
    const section = document.getElementById('ideology-agent');
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const nodes = section.querySelectorAll('[data-anim="agent"]');
                    nodes.forEach((node, i) => {
                        gsap.to(node, {
                            opacity: 1,
                            scale: 1,
                            duration: prefersReducedMotion ? 0.01 : 0.4,
                            delay: 0.3 + i * 0.2,
                            ease: 'back.out(1.2)',
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    observer.observe(section);
}
