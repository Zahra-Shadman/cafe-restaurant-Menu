import React, { useEffect, useState } from 'react';

interface Subcategory {
    id: number;
    name: string;

}

const fetchSubcategories = async (): Promise<Subcategory[]> => {
    const page1Response = await fetch('http://localhost:8000/api/subcategories?page=1');
    const page2Response = await fetch('http://localhost:8000/api/subcategories?page=2');

    if (!page1Response.ok || !page2Response.ok) {
        throw new Error('Failed to fetch data');
    }

    const page1Data: Subcategory[] = await page1Response.json();
    const page2Data: Subcategory[] = await page2Response.json();

    // Combine the results
    const combinedData: Subcategory[] = [...page1Data, ...page2Data];
    return combinedData;
};

const SubcategoryComponent: React.FC = () => {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSubcategories = async () => {
            try {
                const data = await fetchSubcategories();
                setSubcategories(data);
            } catch (err) {
                setError(err.message);
            }
        };

        loadSubcategories();
    }, []);

   
    }


export default SubcategoryComponent;