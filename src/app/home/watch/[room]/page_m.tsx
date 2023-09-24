import { useEffect, useState } from "react";
import { trpc } from "~/app/_trpc/client";
import { initialize } from "~/components/xmtp/helpers/i18n";
import Inbox from "~/components/xmtp/pages/inbox";
import { useXmtpStore } from "~/components/xmtp/store/xmtp";

export default function Watch({ room }: { room: string }) {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const initI18n = async () => {
      await initialize();
      setInitialized(true);
    };
    void initI18n();
  }, []);

  // const xmtp = useXmtpStore((state) => [state.])

  const chatRoomQuery = trpc.rooms.getAll.useQuery()

  const chatRoom = chatRoomQuery.data?.find((chatRoom) => chatRoom.id === Number(room))

  useEffect(() => {
    if (!chatRoom) return;
    
  }, [chatRoom])

  return (
    <div>
      {`hey, you're in room ${room}`}
      {initialized && <Inbox/>}
    </div>
  )
}