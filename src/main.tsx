import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import Cookies from 'universal-cookie';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../api/user.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserContext.Provider value={new Cookies().get('userdata')}>
            <App/>
        </UserContext.Provider>
    </React.StrictMode>,
);