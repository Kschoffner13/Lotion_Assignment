import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import Layout from "./Layout";

function View() {
  const nav = useNavigate();
  const params = useParams();
  const [update] = useOutletContext();

  const pageid = params.id;
  const notelist = JSON.parse(localStorage.getItem("notes"));
  const note = notelist.find((item) => item.id == pageid);

  const edit = () => {
    nav("/" + pageid + "/edit");
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

  const text = note.body;
  return (
    <div className="View">
      <div className="viewhead">
        <div id="viewtitledate">
          <h2>{note.title}</h2>
          <h6 id="caption">{note.date}</h6>
        </div>
        <div id="editdel">
          <button onClick={edit} id="Edit">
            Edit
          </button>
          <button onClick={Delete} id="delete">
            Delete
          </button>
        </div>
      </div>
      <div id="viewbody">
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>
    </div>
  );
}

export default View;
