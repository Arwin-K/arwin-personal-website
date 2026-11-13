import { useGitHubUser, useGitHubRepos, languageBreakdown } from "../hooks/useGitHub";
import { profile } from "../data/profile";
import { languageColor } from "../data/languages";
import { useTheme } from "../os/ThemeContext";
import { RepoList } from "./RepoList";

export function GitHubApp() {
  const { theme } = useTheme();
  const { user, loading, error } = useGitHubUser();
  const { repos } = useGitHubRepos();
  const langs = languageBreakdown(repos).slice(0, 6);
  const langTotal = langs.reduce((sum, [, count]) => sum + count, 0) || 1;
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

  if (loading) {
    return (
      <div className="app github github--state">
        <p className="empty">Fetching @{profile.githubUser} from GitHub…</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="app github github--state">
        <p className="empty">GitHub's API didn't respond. It rate-limits anonymous requests now and then.</p>
        <a className="btn btn--primary" href={profile.github} target="_blank" rel="noreferrer">
          Open github.com/{profile.githubUser} ↗
        </a>
      </div>
    );
  }

  const stats = [
    { n: user.public_repos, label: "repos" },
    { n: user.followers, label: "followers" },
    { n: user.following, label: "following" },
    { n: totalStars, label: "stars" },
  ];

  return (
    <div className="app app--framed github">
      <div className="app__scroll">
        <header className="gh__head">
          <img className="gh__avatar" src={user.avatar_url} alt="" />
          <div className="gh__id">
            <h2 className="gh__name">{user.name ?? user.login}</h2>
            <a className="gh__login" href={user.html_url} target="_blank" rel="noreferrer">
              @{user.login}
            </a>
            {user.bio && <p className="gh__bio">{user.bio}</p>}
          </div>
          <a className="btn" href={user.html_url} target="_blank" rel="noreferrer">
            Open profile ↗
          </a>
        </header>

        <dl className="gh__stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.n}</dd>
            </div>
          ))}
        </dl>

        <h2 className="sect">Contributions</h2>
        <a className="gh__contrib" href={user.html_url} target="_blank" rel="noreferrer">
          <img
            src={
              theme === "dark"
                ? `https://ghchart.xqsit94.in/dark:2f7d3a/${user.login}`
                : `https://ghchart.rshah.org/2f7d3a/${user.login}`
            }
            alt={`${user.login} GitHub contribution chart`}
            loading="lazy"
          />
        </a>

        {langs.length > 0 && (
          <>
            <h2 className="sect">
              Languages
              <small>by repository</small>
            </h2>
            <div className="langbar" aria-hidden>
              {langs.map(([lang, count]) => (
                <i
                  key={lang}
                  style={{ flexGrow: count, background: languageColor(lang) }}
                  title={`${lang}: ${count}`}
                />
              ))}
            </div>
            <ul className="langlegend">
              {langs.map(([lang, count]) => (
                <li key={lang}>
                  <i className="langdot" style={{ background: languageColor(lang) }} />
                  <span>{lang}</span>
                  <small>{Math.round((count / langTotal) * 100)}%</small>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 className="sect">
          Repositories
          <small>top {Math.min(6, repos.length)}</small>
        </h2>
        <RepoList repos={repos.slice(0, 6)} />
      </div>

      <footer className="app__status">
        <span>api.github.com</span>
        <span>{user.public_repos} public repositories</span>
      </footer>
    </div>
  );
}
