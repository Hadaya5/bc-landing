/**
 * Configuration constants for animations and intersection observers
 */

// Thresholds for IntersectionObserver
export const INTERSECTION_THRESHOLDS = {
    TESTIMONIES_SECTION: 0.06,
    DISCOVER_SECTION: 0.01,
    VIDEO_ELEMENTS: 0.6,
    ANIMATE_ON_SCROLL: 0.1,
} as const;

// GSAP animations configuration
export const GSAP_ANIMATIONS = {
    HORIZONTAL_SCROLL: {
        EASE: "none" as const,
        SCRUB: 1,
        END_OFFSET: 3000,
    },
    TEXT_SPLIT: {
        TYPE: "words, chars" as const,
        DURATION: 0.5,
        OPACITY: 0,
        Y_OFFSET: 20,
        STAGGER: 0.03,
        EASE: "power1.out" as const,
        SCROLL_TRIGGER: {
            START: "top 80%",
            END: "bottom 20%",
            TOGGLE_ACTIONS: "play none none none",
        },
    },
} as const;

// CSS selectors
export const CSS_SELECTORS = {
    ANIMATE_ON_SCROLL: ".animate-on-scroll",
} as const;
