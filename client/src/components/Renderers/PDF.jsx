// ReactJS
import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack' // https://projects.wojtekmaj.pl/react-pdf/

// UI
import { Row, Col, Card, Progress } from 'antd'

// Components
import { pdfjs } from 'react-pdf';
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
  }

  componentDidUpdate(prevProps) {
    console.log('debug: PDFrenderer, componentDidUpdate()', prevProps, this.props)
    if(JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.updateInfo();
    }
  }

  componentDidMount() {
    // console.log('PDF component mounted')
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.updateInfo()
  }


  componentWillUnmount() {
    // console.log('Unmounting PDF Component')
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    if (window.innerWidth > window.innerHeight ) { // Desktop
      this.setState({ width: null, height: window.innerHeight })
    } else {
      this.setState({ width: window.innerWidth - (0.2*window.innerWidth), height: null })
    }
  }

  updateInfo() {
    // console.log('Updating PDF page data...', this.props.file)
    this.setState({ file: api.getPageContentBaseUrl(this.props.category, this.props.page) + '/' + this.props.file, numRenderedPages: 0 }, () => {})
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages, 'pages')
    this.setState({ numPages }, () => {
      console.log(this.state.numPages)
    })
  }

  countLoadedPages = () => {
    this.setState(prevState => {
      return {numRenderedPages: prevState.numRenderedPages + 1}
    })
    // console.log('rendered new page', this.state.numRenderedPages)
    if (this.state.numRenderedPages === this.state.numPages) {
      this.props.doneLoading()
      console.log('Done loading')
    }
  }

  PageViewer = (props) => {
    return Array.from(new Array(this.state.numPages), (el, index) => (
      <Card style={{ marginTop: 10, marginBottom: 10, cursor: 'auto' }} hoverable>
        <Page
          key={`${this.state.file}_page_${index + 1}`}
          pageNumber={index + 1}
          height={this.state.height}
          width={this.state.width}
          onRenderSuccess={this.countLoadedPages}
        />
      </Card>
    ))
  }

  render() {
    console.log('re-rendering PDF')
    return (
      <div>
        <Row justify='center'>
          <Col>
          {(this.state.numRenderedPages < this.state.numPages) ? 
          <Progress percent={(this.state.numRenderedPages/this.state.numPages)*100} showInfo={false} />
           : null}
            <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} onLoadProgress={({ loaded, total }) => console.log('Loading a document: ' + (loaded / total) * 100 + '%')} onLoadError={(error) => console.log('Error while loading page! ' + error.message)}>
              <this.PageViewer />
            </Document>
          </Col>
        </Row>
      </div>
    )
  }
}
