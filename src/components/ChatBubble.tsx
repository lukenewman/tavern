import { useAccount } from 'wagmi';
import Avatar from 'boring-avatars';

type ChatBubbleProps = {
  sender: string,
  message: string
}
export const ChatBubble = ({ sender, message }: ChatBubbleProps) => {
  const { address } = useAccount();
  const isSender = sender === address; 

  return (
    <div className="flex flex-row w-full h-full border border-indigo-950 rounded-md">
      {isSender && <div className="flex flex-row flex-grow" />}
      {isSender &&
        <div className="w-[150px] rounded-md p-4 bg-indigo-800">
          <p>{message}</p>
        </div>
      }
      {!isSender &&
        <div className='flex flex-row gap-2'>
          <Avatar name={sender} size={24}/>
          <div className="w-[150px] rounded-md p-4 bg-indigo-400">
            <p>{message}</p>
          </div>
        </div>
      }
    </div>
  )
}
