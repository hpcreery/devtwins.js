// React
import React, { Component } from 'react'

// UI Elements
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Switch, Input } from 'antd'

// UX Elements

export class FrontPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkMode: false,
    }
    // this.themeSwitcher = useThemeSwitcher();
    // { switcher, currentTheme, status, themes } = useThemeSwitcher();
  }

  ThemeComponent = () => {
    const { switcher, themes, currentTheme, status } = useThemeSwitcher()
    const [isDarkMode, setIsDarkMode] = React.useState(false)

    if (status === 'loading') {
      return <div>Loading styles...</div>
    }

    const toggleDarkMode = () => {
      setIsDarkMode((previous) => {
        switcher({ theme: previous ? themes.light : themes.dark })
        return !previous
      })
    }

    return (
      <div>
        <h2>Current theme: {currentTheme}</h2>
        <button onClick={toggleDarkMode}> swith the theme </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        FrontPage{this.props.scrollPosition}
        {/* <h1>The current theme is: {this.themeSwitcher.currentTheme}</h1> */}
        {/* <Switch checked={this.isDarkMode} onChange={this.toggleTheme} /> */}
        {/* <Input
          style={{ width: 300, marginTop: 30 }}
          placeholder="I will change with the theme!"
        /> */}
        {/* <this.ThemeComponent/> */}
      </div>
    )
  }
}

export default FrontPage
