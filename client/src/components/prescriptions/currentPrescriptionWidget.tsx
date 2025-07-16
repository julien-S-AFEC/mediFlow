import React, { useEffect, useRef, useState } from "react";
import { Prescription, Permissions } from "../../types";
import { Link } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { IoMdSend } from "react-icons/io";

type Iprops = {
  currentPrescription: Prescription;
  permissions?: Permissions;
};

const CurrentPrescriptionWidget: React.FC<Iprops> = ({ currentPrescription, permissions }) => {
  const [allCommentaries, setAllCommentaries] = useState();
  const [commentaryContent, setCommentaryContent] = useState("");
  const editorRef = useRef(null)


  useEffect(() => {
    const el = editorRef.current;

    const blockEnter = (e) => {
      if (e.key === 'Enter') e.preventDefault();
    };

    if (el) {
      el.addEventListener('keydown', blockEnter);
    }
    return () => el ? el.removeEventListener('keydown', blockEnter) : null;

  }, [editorRef.current]);

  const onChange = (e: { target: { value: string } }) => {
    setCommentaryContent(e.target.value);
  };

  // const printContent = () => {
  //   const printWindow = window.open("", "_blank", "width=800,height=600");
  //   if (printWindow) {
  //     printWindow.document.write(`
  //       <html>
  //         <head>
  //           <title>Print</title>
  //           <style>
  //             body { font-family: sans-serif; padding: 20px; }
  //           </style>
  //         </head>
  //         <body>${document.getElementById("editorContent")?.innerHTML}</body>
  //       </html>
  //     `);
  //     printWindow.document.close();
  //     printWindow.focus();
  //     printWindow.print();
  //     printWindow.close();
  //   }
  // };

  const storeCommentary = () => {
    fetch("http://localhost:3000/api/prescriptionCommentary/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        prescriptionId: currentPrescription.id,
        content: commentaryContent,
      }),
    })
    setAllCommentaries(oldValues => [...oldValues, { "content": commentaryContent, "created_at": new Date }])
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
    <div className="d-flex w-100 gap-5">
      <Link to={`prescriptionView/${currentPrescription.id}`} key={currentPrescription.created_at}>
        <img className="img img-fluid my-5" style={{ maxWidth: "450px" }} key={currentPrescription.id} src={`http://localhost:3000/${currentPrescription.file_path}`} alt="" />
      </Link>
      <div className="d-flex flex-column gap-1 p-3 w-100" style={{maxWidth: '450px'}}>
        <h4 className="main-font fw-light text-center">Annotations</h4>
        <ul className="list-group list-group-flush h-25 overflow-y-auto">
          {allCommentaries && allCommentaries.map(commentary => <li key={commentary.created_at} className="list-group-item">
            <div className="d-flex  justify-content-between">
              <div>{commentary.content}</div>
              <div className="main-font fw-light fs-6">{new Date(commentary.created_at).toLocaleString().slice(0, 16)}</div>
            </div>
          </li>)}

        </ul>
        {Boolean(permissions) && (
          <>
            <Editor ref={editorRef} style={{ maxHeight: "40px" }} id="editorContent" value={commentaryContent} onChange={onChange} />
            <button className="btn btn-primary rounded-5" onClick={storeCommentary}>
              <IoMdSend />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentPrescriptionWidget;
