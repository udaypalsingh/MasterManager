import React, { Component } from "react";
import { List, Avatar } from 'antd';
import 'antd/dist/antd.css';
import Logo from "./logo.png";
import { Layout, Menu, Dropdown, Cascader } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeader, Button, Descriptions } from 'antd';



class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    };
 
    
    

    render(){
      const { SubMenu } = Menu;
      const { Header, Content, Sider } = Layout;

      const team_members = (
        [
          {
            value: 'name1',
            label: 'Team Member 1',
          },
          {
            value: 'name2',
            label: 'Team Member 2',
          },
          {
            value: 'name3',
            label: 'Team Member 3',
          },
          {
            value: 'name4',
            label: 'Team Member 4',
          },
          {
            value: 'name5',
            label: 'Team Member 5',
          },
          {
            value: 'name1',
            label: 'Team Member 1',
          },
          {
            value: 'name2',
            label: 'Team Member 2',
          },
          {
            value: 'name3',
            label: 'Team Member 3',
          },
          {
            value: 'name4',
            label: 'Team Member 4',
          },
          {
            value: 'name5',
            label: 'Team Member 5',
          },
        ]
      );
        
        return(
            <div>
              
              <Layout>
              
                  <Header className="header">
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                      <Menu.Item key="0"><img src={Logo}/> </Menu.Item>
                    </Menu>
                  </Header>

                  <Layout>
                    <Sider width={200} className="site-layout-background">
                      <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                      >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                          <Menu.Item key="1">option1</Menu.Item>
                          <Menu.Item key="2">option2</Menu.Item>
                          <Menu.Item key="3">option3</Menu.Item>
                          <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Todo Tasks">
                          <Menu.Item key="5">option5</Menu.Item>
                          <Menu.Item key="6">option6</Menu.Item>
                          <Menu.Item key="7">option7</Menu.Item>
                          <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="Completed Tasks">
                          <Menu.Item key="9">option9</Menu.Item>
                          <Menu.Item key="10">option10</Menu.Item>
                          <Menu.Item key="11">option11</Menu.Item>
                          <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                      </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                      <Content
                        className="site-layout-background"
                        style={{
                          padding: 24,
                          margin: 0,
                          minHeight: 280,
                        }}
                      >
                         <div className="site-page-header-ghost-wrapper">
                          <PageHeader
                            ghost={false}
                            title="Task Title"
                            subTitle="Description of the task"
                            extra={[
                             
                              <Cascader
                                options={team_members}
                                // onChange={onChange} implement on change later
                                placeholder="Assign Task To"
                                // showSearch={{ filter }} implement later
                              />,
                            ]}
                          >
                            <Descriptions size="small" column={3}>
                              <Descriptions.Item label="Created"> Created By</Descriptions.Item>
                              <Descriptions.Item label="Task Id">
                                <a>421421</a>
                              </Descriptions.Item>
                              <Descriptions.Item label="Creation Date">MM/DD/YYYY</Descriptions.Item>
                              <Descriptions.Item label="Due Date">MM/DD/YY</Descriptions.Item>
                              <Descriptions.Item label="Assigned To">
                                Name
                              </Descriptions.Item>
                            </Descriptions>
                          </PageHeader>
                        </div>,
                      </Content>
                      
                    </Layout>
                  </Layout>
                </Layout>


          </div>
        );
    }
}
export default Dashboard;