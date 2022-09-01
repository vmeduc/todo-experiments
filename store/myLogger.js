const myLogger = (store) => (next) => (action) => {
  const result = next(action);
  console.log("MyLogger: state\t", store.getState());
  return result;
};

export default myLogger;