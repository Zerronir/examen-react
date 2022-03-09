import {useState, useEffect, useCallback} from "react";
import axios from "axios";
import StoryContainer from "./Components/StoryContainer";
import './App.css';

const App = () => {

  const [isSending, setIsSending] = useState(false);
  const [count, setCount] = useState(10);
  const [url, setUrl] = useState('https://hacker-news.firebaseio.com/v0/topstories.json');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchStories = async () =>{
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/topstories.json`
      );
      const stories = await response.json();
      const items = await Promise.all(
        stories.slice(0,10).map(async (id) => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return await response.json();
        })
      );
      setStories(stories);
      setItems(items);

      setLoading(false);
    };
    fetchStories();
  }, []);


  const getNextTen = async () => {
      
    const response = await fetch(
      url
    );
    const stories = await response.json();
    const items = await Promise.all(
      stories.slice(0, count).map(async (id) => {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return await response.json();
      })
    );
    setStories(stories);
    setItems(items);
  }

  const sendRequest = useCallback(async () => {
    
    if (isSending) return
    
    setCount(count + 10);
    setIsSending(true)
    setLoading(true);
    
    await getNextTen('https://hacker-news.firebaseio.com/v0/topstories.json')
    
    setIsSending(false)
    setLoading(false);

  }, [isSending]);

  const topStories = useCallback(async() => {

    if (isSending) return
    
    setCount(10);
    setIsSending(true);
    setUrl('https://hacker-news.firebaseio.com/v0/topstories.json')
    setLoading(true);
    
    await getNextTen()
    
    setIsSending(false)
    setLoading(false);

  }, [isSending]);

  const bestStories = useCallback(async() => {

    if (isSending) return
    
    setCount(10);
    setIsSending(true)
    setUrl('https://hacker-news.firebaseio.com/v0/beststories.json')
    setLoading(true);
    
    await getNextTen()
    
    setIsSending(false)
    setLoading(false);

  }, [isSending]);

  const newStories = useCallback(async() => {

    if (isSending) return
    
    setCount(10);
    setIsSending(true)
    setUrl('https://hacker-news.firebaseio.com/v0/beststories.json')
    setLoading(true);
    
    await getNextTen()
    
    setIsSending(false)
    setLoading(false);

  }, [isSending]);

  const parseData = (unix) => {
    const mils = unix * 1000
    const date = new Date(mils)

    return date.toLocaleString();
  }

  return (
    <div className="App">
      {loading === true ? "Loading..." : (
        <div>

          <button onClick={topStories}>Ver las mejores noticias</button>
          <button onClick={bestStories}>Ver las noticias más valoradas</button>
          <button onClick={newStories}>Ver las noticias más recientes</button>

          <button onClick={sendRequest}>Cargar más</button>
          {
            items.map((item) => {
              return (
                <div key={item.id}>
                  <h1>{item.title}</h1>
                  <p>{item.by}</p>
                  <a href={item.url}>{item.url}</a>
                  <p>Puntuación {item.score}</p>
                  <p>{parseData(item.time)}</p>
                </div>  
              )
            })
          }
        </div>
      )}
    </div>
  );
}

export default App;
