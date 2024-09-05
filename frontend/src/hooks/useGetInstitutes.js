import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetInstitutes = () => {
    const [institutes, setInstitutes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInstitutes = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/institutes`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setInstitutes(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInstitutes();
    }, []);

    return { institutes, loading };
};

export default useGetInstitutes;