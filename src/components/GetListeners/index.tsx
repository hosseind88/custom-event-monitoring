import React from 'react';

const GetListeners = ({
  onConfirm
}: {
  onConfirm: (listeners: string[]) => void;
}) => {
  const [listeners, setListeners] = React.useState({});

  React.useEffect(() => {
    setListeners({
      ...listeners,
      'listener-0': ''
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(Object.values(listeners));
  };

  const addListener = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setListeners({
      ...listeners,
      [`listener-${Object.keys(listeners).length}`]: ''
    });
  };

  const onListenerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListeners({
      ...listeners,
      [`${e.target.attributes.getNamedItem('id').value}`]: e.target.value
    });
  };

  return (
    <form className="w-full h-full" onSubmit={onSubmit}>
      <div className="flex flex-col flex-wrap -mx-3 mb-6">
        {Object.keys(listeners).map(k => (
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Listener +
      </button>
      <button className="bg-blue-500 hover:bg-green-700 mx-5 text-white font-bold py-2 px-4 rounded">
        Confirm
      </button>
    </form>
  );
};

export default GetListeners;
