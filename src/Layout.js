import {
  Outlet,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";

function Layout() {
  const nav = useNavigate();
  const params = useParams();
  const [notes, setNotes] = useState([]);

  const hideshow = () => {
    let sidebar = document.getElementById("appSB");
    if (sidebar.style.display === "none") {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  };

  const addNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: " ",
      date: "...",
      show: true,
    };
    console.log(newNote.id);
    console.log(newNote);
    const tmp = [newNote, ...notes];
    setNotes(tmp);
    localStorage.setItem("notes", JSON.stringify(tmp));
    console.log(tmp);
    nav("/" + newNote.id + "/edit");
  };

  const update = () => {
    setNotes(JSON.parse(localStorage.getItem("notes")));
  };

  return (
    <div>
      <div id="Head">
        <header>
          <button onClick={hideshow} id="menu">
            ☰
          </button>
          <div id="title">
            <h1 id="Lotion">Lotion</h1>
            <h6 id="caption">Like Notion, but worse.</h6>
            <div id="spacer"></div>
          </div>
          <h6 id="space"></h6>
        </header>
      </div>
      <div id="content">
        <div className="appSB" id="appSB">
          <div className="appSBheader">
            <h1 id="Notes">Notes</h1>
            <button onClick={addNote} id="add">
              +
            </button>
          </div>
          {notes.map((note) => (
            <div
              className={params.id == note.id ? "appSBNotescurr" : "appSBNotes"}
              onClick={() => nav("/" + note.id + "/edit")}
            >
              <div className="appSBnote">
                <div className="SBtitle">
                  <strong>{note.title}</strong>
                </div>
                <p>{note.body && note.body.substr(0, 20) + "..."}</p>

                <small className="note-meta">Last modified: {note.date}</small>
              </div>
            </div>
          ))}
        </div>
        <Outlet context={[update]} />
      </div>
    </div>
  );
}

export default Layout;
