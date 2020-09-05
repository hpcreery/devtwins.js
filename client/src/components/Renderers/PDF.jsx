import React, { useState, useCallback, Component } from 'react'
// import { render } from "react-dom";
// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos-temp";
import { Document, Page, Outline } from 'react-pdf/dist/entry.webpack' // https://projects.wojtekmaj.pl/react-pdf/

import { Layout, Affix, Button, Row, Col, Card, Typography, Space, Progress } from 'antd'

import { pdfjs } from 'react-pdf';


// Components
import api from '../../services/Api'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class GalleryRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      numPages: null,
      numRenderedPages: 0,
      width: 0,
      height: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.basestate = this.state
  }
  

  // state = {
  //   file: null,
  //   numPages: null,
  //   numRenderedPages: 0,
  //   width: 0,
  //   height: 0,
  // }

  // basestate = this.state

  // componentWillMount() { // legacy/unsafe
  // console.log(this.props.match.params.id, this.props.page)
  // this.setState(this.baseState)
  // this.updateInfo()
  // }

  componentDidUpdate(prevProps) {
    console.log('debug: PDFrenderer, componentDidUpdate()', prevProps, this.props)
    if(JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.updateInfo();
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.id !== this.props.id;
  // }

  componentDidMount() {
    console.log('PDF component mounted')
    // this.setState(basestate)
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.updateInfo()
  }

  // async componentDidUpdate(prevProps) {
  //   console.log('debug: PDFrenderer, componentDidUpdate()', prevProps, this.props)
  //   if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
  //     this.updateInfo()
  //   }
  // }

  componentWillUnmount() {
    console.log('Unmounting PDF Component')
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  updateInfo() {
    // this.numRenderedPages = 0
    // this.setState({numRenderedPages: 0})
    console.log('Updating PDF page data...', this.props.file)
    this.setState({ file: api.getPageContentBaseUrl(this.props.category, this.props.page) + '/' + this.props.file, numRenderedPages: 0 }, () => console.log('set PDF state to:', this.state))
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    // setNumPages(numPages);
    console.log(numPages, 'pages')
    this.setState({ numPages }, () => {
      console.log(this.state.numPages)
      // this.props.doneLoading()
    })
  }

  countLoadedPages = () => {
    // this.setState({})
    // this.numRenderedPages = this.numRenderedPages + 1
    this.setState(prevState => {
      return {numRenderedPages: prevState.numRenderedPages + 1}
   })
    console.log('rendered new page', this.state.numRenderedPages)
    if (this.state.numRenderedPages == this.state.numPages) {
      this.props.doneLoading()
      console.log('Done loading')
    }
  }

  PageViewer = (props) => {
    // console.log('rendering page...')
    return Array.from(new Array(this.state.numPages), (el, index) => (
      <Card style={{ marginTop: 10, marginBottom: 10 }} hoverable>
        <Page
          key={`${this.state.file}_page_${index + 1}`}
          pageNumber={index + 1}
          height={this.state.height}
          onRenderSuccess={this.countLoadedPages}
        />
      </Card>
    ))
  }

  render() {
    console.log('rerendering PDF')
    return (
      <div>
        <Row justify='center'>
          <Col>
          {(this.state.numRenderedPages < this.state.numPages) ? 
          <Progress percent={(this.state.numRenderedPages/this.state.numPages)*100} showInfo={false} />
           : null}
            <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} onLoadProgress={({ loaded, total }) => console.log('Loading a document: ' + (loaded / total) * 100 + '%')} onLoadError={(error) => console.log('Error while loading page! ' + error.message)}>
              {/* <Outline /> */}
              <this.PageViewer />
            </Document>
          </Col>
        </Row>
      </div>
    )
  }
}
