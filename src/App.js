import React, { useState } from "react"
import "./styles.css"
import * as emoji from "node-emoji"

// In this example, we use unique emojis, which can be their own keys.
const INITIAL_EMOJI = Array(8)
  .fill(0)
  .map((n) => emoji.random().emoji)

// Things get more complicated if you need to track the React key props
// while using unique ids for the key, but this example demonstrates
// the basics of removing an item from an array in React state. If your
// items aren't guaranteed to be unique, then you'll need unique keys.

// Technically, these emoji are picked randomly and aren't necessarily
// unique, but there are so many to choose from duplicates are unlikely.

const App = () => {
  // React Hooks to set the initial state and get the setter function:
  const [emojis, setEmojis] = useState(INITIAL_EMOJI)

  const addEmoji = () => {
    // Add a random emoji to React State using the useState hook:
    setEmojis((emojis) => [...emojis, emoji.random().emoji])
  }

  // Remove a single emoji by looking it up in React State:
  const removeEmoji = (targetEmoji) => {
    setEmojis((emojis) => emojis.filter((emoji) => emoji !== targetEmoji))
  }
  // Array.prototype.filter() works great for removing unique items.

  // Remove a single emoji from React State by its index:
  const removeEmojiAtIndex = (index) => {
    // Make a shallow copy of the array using Array.from()
    // so we don't try to modify React state directly:
    const newEmojis = Array.from(emojis)
    // Remove exactly one emoji from the array at the selected index:
    newEmojis.splice(index, 1)
    // Update React state with the useState hook:
    setEmojis((emojis) => newEmojis)
  }

  // Remove a emoji from the array in React state at random:
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

  const randomIndex = Math.floor(Math.random() * emojis.length)

  return (
    <div className="App">
      <h1>
        How to Remove an Item from an Array in React State using Hooks
        <br />
        (When Items Are Unique)
      </h1>
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
      <button
        className="remove-emoji-at-index"
        onClick={() => removeEmojiAtIndex(randomIndex)}
      >
        Remove Highlighted Emoji at Index {randomIndex}
      </button>
      <ul className="emoji-list">
        <h3>Click any emoji to remove it</h3>
        {emojis.map((emoji, index) => (
          <li key={emoji}>
            <button
              className={`remove-emoji${
                randomIndex === index ? " highlight" : ""
              }`}
              onClick={() => removeEmoji(emoji)}
            >
              {emoji}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
