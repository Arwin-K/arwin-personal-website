import { useWallpaper } from "../os/WallpaperContext";
import { useTheme } from "../os/ThemeContext";

const MODES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
] as const;

export function DisplayApp() {
  const { wallpaperId, setWallpaperId, options } = useWallpaper();
  const { theme, setTheme } = useTheme();

  return (
    <div className="app display">
      <section className="pane">
        <h3 className="pane__title">Appearance</h3>
        <div className="modes" role="radiogroup" aria-label="Color mode">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              role="radio"
              aria-checked={theme === mode.id}
              className={`mode ${theme === mode.id ? "is-on" : ""}`}
              onClick={() => setTheme(mode.id)}
            >
              <span className={`mode__preview mode__preview--${mode.id}`} aria-hidden>
                <i />
                <b />
                <b />
              </span>
              <span className="mode__label">{mode.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="pane">
        <h3 className="pane__title">Wallpaper</h3>
        <div className="walls" role="radiogroup" aria-label="Wallpaper">
          {options.map((w) => (
            <button
              key={w.id}
              role="radio"
              aria-checked={wallpaperId === w.id}
              className={`wall ${wallpaperId === w.id ? "is-on" : ""}`}
              onClick={() => setWallpaperId(w.id)}
            >
              <span className="wall__thumb" style={{ backgroundImage: `url(${w.src})` }} />
              <span className="wall__name">{w.name}</span>
            </button>
          ))}
        </div>
      </section>

      <p className="display__note">Your choices are saved in this browser for your next visit.</p>
    </div>
  );
}
