import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ModuleRegisterProvider } from "@danreeves/app-module-registery";
import { Toasts, addToast } from "@danreeves/app-toasts";
import {
  NotificationHistory,
  module as notificationHistoryModule,
} from "@danreeves/app-notification-history";

const store = createStore(
  {
    initialState: {},
    extensions: [getSagaExtension({})],
  },
  notificationHistoryModule
);

store.subscribe(() => console.log("[Store]", store.getState()));

const Posts = lazy(() => import("@danreeves/app-posts"));

function App() {
  return (
    <Provider store={store}>
      <ModuleRegisterProvider>
        <Router>
          <div style={{ fontFamily: "monospace" }}>
            <header>
              <h1>hello world!</h1>
              <nav>
                <Link to="/">Home</Link> <Link to="/posts">Posts</Link>{" "}
                <Link to="/notifications">Notifications</Link>
              </nav>
            </header>
            <section>
              <Suspense fallback={<div>Loading...</div>}>
                <Route exact path="/">
                  <p>This is the home page</p>
                  <button onClick={() => store.dispatch(addToast("wow"))}>
                    Add a toast
                  </button>
                </Route>
                <Route path="/posts" component={Posts} />
                <Route path="/notifications">
                  <NotificationHistory />
                </Route>
              </Suspense>
            </section>
          </div>
          <Toasts />
        </Router>
      </ModuleRegisterProvider>
    </Provider>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
