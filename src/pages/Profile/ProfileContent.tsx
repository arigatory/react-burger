import React from 'react'
import About from './About'
import History from './History'

export default function ProfileContent() {
  const panes = [
  {menuItem: 'About', render: () => <About />},
  {menuItem: 'History', render: () => <History />},
]
  return (
    <div>
      {panes[1].render()}
    </div>
  )
}
