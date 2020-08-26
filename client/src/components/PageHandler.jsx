// ReactJS
import React, { Component } from 'react'

// Components
import api from '../services/Api'
import MarkdownRenderer from './renderers/MarkdownRenderer'
import CollageRenderer from './renderers/GalleryRenderer'
import PDF from './renderers/PDF'
import IPYNB from './renderers/ipynb'

// UI Elements
import { Layout, Affix, Button, Row, Col, Spin } from 'antd'

const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class PageHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      page: null,
      pageType: null,
      pageSubtype: null,
      // pageBanner: null,
      // pageIcon: null,
      pageFiles: null,
      isLoading: true,
    }
    this.baseState = this.state
  }

  updateInfo = async () => {
    console.log('THESE ARE THE KEYS ', this.props.match.params)
    let newState = { ...this.state }
    console.log('Updating Page Handler Info..')
    // this.setState({ category: this.props.match.params.category, page: this.props.match.params.page })
    newState.category = this.props.match.params.category
    newState.page = this.props.match.params.page
    // newState.isLoading = true
    var res = await api.getPageInfo(newState.category, newState.page)
    // console.log('New Page Info: ', res)
    if (res.status === 200) {
      newState.pageType = res.data.type
      newState.pageSubtype = res.data.subtype
      newState.pageFiles = res.data.files
    } else {
      console.log('Server Error')
    }
    this.setState({ ...newState })
  }

  PageTitle = () => {
    return (
      <div className={'Page-Heading'}>
        <Row justify='center'>
          <Col span={18}>
            <h1 style={{ fontSize: 'xx-large', textAlign: 'center' }}>
              {this.state.category} / {this.state.page}
            </h1>
          </Col>
        </Row>
      </div>
    )
  }

  doneLoading = () => {
    console.log('Done Loading Child Component')
    this.setState({ isLoading: false })
  }

  PageBody = () => {
    if (this.state.page) {
      if (this.state.pageType == 'static') {
        if (this.state.pageSubtype == 'md') {
          return (
            <MarkdownRenderer
              key={this.state.page}
              category={this.state.category}
              page={this.state.page}
              file={this.state.pageFiles}
              doneLoading={this.doneLoading}
            />
          )
        } else if (this.state.pageSubtype == 'pdf') {
          return (
            <PDF
              key={this.state.page}
              category={this.state.category}
              page={this.state.page}
              file={this.state.pageFiles}
              doneLoading={this.doneLoading}
            />
          )
        } else if (this.state.pageSubtype == 'ipynb') {
          // this.doneLoading() // !! need to impliment correctly
          return (
            <IPYNB
              key={this.state.page}
              category={this.state.category}
              page={this.state.page}
              file={this.state.pageFiles}
              doneLoading={this.doneLoading}
            />
          )
        } else {
          return (
            <h3>
              {' '}
              this page is unsupported <br /> error: {this.state.page} {this.state.pageType} {this.state.pageSubtype}
            </h3>
          )
        }
      } else if (this.state.pageType == 'collage') {
        return (
          <CollageRenderer
            key={this.state.page}
            category={this.state.category}
            page={this.state.page}
            files={this.state.pageFiles}
          />
        )
      } else {
        return (
          <h3>
            {' '}
            gathering pagetype or this page aint no good ... (yet?) <br /> IDK what kinda page this is{' '}
          </h3>
        )
        // return <this.Loader/>
      }
    } else {
      return (
        <h3>
          {' '}
          somethin aint right. <br /> I received no page to render from my component properties{' '}
        </h3>
      )
    }
  }

  Loader = () => {
    return (
      // <h3>Loading page details...</h3>
      <Row justify='center'>
        <Col span={18}>
          <h3 style={{ fontSize: 'small', textAlign: 'center' }}>{/* Loading page details... */}</h3>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div>
        {/* <Spin spinning={this.state.isLoading}> */}
        {this.state.isLoading ? <Spin /> : null}
        <this.PageTitle />
        <this.PageBody />
        {/* </Spin> */}
      </div>
    )
  }

  componentDidMount() {
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      // this.setState(this.baseState)
      this.updateInfo()
    }
  }
}
