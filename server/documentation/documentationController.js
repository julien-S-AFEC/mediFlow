import documentationModel from "./documentationModel.js";


export const getAll = async (req, res) => {
    try {
        const data = await documentationModel.getAll()
        res.status(200).json(data)
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error.message);
    }
}