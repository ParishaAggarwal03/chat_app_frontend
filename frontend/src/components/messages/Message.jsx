import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "items-end" : "items-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-gradient-pink-purple" : "bg-gradient-orange-pink";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`flex flex-col ${chatClassName} gap-2`}>
			<div className={`flex gap-2 ${fromMe ? "flex-row-reverse" : ""}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={` text-white ${bubbleBgColor} ${shakeClass} pb-2 p-2 rounded-lg`}>{message.message}</div>
			</div>
			
			<div className={`chat-footer opacity-50 text-xs flex gap-1 items-center ${fromMe ? "flex-row-reverse" : ""}`}>{formattedTime}</div>
		</div>
	);
};
export default Message;
