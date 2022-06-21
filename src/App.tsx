import React from 'react';
import ReactDOM from 'react-dom';
import GetListeners from './components/GetListeners';
import Listener from './components/Listener';
import Visibility from './components/Visiblity';
import Icon from './icons';
import './index.scss';
import { Listener as ListenerInterface } from './types';

const App = () => {
  const [listeners, setListeners] = React.useState<{
    [key: string]: ListenerInterface;
  }>({});
  const [showListeners, setShowListeners] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState('');

  React.useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', event => {
        let eventData = JSON.parse(event.data);
        setListeners(prevListeners => ({
          ...prevListeners,
          [eventData.eventName]: {
            key: eventData.eventName,
            eventQueue: [
              ...prevListeners[eventData.eventName].eventQueue,
              eventData.data
            ]
          }
        }));
      });

      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage('activate');
      });
    }
  }, []);

  const onGetListenersConfirm = (listenerKeys: string[]) => {
    for (const listenerKey of listenerKeys) {
      setListeners(prevListeners => ({
        ...prevListeners,
        [listenerKey]: {
          key: listenerKey,
          eventQueue: []
        }
      }));
    }
    setShowListeners(true);
    navigator.serviceWorker.ready.then(registration => {
      registration.active.postMessage({
        key: 'events',
        data: listenerKeys
      });
    });
  };

  const onBack = () => {
    setShowListeners(false);
  };

  const onFilter = (eventName: string) => {
    setSelectedEvent(eventName === 'All' ? '' : eventName);
  };

  return (
    <div className="h-full flex">
      <div className="flex flex-1 w-full">
        <Visibility show={!showListeners}>
          <GetListeners onConfirm={onGetListenersConfirm} />
        </Visibility>
        <Visibility show={showListeners}>
          <div className="flex w-full">
            <div className="flex flex-col min-w-[240px] h-full bg-slate-100 items-center justify-between py-6 px-6">
              <div className="flex flex-col gap-4 w-full">
                <Icon name="filter" style={{ margin: 'auto' }} />
                {['All', ...Object.keys(listeners)].map(eventName => (
                  <button
                    onClick={() => onFilter(eventName)}
                    key={eventName}
                    className="py-3 px-6 rounded-lg border-2 border-teal-600 font-semibold hover:bg-teal-600 hover:text-white"
                  >
                    {eventName}
                  </button>
                ))}
              </div>
              <button
                className="w-24 border-none	rounded-md bg-teal-600 text-white py-2"
                onClick={onBack}
              >
                Back
              </button>
            </div>
            <div className="flex flex-col w-full overflow-y-auto">
              {Object.entries(listeners)
                .filter(([listenerKey]) =>
                  !selectedEvent ? true : selectedEvent === listenerKey
                )
                .map(([listenerKey, listenerVal]) => (
                  <Listener key={listenerKey} listener={listenerVal} />
                ))}
            </div>
          </div>
        </Visibility>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
