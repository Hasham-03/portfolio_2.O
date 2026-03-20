import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove, { passive: true });

    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");
    let rafId = 0;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        setX(cursorPos.x);
        setY(cursorPos.y);
      }
      rafId = requestAnimationFrame(loop);
    };
    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(loop);
    }
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const onOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          setX(rect.left);
          setY(rect.top);
          //   cursor.style.transform = `translate(${rect.left}px,${rect.top}px)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      element.addEventListener("mouseover", onOver, { passive: true });
      element.addEventListener("mouseout", onOut, { passive: true });
      (element as any).__cursorHandlers = { onOver, onOut };
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll("[data-cursor]").forEach((item) => {
        const element = item as any;
        const handlers = element.__cursorHandlers;
        if (handlers?.onOver) element.removeEventListener("mouseover", handlers.onOver);
        if (handlers?.onOut) element.removeEventListener("mouseout", handlers.onOut);
        delete element.__cursorHandlers;
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
