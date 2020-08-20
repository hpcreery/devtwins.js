import React, { useState, useCallback, Component } from "react";
// import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos-temp";

import { Layout, Affix, Button, Row, Col, Card, Typography, Space } from 'antd'

// Components
import api from '../../services/Api'

export default class GalleryRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0,
      // setCurrentImage: 0,
      viewerIsOpen: false,
      // setViewerIsOpen: false
      // photos: [{src: 'http://localhost:8081/pagecontent/Photos/First%20Gallery/IMG_8667.jpg', width: 2, hieght: 4}]
      photos: [],
      photosReady: false
    }
    this.baseState = this.state
  }

  componentWillMount() {
    // console.log(this.props.match.params.id, this.props.page)
    // this.setState(this.baseState)
    this.updateInfo()
  }

  updateInfo () {
    console.log('Getting page data...', this.props.files)
    Promise.all(this.props.files.map((image) => {
      this.setState((prevState) => ({ photos: [...prevState.photos, {src: api.getPageContentBaseUrl(this.props.category, this.props.page) + "/" + image.name, width: image.width, height: image.height}] }))
      
    })).then(() => {
      console.log("Done, here are the photos:", this.state.photos)
      this.setState({ photosReady: true })
    })
    
    
    console.log("Photos are:", this.state.photos)
  }

  openLightbox = (event, { photo, index }) => {
    console.log(event, photo, index)
    this.setState({currentImage: index, viewerIsOpen: true})
  }

  closeLightbox = () => {
    this.setState({currentImage: 0, viewerIsOpen: false})
  };

  render() {
    return (
      <div>
        <Row justify="center">
          <Col span={20}>
        {this.state.photosReady ? (<Gallery photos={this.state.photos} onClick={this.openLightbox} />) : null}
        <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox}>
              <Carousel
                currentIndex={this.state.currentImage}
                views={this.state.photos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
        </Col>
        </Row>
      </div>
    );
            }
}

