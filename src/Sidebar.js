function Sidebar() {
  return (
    <div className="appSB">
      <div className="appSBheader">
        <h1 id="Notes">Notes</h1>
        <button id="add">+</button>
      </div>
      <div className="appSBNotes">
        <div className="appSBnote">
          <div className="SBtitle">
            <strong>Untitled</strong>
          </div>
          <p>note preview</p>

          <small className="note-meta"> last modified</small>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
