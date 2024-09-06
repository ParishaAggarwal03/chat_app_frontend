import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation, isGroup } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const sendGroupMessage = async (message, senderId) => {
		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/group/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				credentials: 'include',
				body: JSON.stringify({ message, senderId }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { sendMessage, sendGroupMessage, loading };
};
export default useSendMessage;
