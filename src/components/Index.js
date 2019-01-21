import React, { Component, Fragment } from "react"

export default class Index extends Component {
  render() {
    const { chapters, currentChapterIndex, setCurrentChapterIndex } = this.props

    return (
      <div className="index">
        {chapters.map(({ title, index }) => (
          <div
            onClick={() => setCurrentChapterIndex(index)}
            className={index === currentChapterIndex ? "active" : ""}
          >
            {title}
          </div>
        ))}
      </div>
    )
  }
}
