'use client'
import { useState } from "react";
import { useAccount } from "wagmi";
import { trpc } from "~/app/_trpc/client";

export default function Create() {
  const [streamUrl, setStreamURL] = useState<string | undefined>(undefined);
  const [streamName, setStreamName] = useState<string | undefined>(undefined);

  const { address } = useAccount();
  const createQuery = trpc.rooms.create.useMutation()

  const isReadyToSubmit = !!address && !!streamUrl && !!streamName;

  const create = () => {
    if (isReadyToSubmit) {
      createQuery.mutate({
        creator: address as string ?? '',
        name: streamName,
        stream_url: streamUrl
      })
    }
  }

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Go Live!</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Stream Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Stream URL
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={streamUrl}
                onChange={(e) => setStreamURL(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-6">
          <div className='flex flex-grow' />
          <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:"
            onClick={create}
            disabled={createQuery.isLoading || !isReadyToSubmit}
          >
            Submit
          </button>
        </div>
        </div>
      </div>
    </div>
  )            
}