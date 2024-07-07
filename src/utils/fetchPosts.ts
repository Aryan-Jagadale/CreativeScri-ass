import axios from "axios";
import _ from "lodash";

const limit = 5;
const CACHE_EXPIRATION_TIME = 0.5 * 60 * 1000; 

async function fetchPosts(word = "", page = 1,isLoadMoreClick = false) {
  try {
    if (!_.isString(word)) {
      return;
    }

    let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    word = word.trim().toLowerCase();

    if (word && word.length > 2) {
      url = `https://jsonplaceholder.typicode.com/posts?title_like=${word}&_page=${page}&_limit=${limit}`;
    }

    if (!isLoadMoreClick && localStorage.getItem(`cachedData_${word}`) !== null) {
      const cachedTimestamp = Number(localStorage.getItem(`cachedData_${word}_timestamp`));
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - cachedTimestamp;
      const cachedDataString = localStorage.getItem(`cachedData_${word}`);
    
      if (cachedDataString && timeDifference < CACHE_EXPIRATION_TIME) {
        const cachedData = JSON.parse(cachedDataString);
        return cachedData;
      }
    }

    const response = await axios.get(url);
    const responseData = response.data;

    localStorage.setItem(`cachedData_${word}`, JSON.stringify(responseData));
    localStorage.setItem(`cachedData_${word}_timestamp`, `${new Date().getTime()}`);

    return responseData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export default fetchPosts;
