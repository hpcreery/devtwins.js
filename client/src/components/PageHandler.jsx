// ReactJS
import React, { Component } from 'react'

// Components
import api from '../services/Api'
import MarkdownRenderer from './Renderers/MarkdownRenderer'
import CollageRenderer from './Renderers/GalleryRenderer'
import PDF from './Renderers/PDF'
import IPYNB from './Renderers/ipynb'

// UI Elements
import { Layout, Affix, Button, Row, Col } from 'antd'


const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class PageHandler extends Component {
	constructor(props) {
    super(props)
    this.state = {
      category: null,
      page: null,
      prevProps: null,
      pageType: null,
      pageSubtype: null,
      // pageBanner: null,
      // pageIcon: null,
      pageFiles: null
    }
    this.baseState = this.state
	}

  componentDidMount() {
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      console.log('New')
      this.updateInfo();
    }
  }

  updateInfo = () => {
    this.setState(this.baseState)
    console.log("Updating Info..")
    this.setState({ category: this.props.match.params.category, page: this.props.match.params.page })
    console.log('Updated to:', this.props.match.params.category, this.props.match.params.page)
    api.getPageInfo(this.props.match.params.category, this.props.match.params.page).then((res) => {
      console.log('Page Info: ', res)
      if (res.status === 200) {
        this.setState({ pageType: res.data.type, pageSubtype: res.data.subtype, pageFiles: res.data.files})
        // console.log(res)
        // this.$store.commit('stopLoading')
      } else {
        console.log('server error')
      }
    })


  }

  Selector = ( prop ) => {
    if (this.props.match.params.page) {
      if (this.state.pageType == "static") {
        if (this.state.pageSubtype == "md") {
          return <MarkdownRenderer category={this.state.category} page={this.state.page} file={this.state.pageFiles} />
        } else if (this.state.pageSubtype == "pdf") {
          return <PDF category={this.state.category} page={this.state.page} file={this.state.pageFiles}/>
        } else if (this.state.pageSubtype == "ipynb") {
          return <IPYNB category={this.state.category} page={this.state.page} file={this.state.pageFiles}/>
        } else {
          return <h3> this page is unsupported </h3>
        }
      } else if (this.state.pageType == "collage") {
        return <CollageRenderer category={this.state.category} page={this.state.page} files={this.state.pageFiles}/>
      } else {
        return <h3> gathering pagetype or this page aint no good ... (yet?) </h3>
        // return <this.Loader/>
      }
    } else {
      return <h3> somethin aint right </h3>
    }

  }

  Loader = (prop) => {
    return (
    // <h3>Loading page details...</h3>
      <Row justify="center"> {/* a row in a row, i know */}
        <Col span={18}>
          <h3 style={{fontSize: "small", textAlign: "center"}}>
            {/* Loading page details... */}
          </h3>
        </Col>
      </Row>
    )
  }

  pageTitleRenderer = () => {
    return (
      <div className={"Page-Heading"}>
      <Row justify="center"> {/* a row in a row, i know */}
        <Col span={18}>
          <h1 style={{fontSize: "xx-large", textAlign: "center"}}>
            {this.state.category} / {this.state.page}
          </h1>
        </Col>
      </Row>
      </div>
    )
  }

  

  

	render() {
		return (
      <div>
        {/* <h2>NewPageHandler</h2> */}
        {/* <h1>{this.state.category} {this.state.page} {this.state.pageFile}</h1>  */}
        <this.pageTitleRenderer/>
        {/* <MarkdownRenderer category={this.state.category} page={this.state.page} file={this.state.pageFiles} /> */}
        {/* {this.Selector} */}
        <this.Selector/>
      </div>
		)
	}
}
