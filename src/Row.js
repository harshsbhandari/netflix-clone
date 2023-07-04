import movieTrailer from "movie-trailer"
import React, {useState, useEffect} from "react"
import axios from "./axios"
import "./Row.css"
import YouTube from "react-youtube"

const base_url = `https://image.tmdb.org/t/p/original/`

// rfce - shortcut for function based component in react
function Row(props) {
  const [movie, setMovie] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")

  // A snippet of code which runs based on a specific condition
  // If [], then it means, run once when the row loads, and don't run again
  // If [movie], then it means, run every time when the 'movie' changes
  useEffect(() => {
    // To use an asynchronous function inside useEffect do like this -
    async function fetchData() {
      const request = await axios.get(props.fetchUrl)
      setMovie(request.data.results)
      //   return request
    }
    fetchData()
  }, [props.fetchUrl])
  // If any variable is used inside useEffect, then it becomes a dependency, because if it changes then reload needs to be done, so put it inside '[]'

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  }

  // Get movie trailer
  const handleClick = (i) => {
    if (trailerUrl) {
      setTrailerUrl("")
    } else {
      movieTrailer(i?.name || i?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          // https://www.youtube.com/watch?v=-cMqr9HpZ-Y&list=LL&index=5
          // To get string 'v' and after in the above URL
          setTrailerUrl(urlParams.get("v"))
          // console.log(movie.name)
        })
        .catch((error) => console.log("i am error"))
    }
  }

  return (
    <div className="rows">
      {/* title */}
      <h2>{props.title}</h2>

      {/* container -> posters */}
      <div className="row_posters">
        {movie.map((i) => (
          // 'key' - here does a small optimization, it only renders the objects which were not rendered previously
          <img
            key={i.id}
            onClick={() => handleClick(i)}
            className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${props.isLargeRow ? i.poster_path : i.backdrop_path}`}
            alt={i.name}
          />
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {/* <YouTube videoId="2g811Eo7K8U" opts={opts} /> */}
    </div>
  )
}

export default Row
