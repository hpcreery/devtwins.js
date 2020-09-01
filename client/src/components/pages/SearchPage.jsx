// React
import React, { Component } from 'react'

// UI Elements
import api from '../../services/Api'
// import { useThemeSwitcher } from 'react-css-theme-switcher'
import { Switch, Input, Col, Row, List, Avatar, Space  } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

// UX Elements

const { Search } = Input;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

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
      loading: true
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
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        })
      })
    
    }).then(() => {
      console.log('list', list)
      this.setState({ listData: list, loading: false }, () => console.log('State: ', this.state))
    })
  }




  render() {
    return (
      <div className={'Page-Heading'}>
        <Row justify='center'>
          <Col span={18}>
            <Search
              placeholder="input search text"
              // onSearch={value => console.log(value)}
              style={{ marginTop: "20px", marginBottom: "20px" }}
              enterButton 
            />
          </Col>
        </Row>
        {!this.state.loading ? <Row justify='center'>
          <Col span={20}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={this.state.listData}
              // footer={
              //   <div>
              //     <b>ant design</b> footer part
              //   </div>
              // }
              renderItem={item => (
                <List.Item
                  key={item.title}
                  // actions={[
                  //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  // ]}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
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
