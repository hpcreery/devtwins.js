// React
import React, { Component } from "react";

// UI
import { Row, Col, Card } from 'antd'
import './App.css';

// Components
import api from '../../services/Api'
import JupViewer from './JupViewer'
// import JupViewer from 'React-Jupyter-Viewer/ipynb-viewer/src/JupViewer' // yarn add phcreery/React-Jupyter-Viewer
import PageLoader from '../PageLoader'

export default class GalleryRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      baseUrl: null,
      loading: true
    }
    this.baseState = this.state
  }

  // componentWillMount() { // legacy/unsafe
  // console.log(this.props.match.params.id, this.props.page)
  // this.setState(this.baseState)
  // this.updateInfo()
  // }

  componentDidMount() {
    console.log('ipynb mounted')
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    console.log('debug: ipynbRenderer, componentDidUpdate()', prevProps, this.props)
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      console.log('ipynb new prop-base update')
      this.updateInfo();
    }
  }

  updateInfo() {
    console.log('Getting page data...', this.props.file)
    this.setState({
      file: api.getPageContentBaseUrl(this.props.category, this.props.page) + "/" + this.props.file,
      baseUrl: api.getPageContentBaseUrl(this.props.category, this.props.page),
      loading: false
    }, () => console.log(this.state))
  }


  render() {
    return (
      <div>
        <PageLoader loading={this.state.loading}>
          <Row justify="center">
            <Col >
              {/* <Card> */}
              {this.state.file !== null ? <Card style={{ marginTop: 10, marginBottom: 10, cursor: 'auto', borderColor: '#D9D9D9' }} hoverable bordered>
                <JupViewer
                  // title="Jupyter as a Blog!"
                  // subtitle="I've always wanted to publish my jupyter notebooks as blogs. Finally I can."
                  // coverImg="https://notionpress.com/blog/wp-content/uploads/2018/06/Cover-design.png"
                  file={this.state.file}
                // file="http://localhost:8081/pagecontent/Projects/Jupyter%20Notebook/Transformation2D.ipynb"
                // baseURL="http://localhost:8081/pagecontent/Projects/Jupyter%20Notebook"
                /> </Card> : null}

              {/* </Card> */}
            </Col>
          </Row>
        </PageLoader>
      </div>
    );
  }

}

