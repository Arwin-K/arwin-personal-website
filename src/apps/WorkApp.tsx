import { work } from "../data/work";
import { Icon } from "../os/Icon";

const LOGOS: Record<string, { src: string; alt: string }> = {
  sellstatic: { src: "/logos/sellstatic.png", alt: "SellStatic logo" },
  amazon: { src: "/logos/amazon.png", alt: "Amazon logo" },
};

export function WorkApp() {
  return (
    <div className="app app--framed work">
      <div className="app__toolbar">
        <span className="crumb">
          <Icon name="work" size={16} />
          ~/work
        </span>
        <span className="app__toolbar-spacer" />
        <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">
          <Icon name="resume" size={14} />
          Resume
        </a>
      </div>

      <div className="app__scroll">
        <ol className="jobs">
          {work.map((item) => {
            const logo = LOGOS[item.id];
            return (
              <li key={item.id} className="job">
                <div className="job__logo">
                  {logo ? <img src={logo.src} alt={logo.alt} /> : <Icon name={item.icon} size={26} />}
                </div>
                <div className="job__body">
                  <header className="job__head">
                    <div>
                      <h3 className="job__role">{item.role}</h3>
                      <p className="job__org">
                        {item.company} · {item.location}
                      </p>
                    </div>
                    <span className="job__dates">{item.dates}</span>
                  </header>
                  <p className="job__summary">{item.summary}</p>
                  <p className="job__result">
                    <span className="mark">{item.highlight}</span>
                  </p>
                  <ul className="job__list">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <footer className="app__status">
        <span>{work.length} positions</span>
        <span>2023 – present</span>
      </footer>
    </div>
  );
}
