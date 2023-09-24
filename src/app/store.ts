import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
// import { Wallet } from 'ethers';
import { Conversation } from '@xmtp/xmtp-js';

type Room = {
  id: string,
  address: string,
  conversation: Conversation,
  messages: string[]
};

type State = {
  // connected?: Wallet,
  rooms: Room[]
  createRoom: () => Promise<void>;
  joinRoom: () => Promise<void>;
  sendMessage: (room: Room, message: string) => Promise<void>;
};

export const useStore = create<State>()(
  immer((set, get) => ({
    connected: undefined,
    rooms: [],

    // connect: (wallet: Wallet) => {
    //   set({ connected: wallet });
    // },
    createRoom: async () => {
      
    },
    joinRoom: async () => {
      
    },
    sendMessage: async (room, message) => {
      
    },
  }))
);
