import React, {useEffect, useState} from "react"
import "./Navbar.css"
import netflix from "./netflix.png"
import avatar from "./avatar.png"

function Navbar() {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        handleShow(true)
      } else {
        handleShow(false)
      }
    })

    return () => {
      window.removeEventListener("scroll")
    }
  }, [])

  return (
    <div className={`navbar && ${show && "navbar-black"}`}>
      <img className="navbar-logo" src={netflix} alt="Netflix Logo" />
      <img className="navbar-avatar" src={avatar} alt="Avatar" />
    </div>
  )
}

export default Navbar
