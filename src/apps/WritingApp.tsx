import { Icon } from "../os/Icon";

const articles = [
  {
    title: "Optimizing Fused Causal Softmax in CUDA",
    description:
      "A reproducible study of work decomposition, warp-level reductions, launch configuration, profiler evidence, and end-to-end transformer attention performance.",
    date: "September 2026",
    shortDate: "Sep 2026",
    category: "GPU systems",
    topics: ["CUDA", "PyTorch", "Transformer attention"],
    href: "/cuda-optimization-softmax",
    image: "/projects/cuda-softmax/fig_kernel_vs_attention_speedup.png",
    imageAlt: "Chart comparing isolated kernel and full attention speedup",
  },
];

export function WritingApp() {
  return (
    <div className="app app--framed writing">
      <div className="app__toolbar">
        <span className="crumb">
          <Icon name="notes" size={16} />
          ~/writing
        </span>
        <span className="app__toolbar-spacer" />
        <span className="app__toolbar-meta">Technical notes</span>
      </div>

      <div className="app__scroll">
        <ol className="entries">
          {articles.map((article) => (
            <li className="entry" key={article.href}>
              <time className="entry__date" title={article.date}>
                {article.shortDate}
              </time>
              <div className="entry__body">
                <a className="entry__title" href={article.href} target="_blank" rel="noreferrer">
                  {article.title}
                </a>
                <p className="entry__desc">{article.description}</p>
                <div className="entry__meta">
                  <span className="tag">{article.category}</span>
                  <span>{article.topics.join(" · ")}</span>
                </div>
                <a className="entry__read" href={article.href} target="_blank" rel="noreferrer">
                  Read article ↗
                </a>
              </div>
              <a className="entry__fig" href={article.href} target="_blank" rel="noreferrer" tabIndex={-1}>
                <img src={article.image} alt={article.imageAlt} />
              </a>
            </li>
          ))}
        </ol>
      </div>

      <footer className="app__status">
        <span>
          {articles.length} {articles.length === 1 ? "article" : "articles"}
        </span>
        <span>Latest · {articles[0].date}</span>
      </footer>
    </div>
  );
}
