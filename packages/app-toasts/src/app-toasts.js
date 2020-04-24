import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { takeEvery, call, put, all } from "redux-saga/effects";
import { useAddModule } from "@danreeves/app-module-registery";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const id = "app/toasts";

const actionTypes = {
  add: `${id}/add-toast`,
  remove: `${id}/remove-toast`,
};

function addToast(message) {
  return { type: actionTypes.add, payload: message };
}

function removeToast() {
  return { type: actionTypes.remove };
}

function* timeoutToast() {
  yield wait(5000);
  yield put(removeToast());
}

function* toastsSaga() {
  yield takeEvery(actionTypes.add, timeoutToast);
}

const defaultState = {
  toasts: [],
};

function toastsReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.add:
      return { toasts: [action.payload, ...state.toasts] };
    case actionTypes.remove:
      return { toasts: state.toasts.slice(0, state.toasts.length - 1) };
    default:
      return state;
  }
}

const toastsModule = {
  id,
  reducerMap: {
    [id]: toastsReducer,
  },
  sagas: [toastsSaga],
  initialActions: [addToast("Toasts initialised")],
  finalActions: [],
};

function selector(key, defaultVal = null) {
  return function (state) {
    const localState = state[id] || defaultState;
    return localState[key] || defaultVal;
  };
}

const selectors = {
  toasts: selector("toasts", []),
};

function Toasts() {
  useAddModule(toastsModule);
  const dispatch = useDispatch();
  const toasts = useSelector(selectors.toasts);
  return (
    <div style={{ position: "absolute", top: 0, right: 0 }}>
      <ul style={{ listStyleType: "none" }}>
        {toasts.map((toast, i) => (
          <li
            key={i}
            style={{
              border: "2px solid dodgerblue",
              padding: "15px",
              marginRight: "10px",
              marginBottom: "5px",
            }}
          >
            {toast}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Toasts, actionTypes, addToast };
