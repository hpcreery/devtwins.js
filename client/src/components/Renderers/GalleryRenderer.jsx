import React, { useState, useCallback, Component } from 'react'
// import { render } from "react-dom";
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
// import { photos } from "./photos-temp";

import { Layout, Affix, Button, Row, Col, Card, Typography, Space } from 'antd'

// Components
import api from '../../services/Api'

export default class GalleryRenderer extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    currentImage: 0,
    // setCurrentImage: 0,
    viewerIsOpen: false,
    // setViewerIsOpen: false
    // photos: [{src: 'http://localhost:8081/pagecontent/Photos/First%20Gallery/IMG_8667.jpg', width: 2, hieght: 4}]
    photos: [],
    photosReady: false,
  }

  updateInfo = async () => {
    let newState = { ...this.state }
    console.log('Getting page data...', this.props.files)

    newState.photos = await this.props.files.map((image) => ({
      src: api.getPageContentBaseUrl(this.props.category, this.props.page) + '/' + image.name,
      ...image,
    }))
    newState.photosReady = true

    console.log('Photos are:', newState.photos)
    this.setState({ ...newState })
  }

  openLightbox = (event, { photo, index }) => {
    console.log(event, photo, index)
    this.setState({ currentImage: index, viewerIsOpen: true })
  }

  closeLightbox = () => {
    this.setState({ currentImage: 0, viewerIsOpen: false })
  }

  render() {
    return (
      <div>
        <Row justify='center'>
          <Col span={20}>
            {this.state.photosReady ? <Gallery photos={this.state.photos} onClick={this.openLightbox} /> : null}
            <ModalGateway>
              {this.state.viewerIsOpen ? (
                <Modal onClose={this.closeLightbox}>
                  <Carousel
                    currentIndex={this.state.currentImage}
                    views={this.state.photos.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount() {
    this.updateInfo()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateInfo()
    }
    //this.updateInfo()
  }
}
