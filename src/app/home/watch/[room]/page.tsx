'use client';

import { useEffect, useState } from 'react';
import { Client, DecodedMessage } from '@xmtp/xmtp-js';
import { Wallet } from 'ethers';

import {
  ContentTypeGroupChat,
  ContentTypeGroupChatCodec,
} from "./group_chat_type";
import { useAccount } from 'wagmi';
 
export default function Chat() {
  const { address } = useAccount();
  const STREAM_PRIVATE_KEY = '0x34995edc3b4dad962aa0677c7e629552f821b204b2173e6c55af19128e643076';
  const STREAM_ADDRESS = '0xf1e0eB5F6Ba7844e0e9E9B7fFa3E3BBFd77FE079';
  const OWNER_ADDRESS = '';
  const [messages, setMessages] = useState<string[]>([]);

  const mapMessages = (messages: DecodedMessage<string | undefined>[]): string[] => {
    return messages.map(m => {
      if (m.contentType.sameAs(ContentTypeGroupChat)) {
        return m.content!.message as string;
      }
      return m.content!;
    }).filter(m => m);
  };

  useEffect(() => {
    (async () => {
      const wallet = new Wallet(STREAM_PRIVATE_KEY);
      const xmtp = await Client.create(wallet, { env: 'production' });
      console.log('conversations', await xmtp.conversations.list());
      xmtp.registerCodec(new ContentTypeGroupChatCodec());

      const canMessage = await xmtp.canMessage(address);

      const existing = await xmtp.conversations.list();
      /// note: this will give you an existing conversation if it exists
      const conversation = await xmtp.conversations.newConversation(address);
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

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Stream name"
        onChange={(e) => setMessages(e.target.value)}
      /> */}
      { messages.map((message, ix) => 
        <p key={ix}>{`${message}`}</p>
      ) }
    </div>
  );
};