import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement | null;
    if (!social) return;

    const spans = Array.from(social.querySelectorAll("span")) as HTMLElement[];
    const items = spans
      .map((elem) => {
        const link = elem.querySelector("a") as HTMLElement | null;
        if (!link) return null;
        return {
          elem,
          link,
          targetX: 0,
          targetY: 0,
          currentX: 0,
          currentY: 0,
        };
      })
      .filter(Boolean) as Array<{
      elem: HTMLElement;
      link: HTMLElement;
      targetX: number;
      targetY: number;
      currentX: number;
      currentY: number;
    }>;

    const setToCenter = (it: (typeof items)[number]) => {
      const rect = it.elem.getBoundingClientRect();
      it.targetX = rect.width / 2;
      it.targetY = rect.height / 2;
    };
    items.forEach(setToCenter);

    const onPointerMove = (e: PointerEvent) => {
      const targetSpan = (e.target as HTMLElement | null)?.closest("span") as
        | HTMLElement
        | null;

      items.forEach((it) => {
        if (!targetSpan || it.elem !== targetSpan) {
          setToCenter(it);
          return;
        }
        const rect = it.elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          it.targetX = x;
          it.targetY = y;
        } else {
          it.targetX = rect.width / 2;
          it.targetY = rect.height / 2;
        }
      });
    };

    const onPointerLeave = () => {
      items.forEach(setToCenter);
    };

    social.addEventListener("pointermove", onPointerMove, { passive: true });
    social.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let rafId = 0;
    const loop = () => {
      items.forEach((it) => {
        it.currentX += (it.targetX - it.currentX) * 0.1;
        it.currentY += (it.targetY - it.currentY) * 0.1;
        it.link.style.setProperty("--siLeft", `${it.currentX}px`);
        it.link.style.setProperty("--siTop", `${it.currentY}px`);
      });
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      social.removeEventListener("pointermove", onPointerMove);
      social.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/Hasham-03" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/mohammed-hasham-38765a27a" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com/Hasham334" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/mohammed_hasham_03" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/hasham.pdf" target="_blank">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
