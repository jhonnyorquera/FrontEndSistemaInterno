import axios from 'axios';
import Global from '../Global'

const clienteAxios = axios.create({
    baseURL : Global.urlLogin
});

export default clienteAxios;