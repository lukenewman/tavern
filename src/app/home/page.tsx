'use client'

import { useClient } from "@xmtp/react-sdk";
import { useCallback } from 'react';
import { api } from "../../utils/api";
import { useEthersSigner } from "~/utils/ethers";

export default function Home() {
  const { client, error, isLoading, initialize } = useClient();
  const signer = useEthersSigner();

  const handleConnect = useCallback(async () => {
    console.log('initializing xmtp client...');
    await initialize({ signer });
  }, [initialize]);

  if (error) {
    return "An error occurred while initializing the client";
  }

  if (isLoading) {
    return "Awaiting signatures...";
  }

  if (!client) {
    return (
      <button type="button" onClick={handleConnect}>
        Connect to XMTP
      </button>
    );
  }

  return "Connected to XMTP";

  // const roomsQuery = api.rooms.getAll.useQuery();

  // return (
  //   <div>
  //     {roomsQuery.data?.map(room => (
  //       <h1 key={room.id}>{room.name}</h1>
  //     ))}
  //   </div>
  // );
}