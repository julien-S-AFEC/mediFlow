import React, { useEffect, useRef, useState } from "react";
import { Prescription, Permissions, User, PrescriptionCommentary } from "../../types";
import { Link } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { IoMdSend } from "react-icons/io";
import DosageWidget from "../dosage/dosageWidget.tsx";

type Iprops = {
  currentPrescription: Prescription;
  permissions?: Permissions;
  currentUser?: User;
};

const CurrentPrescriptionWidget: React.FC<Iprops> = ({ currentUser, currentPrescription, permissions }) => {
  const [allCommentaries, setAllCommentaries] = useState<PrescriptionCommentary[]>([]);
  const [commentaryContent, setCommentaryContent] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);

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
        content: commentaryContent,
        currentUser: currentUser?.username,
      }),
    });
    setAllCommentaries((oldValues) => [...oldValues, { content: commentaryContent, created_at: new Date(), created_by: currentUser?.username }]);
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
    <div className="d-flex gap-5 my-5 align-items-start w-100">
      <Link to={`prescriptionView/${currentPrescription.id}`} key={currentPrescription.created_at}>
        <img className="img img-fluid" style={{ minWidth: "150px" }} key={currentPrescription.id} src={`http://localhost:3000/${currentPrescription.file_path}`} alt="" />
      </Link>
      <div className="d-flex flex-column gap-1">
        <h4 className="main-font fw-light text-center">Annotations</h4>
        <ul className="list-group list-group-flush overflow-y-auto gap-1" style={{ width: "850px", height:"200px" }}>
          {allCommentaries &&
            allCommentaries.map((commentary) => (
              <li key={commentary.id} className="list-group-item bg-secondary-subtle rounded">
                <div className="d-flex justify-content-between">
                  <div>{commentary.content}</div>
                  <div>
                    <div className="d-flex flex-column align-items-center">
                      <div>{commentary.created_by}</div>
                      <div className="main-font fw-light fs-6">{new Date(commentary.created_at).toLocaleString().slice(0, 16)}</div>
                    </div>
                  </div>
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
        <DosageWidget prescriptionId={currentPrescription.id} permissions={permissions}/>
      </div>
    </div>
  );
};

export default CurrentPrescriptionWidget;
