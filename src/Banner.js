import "./Banner.css"
import axios from "./axios"
import requests from "./requests"
import React, {useState, useEffect} from "react"

function Banner() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      const size = request.data.results.length
      const randomNumber = Math.floor(Math.random() * size - 1)

      setMovie(request.data.results[randomNumber])
    }
    fetchData()
  }, [])

  // function truncate(str, n) {
  //   return str.length > n ? str.substr(0, n - 1) + "…" : str
  // }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}>
      <div className="banner_content">
        {/* background-image */}
        {/* title */}
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>

        {/* 'div' (inside) > 2 buttons */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        {/* description */}
        <h1 className="banner_description">
          {/* {truncate(movie?.overview, 150)} */}
          {movie?.overview}
        </h1>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  )
}

export default Banner
