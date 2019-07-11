export default initialState => reducerMap => (action, state = initialState) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};
