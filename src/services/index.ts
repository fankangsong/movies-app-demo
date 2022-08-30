import axios from "axios";

const api_key = '';
const host = 'https://api.themoviedb.org/3';

export interface MovieItem {
  poster_path: string;
  id: number;
  original_title: string;
}

interface MovieList {
  results: MovieItem[]
}

export interface MovieDetail {
  poster_path: string;
  overview: string;
  original_title: string;
  release_date: string;
}

export async function fetchList(params?: Record<string, any>): Promise<MovieList> {
  try {
    const { data } = await axios.get(
      `${host}/movie/now_playing`,
      {
        params: { api_key, ...params }
      }
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function fetchDetail(params: { id: number | unknown}) {
  const { id } = params;
  try {
    const { data } = await axios.get(
      `${host}/movie/${id}`,
      {
        params: { api_key, ...params }
      }
    );
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}