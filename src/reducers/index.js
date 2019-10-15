import { combineReducers } from 'redux'
import { postsData } from './postsReducer';
import { userData } from './userReducer';


export default combineReducers(
  {
    posts: postsData,
    users: userData
  });
