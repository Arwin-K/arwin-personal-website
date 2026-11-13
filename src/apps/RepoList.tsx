import type { GitHubRepo } from "../hooks/useGitHub";
import { languageColor } from "../data/languages";

const dateFormat = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" });

/** Finder-style list view of repositories: name, language, last update, stars. */
export function RepoList({ repos }: { repos: GitHubRepo[] }) {
  return (
    <div className="listview" role="table" aria-label="Repositories">
      <div className="listview__head" role="row">
        <span role="columnheader">Name</span>
        <span role="columnheader" className="listview__col--lang">Language</span>
        <span role="columnheader" className="listview__col--date">Updated</span>
        <span role="columnheader" className="listview__col--num">★</span>
      </div>
      {repos.map((repo) => (
        <a key={repo.id} className="listview__row" role="row" href={repo.html_url} target="_blank" rel="noreferrer">
          <span role="cell" className="listview__name">
            <strong>{repo.name}</strong>
            {repo.description && <small>{repo.description}</small>}
          </span>
          <span role="cell" className="listview__col--lang">
            {repo.language && (
              <>
                <i className="langdot" style={{ background: languageColor(repo.language) }} />
                {repo.language}
              </>
            )}
          </span>
          <span role="cell" className="listview__col--date">
            {dateFormat.format(new Date(repo.updated_at))}
          </span>
          <span role="cell" className="listview__col--num">
            {repo.stargazers_count}
          </span>
        </a>
      ))}
    </div>
  );
}
