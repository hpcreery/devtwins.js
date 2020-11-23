// React
import React, { Component } from 'react'

// UI Elements
import api from '../../services/Api'
// import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Switch, Input, Col, Row, List, Avatar, Space, Divider, Card } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined, FileOutlined, FileImageOutlined, PictureOutlined, HistoryOutlined } from '@ant-design/icons';

// UX Elements

const { Search } = Input;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default class FrontPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkMode: false,
      listData: [],
      loading: true,
      searchfilter: ''
    }
  }

  updateInfo = () => {
    console.log('this ur;:', this.props.location.pathname, window.location.href, this.props.location)
    var list = []
    api.getPageList().then((res) => {
      console.log('Fetched Page list:', res)
      res.data.map((page) => {
        var pagelink = '/' + page.category.replace(/ /g, '%20') + '/' + page.name.replace(/ /g, '%20')
        list.push({
          // href: api.getPageBaseUrl(page.category, page.name),
          href: pagelink,
          title: page.name,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          description: page.category,
          content: '',
          thumbnailURL: (page.info.thumb ? api.getPageContentBaseUrl(page.category, page.name) + '/' + page.info.thumb : "https://cdn2.iconfinder.com/data/icons/files-and-documents-1/512/28-512.png"),
          thumbnail: (page.info.thumb ? <img
            // width={172}
            style={{objectFit: "cover",
              width: "230px",
              height: "230px"}}
            alt="logo"
            src={api.getPageContentBaseUrl(page.category, page.name) + '/' + page.info.thumb}
          /> : <FileOutlined style={{ fontSize: '220px' }} />),
          pagetype: page.info.type,
          filetype: page.info.subtype,
          show: true,
          archived: page.info.archived
        })
      })
    
    }).then(() => {
      console.log('list', list)
      this.setState({ listData: list, loading: false }, () => console.log('State: ', this.state))
    })
  }




  render() {
    // const { filter, data } = this.state;
    const lowercasedFilter = this.state.searchfilter.toLowerCase();
    const filteredData = this.state.listData.filter(item => {
      return item.title.toLowerCase().includes(lowercasedFilter)
    });
    return (
      <div className={'Page-Heading'}>
        <Row justify='center'>
          <Col span={18}>
            <Search
              placeholder="Search"
              onSearch={value => this.setState({searchfilter: value})}
              onChange={value => this.setState({searchfilter: value.currentTarget.value})}
              style={{ marginTop: "20px", marginBottom: "20px" }}
              enterButton
            />
          </Col>
        </Row>
        {!this.state.loading ? <Row justify='center'>
          <Col span={18}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              // dataSource={this.state.listData}
              dataSource={filteredData}
              // footer={
              //   <div>
              //     <b>ant design</b> footer part
              //   </div>
              // }
              renderItem={item => (
                <div>
                  {/* <Divider/> */}
                <Card hoverable bordered style={{marginBottom: '20px', borderColor: '#D9D9D9'}} onClick={() => this.props.history.push(item.href)}>
                  <List.Item
                    key={item.title}
                    actions={[
                      (item.pagetype === 'collage' ? <IconText icon={PictureOutlined} text='gallery' key="list-vertical-type" /> : <IconText icon={FileOutlined} text={item.filetype} key="list-vertical-type" />),
                      (item.archived ? <IconText icon={HistoryOutlined} text='archived' key="list-vertical-archived" /> : null)
                      // <IconText icon={FileOutlined} text={item.filetype} key="list-vertical-star-o" />,
                    ]}
                    extra={
                      // <img
                      //   width={172}
                      //   alt="logo"
                      //   // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      //   src={item.thumbnailURL}
                      // />
                      item.thumbnail
                    }
                    // style={{height: '100%'}}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.avatar} />}
                      title={<span><a style={{color:'grey'}}>{item.description} / </a>{item.title}</span>}
                      // description={item.description}
                    />
                    {item.content}
                  </List.Item>
                </Card>
                </div>

              )}
            />
          </Col>
        </Row> : null}
      </div>
    )
  }

  async componentDidMount() {
    // console.log(this.props.match.params.id, this.props.page)
    // this.setState(this.baseState)
    this.updateInfo()
  }
}
