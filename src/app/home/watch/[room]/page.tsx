'use client';

import { useEffect, useState } from 'react';
import { Client, DecodedMessage } from '@xmtp/xmtp-js';
import { Wallet } from 'ethers';

import {
  ContentTypeGroupChat,
  ContentTypeGroupChatCodec,
} from "./group_chat_type";
import { useAccount } from 'wagmi';
import Watch from './page_m';
import { trpc } from '~/app/_trpc/client';

const mapMessages = (messages: DecodedMessage<string | undefined>[]): string[] => {
  return messages.map(m => {
    if (m.contentType.sameAs(ContentTypeGroupChat)) {
      return m.content!.message as string;
    }
    return m.content!;
  }).filter(m => m);
};

export default function Chat({ params }: { params: { room: string } }) {
  const { address } = useAccount();
  // const STREAM_PRIVATE_KEY = '0x34995edc3b4dad962aa0677c7e629552f821b204b2173e6c55af19128e643076';
  // const STREAM_ADDRESS = '0xf1e0eB5F6Ba7844e0e9E9B7fFa3E3BBFd77FE079';
  const OWNER_ADDRESS = '0x05E942Dd76b23F944302a9946E7ecBbBf54893Db';
  const [messages, setMessages] = useState<string[]>([]);

  const chatRoomQuery = trpc.rooms.getAll.useQuery();

  // const chatRoom = chatRoomQuery.data?.find((chatRoom) => chatRoom.id === Number(params.room));
  const stream = {
    name: 'Otters',
    url: 'https://www.youtube.com/embed/WrKZzs-CB_8',
    privateKey: '6bd111b1672245a6488fef519ebd63053cca6a7266219d362982bb56fa3cea74'
  };

  useEffect(() => {
    (async () => {
      const wallet = new Wallet(stream.privateKey);
      const xmtp = await Client.create(wallet, { env: 'production' });
      console.log('conversations', await xmtp.conversations.list());
      xmtp.registerCodec(new ContentTypeGroupChatCodec());

      const canMessage = await xmtp.canMessage([address!]);

      const existing = await xmtp.conversations.list();
      /// note: this will give you an existing conversation if it exists
      const conversation = await xmtp.conversations.newConversation(address!);
      console.log("conversation created", conversation);
      console.log('conversations (again)', await xmtp.conversations.list());

      const msgs = mapMessages((await conversation.messages()));
      console.log('msgs', msgs);
      setMessages(msgs);

      // const initialGroupChat = { origin: wallet.getAddress(), message: 'welcome to my stream :)' };
      // conversation.send(initialGroupChat, {
      //   contentType: ContentTypeGroupChat,
      // });
      // console.log("message sent", initialGroupChat);

      for await (const message of await xmtp.conversations.streamAllMessages()) {
        if (message.senderAddress === OWNER_ADDRESS) {
          console.log('got sender message');
          continue;
        }
        console.log(`new message from ${message.senderAddress}: ${message}`);
        addMessage(message);
      }
    })();
  }, []);

  if (!address) {
    return <>no address</>;
  }

  const addMessage = (message: DecodedMessage<string | undefined>) => {
    setMessages([...messages, ...mapMessages([message])]);
  };

  if (!address) {
    return <>no address</>;
  }

  return (
    <div className='flex flex-col gap-10'>
      <h1>{stream.name}</h1>
      <iframe width="560" height="315" src={stream.url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  );
};