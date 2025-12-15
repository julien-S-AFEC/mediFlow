import Footer from "../components/footer";
import Header from "../components/header";
import SmallLoading from "../components/smallLoading";
import useGetDocumentation from "../hooks/getDocumentation";

const Documentation = () => {

    const [loading, documentation] = useGetDocumentation();

    return (
        <div className="container">
            <Header />
            <h1 className="text-center my-5 main-font">Biblio-Go Stock</h1>
            {loading || !documentation?.length
                ? <SmallLoading />
                :
                <div className="d-flex flex-wrap gap-4 my-5">
                    {documentation?.filter((book) => book.Category.name === "Santé").map((book) => (
                        <div className="card text-center mb-3 justify-content-between align-items-center py-1" style={{ width: "18rem" }} key={book.id}>
                            <img src={`https://biblio-go.onrender.com/api/uploads/book/${book.name}.jpg`}
                                style={{ width: "10rem", objectFit: "cover" }}
                                className="card-img-top"
                                alt={book.name} />
                            <div className="card-body">
                                <h5 className="card-title">{book.name}</h5>
                                <p className="card-text">{book.description.substring(0, 100)}...</p>
                                <a href={`https://biblio-go.vercel.app/book/${book.id}`}
                                    target="_blank"
                                    className="btn btn-primary">
                                    Borrow book
                                </a>
                                <div className="mt-3">Stars: {book.note}</div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <Footer />
        </div>
    )
}

export default Documentation;