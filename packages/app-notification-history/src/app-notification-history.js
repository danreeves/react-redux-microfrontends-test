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
import { actionTypes } from "app-toasts";

const id = "app/notification-history";

const defaultState = { notifications: [] };

function selector(key, defaultVal = null) {
  return function (state) {
    const localState = state[id] || defaultState;
    return localState[key] || defaultVal;
  };
}

const selectors = {
  notifications: selector("notifications", []),
};

function reducer(state = defaultState, action) {
  if (action.type === actionTypes.add) {
    console.log(action.payload);
    const latestNotification = {
      sent: new Date(),
      message: action.payload,
    };
    return {
      ...state,
      notifications: [...state.notifications, latestNotification],
    };
  }
  return state;
}

const module = {
  id,
  reducerMap: {
    [id]: reducer,
  },
};

function NotificationHistory() {
  const notifications = useSelector(selectors.notifications);
  return (
    <div>
      <h2>Notification history</h2>
      <table>
        <thead>
          <tr>
            <th>Sent at</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n, i) => (
            <tr key={i}>
              <td>{n.sent.toString()}</td>
              <td>{n.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { NotificationHistory, module };
