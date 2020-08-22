// React
import React, { Component } from 'react'

// UI Elements
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Switch, Input } from 'antd'

// UX Elements

export default class FrontPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkMode: false,
    }
    this.themeSwitcher = useThemeSwitcher()
    // { switcher, currentTheme, status, themes } = useThemeSwitcher();
  }

  toggleTheme = (isChecked) => {
    // setIsDarkMode(isChecked);
    this.setState({ isDarkMode: isChecked })
    this.themeSwitcher.switcher({
      theme: isChecked ? this.themeSwitcher.themes.dark : this.themeSwitcher.themes.light,
    })
  }

  render() {
    return (
      <div>
        FrontPage{this.props.scrollPosition}
        <h1>The current theme is: {this.themeSwitcher.currentTheme}</h1>
        <Switch checked={this.isDarkMode} onChange={this.toggleTheme} />
        <Input style={{ width: 300, marginTop: 30 }} placeholder='I will change with the theme!' />
      </div>
    )
  }
}
