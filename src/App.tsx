import { ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import _ from "lodash";
import { useDebounce } from "./hooks/useDebounce";
import DataViewer from "./components/DataViewer.tsx";
import fetchPosts from "./utils/fetchPosts.ts";
import LoadMoreButton from "./components/LoadMoreButton.tsx";
import { Post } from "./interface/interface.ts";
import InputSerach from "./components/InputSerach.tsx";

function App() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setisLoading] = useState(false);

  const debouncedSearchWord = useDebounce(searchWord, 500);

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(value);
    setPage(1);
  };

  const loadMore = () => {
    const newPage = page + 1;
    setisLoading(true);

    if (searchWord && searchWord.length > 2) {
      fetchPosts(searchWord, newPage, true)
        .then((newData) => {
          setData((prevData) => [...prevData, ...newData]);
          setPage(newPage);
        })
        .catch((e) => console.error("Error loading more:", e.message))
        .finally(() => setisLoading(false));
    } else {
      fetchPosts("", newPage, true)
        .then((newData) => {
          setData((prevData) => [...prevData, ...newData]);
          setPage(newPage);
        })
        .catch((e) => console.error("Error loading more:", e.message))
        .finally(() => setisLoading(false));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      const word = (e.target as HTMLInputElement)?.value;
      if (word && word.length > 3) {
        fetchPosts(word, 1)
          .then((data) => setData(data))
          .catch((e) => console.error("Error searching:", e.message));
      }
    }
  };

  useEffect(() => {
    if (
      debouncedSearchWord &&
      _.isString(debouncedSearchWord) &&
      debouncedSearchWord.length >= 3
    ) {
      fetchPosts(debouncedSearchWord, 1)
        .then((data) => setData(data))
        .catch((e) => console.error("Error fetching initial data:", e.message));
    } else {
      fetchPosts("", 1)
        .then((data) => setData(data))
        .catch((e) => console.error("Error fetching initial data:", e.message));
    }
  }, [debouncedSearchWord]);

  useEffect(() => {
    fetchPosts("", page)
      .then((newData) => setData(newData))
      .catch((e) =>
        console.error("Error fetching data on page change:", e.message)
      );
  }, []);

  return (
    <div className="p-5">
      <InputSerach
        searchWord={searchWord}
        handleWordChange={handleWordChange}
        handleKeyPress={handleKeyPress}
      />
      <DataViewer data={data} />
      <LoadMoreButton isLoading={isLoading} onClick={loadMore} />
    </div>
  );
}

export default App;
