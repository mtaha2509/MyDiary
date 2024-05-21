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

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:3000/api/protected");
}

export async function DiaryEntry(diarydata) {
  return await axios.post("http://localhost:3000/api/diarypage", diarydata);
}

export async function getPosts() {
  return await axios.get("http://localhost:3000/api/getPosts")
}

export async function postPost(BlogPosts) {
  return await axios.post("http://localhost:3000/api/postPost", BlogPosts)
}