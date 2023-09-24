'use client'

import { useClient } from "@xmtp/react-sdk";
import { useCallback } from 'react';
import { api } from "../../utils/api";
// import { useEthersSigner } from "~/utils/ethers";

export default function Home() {
  const { client, error, isLoading, initialize } = useClient();
  // const signer = useEthersSigner();
  // console.log('signer', signer);

  const handleConnect = useCallback(async () => {
    console.log('initializing xmtp client...');
    // await initialize({ signer });
  }, [initialize]);

  const roomsQuery = api.rooms.getAll.useQuery();
  if (roomsQuery.data) {
    console.log('rooms', roomsQuery.data);
  }

  if (error) {
    return "An error occurred while initializing the client";
  }

  if (isLoading) {
    return "Please sign the request in MetaMask";
  }

  if (!client) {
    return (
      <button type="button" onClick={handleConnect}>
        Connect to XMTP
      </button>
    );
  }

  return (
    <div>
      {roomsQuery.data?.map(room => (
        <h1 key={room.id}>{room.name}</h1>
      ))}
    </div>
  );
}