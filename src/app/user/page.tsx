'use client'

import { api } from "../../utils/api";

export default function User() {
  const roomsQuery = api.rooms.getAll.useQuery();

  return (
    <div>
      {roomsQuery.data?.map(room => (
        <h1 key={room.id}>{room.name}</h1>
      ))}
    </div>
  );
}