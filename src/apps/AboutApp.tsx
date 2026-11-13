import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { Icon } from "../os/Icon";

function useTorontoTime() {
  const format = () =>
    new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", timeZone: "America/Toronto" });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const t = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export function AboutApp() {
  const torontoTime = useTorontoTime();
  const { education } = profile;

  return (
    <div className="app app--framed about">
      <div className="app__scroll">
        <header className="about__head">
          <img className="about__photo" src="/arwin-headshot.png" alt="Arwin Karir" />
          <div>
            <h1 className="about__name">{profile.name}</h1>
            <p className="about__role">{profile.tagline}</p>
            <p className="about__loc">
              <Icon name="pin" size={14} />
              {profile.location}
            </p>
          </div>
        </header>

        <p className="about__blurb">{profile.blurb}</p>

        <h2 className="sect">Education</h2>
        <dl className="props">
          <dt>School</dt>
          <dd>{education.school}</dd>
          <dt>Program</dt>
          <dd>{education.degree}</dd>
          <dt>Campus</dt>
          <dd>{education.location}</dd>
          <dt>Dates</dt>
          <dd>{education.dates}</dd>
        </dl>

        {profile.stacks.map((stack) => (
          <section key={stack.name}>
            <h2 className="sect">
              {stack.name}
              <small>{stack.items.length}</small>
            </h2>
            <ul className="stack">
              {stack.items.map((item) => (
                <li key={item.name} title={item.name}>
                  <img src={item.logo} alt="" width="18" height="18" />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer className="app__status">
        <span>about.txt</span>
        <span>Toronto · {torontoTime}</span>
      </footer>
    </div>
  );
}
