import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({
      type: "FETCH_POSTS",
      payload: response.data
    });
  };
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const fetchPostsAndUsers = function() {
  return async function(dispatch, getState) {
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, "userId"));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // Fais la meme chose que ce qui est commenté ci dessus mais plus factorisé !
    _.chain(getState().posts)
      .map("userId")
      .uniq()
      .forEach(id => dispatch(fetchUser(id)))
      .value();
  };
};

// version utilisant MEMOIZE
// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
