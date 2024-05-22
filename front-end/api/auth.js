import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:3000/api/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:3000/api/login", loginData);
}

export async function onLogout() {
  return await axios.get("http://localhost:3000/api/logout");
}

export async function getCurrentUser() {
  return await axios.get("http://localhost:3000/api/get-users");
}

export async function getUser() {
  return await axios.get("http://localhost:3000/api/get-user");
}

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:3000/api/protected");
}

export async function DiaryEntry(diarydata) {
  return await axios.post("http://localhost:3000/api/diarypage", diarydata);
}

export async function getPosts() {
  try {
    const response = await axios.get("http://localhost:3000/api/getPosts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function postPost(blogPost) {
  return await axios.post("http://localhost:3000/api/postPost", blogPost, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function editBlog(blogData) {
  return await axios.put("http://localhost:3000/api/editBlog", blogData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteBlog(blogId) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/deleteBlog/${blogId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}
