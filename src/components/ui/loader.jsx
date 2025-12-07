import React from 'react'

export default function Loader({ visible = false, text = 'Loading...' }) {
  if (!visible) return null

  return (
    <div aria-hidden={!visible} className="loader-overlay">
      <div className="loader-box" role="status" aria-live="polite">
        <div className="spinner" />
        <div className="loader-text">{text}</div>
      </div>
    </div>
  )
}
