import axios from 'axios';

const ACCESS_KEY = "vTa7XgwVVtpTFSGqrnQCsjN00NSH28b2AEh-wSR7nD8";
const BASE_URL = 'https://api.unsplash.com';

export const fetchRandomImages = async (count = 9) => {
  const response = await axios.get(`${BASE_URL}/photos/random`, {
    params: {
      client_id: ACCESS_KEY,
      count,
    },
  });
  return response.data;
};

export const searchImages = async (query, page = 1, perPage = 12) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const fetchPhotoById = async (id) => {
  const response = await axios.get(`${BASE_URL}/photos/${id}`, {
    params: {
      client_id: ACCESS_KEY,
    },
  });
  return response.data;
};
