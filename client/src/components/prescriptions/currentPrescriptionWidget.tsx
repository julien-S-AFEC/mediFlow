import React, { useEffect, useState } from "react";
import { Prescription } from "../../types";
import { Link } from "react-router-dom";
import Editor from 'react-simple-wysiwyg';

type Iprops = {
    currentDescription: Prescription
}

const CurrentPrescriptionWidget: React.FC<Iprops> = ({ currentDescription }) => {

    const [commentaryContent, setCommentaryContent] = useState('my <b>HTML</b>');

    const onChange = (e) => {
        setCommentaryContent(e.target.value);
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/prescriptionCommentary/getContentById", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ commentaryId: currentDescription.commentary_id })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {console.log(JSON.parse(data)); setCommentaryContent(JSON.parse(data))})
    }, [])
    return (
        <div className="d-flex w-100">
            <Link to={`prescriptionView/${currentDescription.id}`} key={currentDescription.created_at}>
                <img className="img img-fluid my-5" style={{ maxWidth: "450px" }} key={currentDescription.id} src={`http://localhost:3000/${currentDescription.file_path}`} alt="" />
            </Link>
            <div className="p-3 w-100">
                <h4 className="main-font fw-light text-center">Annotations</h4>
                <Editor value={commentaryContent} onChange={onChange}/>
            </div>
        </div>
    )
}

export default CurrentPrescriptionWidget