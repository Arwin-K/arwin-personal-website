import { useMemo } from "react";
import { useGitHubRepos, type GitHubRepo } from "../hooks/useGitHub";
import { profile } from "../data/profile";
import { Icon } from "../os/Icon";

const featured = [
  {
    repo: "CUDA-Attention-Softmax",
    title: "CUDA Optimization of Fused Causal Softmax",
    category: "GPU systems · July–August 2026",
    description: "A fused FP32 PyTorch extension that combines scaling, masking, reduction, and normalization in one block-parallel kernel.",
    result: "1.40–3.94× faster",
    detail: "than PyTorch eager softmax on a Tesla T4",
    image: "/projects/cuda-softmax/fig_softmax_latency.png",
    tags: ["CUDA", "C++", "PyTorch"],
    article: "/cuda-optimization-softmax",
  },
  {
    repo: "LumiSense",
    title: "LumiSense AI",
    category: "Computer vision · January 2026–present",
    description: "A Raspberry Pi camera system estimating floor-level illuminance and lighting emissions for the UofT Sustainability Office.",
    result: "3.97% average error",
    detail: "against benchmark lux readings at 13 spots",
    image: "/visuals/lumisense.svg",
    tags: ["PyTorch", "ONNX", "OpenCV", "Raspberry Pi"],
    article: null,
  },
] as const;

function RepositoryCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a className="repocard projectcard projectcard--compact" href={repo.html_url} target="_blank" rel="noreferrer">
      <div className="repocard__top"><span className="repocard__name">{repo.name} ↗</span><span className="repocard__star"><Icon name="star" size={13} /> {repo.stargazers_count}</span></div>
      <p className="repocard__desc">{repo.description ?? "Source code and documentation on GitHub."}</p>
      <div className="repocard__meta">{repo.language && <span className="dotlang">● {repo.language}</span>}<span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span></div>
    </a>
  );
}

export function ProjectsApp() {
  const { repos, loading, error } = useGitHubRepos();
  const remaining = useMemo(() => repos.filter((repo) => !repo.fork && !repo.archived && !featured.some((item) => item.repo === repo.name)), [repos]);

  return (
    <div className="app folder projects">
      <div className="projects__intro"><div><span className="app-showcase__eyebrow">Selected builds / from idea to evidence</span><h2>Projects</h2><p>Systems built to run, measured to improve.</p></div><a className="btn btn--primary" href={profile.github} target="_blank" rel="noreferrer">GitHub profile ↗</a></div>
      <section className="featured-projects" aria-label="Featured projects">
        {featured.map((project) => (
          <article className="featured-project" key={project.repo}>
            <div className={`featured-project__visual featured-project__visual--${project.repo === "LumiSense" ? "lumi" : "cuda"}`}>
              {project.repo === "LumiSense" ? <img src={project.image} alt="Illustration of a camera mapping light across a room" /> : <div className="chart-preview"><span className="chart-preview__bar"><i /><i /><i /><span>benchmark / tesla t4</span></span><img src={project.image} alt="Measured causal softmax latency across sequence lengths" /></div>}
              <span className="featured-project__visual-label">{project.repo === "LumiSense" ? "LIGHT / VISION / IMPACT" : "CUDA / BENCHMARK 01"}</span>
            </div>
            <div className="featured-project__body"><span className="app-showcase__eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="featured-project__result"><strong>{project.result}</strong><span>{project.detail}</span></div><div className="work__tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="projectcard__actions">{project.article && <a href={project.article}>Read the research →</a>}<a href={`${profile.github}/${project.repo}`} target="_blank" rel="noreferrer">View code ↗</a></div></div>
          </article>
        ))}
      </section>
      <section><h3 className="folder__section">More on GitHub</h3>{loading && <p className="muted">Loading repositories from GitHub…</p>}{error && <p className="muted">GitHub is temporarily unavailable. Browse the full profile for current repositories.</p>}{remaining.length > 0 && <div className="repolist">{remaining.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)}</div>}</section>
    </div>
  );
}
