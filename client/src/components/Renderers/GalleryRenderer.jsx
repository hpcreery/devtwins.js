import React, { useState, useCallback, Component } from "react";
// import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos-temp";

import { Layout, Affix, Button, Row, Col, Card, Typography, Space } from 'antd'

export default class GalleryRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0,
      // setCurrentImage: 0,
      viewerIsOpen: false,
      // setViewerIsOpen: false
    }
    this.baseState = this.state
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
        <Gallery photos={photos} onClick={this.openLightbox} />
        <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox}>
              <Carousel
                currentIndex={this.state.currentImage}
                views={photos.map(x => ({
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

