import React, { Dispatch, SetStateAction } from "react";
import "./dosageRow.css";

type Iprops = {
  content: object;
  contentHandler: Dispatch<SetStateAction<object[]>>;
  index: number;
  changeHandler: Dispatch<SetStateAction<boolean>>;
};

const DosageRow: React.FC<Iprops> = ({ content, contentHandler, index, changeHandler }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          style={{
            outline: "none",
            boxShadow: "none",
            border: "none",
            background: "transparent"
          }}
          className="bg-transparent w-100 m-0 p-0"
          value={content[index].col1}
          onChange={(e) => {
            contentHandler((oldContent) => oldContent.map((content, i) => (i === index ? { ...content, col1: e.target.value } : content)));
            changeHandler(true);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          style={{
            outline: "none",
            boxShadow: "none",
            border: "none",
            background: "transparent"
          }}
          className="bg-transparent w-100 m-0 p-0"
          value={content[index].col2}
          onChange={(e) => {
            contentHandler((oldContent) => oldContent.map((content, i) => (i === index ? { ...content, col2: e.target.value } : content)));
            changeHandler(true);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          style={{
            outline: "none",
            boxShadow: "none",
            border: "none",
            background: "transparent"
          }}
          className="bg-transparent w-100 m-0 p-0"
          value={content[index].col3}
          onChange={(e) => {
            contentHandler((oldContent) => oldContent.map((content, i) => (i === index ? { ...content, col3: e.target.value } : content)));
            changeHandler(true);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          style={{
            outline: "none",
            boxShadow: "none",
            border: "none",
            background: "transparent"
          }}
          className="bg-transparent w-100 m-0 p-0"
          value={content[index].col4}
          onChange={(e) => {
            contentHandler((oldContent) => oldContent.map((content, i) => (i === index ? { ...content, col4: e.target.value } : content)));
            changeHandler(true);
          }}
        />
      </td>
      <td>
        <input
          type="text"
          style={{
            outline: "none",
            boxShadow: "none",
            border: "none",
            background: "transparent"
          }}
          className="bg-transparent w-100 m-0 p-0"
          value={content[index].col5}
          onChange={(e) => {
            contentHandler((oldContent) => oldContent.map((content, i) => (i === index ? { ...content, col5: e.target.value } : content)));
            changeHandler(true);
          }}
        />
      </td>
    </tr>
  );
};

export default DosageRow;
