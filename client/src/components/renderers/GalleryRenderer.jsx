// ReactJS
import React, { Component } from 'react'

// Components
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
import api from '../../services/Api'

// UI Elements
import { Row, Col, Card } from 'antd'
import PageLoader from '../PageLoader'
// const { Meta } = Card

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
    console.log('Getting page data...', this.props.files)

    newState.photos = await this.props.files.map((image) => ({
      src: api.getPageContentBaseUrl(this.props.category, this.props.page) + '/' + image.name,
      ...image,
    }))
    newState.photosReady = true
    newState.loading = false

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

  imageRenderer = ({ index, left, top, key, photo }) => {
    console.log(photo)
    return (
      <Card hoverable style={{ marginTop: 10 }}>
        {/* <Meta style={{ fontStyle: 'italic' }} description={index} /> */}
        <img alt='' src={photo.src} />
      </Card>
    )
  }

  render() {
    return (
      <div>
        <PageLoader loading={this.state.loading}>
          <Row justify='center'>
            <Col span={20}>
              {this.state.photosReady ? (
                <Gallery margin={5} photos={this.state.photos} onClick={this.openLightbox} /> // renderImage={this.imageRenderer}
              ) : null}
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
