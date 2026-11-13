import { useMemo } from "react";
import { useGitHubRepos } from "../hooks/useGitHub";
import { profile } from "../data/profile";
import { Icon } from "../os/Icon";
import { RepoList } from "./RepoList";

const featured = [
  {
    repo: "CUDA-Attention-Softmax",
    title: "CUDA Optimization of Fused Causal Softmax",
    area: "GPU systems",
    dates: "July–August 2026",
    description:
      "A fused FP32 PyTorch extension that combines scaling, masking, reduction, and normalization in one block-parallel kernel.",
    result: "1.40–3.94× faster",
    detail: "than PyTorch eager softmax on a Tesla T4",
    image: "/visuals/cuda-softmax-thumb.svg",
    imageAlt: "Bar chart of the kernel's speedup over PyTorch eager softmax, peaking at 3.94× at sequence length 1,536",
    tags: ["CUDA", "C++", "PyTorch"],
    article: "/cuda-optimization-softmax",
  },
  {
    repo: "LumiSense",
    title: "LumiSense AI",
    area: "Computer vision",
    dates: "January 2026–present",
    description:
      "A Raspberry Pi camera system estimating floor-level illuminance and lighting emissions for the UofT Sustainability Office.",
    result: "3.97% average error",
    detail: "against benchmark lux readings at 13 spots",
    image: "/visuals/lumisense-thumb.svg",
    imageAlt: "Floor plan of a room shaded by estimated light level, with 13 reference measurement spots",
    tags: ["PyTorch", "ONNX", "OpenCV", "Raspberry Pi"],
    article: null,
  },
] as const;

export function ProjectsApp() {
  const { repos, loading, error } = useGitHubRepos();
  const remaining = useMemo(
    () =>
      repos.filter(
        (repo) => !repo.fork && !repo.archived && !featured.some((item) => item.repo === repo.name),
      ),
    [repos],
  );

  return (
    <div className="app app--framed projects">
      <div className="app__toolbar">
        <span className="crumb">
          <Icon name="projects" size={16} />
          ~/projects
        </span>
        <span className="app__toolbar-spacer" />
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
          <Icon name="github" size={14} />
          GitHub ↗
        </a>
      </div>

      <div className="app__scroll">
        <h2 className="sect sect--first">
          Featured
          <small>{featured.length}</small>
        </h2>
        <div className="projlist">
          {featured.map((project) => {
            const primaryHref = project.article ?? `${profile.github}/${project.repo}`;
            return (
              <article className="proj" key={project.repo}>
                <a
                  className="proj__thumb"
                  href={primaryHref}
                  target={project.article ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  <img src={project.image} alt={project.imageAlt} />
                </a>
                <div className="proj__body">
                  <p className="proj__kicker">
                    {project.area} · {project.dates}
                  </p>
                  <h3 className="proj__title">{project.title}</h3>
                  <p className="proj__desc">{project.description}</p>
                  <p className="proj__result">
                    <span className="mark">{project.result}</span> {project.detail}
                  </p>
                  <div className="proj__foot">
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="proj__links">
                      {project.article && <a href={project.article}>Read the research →</a>}
                      <a href={`${profile.github}/${project.repo}`} target="_blank" rel="noreferrer">
                        Source ↗
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <h2 className="sect">
          Other repositories
          {remaining.length > 0 && <small>{remaining.length}</small>}
        </h2>
        {loading && <p className="empty">Loading repositories from GitHub…</p>}
        {error && (
          <p className="empty">
            GitHub didn't respond. The full list is on{" "}
            <a href={profile.github} target="_blank" rel="noreferrer">
              github.com/{profile.githubUser}
            </a>
            .
          </p>
        )}
        {remaining.length > 0 && <RepoList repos={remaining} />}
      </div>

      <footer className="app__status">
        <span>
          {featured.length + remaining.length} items
        </span>
        <span>github.com/{profile.githubUser}</span>
      </footer>
    </div>
  );
}
