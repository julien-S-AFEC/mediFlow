const documentationModel = {
    getAll: async () => {
       return await fetch("https://biblio-go.onrender.com/api/book/all")
            .then((res) => {
                if (res.ok) {
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