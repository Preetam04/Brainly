import axios from "./axios";

const token = localStorage.getItem("brainly-token");

async function getUserData() {
  console.log(token);

  return await axios.get("/content", {
    headers: {
      authorization: token,
    },
  });
}

export { getUserData };
