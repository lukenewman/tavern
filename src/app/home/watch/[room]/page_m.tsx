import { useEffect } from "react";
import { trpc } from "~/app/_trpc/client";
import { Chat } from "~/components/Chat";
import { ChatMessage } from "./page";

export default function Watch({ room, messages }: { room: string, messages: ChatMessage[] }) {

  const chatRoomQuery = trpc.rooms.getAll.useQuery()

  const chatRoom = chatRoomQuery.data?.find((chatRoom) => chatRoom.id === Number(room))

  useEffect(() => {
    if (!chatRoom) return;
    
  }, [chatRoom])

  return (
    <div>
      {`hey, you're in room ${room}`}
      <Chat messages={messages}/>
    </div>
  )
}