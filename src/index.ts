import { useCallback, useEffect, useRef } from "react";

type ScrollSyncElement = HTMLElement | null;

/**
 * A React hook that synchronizes scrolling across multiple elements.
 *
 * @param refs An array of React refs pointing to the elements to be synchronized.
 * @param options Optional configuration for the hook.
 * @param options.horizontal Enable horizontal scroll synchronization. Defaults to `true`.
 * @param options.vertical Enable vertical scroll synchronization. Defaults to `true`.
 * @param options.proportional Enable proportional scroll synchronization. Defaults to `true`.
 * @returns A function to manually trigger a scroll synchronization.
 */
export function useScrollSync(
  refs: React.RefObject<ScrollSyncElement>[],
  options?: {
    horizontal?: boolean;
    vertical?: boolean;
    proportional?: boolean;
  }
) {
  const {
    horizontal = true,
    vertical = true,
    proportional = true,
  } = options || {};
  const activeElementRef = useRef<ScrollSyncElement | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  const syncScroll = useCallback(
    (scrollingElement: ScrollSyncElement) => {
      if (!scrollingElement || isProgrammaticScrollRef.current) {
        return;
      }

      isProgrammaticScrollRef.current = true;

      refs.forEach((ref) => {
        const element = ref.current;
        if (element && element !== scrollingElement) {
          if (horizontal) {
            if (proportional) {
              element.scrollLeft =
                (scrollingElement.scrollLeft /
                  (scrollingElement.scrollWidth -
                    scrollingElement.clientWidth)) *
                (element.scrollWidth - element.clientWidth);
            } else {
              element.scrollLeft = scrollingElement.scrollLeft;
            }
          }
          if (vertical) {
            if (proportional) {
              element.scrollTop =
                (scrollingElement.scrollTop /
                  (scrollingElement.scrollHeight -
                    scrollingElement.clientHeight)) *
                (element.scrollHeight - element.clientHeight);
            } else {
              element.scrollTop = scrollingElement.scrollTop;
            }
          }
        }
      });

      requestAnimationFrame(() => {
        isProgrammaticScrollRef.current = false;
      });
    },
    [refs, horizontal, vertical, proportional]
  );

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as ScrollSyncElement;
      if (target && refs.some((ref) => ref.current === target)) {
        activeElementRef.current = target;
        syncScroll(target);
      }
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as ScrollSyncElement;
      if (target && refs.some((ref) => ref.current === target)) {
        activeElementRef.current = target;
      }
    };

    const elements = refs
      .map((ref) => ref.current)
      .filter(Boolean) as HTMLElement[];

    elements.forEach((element) => {
      element.addEventListener("scroll", handleScroll, { passive: true });
      element.addEventListener("mouseenter", handleMouseEnter, {
        passive: true,
      });
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("scroll", handleScroll);
        element.removeEventListener("mouseenter", handleMouseEnter);
      });
    };
  }, [refs, syncScroll]);

  const triggerSync = useCallback(() => {
    if (activeElementRef.current) {
      syncScroll(activeElementRef.current);
    }
  }, [syncScroll]);

  return { triggerSync };
}
