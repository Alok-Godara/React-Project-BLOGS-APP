import React from 'react'

function Logo({ width = '70px' }) {
  return (
    <div style={{ width }}>
        <img
          src="https://i.postimg.cc/DyjByRZ6/Shin-Chan-No-Background.png"
          alt="Shin-Chan-No-Background"
          style={{ width: '100%', height: 'auto', display: 'block', border: 0 }}
        />
    </div>
  )
}

export default Logo
