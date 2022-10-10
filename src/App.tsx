import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import AppBar from './AppBar';
import Home from './screens/Home';
import Products from './screens/Products';

function Layout() {
  return <Outlet />;
}

function App() {
  // console.log('ipcRenderer', window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };

  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage("Hello I'm from React World");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
    setSent(true);
  };

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('message', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex flex-row flex-auto bg-gray-800">
        <div className="flex flex-col h-full bg-gray-900 w-1/4 text-white">
          <NavLink to="/" className="p-3 hover:bg-gray-700">
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'p-3 bg-gray-700' : 'p-3 hover:bg-gray-700')}
          >
            Produtos
          </NavLink>
        </div>
        <div className="h-full flex flex-col w-9/12 p-3 text-white">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Routes>
        </div>

        {/* <div className="flex flex-col justify-center items-center h-full bg-gray-800 space-y-4">
          <h1 className="text-2xl text-gray-200">Vite + React + Typescript + Electron + Tailwind</h1>
          <button
            className="bg-yellow-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-yellow-200"
            onClick={handleToggle}
          >
            Click Me
          </button>
          {isOpen && (
            <div className="flex flex-col space-y-4 items-center">
              <div className="flex space-x-3">
                <h1 className="text-xl text-gray-50">💝 Welcome 💝, now send a message to the Main 📩📩</h1>
                <button
                  onClick={sendMessageToElectron}
                  className=" bg-green-400 rounded px-4 py-0 focus:outline-none hover:bg-green-300"
                >
                  Send
                </button>
              </div>
              {isSent && (
                <div>
                  <h4 className=" text-green-500">Message sent!!</h4>
                </div>
              )}
              {fromMain && (
                <div>
                  {' '}
                  <h4 className=" text-yellow-200">{fromMain}</h4>
                </div>
              )}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default App;
