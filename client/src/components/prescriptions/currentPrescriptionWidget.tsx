import React, { useEffect, useState } from "react";
import { Prescription, Permissions } from "../../types";
import { Link } from "react-router-dom";
import Editor from "react-simple-wysiwyg";

type Iprops = {
  currentPrescription: Prescription;
  permissions?: Permissions;
};

const CurrentPrescriptionWidget: React.FC<Iprops> = ({ currentPrescription, permissions }) => {
  const [commentaryContent, setCommentaryContent] = useState("my <b>HTML</b>");

  const onChange = (e: { target: { value: string } }) => {
    setCommentaryContent(e.target.value);
  };

  const printContent = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
            </style>
          </head>
          <body>${document.getElementById("editorContent")?.innerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const storeCommentary = () => {
    fetch("http://localhost:3000/api/prescriptionCommentary/store", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: currentPrescription.commentary_id,
        content: commentaryContent,
      }),
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/prescriptionCommentary/getContentById", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ commentaryId: currentPrescription.commentary_id }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setCommentaryContent(JSON.parse(data));
      });
  }, [currentPrescription]);

  return (
    <div className="d-flex w-100 gap-5">
      <Link to={`prescriptionView/${currentPrescription.id}`} key={currentPrescription.created_at}>
        <img className="img img-fluid my-5" style={{ maxWidth: "450px" }} key={currentPrescription.id} src={`http://localhost:3000/${currentPrescription.file_path}`} alt="" />
      </Link>
      <div className="d-flex flex-column gap-1 p-3 w-100">
        <h4 className="main-font fw-light text-center">Annotations</h4>

        {Boolean(permissions) && (
          <>
            <Editor style={{ minHeight: "150px" }} id="editorContent" value={commentaryContent} onChange={onChange} />
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary w-100" onClick={storeCommentary}>
                Save
              </button>
              <button className="btn btn-warning  w-100" onClick={printContent}>
                🖨️
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentPrescriptionWidget;
