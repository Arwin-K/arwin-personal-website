import { work } from "../data/work";
import { Icon } from "../os/Icon";

export function WorkApp() {
  return (
    <div className="app work">
      <header className="app-showcase__header"><span className="app-showcase__eyebrow">Experience / 2023—now</span><h2>Work in the real world.</h2><p>Products shipped, systems measured, and lessons carried forward.</p></header>
      {work.map((item) => (
        <article key={item.id} className={`doc work__item work__item--${item.id}`}>
          <div className="work__visual">
            <img
              src={item.id === "sellstatic" ? "/logos/sellstatic.png" : "/logos/amazon.png"}
              alt={`${item.id === "amazon" ? "Amazon" : item.company} logo`}
            />
          </div>
          <div className="doc__head">
            <Icon name={item.icon} size={30} />
            <div>
              <h2 className="doc__title">{item.role}</h2>
              <p className="doc__sub">
                {item.company} · {item.location}
              </p>
              <p className="doc__meta">{item.dates}</p>
            </div>
          </div>
          <p className="work__summary">{item.summary}</p>
          <div className="work__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p className="work__highlight">↗ {item.highlight}</p>
          <ul className="doc__list">
            {item.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
