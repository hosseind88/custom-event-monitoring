import React from 'react';
import Icon from '../../icons';
import { Listener as ListenerInterface } from '../../types';
import Visibility from '../Visiblity';

const Listener = ({ listener }: { listener: ListenerInterface }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const onAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-full">
      <button
        className="bg-cyan-600 px-3 py-3 cursor-pointer text-2xl text-white text-left flex justify-between"
        onClick={onAccordionClick}
      >
        {listener.key}
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
      </button>
      <Visibility show={isOpen}>
        {listener.eventQueue.map((data, idx) => (
          <div
            className="px-16 bg-slate-900	text-cyan-500	my-1 py-2 bg-white overflow-hidden"
            key={idx}
          >
            <pre>{JSON.stringify(data, undefined, 2)}</pre>
          </div>
        ))}
      </Visibility>
    </div>
  );
};

export default Listener;
