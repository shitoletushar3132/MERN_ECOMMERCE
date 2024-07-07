const backendDomain = "http://localhost:8080";
const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  user_logout: {
    url: `${backendDomain}/api/user-logout`,
    method: "get",
  },

  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },

  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
};

export default summaryApi;
