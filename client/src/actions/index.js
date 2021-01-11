import axios from 'axios'; 
import { FETCH_USER } from './types'; 

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

// allows credits to update automatically 
// take token, send to backend api, response to post request is updated user model
// update value in reducer, reducer updates value, new state makes components re- rendered 
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token); 
    dispatch({ type: FETCH_USER, payload: res.data });
}
