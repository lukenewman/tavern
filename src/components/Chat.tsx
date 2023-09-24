import { useAccount } from "wagmi"
import { ChatMessage } from "~/app/home/watch/[room]/page"
import { ChatBubble } from "./ChatBubble"
import { useState } from "react"


type ChatProps = {
  messages: ChatMessage[]
}


export const Chat = ({ messages }: ChatProps) => {
  const [messageToSend, setMessageToSend] = useState<string>('');

  const sendMessage = () => {
    if (messageToSend?.length ?? 0 > 0) {
      setMessageToSend('')
    }
  }

  return (
    <div className="flex flex-col w-[325px] h-full">
      <div className="flex flex-col gap-2 bg-gray-400 h-full overflow-auto">
        {messages.map((message, ix) => (
          <ChatBubble message={message.message} sender={message.sender} key={ix} />
        ))}
      </div>
      <div className="flex flex-grow"/>
      <div className="flex flex-col">
        <div className="col-span-full mt-2">
          <textarea
            id="message"
            maxLength={256}
            name="message"
            placeholder="Message"
            rows={3}
            className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}