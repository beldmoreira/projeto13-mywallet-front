import axios from "axios";

const BASE_URL = 'http://localhost:5000';

function createConfig(token) {
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

async function login(data) {
    const token = await axios.post(`${BASE_URL}/login`, data);
    return token;
}

async function register(user) {
  await axios.post(`${BASE_URL}/users`, user);
}

async function createEntry(token, entry) {
  const config = createConfig(token);

  await axios.post(`${BASE_URL}/users/entries`, entry, config);
}

async function getUser(token) {
  const config = createConfig(token);

  const user = await axios.get(`${BASE_URL}/users`, config);
  return user;
}

const api = {
  login,
  register,
  createEntry,
  getUser
}

export default api; 
