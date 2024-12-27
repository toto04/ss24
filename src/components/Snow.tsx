"use client"
import Snowfall from "react-snowfall"

export default function Snow() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Snowfall color="#fff4" />
    </div>
  )
}
