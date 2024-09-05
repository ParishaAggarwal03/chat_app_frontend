import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetGroups   = () => {
	const [loading, setLoading] = useState(false);
	const [groups, setGroups] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		const getGroups = async () => {  
			setLoading(true);
			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/${authUser._id}`);
				const data = await res.json();
				console.log(data);
				if (data.error) {
					throw new Error(data.error);
				}
				setGroups(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getGroups();
	}, [authUser]);

	return { loading, groups };
};
export default useGetGroups;
