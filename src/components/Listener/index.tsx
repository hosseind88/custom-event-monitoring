import React from 'react';
import { Listener as ListenerInterface } from '../../types';
import Visibility from '../Visiblity';

const Listener = ({ listener }: { listener: ListenerInterface }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const onAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-screen">
      <button
        className="bg-black cursor-pointer text-2xl text-white text-left"
        onClick={onAccordionClick}
      >
        {listener.key}
      </button>
      <Visibility show={isOpen}>
        {listener.eventQueue.map((data, idx) => (
          <div className="px-16 bg-white overflow-hidden" key={idx}>
            <p className="text-left">
              {JSON.stringify(data, null, 2)}
            </p>
          </div>
        ))}
      </Visibility>
    </div>
  );
};

export default Listener;
