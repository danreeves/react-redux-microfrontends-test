import React from "react";
import { useSelector } from "react-redux";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { call, put } from "redux-saga/effects";
import { useAddModule } from "app-module-registery";
import { addToast } from "app-toasts";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const id = "app/posts";

const actions = {
  loading: `${id}/posts-loading`,
  loaded: `${id}/posts-loaded`,
};

function postsLoading() {
  return { type: actions.loading };
}

function postsLoaded(posts) {
  return {
    type: actions.loaded,
    payload: posts,
  };
}

export function* postsSaga() {
  yield call(loadPosts);
}

function* loadPosts() {
  yield put(addToast("Loading posts"));
  yield put(postsLoading());
  yield wait(3000);
  yield put(
    postsLoaded([
      { id: "1", title: "post1" },
      { id: "2", title: "post2" },
      { id: "3", title: "post3" },
      { id: "4", title: "post4" },
      { id: "5", title: "post5" },
      { id: "6", title: "post6" },
    ])
  );
  yield put(addToast("Posts loaded"));
}

const defaultState = {
  loading: true,
  posts: [],
};

function postsReducer(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case actions.loading:
      return { loading: true, posts: [] };
    case actions.loaded:
      return { loading: false, posts: action.payload };
    default:
      return state;
  }
}

export const postsModule = {
  id,
  reducerMap: {
    [id]: postsReducer,
  },
  sagas: [postsSaga],
  initialActions: [],
  finalActions: [],
};

function selector(key, defaultVal = null) {
  return function (state) {
    const localState = state[id] || defaultState;
    return localState[key] || defaultVal;
  };
}

const selectors = {
  isLoading: selector("loading"),
  posts: selector("posts", []),
};

export default function PostsApp() {
  useAddModule(postsModule);
  let { path } = useRouteMatch();
  const isLoading = useSelector(selectors.isLoading);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path={path}>
            <Posts />
          </Route>
          <Route path={`${path}/:id`}>
            <Post />
          </Route>
        </Switch>
      )}
    </div>
  );
}

function Loading() {
  return <p>Loading posts...</p>;
}

function Posts() {
  let { path } = useRouteMatch();
  const posts = useSelector(selectors.posts);
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`${path}/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

function Post() {
  const { id } = useParams();
  return <p>Viewing post: {id}</p>;
}
