import Inbox from "~/components/xmtp/pages/inbox";

export default function Watch({ params }: { params: { room: string } }) {
  return (
    <div>
      {`hey, you're in room ${params.room}`}
      <Inbox/>
    </div>
  )
}