import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetail, MovieDetail } from './services';
import './App.css'

const MovieDetailPage = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<'done'|'none'>('none');
  const [data, setData] = useState<MovieDetail>();

  const fetchData = async () => {
    try {
      const data = await fetchDetail({ id });
      setData(data);
      setStatus('done')
    } catch (err) {
      // do nothing
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="detail-page">
      { status === 'none' && <div className="content"><h1>LOADING...</h1></div> }
      {
        status === 'done' && <div className="content">
        <img src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.original_title} />
        <div className="desc">
        <h1>{data?.original_title}</h1>
        <p>{data?.release_date}</p>
        <p>{data?.overview}</p>
        </div>
      </div>
      }
    </div>
  )
}

export default MovieDetailPage;