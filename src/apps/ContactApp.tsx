import { useState } from "react";
import { profile } from "../data/profile";
import { Icon } from "../os/Icon";

const links = [
  { icon: "linkedin", label: "LinkedIn", value: `/in/${profile.linkedinHandle}`, href: profile.linkedin },
  { icon: "github", label: "GitHub", value: `@${profile.githubUser}`, href: profile.github },
  { icon: "x", label: "X", value: `@${profile.xHandle}`, href: profile.x },
  { icon: "instagram", label: "Instagram", value: `@${profile.instagramHandle}`, href: profile.instagram },
];

export function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="app contact">
      <p className="contact__intro">
        I welcome engineering, research, and collaboration inquiries. Email is the best way to reach me.
      </p>

      <div className="contact__mail">
        <span className="contact__mailicon">
          <Icon name="mail" size={28} />
        </span>
        <div className="contact__mailtext">
          <span className="contact__label">Email</span>
          <span className="contact__address">{profile.email}</span>
        </div>
        <div className="contact__actions">
          <button className="btn" onClick={copyEmail}>
            {copied ? "Copied" : "Copy"}
          </button>
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            Write
          </a>
        </div>
      </div>

      <h2 className="sect">Elsewhere</h2>
      <ul className="contact__links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer">
              <Icon name={link.icon} size={20} />
              <span className="contact__net">{link.label}</span>
              <span className="contact__handle">{link.value}</span>
              <span className="contact__go" aria-hidden>
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
