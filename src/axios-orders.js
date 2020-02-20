import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-3fd08.firebaseio.com/"
});

export default instance;