// ReactJS
import React, { Component } from 'react'

// Components
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import api from '../../services/Api'

// UI Elements
import { Row, Col, Card } from 'antd'
import PageLoader from '../PageLoader'
// const { Meta } = Card
const smallItemStyles = {
  cursor: 'pointer',
  // objectFit: 'cover',
  maxWidth: '250px',
  // height: '150px',
  padding: '10px',
}
// Main Class
export default class GalleryRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentImage: 0,
      viewerIsOpen: false,
      photos: [],
      photosReady: false,
    }
  }

  updateInfo = async () => {
    let newState = { ...this.state }
    console.log('Getting page data...', this.props.file)

    newState.photos = await this.props.file.map((image) => ({
      src: api.getPageContentBaseUrl(this.props.category, this.props.page) + '/' + image.name,
      ...image,
    }))
    newState.photosReady = true
    newState.loading = false

    console.log('Photos are:', newState.photos)
    this.setState({ ...newState })
  }

  render() {
    return (
      <div>
        <PageLoader loading={this.state.loading}>
          <Row justify="center">
            <Col span={20}>
              {this.state.photosReady ? (
                <Gallery id="my-gallery" withDownloadButton>
                  <div
                    style={{
                      // display: 'grid',
                      // gridTemplateColumns: 'repeat(3, 0fr)',
                      // gridGap: 10,
                      textAlign: 'center'
                    }}
                  >
                    {this.state.photos.map((img) => {
                      return <Item original={img.src} thumbnail={img.src} width={img.width} height={img.height}>
                      {({ ref, open }) => <img style={smallItemStyles} ref={ref} onClick={open} src={img.src} />}
                    </Item>
                    })}
                  </div>
                </Gallery>
              ) : null}
            </Col>
          </Row>
        </PageLoader>
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
