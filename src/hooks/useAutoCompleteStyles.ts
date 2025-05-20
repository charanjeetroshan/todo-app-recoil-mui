import { SxProps, Theme } from "@mui/material";
import { Modifier } from "@popperjs/core";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

export function useAutoCompleteStyles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoCompleteSx, setAutoCompleteSx] = useState<SxProps<Theme>>();

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const updateAutoCompleteSx = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const left = containerRef.current.offsetLeft;

        setAutoCompleteSx({
          width: `${width}px !important`,
          left: `${left}px !important`,
        });
      }
    };

    updateAutoCompleteSx();

    const observer = new ResizeObserver(updateAutoCompleteSx);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const autoCompleteModifiers: Partial<Modifier<unknown, object>>[] = useMemo(() => {
    return [
      {
        name: "zeroX",
        enabled: true,
        phase: "beforeWrite",
        fn: ({ state }) => {
          const { transform } = state.styles.popper;
          const CSSMatrix = window.DOMMatrix || window.WebKitCSSMatrix;
          const matrix = new CSSMatrix(transform);
          matrix.m41 = 0;

          state.styles.popper.transform = matrix.toString();
        },
      },
    ];
  }, []);

  return { containerRef, autoCompleteSx, autoCompleteModifiers };
}
