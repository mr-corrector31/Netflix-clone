import movieTrailer from 'movie-trailer';
import React,{useState, useEffect} from 'react'
import YouTube from 'react-youtube';
import axios from './axios'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies,setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // A snippet of code which runs based on specific conditions   
    useEffect(()=>{
        // if [], run once when the row loads
        async function fetchData(){
          const request = await axios.get(fetchUrl);
          setMovies(request.data.results);
          return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts={
      height: "390",
      width: "100%",
      palyerVars:{
        autoplay: 1,
      }
    }

    const handleClick = (movie)=>{
      if(trailerUrl){
        setTrailerUrl("");
      }else{
        movieTrailer(movie?.name || "")
        .then(url =>{
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        }).catch((error)=>console.log(error));
      }
    }

  return (
    <div className='row'>
        {/* title */}
        <h2>{title}</h2>

        <div className='row__posters'>
          {/* several row_posters */}
          {movies.map(movie =>(
            <img className={
              `row__poster ${isLargeRow && "row__posterLarge"}`} 
              onClick={() => handleClick(movie)}
              key={movie.id} src={`${base_url}${isLargeRow? movie.poster_path: movie.backdrop_path}`} 
              alt={movie.name}/>
          ))}
        </div>
       {trailerUrl && <YouTube videoId="0EP1pDMFUBY" opts={opts} />}
    </div>
  )
}

export default Row