import React from 'react';
import Icon from '../../icons';
import { Listener as ListenerInterface } from '../../types';

const Listener = ({ listener }: { listener: ListenerInterface }) => {
  return (
    <>
      {listener.eventQueue.map((evt, idx) => (
        <div className="flex h-min w-full border-b-2 border-white">
          <div className="bg-teal-500 text-2xl text-white font-bold min-w-[150px] flex items-center justify-center">
            {listener.key}
          </div>
          <div
            className="px-16 bg-slate-800 text-cyan-500 overflow-hidden flex-1 py-4"
            key={idx}
          >
            <pre>{JSON.stringify(evt, undefined, 2)}</pre>
          </div>
        </div>
      ))}
    </>
  );
};

export default Listener;
