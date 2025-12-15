const documentationModel = {
    getAll: async () => {
        return await fetch("https://biblio-go.onrender.com/api/book/all",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",

            })
            .then((res) => {
                if (res.ok) {
                    console.log(res);
                    return res.json();
                }
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }
}

export default documentationModel