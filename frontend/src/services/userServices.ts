import axios from "./axios";

const token = localStorage.getItem("brainly-token");

async function getUserData() {
  // console.log(token);

  return await axios.get("/content", {
    headers: {
      authorization: token,
    },
  });
}

async function deleteContent(id: string) {
  return await axios.delete(`/content/${id}`, {
    headers: {
      authorization: token,
    },
  });
}

async function getSharingLink() {
  return await axios.get(`/brain/share`, {
    headers: {
      authorization: token,
    },
  });
}

async function addContent(data: any) {
  return await axios.post(`/content`, data, {
    headers: {
      authorization: token,
    },
  });
}

async function updateContentData(id: string, data: any) {
  return await axios.patch(`/content/${id}`, data, {
    headers: {
      authorization: token,
    },
  });
}
async function getAllSharedData(hash: string) {
  // console.log(hash);

  return await axios.post(`/brain/share`, {
    shareLink: hash,
  });
}

export {
  addContent,
  deleteContent,
  getAllSharedData,
  getSharingLink,
  getUserData,
  updateContentData,
};
