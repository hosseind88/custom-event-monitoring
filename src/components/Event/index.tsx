import React from 'react';
import { EventInterface } from '../../types';

const Listener = ({ event }: { event: EventInterface }) => {
  return (
    <div className="flex h-min w-full border-b-2 border-white">
      <div className="bg-teal-500 text-2xl text-white font-bold min-w-[150px] flex items-center justify-center">
        {event.key}
      </div>
      <div className="px-16 bg-slate-800 text-cyan-500 overflow-hidden flex-1 py-4">
        <pre className="text-sky-500">{JSON.stringify(event.data, undefined, 2)}</pre>
      </div>
    </div>
  );
};

export default Listener;
