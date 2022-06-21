import React from 'react';

const GetEvents = ({
  onConfirm
}: {
  onConfirm: (events: string[]) => void;
}) => {
  const [events, setEvents] = React.useState({});

  React.useEffect(() => {
    setEvents({
      ...events,
      'event-0': ''
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(Object.values(events));
  };

  const addListener = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setEvents({
      ...events,
      [`event-${Object.keys(events).length}`]: ''
    });
  };

  const onListenerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvents({
      ...events,
      [`${e.target.attributes.getNamedItem('id').value}`]: e.target.value
    });
  };

  return (
    <form className="w-full h-full my-2 mx-2" onSubmit={onSubmit}>
      <div className="flex flex-col flex-wrap -mx-3 mb-6">
        {Object.keys(events).map(k => (
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" key={k}>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Listener key"
              id={k}
              onChange={onListenerInputChange}
            />
          </div>
        ))}
      </div>
      <button
        onClick={addListener}
        className="bg-teal-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Event +
      </button>
      <button className="bg-teal-600 hover:bg-green-700 mx-5 text-white font-bold py-2 px-4 rounded">
        Confirm
      </button>
    </form>
  );
};

export default GetEvents;
