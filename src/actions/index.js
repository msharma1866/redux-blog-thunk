import jsonPlaceHolder from '../apis/jsonPlaceHolder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => {
  // getState arg gives access to the state 
  return async function (dispatch, getState) {
    console.log('Fetch posts - started');
    // dispatch will send the action creater returned from fetchposts to the pipeline - middleware and reducer
    // awaiter here as you don't to call anything after dispatch(fetchpost) until it returns to all posts
    await dispatch(fetchPosts()); // returns a function that dispatches an action then dispatches the function will actually invoke the function
    console.log('Fetch posts ended');
    const users = _.uniq(_.map(getState().posts, 'userId'));
    users.forEach(userId => {
      dispatch(fetchUser(userId));
    })
  }
}

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get('/posts');
  // action creator returns an action with the fetched data on the payload property
  // with dispatch no need to return action. just return an object
  // dispatching an action here - redux-thunk
  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data
  })
  // return {
  //   type: 'FETCH_POSTS',
  //   payload: response
  // }
};

// export const fetchUser = (id) => {
//   return async function (dispatch, getState) {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     //console.log(response.data);
//     dispatch({
//       type: 'FETCH_USER',
//       payload: response.data
//     })
//   }
// }

// memoize the inner function outside so that whenever fetchUser is called, it internally calls the memoized version of fetchUser
export const fetchUser = (id) => {
  return function (dispatch) {
    _fetchUser(id, dispatch)
  }
}

const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);
  //console.log(response.data);
  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  })
});


