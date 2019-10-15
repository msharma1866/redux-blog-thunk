export const postsData = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;

    default:
      return state;
  }
}