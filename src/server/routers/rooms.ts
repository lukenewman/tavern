import { z } from "zod";
import { Wallet } from 'ethers';
import { createTRPCRouter, publicProcedure } from "../trpc";

export const roomsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      creator: z.string(),
      stream_url: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      const privateKey = Wallet.createRandom().privateKey;
      return ctx.db.chatroom.create({
        privateKey,
        creator: input.creator,
        stream_url: input.stream_url,
        name: input.name
      });
    }),
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.chatroom.findMany();
    }),
  join: publicProcedure
    .input(z.object({ id: z.number(), address: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.chatroomUser.create({
        data: {
          chatroomId: input.id,
          address: input.address
        }
      })
    })
});
