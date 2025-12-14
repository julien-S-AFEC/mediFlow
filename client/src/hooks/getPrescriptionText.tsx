import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { createWorker } from 'tesseract.js';
import medicineNamesList from '../data/medicineNames.json';

const useGetPrescriptionName = (prescriptionPath: string, setAllRowsContent: Dispatch<SetStateAction<object[]>>) => {
    const [medicineNames, setMedicineNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getPrescriptionMedicineName = useCallback(async () => {
        try {
            setLoading(true);
            const worker = await createWorker('fra');
            const ret = await worker.recognize(`http://localhost:3000/${prescriptionPath}`);
            await worker.terminate();
            await getMedicineName(ret.data.text);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, [prescriptionPath]);

    const getMedicineName = useCallback(async (prescriptionText: string) => {
        for (const word of prescriptionText.split(' ')) {
            if (medicineNamesList.some(name => name.toLowerCase() === word.toLowerCase())) {

                setAllRowsContent((oldContent) => [...oldContent, { col1: word, col2: "", col3: "", col4: "", col5: "" }]);
            }
        }
    }, [setAllRowsContent]);

    return { getPrescriptionMedicineName, medicineNames, loading };
}

export default useGetPrescriptionName;