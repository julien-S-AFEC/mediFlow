
import './dosageRow.css'

const DosageRow = ({ content, contentHandler, index }) => {
  return (
    <tr>
      <td>
        <input type="text"
        style={{"outline": "none !important", "boxShadow": "none !important"}}
          className="bg-transparent border border-none w-100 m-0 p-0"
          value={content[index].col1}
          onChange={(e) => contentHandler(oldContent => oldContent.map((content, i) => i === index ? { ...content, col1: e.target.value } : content))}
        />
      </td>
      <td>
        <input type="text"
        className="bg-transparent border border-none w-100 m-0 p-0"
        value={content[index].col2}
        onChange={(e) => contentHandler(oldContent => oldContent.map((content, i) => i === index ? { ...content, col2: e.target.value } : content))}
        />
      </td>
      <td>
        <input type="text"
          className="bg-transparent border border-none w-100 m-0 p-0"
          value={content[index].col3}
          onChange={(e) => contentHandler(oldContent => oldContent.map((content, i) => i === index ? { ...content, col3: e.target.value } : content))}
        />
      </td>
      <td>
        <input type="text"
          className="bg-transparent border border-none w-100 m-0 p-0"
          value={content[index].col4}
          onChange={(e) => contentHandler(oldContent => oldContent.map((content, i) => i === index ? { ...content, col4: e.target.value } : content))}
        />
      </td>
    </tr>
  );
};

export default DosageRow;
