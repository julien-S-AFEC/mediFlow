import React, { useEffect, useRef, useState } from "react";
import { Prescription, Permissions, User, PrescriptionCommentary } from "../../types";
import { Link } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { IoMdSend } from "react-icons/io";
import DosageWidget from "../dosage/dosageWidget.tsx";
import { RxCross1 } from "react-icons/rx";
import { decode } from "he";

type Iprops = {
  currentPrescription: Prescription;
  permissions?: Permissions;
  currentUser?: User;
};

const CurrentPrescriptionWidget: React.FC<Iprops> = ({ currentUser, currentPrescription, permissions }) => {
  const [allCommentaries, setAllCommentaries] = useState<PrescriptionCommentary[]>([]);
  const [commentaryContent, setCommentaryContent] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const isAdmin = currentUser?.role_id === 2;

  useEffect(() => {
    const el = editorRef.current;

    const blockEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") e.preventDefault();
    };

    if (el) {
      el.addEventListener("keydown", blockEnter);
    }
    return () => {
      if (el) {
        el.removeEventListener("keydown", blockEnter);
      }
    };
  }, [editorRef.current]);

  const onChange = (e: { target: { value: string } }) => {
    setCommentaryContent(e.target.value);
  };

  const storeCommentary = () => {
    fetch("http://localhost:3000/api/prescriptionCommentary/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        prescriptionId: currentPrescription.id,
        content: decode(commentaryContent),
        currentUser: currentUser?.username,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((updatedCommentaries) => setAllCommentaries(updatedCommentaries));
  };

  const deleteCommentary = (id?: number) => {
    fetch("http://localhost:3000/api/prescriptionCommentary/deleteById", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        commentaryId: id,
        prescriptionId: currentPrescription.id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((updatedCommentaries) => setAllCommentaries(updatedCommentaries));
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/prescriptionCommentary/getAllbyPrescId", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ prescriptionId: currentPrescription.id }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setAllCommentaries(data);
      });
  }, [currentPrescription]);

  return (
    <div className="row">
      <div className="col-6">
        <Link to={`prescriptionView/${currentPrescription.id}`} key={currentPrescription.created_at}>
          <img className="img img-fluid" style={{ minWidth: "150px" }} key={currentPrescription.id} src={`http://localhost:3000/${currentPrescription.file_path}`} alt="" />
        </Link>
        </div>
        <div className="col-6 d-flex flex-column gap-3">
          <h4 className="main-font fw-light text-center">Annotations</h4>
          <ul className="list-group list-group-flush overflow-y-auto gap-1" style={{ height: "200px" }}>
            {allCommentaries &&
              allCommentaries.map((commentary) => (
                <li key={commentary.id} className="list-group-item bg-secondary-subtle rounded">
                  <div className="d-flex justify-content-between">
                    <div>{commentary.content}</div>
                    <div className="d-flex flex-column align-items-center">
                      <div>{commentary.created_by}</div>
                      <div className="main-font fw-light fs-6">{new Date(commentary.created_at).toLocaleString().slice(0, 16)}</div>
                    </div>
                    {isAdmin && (
                      <button className="btn" onClick={() => deleteCommentary(commentary.id)}>
                        <RxCross1 color="red" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
          {Boolean(permissions?.create_prescription_commentary) && (
            <>
              <Editor ref={editorRef} style={{ maxHeight: "40px" }} id="editorContent" value={commentaryContent} onChange={onChange} />
              <button className="btn btn-primary rounded-5" onClick={storeCommentary}>
                <IoMdSend />
              </button>
            </>
          )}
          <DosageWidget prescriptionId={currentPrescription.id} permissions={permissions} />
        </div>
      </div>
  );
};

export default CurrentPrescriptionWidget;
