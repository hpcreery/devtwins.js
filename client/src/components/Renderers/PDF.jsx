import React, { useState, useCallback, Component } from "react";
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
    this.state = {
      file: null,
      numPages: null,
      width: 0, height: 0
    }
    this.baseState = this.state
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.match.params.id, this.props.page)
    this.setState(this.baseState)
    this.updateInfo()
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updateInfo () {
    console.log('Getting page data...', this.props.files)

    this.setState({ file: api.getPageContentBaseUrl(this.props.category, this.props.page) + "/" + this.props.file })
    

  }

  onDocumentLoadSuccess = ({ numPages }) => {
    // setNumPages(numPages);
    console.log(numPages, 'pages')
    this.setState({ numPages }, () => {console.log(this.state.numPages)})
  }

  PageViewer = (props) => {
    return (
      Array.from(
        new Array(this.state.numPages),
        (el, index) => (
          <Card style={{ marginTop: 10, marginBottom: 10 }} >
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            height={this.state.height}
          />
          </Card>
        ),
      )
    )
  }

  render() {
    return (
      <div>
        <Row justify="center">
          <Col >
            {/* <Card> */}
            {/* <Document file="http://localhost:8081/pagecontent/Projects/Sample%20Report/91697_04.pdf" >
            <Page />
            </Document> */}
            
            <Document
              file={this.state.file}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >              
              {/* <Outline /> */}
              <this.PageViewer/>
            </Document>
            
            {/* </Card> */}
          </Col>
        </Row>
      </div>
    );
            }
}

