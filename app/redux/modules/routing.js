import * as NavigationStateUtils from 'NavigationStateUtils';

// Actions
export const NAVIGATE = 'NAVIGATE';
export const NAV_PUSH = 'NAV_PUSH';
export const NAV_POP = 'NAV_POP';
export const NAV_JUMP_TO_KEY = 'NAV_JUMP_TO_KEY';
export const NAV_JUMP_TO_INDEX = 'NAV_JUMP_TO_INDEX';
export const NAV_RESET = 'NAV_RESET';

const initialNavState = {
  index: 0,
  routes: [
    { key: 'Demos' }
  ]
};

// Action Creators
export function navigatePush(data) {
  // state = typeof state === 'string' ? { key: state, title: state } : state; // eslint-disable-line no-param-reassign
  return {
    type: NAV_PUSH,
    data
  };
}

export function navigatePop() {
  return {
    type: NAV_POP
  };
}

export function navigateJumpToKey(key) {
  return {
    type: NAV_JUMP_TO_KEY,
    key
  };
}

export function navigateJumpToIndex(index) {
  return {
    type: NAV_JUMP_TO_INDEX,
    index
  };
}

export function navigateReset(routes, index) {
  return {
    type: NAV_RESET,
    index,
    routes
  };
}

export default function reducer(state = initialNavState, action) {
  switch (action.type) {
    case NAV_PUSH:
      if (state.routes[state.index].key === (action.state && action.state.key)) {
        return state;
      }
      return NavigationStateUtils.push(state, action.data);

    case NAV_POP:
      if (state.index === 0 || state.routes.length === 1) {
        return state;
      }
      return NavigationStateUtils.pop(state);

    case NAV_JUMP_TO_KEY:
      return NavigationStateUtils.jumpTo(state, action.key);

    case NAV_JUMP_TO_INDEX:
      return NavigationStateUtils.jumpToIndex(state, action.index);

    case NAV_RESET:
      return NavigationStateUtils.reset(state, action.routes, action.index);

    default:
      return state;
  }
}
