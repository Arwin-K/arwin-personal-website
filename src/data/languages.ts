// Language swatch colors, matching the ones GitHub uses on repository pages.
const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  "C++": "#F34B7D",
  C: "#555555",
  "C#": "#178600",
  Cuda: "#3A4E3A",
  Java: "#B07219",
  HTML: "#E34C26",
  CSS: "#663399",
  Shell: "#89E051",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Verilog: "#B2B7F8",
  SystemVerilog: "#DAE1C2",
  MATLAB: "#E16737",
};

export function languageColor(language: string | null | undefined): string {
  if (!language) return "#9a948a";
  return LANGUAGE_COLORS[language] ?? "#9a948a";
}
