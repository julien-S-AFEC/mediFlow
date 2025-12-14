import { useEffect, useState } from "react";

type Documentation = {
    id: number;
    name: string;
    stock: number;
    note: number;
    description: string;
    borrow: number;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    categoryId: number;
    Category: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
    Author: {
        id: number;
        firstname: string;
        lastname: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    };
}

const useGetDocumentation = (): [boolean, Documentation[]] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [documentation, setDocumentation] = useState<Documentation[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/documentation/book/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                setDocumentation(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                throw error;
            });
        setLoading(false);
    }, []);

    return [loading, documentation]
}

export default useGetDocumentation;