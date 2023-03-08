import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

function Edit() {
  const nav = useNavigate();
  const params = useParams();
  const pageid = params.id;
  const [update] = useOutletContext();

  const notelist = JSON.parse(localStorage.getItem("notes"));
  const note = notelist.find((item) => item.id === pageid);

  const [newtitle, settitle] = useState(note.title);
  const [newdate, setdate] = useState(note.date);
  const [newbody, setbody] = useState(note.body);

  const SetNewTitle = (event) => {
    settitle(event.target.value);
  };
  const SetNewDate = (event) => {
    setdate(event.target.value);
  };

  const Save = () => {
    note.title = newtitle;
    note.date = newdate;
    note.body = newbody.replace(/(<([^>]+)>)/gi, "");
    console.log(notelist);
    console.log(note);
    localStorage.setItem("notes", JSON.stringify(notelist));
    update();
    nav("..");
    nav("/" + pageid);
  };

  const Delete = () => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      const tempNewList = notelist.filter((n) => {
        return n.id !== pageid;
      });
      localStorage.setItem("notes", JSON.stringify(tempNewList));
      update();
      nav(`..`);
    }
  };

  return (
    <div className="appmain">
      <div className="mainhead">
        <div id="titledate">
          <h1>
            <input
              type="text"
              onChange={SetNewTitle}
              id="maintitle"
              defaultValue={note.title}
            />
          </h1>
          <h6 id="caption">
            <input
              type="datetime-local"
              onChange={SetNewDate}
              id="date"
              defaultValue={note.date}
            />
          </h6>
        </div>
        <div id="savedel">
          <button onClick={Save} id="save">
            Save
          </button>
          <button onClick={Delete} id="delete">
            Delete
          </button>
        </div>
      </div>
      <div className="edit">
        <ReactQuill theme="snow" onChange={setbody} value={newbody} />
      </div>
    </div>
  );
}

export default Edit;
