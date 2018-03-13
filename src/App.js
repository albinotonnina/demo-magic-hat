import React, {Component} from 'react'
import GithubCorner from 'react-github-corner'
import Demo from './Demo'

import './App.css'
const createFps = require('fps-indicator')
createFps()

class App extends Component {
  render() {
    return (
      <div className="App">
        <Demo />
        <GithubCorner
          href="https://github.com/albinotonnina/react-magic-hat"
          bannerColor="#efefef"
          octoColor="#ff383f"
          size="120"
          direction="left"
          className="githubCorner"
        />
      </div>
    )
  }
}

export default App
