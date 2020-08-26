import React, { useState, useCallback, Component } from 'react'
// import { render } from "react-dom";
// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos-temp";
import { Document, Page, Outline } from 'react-pdf/dist/entry.webpack' // https://projects.wojtekmaj.pl/react-pdf/

import { Layout, Affix, Button, Row, Col, Card, Typography, Space } from 'antd'

// Components
import api from '../../services/Api'

export default class GalleryRenderer extends Component {
  constructor(props) {
    super(props)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  state = {
    file: null,
    numPages: null,
    width: 0,
    height: 0,
  }

  // componentWillMount() { // legacy/unsafe
  // console.log(this.props.match.params.id, this.props.page)
  // this.setState(this.baseState)
  // this.updateInfo()
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('debug: PDFrenderer, componentDidUpdate()', prevProps, this.props)
  //   if(JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
  //     this.updateInfo();
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.id !== this.props.id;
  // }

  componentDidMount() {
    console.log('PDF component mounted')
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.updateInfo()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  updateInfo() {
    console.log('Getting PDF page data...', this.props)
    let newfile = api.getPageContentBaseUrl(this.props.category, this.props.page) + '/' + this.props.file
    console.log('Got new file ' + newfile)
    this.setState({ file: newfile })
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    // setNumPages(numPages);
    console.log(numPages, 'pages')
    this.setState({ numPages }, () => {
      console.log(this.state.numPages)
      this.props.doneLoading()
    })
  }

  PageViewer = (props) => {
    console.log('viewing pages')
    return Array.from(new Array(this.state.numPages), (el, index) => (
      <Card key={`page_${index + 1}`} style={{ marginTop: 10, marginBottom: 10 }}>
        <Page key={`page_${index + 1}`} pageNumber={index + 1} height={this.state.height} />
      </Card>
    ))
  }

  render() {
    console.log('rendering PDF')
    return (
      <div>
        <Row justify='center'>
          <Col>
            <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess}>
              {/* <Outline /> */}
              <this.PageViewer />
            </Document>
          </Col>
        </Row>
      </div>
    )
  }
}
