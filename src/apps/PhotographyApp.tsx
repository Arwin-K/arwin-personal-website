import { useCallback, useEffect, useState } from "react";
import { photography } from "../data/hobbies";
import { Icon } from "../os/Icon";

export function PhotographyApp() {
  const { shots } = photography;
  const [active, setActive] = useState<number | null>(null);
  const activeShot = active !== null ? shots[active] : null;

  const step = useCallback(
    (delta: number) => setActive((i) => (i === null ? i : (i + delta + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  return (
    <div className="app app--framed photos">
      <div className="app__toolbar">
        <span className="crumb">
          <Icon name="photography" size={16} />
          Library
        </span>
        <span className="app__toolbar-meta photos__styles">{photography.style.join(" · ")}</span>
        <span className="app__toolbar-spacer" />
        <a className="btn" href={photography.instagramUrl} target="_blank" rel="noreferrer">
          <Icon name="instagram" size={14} />
          {photography.instagramHandle} ↗
        </a>
      </div>

      <div className="app__scroll photos__scroll">
        <div className="photos__grid">
          {shots.map((shot, i) => (
            <button key={shot.src} className="photos__tile" onClick={() => setActive(i)}>
              <img src={shot.src} alt={shot.caption} loading="lazy" />
              <span className="photos__caption">{shot.caption}</span>
            </button>
          ))}
        </div>
      </div>

      <footer className="app__status">
        <span>{shots.length} photos</span>
        <a href={photography.instagramUrl} target="_blank" rel="noreferrer">
          More on Instagram ↗
        </a>
      </footer>

      {activeShot && active !== null && (
        <div className="viewer" role="dialog" aria-label={activeShot.caption} onClick={() => setActive(null)}>
          <div className="viewer__bar" onClick={(e) => e.stopPropagation()}>
            <span>{activeShot.caption}</span>
            <span className="viewer__count">
              {active + 1} / {shots.length}
            </span>
            <button className="viewer__btn" onClick={() => setActive(null)} aria-label="Close">
              Done
            </button>
          </div>
          <div className="viewer__stage">
            <button
              className="viewer__nav viewer__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <img
              className="viewer__img"
              src={activeShot.src}
              alt={activeShot.caption}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="viewer__nav viewer__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
