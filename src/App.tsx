import React from 'react';
import ReactDOM from 'react-dom';
import GetEvents from './components/GetEvents';
import Event from './components/Event';
import Visibility from './components/Visiblity';
import Icon from './icons';
import './index.scss';
import { EventInterface } from './types';

const App = () => {
  const [events, setEvents] = React.useState<EventInterface[]>([]);
  const [eventKeys, setEventKeys] = React.useState<string[]>([]);
  const [showEvents, setShowEvents] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState('');

  React.useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', event => {
        let eventData: EventInterface = JSON.parse(event.data);
        setEvents(prevEvents => [
          ...prevEvents,
          {
            ...eventData,
            timestamp: new Date().getTime()
          }
        ]);
      });

      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage('activate');
      });
    }
  }, []);

  const onGetEventsConfirm = (eventKeys: string[]) => {
    setShowEvents(true);
    setEventKeys(eventKeys);
    navigator.serviceWorker.ready.then(registration => {
      registration.active.postMessage({
        key: 'events',
        data: eventKeys
      });
    });
  };

  const onBack = () => {
    setShowEvents(false);
  };

  const onFilter = (eventName: string) => {
    setSelectedEvent(eventName === 'All' ? '' : eventName);
  };

  return (
    <div className="h-full flex">
      {JSON.stringify(new Date())}
      <div className="flex flex-1 w-full">
        <Visibility show={!showEvents}>
          <GetEvents onConfirm={onGetEventsConfirm} />
        </Visibility>
        <Visibility show={showEvents}>
          <div className="flex w-full">
            <div className="flex flex-col min-w-[240px] h-full bg-slate-100 items-center justify-between py-6 px-6">
              <div className="flex flex-col gap-4 w-full">
                <Icon name="filter" style={{ margin: 'auto' }} />
                <div className="flex flex-col overflow-y-auto gap-4">
                  {['All', ...eventKeys].map(eventKey => (
                    <button
                      onClick={() => onFilter(eventKey)}
                      key={eventKey}
                      className="py-3 px-6 rounded-lg border-2 border-teal-600 font-semibold hover:bg-teal-600 hover:text-white"
                    >
                      {eventKey}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="w-24 border-none	rounded-md bg-teal-600 text-white py-2"
                onClick={onBack}
              >
                Back
              </button>
            </div>
            <div className="flex flex-col w-full overflow-y-auto">
              {events
                .filter(event =>
                  !selectedEvent ? true : selectedEvent === event.key
                )
                .map(event => (
                  <Event key={event.timestamp} event={event} />
                ))}
            </div>
          </div>
        </Visibility>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
