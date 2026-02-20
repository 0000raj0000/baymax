/** Eye blink animation — GSAP */
import { gsap } from 'gsap';

let eyes = null;

function getEyes() {
    if (!eyes || !eyes.length) {
        eyes = document.querySelectorAll('.eye');
    }
    return eyes;
}

export default function blinker() {
    const eyeEls = getEyes();
    if (!eyeEls.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const initHeight = eyeEls[0].clientHeight;
    const initWidth = eyeEls[0].clientWidth;

    const tl = gsap.timeline();
    tl.to(eyeEls, {
        height: 6,
        width: initWidth,
        duration: 0.15,
    });
    tl.to(eyeEls, {
        height: initHeight,
        width: initWidth,
        duration: 0.15,
        delay: 0.1,
    });
}
