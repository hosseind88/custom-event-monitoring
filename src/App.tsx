import React from 'react';
import ReactDOM from 'react-dom';
import GetListeners from './components/GetListeners';
import Listener from './components/Listener';
import Visibility from './components/Visiblity';
import './index.scss';
import { Listener as ListenerInterface } from './types';

const App = () => {
  const [listeners, setListeners] = React.useState<{
    [key: string]: ListenerInterface;
  }>({});
  const [showListeners, setShowListeners] = React.useState(false);

  const onGetListenersConfirm = (listenerKeys: string[]) => {
    for (const listenerKey of listenerKeys) {
      setListeners(
        Object.assign(listeners, {
          [listenerKey]: {
            key: listenerKey,
            eventQueue: []
          }
        })
      );
    }
    setShowListeners(true);

    listenerKeys.forEach(listenerKey => {
      document.addEventListener(listenerKey, async (event: any) => {
        setListeners(prevListeners => ({
          ...prevListeners,
          [listenerKey]: {
            key: listenerKey,
            eventQueue: [...prevListeners[listenerKey].eventQueue, event.detail]
          }
        }));
      });
    });
  };

  return (
    <div className="h-full bg-slate-600 flex">
      <div className="flex p-2 flex-1">
        <Visibility show={!showListeners}>
          <GetListeners onConfirm={onGetListenersConfirm} />
        </Visibility>
        <Visibility show={showListeners}>
          <div className="flex flex-col">
            {Object.entries(listeners).map(([listenerKey, listenerVal]) => (
              <Listener key={listenerKey} listener={listenerVal} />
            ))}
          </div>
        </Visibility>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));