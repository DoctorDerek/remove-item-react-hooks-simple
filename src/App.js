import React, { useState } from "react"
import "./styles.css"
import * as emoji from "node-emoji"

// In this example, we use unique emojis, which can be their own keys.
const INITIAL_EMOJI = Array(8)
  .fill(0)
  .map((n) => emoji.random().emoji)
// Things get more complicated if you want to track keys (ids), but this
// will show the basics of removing an item from an array in React state.
const App = () => {
  const [emojis, setEmojis] = useState(INITIAL_EMOJI)

  const addEmoji = () => {
    // Add a random emoji to React State using the useState hook
    setEmojis((emojis) => [...emojis, emoji.random().emoji])
  }

  // Remove a single emoji by looking it up in React State.
  const removeEmoji = (targetEmoji) => {
    setEmojis((emojis) => emojis.filter((emoji) => emoji !== targetEmoji))
  }
  // For large sets of data, you'd want to use a different data structure,
  // like the ES6 Map class, since what we really have here is a "hash map";
  // the .filter() method will have worse performance for looking up items.

  // Remove a emoji from the array in React state at random
  const removeRandomEmoji = () => {
    const randomIndex = Math.random() * emojis.length
    // Make a working copy of the array using Array.from()
    // since we can't modify React state array directly:
    const newEmojis = Array.from(emojis)
    // Remove one emoji at the selected random index:
    newEmojis.splice(randomIndex, 1)
    // Update React state using the useState hook:
    setEmojis((emojis) => newEmojis)
  }

  return (
    <div className="App">
      <h1>How to Remove an Item from an Array in React State using Hooks</h1>
      <h2>Current Emoji List</h2>
      <button className="add-emoji" onClick={() => addEmoji()}>
        Add a Random Emoji
      </button>{" "}
      <button
        className="remove-random-emoji"
        onClick={() => removeRandomEmoji()}
      >
        Remove a Random Emoji
      </button>
      <ul className="emoji-list">
        <h3>Click any emoji to remove it</h3>
        {emojis.map((emoji) => (
          <li key={emoji}>
            <button className="remove-emoji" onClick={() => removeEmoji(emoji)}>
              {emoji}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
