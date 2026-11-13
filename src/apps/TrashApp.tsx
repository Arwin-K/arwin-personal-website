import { useState } from "react";
import { Icon } from "../os/Icon";

const FILE_NAME = "taking-over-the-world.txt";

const FILE_BODY = `[REDACTED]`;

export function TrashApp() {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="app app--framed txtfile">
        <div className="app__toolbar">
          <button className="btn" onClick={() => setOpen(false)}>
            ‹ Trash
          </button>
          <span className="txtfile__name">{FILE_NAME}</span>
          <span className="txtfile__spacer" />
        </div>
        <pre className="txtfile__body">{FILE_BODY}</pre>
        <footer className="app__status">
          <span>Plain text</span>
          <span>Read only</span>
        </footer>
      </div>
    );
  }

  return (
    <div className="app app--framed trash">
      <div className="app__toolbar">
        <span className="crumb">
          <Icon name="trash" size={16} />
          Trash
        </span>
        <span className="app__toolbar-spacer" />
        <button className="btn" disabled title="Nothing here is going anywhere">
          Empty
        </button>
      </div>
      <div className="app__scroll">
        <div className="trash__grid">
          <button className="fileitem" onClick={() => setOpen(true)}>
            <Icon name="notes" size={40} />
            <span className="fileitem__name">{FILE_NAME}</span>
          </button>
        </div>
      </div>
      <footer className="app__status">
        <span>1 item</span>
        <span>Text document</span>
      </footer>
    </div>
  );
}
