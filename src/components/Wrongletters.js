import React from 'react'

const Wrongletters = ({Wrongletters}) => {
  return (
    <div className="wrong-letters-container">
        <div>
        {Wrongletters.length > 0 && <p>Wrong</p> }
    {Wrongletters
        .map((letter, i) => <span key={i}>{letter}</span>)
        .reduce((prev, curr) => prev == null ? [curr] : [prev, `, `, curr], null)}
        </div>
      </div>

  )
}

export default Wrongletters
