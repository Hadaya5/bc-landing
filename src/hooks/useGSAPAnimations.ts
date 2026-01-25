import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap-trial/SplitText";
import { GSAP_ANIMATIONS } from "@/lib/animations";

interface UseGSAPAnimationsProps {
    containerRef: React.RefObject<HTMLElement>;
    trackRef: React.RefObject<HTMLElement>;
    introPanelRef: React.RefObject<HTMLElement>;
}

/**
 * Custom hook to manage all GSAP animations in the component
 * Handles horizontal scroll for testimonial panels and split text animation
 */
export function useGSAPAnimations({
    containerRef,
    trackRef,
    introPanelRef,
}: UseGSAPAnimationsProps) {
    useGSAP(
        () => {
            // Horizontal scroll animation for testimonial panels
            const track = trackRef.current;
            if (!track) return;

            const totalWidth = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalWidth,
                ease: GSAP_ANIMATIONS.HORIZONTAL_SCROLL.EASE,
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: GSAP_ANIMATIONS.HORIZONTAL_SCROLL.SCRUB,
                    end: `+=${GSAP_ANIMATIONS.HORIZONTAL_SCROLL.END_OFFSET}`,
                },
            });

            // Split text animation for the introduction panel
            const introPanel = introPanelRef.current;
            if (!introPanel) return;

            const split = new SplitText(introPanel, {
                type: GSAP_ANIMATIONS.TEXT_SPLIT.TYPE,
            });

            gsap.from(split.chars, {
                scrollTrigger: {
                    trigger: introPanel,
                    start: GSAP_ANIMATIONS.TEXT_SPLIT.SCROLL_TRIGGER.START,
                    end: GSAP_ANIMATIONS.TEXT_SPLIT.SCROLL_TRIGGER.END,
                    toggleActions: GSAP_ANIMATIONS.TEXT_SPLIT.SCROLL_TRIGGER.TOGGLE_ACTIONS,
                },
                duration: GSAP_ANIMATIONS.TEXT_SPLIT.DURATION,
                opacity: GSAP_ANIMATIONS.TEXT_SPLIT.OPACITY,
                y: GSAP_ANIMATIONS.TEXT_SPLIT.Y_OFFSET,
                stagger: GSAP_ANIMATIONS.TEXT_SPLIT.STAGGER,
                ease: GSAP_ANIMATIONS.TEXT_SPLIT.EASE,
            });

            return () => {
                split.revert();
            };
        },
        { scope: containerRef }
    );
}
