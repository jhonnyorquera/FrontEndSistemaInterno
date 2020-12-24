import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Aplication from './components/Dashboard/Aplication';
import AuthState from './context/autenticacion/authState';
import Login from './components/auth/Login';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';
import RutaPrivada from './config/RutaPrivada'



const App = () => {




    return (

        <div>

            <AuthState>

                <Router>

                    <Switch>
                        <Route exact path="/" component={Login} />
                        
                        <RutaPrivada  path="/inicio#/" component={Aplication} />
                        <Aplication/>
                    </Switch>
                </Router>
            </AuthState>

        </div>
    );
}


export default App;
