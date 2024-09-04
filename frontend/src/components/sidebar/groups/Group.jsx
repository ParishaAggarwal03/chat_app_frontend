import useGetGroupMembers from "../../../hooks/useGetGroupMembers";
import useConversation from "../../../zustand/useConversation";

const Group = ({ group, lastIdx }) => {
	const { selectedConversation, setSelectedConversation, setIsGroup } = useConversation();
	const { groupMembers, loading } = useGetGroupMembers();
	let isSelected = selectedConversation?._id === group._id;
	function handleGroupSelected(){
		if(isSelected){
			setSelectedConversation(null);
			setIsGroup(false);
		} else {
			setSelectedConversation(group);
			setIsGroup(true);
		}
		isSelected = selectedConversation?._id === group._id;
	}
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={handleGroupSelected}
			>
				
					<div className='w-12 h-12 rounded-full flex items-center justify-center border border-gray-700'>
                        {group.groupPic ? (
                            <img src={group.groupPic} alt='group avatar' />
                        ) : (
                            
                                <span className='text-2xl font-bold capitalize text-black'>{group.groupName.charAt(0)}</span>
                         
                        )}
					</div>
			

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{group.groupName}</p>
					
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Group;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
