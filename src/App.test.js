import React from "react"
import { shallow, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
// enzyme-adapter-react-17 not available yet
import App from "./App"

// Required enzyme configuration
configure({ adapter: new Adapter() })

let app
beforeEach(() => {
  // clean up between tests
  app = shallow(<App />)
})

it("Adds a new emoji to the list when clicking `Add Random Emoji`", () => {
  const initialCount = app.find("ul.emoji-list li").length
  app.find("button.add-emoji").first().simulate("click")
  expect(app.find("ul.emoji-list li").length).toEqual(initialCount + 1)
})

it("Removes a random emoji when clicking `Remove a Random Emoji` button", () => {
  const initialCount = app.find("ul.emoji-list li").length
  app.find("button.remove-random-emoji").simulate("click")
  expect(app.find("ul.emoji-list li").length).toEqual(initialCount - 1)
})

it("Removes a emoji from the list when clicking `X`", () => {
  const initialCount = app.find("ul.emoji-list li").length
  app
    .find("ul.emoji-list li")
    .first()
    .find("button.remove-emoji")
    .simulate("click")
  expect(app.find("ul.emoji-list li").length).toEqual(initialCount - 1)
})

it("Removes the right emoji from the list when clicking `X`", () => {
  const highlightedEmoji = app.find("ul.emoji-list li").first()
  const emoji = highlightedEmoji.key() // or highlightedEmoji.text() as they're the same
  expect(
    app.find("ul.emoji-list").findWhere((n) => n.key() === emoji).length
  ).toEqual(1)
  highlightedEmoji.find("button.remove-emoji").simulate("click")
  expect(
    app.find("ul.emoji-list").findWhere((n) => n.key() === emoji).length
  ).toEqual(0)
})

it("Removes the highlighted emoji when clicking `Remove Highlighted Emoji at Index {randomIndex}` button", () => {
  const highlightedEmoji = app.find("ul.emoji-list li .highlight")
  const emoji = highlightedEmoji.text()
  expect(
    app.find("ul.emoji-list").findWhere((n) => n.key() === emoji).length
  ).toEqual(1)
  app.find("button.remove-emoji-at-index").simulate("click")
  expect(
    app.find("ul.emoji-list").findWhere((n) => n.key() === emoji).length
  ).toEqual(0)
})
