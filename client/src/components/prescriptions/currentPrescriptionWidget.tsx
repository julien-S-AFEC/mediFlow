import React, { useCallback, useEffect, useRef, useState } from "react";
import { Prescription, Permissions, User, PrescriptionCommentary } from "../../types";
import { Link } from "react-router-dom";
import Editor, { BtnBold, BtnClearFormatting, BtnItalic, BtnLink, BtnRedo, BtnStrikeThrough, BtnUnderline, BtnUndo, Toolbar } from "react-simple-wysiwyg";
import { IoMdSend } from "react-icons/io";
import DosageWidget from "../dosage/dosageWidget.tsx";
import { RxCross1 } from "react-icons/rx";
import { decode } from "he";
import './currentPrescriptionWidget.css'

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

  const storeCommentary = useCallback(() => {
    fetch("http://localhost:3000/api/prescriptionCommentary/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
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
      .then((updatedCommentaries) => {
        setAllCommentaries(updatedCommentaries);
        setCommentaryContent("");
      });
  }, [currentPrescription.id, commentaryContent, currentUser?.username]);

  useEffect(() => {
    const el = editorRef.current;

    const blockEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        storeCommentary();
        e.preventDefault();
      }
    };

    if (el) {
      el.addEventListener("keydown", blockEnter);
    }
    return () => {
      if (el) {
        el.removeEventListener("keydown", blockEnter);
      }
    };
  }, [storeCommentary]);

  const onChange = (e: { target: { value: string } }) => {
    setCommentaryContent(e.target.value);
  };

  const deleteCommentary = (id?: number) => {
    fetch("http://localhost:3000/api/prescriptionCommentary/deleteById", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
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
      credentials: 'include',
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
    <div className="container-fluid">
      <div className="row d-flex flex-column flex-md-row justify-content-between gap-0">
        <div className="col-md-6 col-12 d-flex flex-column gap-3">
          <div>{`Created at: ${new Date(currentPrescription.created_at).toLocaleString()}`}</div>
          <Link to={`prescriptionView/${currentPrescription.id}`} key={currentPrescription.created_at}>
            <img
              className="img-fluid"
              key={currentPrescription.id}
              src={`http://localhost:3000/${currentPrescription.file_path}`}
              alt="prescription-img" />
          </Link>
        </div>
        <div className="col-md-6 col-12 d-flex flex-column ">
          <h4 className="main-font fw-light text-center">Annotations</h4>
          <ul className="list-group list-group-flush overflow-y-auto gap-1 shadow border rounded-3" style={{ height: "270px", backgroundColor: "white" }}>
            {allCommentaries &&
              allCommentaries.map((commentary) => (
                <li key={commentary.id} className="list-group-item bg-success-subtle rounded">
                  <div className="d-flex justify-content-between">
                    <div>{commentary.content}</div>
                    <div className="d-flex">
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
                  </div>
                </li>
              ))}
          </ul>
          {Boolean(permissions?.create_prescription_commentary) && (
            <div className="d-flex flex-column gap-0 m-0">
              <Editor ref={editorRef} placeholder="White a comment here" style={{ maxHeight: "70px" }} id="editorContent" value={commentaryContent} onChange={onChange}>
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <BtnLink />
                  <BtnClearFormatting />
                </Toolbar>
              </Editor>
              <button id="commentaryAcceptBtn" className="btn bg-light-blue shadow rounded-0 rounded-bottom" onClick={storeCommentary}>
                <IoMdSend color="white" />
              </button>
            </div>
          )}
          <DosageWidget prescriptionId={currentPrescription.id} permissions={permissions} />
        </div>
      </div>
    </div>
  );
};

export default CurrentPrescriptionWidget;
