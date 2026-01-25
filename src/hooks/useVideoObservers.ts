import { useIntersect } from "./useIntersect";
import { INTERSECTION_THRESHOLDS } from "@/lib/animations";

/**
 * Custom hook to manage intersection observers for video elements
 * @returns Object containing references and visibility states for the three videos
 */
export function useVideoObservers() {
    const { intersectionRef: video1Ref, isVisible: video1IsVisible } =
        useIntersect(INTERSECTION_THRESHOLDS.VIDEO_ELEMENTS);
    const { intersectionRef: video2Ref, isVisible: video2IsVisible } =
        useIntersect(INTERSECTION_THRESHOLDS.VIDEO_ELEMENTS);
    const { intersectionRef: video3Ref, isVisible: video3IsVisible } =
        useIntersect(INTERSECTION_THRESHOLDS.VIDEO_ELEMENTS);

    return {
        video1: { ref: video1Ref, isVisible: video1IsVisible },
        video2: { ref: video2Ref, isVisible: video2IsVisible },
        video3: { ref: video3Ref, isVisible: video3IsVisible },
    };
}
