import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the structure of a category
interface Category {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
}

// Define the structure of the API response
interface ApiResponse {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
        categories: Category[];
    };
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<ApiResponse>('http://localhost:8000/api/categories');
                if (response.data.status === 'success') {
                    setCategories(response.data.data.categories);
                }
            } catch (err) {
                if (axios.isAxiosError(err) && err.message) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {categories.map(category => (
                <div key={category._id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                    <h3>{category.name}</h3>
                    <img src={`http://localhost:8000/api/categories/icons/${category.icon[0]}`} alt={category.name} style={{ width: '50px', height: '50px' }} />
                 
                </div>
            ))}
        </div>
    );
};

export default Categories;