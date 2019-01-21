import React, { Component } from "react"
import ReactMarkdown from "react-markdown"

export default class PopUp extends Component {
  render() {
    const { open, title, content, onClose } = this.props

    return (
      <div className={["popup", open ? "open" : "closed"].join(" ")}>
        <h1> {title} </h1>
        <ReactMarkdown source={content} />
        <button onClick={onClose}>Ok dude</button>
      </div>
    )
  }
}
