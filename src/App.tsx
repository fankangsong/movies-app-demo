import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { fetchList, MovieItem } from './services'
import WalletButton from './MateMask'

type Status = 'loading' | 'done' | 'error' | 'none';

function App() {
  const [status, setStatus] = useState<Status>('none');
  const [list, setList] = useState<MovieItem[]>([]);

  const fetchData = async () => {
    try {
      setStatus('done');
      const { results } = await fetchList();
      setList(results);
    } catch (err) {
      setStatus('error');
    }
  }

  useEffect(() => {
    fetchData()
  },[]);

  return (
    <div className="App">
      <WalletButton />
      <header className="App-header">
        <h1>Movies Now Playing</h1>
      </header>
      <main>
        { status === 'loading' && <div>Loading...</div> }
        { status === 'error' && <div>Server error</div> }
        { status === 'done' && <ul className="now-playing">
          {
            list.map(({ id, poster_path, original_title }) => <li>
              <Link to={`/detail/${id}`} className="button-link" title={original_title}>
                <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={original_title} />
                <div className="title">{original_title}</div>
              </Link>
            </li>)
          }
        </ul>}
      </main>
    </div>
  );
}

export default App;
