// React
import React, { Component } from 'react'

// UI Elements
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Switch, Input } from 'antd'
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

// UX Elements

export default class FrontPage extends Component {
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
        Front Page{this.props.scrollPosition} 
        {/* <h1>The current theme is: {this.themeSwitcher.currentTheme}</h1> */}
        {/* <Switch checked={this.isDarkMode} onChange={this.toggleTheme} /> */}
        {/* <Input
          style={{ width: 300, marginTop: 30 }}
          placeholder="I will change with the theme!"
        /> */}
        {/* <this.ThemeComponent/> */}
        {/* <Parallax pages={3} ref={ref => (this.parallax = ref)}>
          <ParallaxLayer offset={0} speed={0.5}>
            <span onClick={() => this.parallax.scrollTo(1)}>Layers can contain anything</span>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={0.5}>
            <span onClick={() => this.parallax.scrollTo(1)}>Layer 1</span>
          </ParallaxLayer>
          <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#805E73' }} />
        </Parallax> */}
      </div>
    )
  }
}
