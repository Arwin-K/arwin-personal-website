import { Icon } from "../os/Icon";

const FILE_NAME = "Arwin_Karir_Resume_October_2026.pdf";

export function ResumeApp() {
  return (
    <div className="app app--framed resume">
      <div className="app__toolbar">
        <span className="crumb resume__file">
          <Icon name="resume" size={16} />
          <span>{FILE_NAME}</span>
        </span>
        <span className="app__toolbar-spacer" />
        <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">
          Open ↗
        </a>
        <a className="btn btn--primary" href="/resume.pdf" download={FILE_NAME}>
          Download
        </a>
      </div>
      <div className="resume__well">
        <iframe className="resume__frame" src="/resume.pdf#toolbar=0&view=FitH" title="Arwin Karir Resume" />
      </div>
    </div>
  );
}
