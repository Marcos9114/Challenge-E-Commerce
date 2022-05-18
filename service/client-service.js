const getUser = () => {
  return fetch("http://localhost:3000/users").then((response) => response.json());
};

const clientServices = {
  getUser,
};

export { clientServices };
