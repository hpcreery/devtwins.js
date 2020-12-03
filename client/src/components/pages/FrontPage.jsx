// React
import React, { Component } from 'react'

// UI Elements
import api from '../../services/Api'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Carousel, Row } from 'antd'
import slide1 from './slide1.jpg'
import slide2 from './slide2.png'
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

const contentStyle = {
  objectFit: 'contain',
  maxHeight: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default class FrontPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkMode: false,
      currentImage: 0,
      photos: [],
      photosReady: false,
    }
  }

  updateInfo = async () => {
    let newState = { ...this.state }
    console.log('Getting page data...', this.props.files)

    var res = await api.getPageInfo('_Home', 'images')
    // console.log('New Page Info: ', res)
    if (res.status === 200) {
      newState.pageFiles = res.data.files
    } else {
      console.log('Server Error')
    }

    newState.photos = await res.data.files.map((image) => ({
      src: api.getPageContentBaseUrl('_Home', 'images') + '/' + image.name,
      ...image,
    }))
    newState.photosReady = true

    console.log('Photos are:', newState.photos)
    this.setState({ ...newState })
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
      <div style={{paddingTop: '64px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
        <h1 style={{fontFamily: 'Courier', fontSize: 50}}>Welcome</h1>
        {this.state.photosReady ? (
            <Carousel autoplay>
              {this.state.photos.map((x) => (
                <div>
                <Row justify="center" key={x.name}>
                  {/* <h1 style={contentStyle}>{x.src}</h1> */}
                  <img src={x.src} style={{maxHeight: '300px'}} />
                </Row>
                </div>
              ))}
            </Carousel>
        ) : null}
      </div>
    )
  }

  componentDidMount() {
    this.updateInfo()
  }

  async componentDidUpdate(prevProps) {
    console.log('debug: GalleryRenderer, componentDidUpdate()', prevProps, this.props)
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.updateInfo()
    }
  }
}
