import React, { Component } from "react";
import { List, Avatar } from "antd";
import "antd/dist/antd.css";
import Logo from "./logo.png";
import { Redirect, Link } from "react-router-dom";
import { Form, Input, AutoComplete, DatePicker } from "antd";
import { Layout, Menu, Dropdown, Cascader, Switch } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  CalendarOutlined,
  PlusOutlined,
  TeamOutlined,
  FileTextOutlined,
  CodeOutlined,
  LockOutlined,
  BankOutlined,
  FontColorsOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { PageHeader, Button, Descriptions } from "antd";
import Axios from "axios";
import { getKeyThenIncreaseKey } from "antd/lib/message";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createTeamMenu: false,
      joinTeamMenu: false,
      createTask: [],
      user: this.props.location.state.user,
      userTask: [],
      teams: [],
      allTeamTasks: [],
      currTeam: "",
      taskInfo: {},
      taskAssignedTo: "",
      todoMenu: false,
      completeMenu: false,
      allTaskMenu: false,
      createTaskMenu: false,
      currTeamMembers: [],
      assignedToUser: "",
      logout: false,
      teamsByCompany: [],
    };
  }
  axios = require("axios").default;

  componentDidMount() {
    this.getUserByEmail(this.state.user.email);
  }

  getTeamsByCompany = async (company_name) => {
    await fetch(`http://localhost:4040/api/team/company/${company_name}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ teamsByCompany: res.data });
        console.log(this.state.teamsByCompany);
      })
      .catch((err) => console.error(err));
  };

  getUserByEmail = async (email) => {
    await fetch(`http://localhost:4040/api/userByEmail/${email}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => console.error(err));
    console.log(this.state.user);
    this.setState({ teams: [] });
    this.state.user.team.map((id) => this.getTeamById(id));
    this.getTeamsByCompany(this.state.user.company);
  };

  getUserById = async (_id) => {
    await fetch(`http://localhost:4040/api/user/${_id}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ assignedToUser: res.data });
      })
      .catch((err) => console.error(err));
    console.log(this.state.assignedToUser);
  };

  getTaskById = (id) => {
    this.axios({
      method: "get",
      url: `http://localhost:4040/api/task/${id}`,
    })
      .then((res) => res.data)
      .then((res) => {
        let temp = this.state.userTask.concat(res);
        this.setState({ userTask: temp });
      });
  };

  getTeamTasks = async (id) => {
    await this.axios({
      method: "get",
      url: `http://localhost:4040/api/task/team/${id}`,
    })
      .then((res) => res.data)
      .then((res) => {
        this.setState({ allTeamTasks: res.data });
        console.log(this.allTeamTasks);
      });
  };

  getTeamById = async (id) => {
    await this.axios({
      method: "get",
      url: `http://localhost:4040/api/team/${id}`,
    })
      .then((res) => res.data.data)
      .then((res) => {
        let temp = this.state.teams.concat(res);
        this.setState({ teams: temp });
      });
  };

  getTeamMembersById = async (id) => {
    await this.axios({
      method: "get",
      url: `http://localhost:4040/api/team/${id}`,
    })
      .then((res) => res.data.data)
      .then((res) => res.members)
      .then((res) => {
        console.log("backend ", res);
        let temp = [];
        res.map((v) => temp.push({ value: v.memberId, label: v.memberName }));
        this.setState({ currTeamMembers: temp });
        console.log(temp);
      });
    console.log(this.state.currTeamMembers);
  };

  createTask = async (values) => {
    await Axios.post("http://localhost:4040/api/task", {
      title: values.title,
      description: values.description,
      createdBy: this.state.user._id,
      createdByName: this.state.user.name,
      creationDate: values.creationDate,
      dueDate: values.dueDate,
      assignedTo: values.assignTo.value,
      assignedToName: values.assignTo.label,
      completeStatus: false,
      team: this.state.currTeam,
    }).then((response) => {
      console.log(response.data);
      console.log(response.data.success);
    });
    this.getTeamTasks(this.state.currTeam);
    window.location.reload(false);
  };

  updateStatus = async (id, value) => {
    console.log(id, value);
    await Axios.put(`http://localhost:4040/api/task/status/${id}`, {
      completeStatus: value,
    }).then((response) => {
      console.log(response.data);
      console.log(response.data.success);
    });
  };

  createTeam = async (value) => {
    let team_id = "";
    let member = {
      memberId: this.state.user._id,
      memberName: this.state.user.name,
    };

    console.log(member);
    await Axios.post("http://localhost:4040/api/team", {
      name: value.name,
      company: this.state.user.company,
      manager: this.state.user._id,
      members: {
        memberId: this.state.user._id,
        memberName: this.state.user.name,
      },
    }).then((response) => {
      console.log(response.data);
      console.log(response.data.id);
      team_id = response.data.id;
    });

    await Axios.put(
      `http://localhost:4040/api/user/team/${this.state.user._id}`,
      {
        team: team_id,
      }
    );
    this.getUserByEmail(this.state.user.email);
  };

  renderCreateTeam = () => {
    const onFinish = (values) => {
      console.log(values, this.state.user.company, this.state.user._id);
      this.createTeam(values);
    };
    const { Header, Content, Sider } = Layout;
    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 20,
          margin: 0,
          minHeight: 80,
          transform: "translate(30%,10%)",
        }}
      >
        <div className="site-page-header-ghost-wrapper">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            style={{ maxWidth: "500px" }}
            onFinish={onFinish}
          >
            Team Name
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input Team Name!" }]}
            >
              <Input
                prefix={<FontColorsOutlined className="site-form-item-icon" />}
                placeholder="Team Name"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Create Team
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    );
  };

  renderCreateTaskCard = (team) => {
    let createDateSelected;
    let dueDateSelected;
    console.log(team);
    const onChangeCreateDate = (date, dateString) => {
      createDateSelected = dateString;
    };
    const onChangeDueDate = (date, dateString) => {
      dueDateSelected = dateString;
    };

    const onFinish = (values) => {
      for (var i = 0; i < this.state.currTeamMembers.length; i++) {
        if (this.state.currTeamMembers[i].value == values.assignTo) {
          values.assignTo = this.state.currTeamMembers[i];
        }
      }
      values.creationDate = createDateSelected;
      values.dueDate = dueDateSelected;
      console.log(values);
      this.createTask(values);
      document.getElementById("create-task-form").reset();
    };

    const { Header, Content, Sider } = Layout;
    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 20,
          margin: 0,
          minHeight: 80,
          transform: "translate(30%,10%)",
        }}
      >
        <div className="site-page-header-ghost-wrapper">
          <Form
            id="create-task-form"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            style={{ maxWidth: "500px" }}
            onFinish={onFinish}
          >
            Task Title
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input
                prefix={<FontColorsOutlined className="site-form-item-icon" />}
                placeholder="Task Title"
              />
            </Form.Item>
            Task Description
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please input task description!" },
              ]}
            >
              <Input
                prefix={<FileTextOutlined className="site-form-item-icon" />}
                placeholder="Task Description"
              />
            </Form.Item>
            Creation Date
            <Form.Item
              name="creationDate"
              rules={[
                { required: true, message: "Please input Creation Date!" },
              ]}
            >
              <DatePicker onChange={onChangeCreateDate} />
            </Form.Item>
            Due Date
            <Form.Item
              name="dueDate"
              rules={[{ required: true, message: "Please input Due Date!" }]}
            >
              <DatePicker onChange={onChangeDueDate} />
            </Form.Item>
            Assign To
            <Form.Item
              name="assignTo"
              rules={[
                { required: true, message: "Please input employee name!" },
              ]}
            >
              <AutoComplete
                options={this.state.currTeamMembers}
                placeholder="Employee"
                filterOption={(inputValue, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    );
  };

  updateTeamMembers = async (team, value) => {
    console.log(team, value);
    await Axios.put(`http://localhost:4040/api/team/members/${team._id}`, {
      members: {
        memberId: this.state.user._id,
        memberName: this.state.user.name,
      },
    }).then((response) => {
      console.log(response.data);
    });

    await Axios.put(
      `http://localhost:4040/api/user/team/${this.state.user._id}`,
      {
        team: team._id,
      }
    );
    this.getUserByEmail(this.state.user.email);
  };

  renderJoinTeam = (team) => {
    const onJoin = (value) => {
      this.updateTeamMembers(team, value);
    };
    let joined = this.state.user.team.includes(team._id);
    let members = [];
    let managerName = "";
    for (let i = 0; i < team.members.length; i++) {
      if (team.members[i].memberId === team.manager) {
        managerName = team.members[i].memberName;
      }
      members.push(team.members[i].memberName);
    }
    console.log(members);
    const { Header, Content, Sider } = Layout;
    return (
      <Content
        className="site-layout-background"
        style={{ padding: 20, margin: 0, minHeight: 80 }}
      >
        <div className="site-page-header-ghost-wrapper">
          <PageHeader ghost={false} title={team.name}>
            <Descriptions size="small" column={4}>
              <Descriptions.Item label="Team ID">
                <a>{team._id}</a>
              </Descriptions.Item>
              <Descriptions.Item label="Manager">
                {managerName}
              </Descriptions.Item>
              <Descriptions.Item label="Members">
                {members.toString()}
              </Descriptions.Item>
              <Descriptions.Item label="Join">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={joined ? true : false}
                  onClick={onJoin}
                  disabled={joined}
                />
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      </Content>
    );
  };

  renderTaskCard = (task) => {
    console.log(task);
    console.log("created By Id: ", task.createdBy, " name", task.createdByName);

    const onSwitch = (value) => {
      console.log(value);
      this.updateStatus(task._id, value);
    };

    const { Header, Content, Sider } = Layout;
    return (
      <Content
        className="site-layout-background"
        style={{ padding: 20, margin: 0, minHeight: 80 }}
      >
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title={task.title}
            subTitle={task.description}
            //extra={[<Cascader options={this.state.currTeamMembers} // onChange={onChange} implement on change later
            //placeholder="Assign Task To" // showSearch={{ filter }} implement later
            ///>]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Created By">
                {" "}
                {task.createdByName}
              </Descriptions.Item>
              <Descriptions.Item label="Task Id">
                <a>{task._id}</a>
              </Descriptions.Item>
              <Descriptions.Item label="Creation Date">
                {task.creationDate.substring(0, 10)}
              </Descriptions.Item>
              <Descriptions.Item label="Due Date">
                {task.dueDate.substring(0, 10)}
              </Descriptions.Item>
              <Descriptions.Item label="Assigned To">
                {task.assignedToName}
              </Descriptions.Item>
              <Descriptions.Item label="Complete Status">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={task.completeStatus}
                  onClick={onSwitch}
                  disabled={
                    task.assignedTo !== this.state.user._id ? true : false
                  }
                />
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      </Content>
    );
  };

  renderTasks = (task) => {
    console.log(
      "This is the task",
      task,
      "and this is the complete status",
      task.completeStatus,
      "user",
      this.state.user
    );
    if (
      this.state.completeMenu === true &&
      task.completeStatus === true &&
      task.assignedTo === this.state.user._id
    ) {
      return this.renderTaskCard(task);
    } else if (
      this.state.completeMenu === false &&
      this.state.todoMenu === false &&
      this.state.allTaskMenu === true
    ) {
      return this.renderTaskCard(task);
    } else if (
      this.state.todoMenu === true &&
      task.completeStatus === false &&
      task.assignedTo === this.state.user._id
    ) {
      return this.renderTaskCard(task);
    }
  };

  selectTeam = (id) => {
    console.log(id.key);
    this.setState({
      todoMenu: false,
      completeMenu: false,
      allTaskMenu: true,
      createTeamMenu: false,
      joinTeamMenu: false,
      createTaskMenu: false,
    });
    this.setState({ currTeam: id });
    this.getTeamTasks(id.key);
    this.getTeamMembersById(id.key);
  };

  selectTeamTodo = (id) => {
    console.log(id.key);
    console.log("this is ID", id);
    let id_key = id.key.split("/")[0];
    console.log(id_key);
    this.setState({
      todoMenu: true,
      completeMenu: false,
      allTaskMenu: false,
      createTeamMenu: false,
      joinTeamMenu: false,
      createTaskMenu: false,
    });
    this.setState({ currTeam: id_key });
    console.log(this.state.currTeam);
    this.getTeamTasks(id_key);
    this.getTeamMembersById(id_key);
  };

  selectTeamComplete = (id) => {
    let id_key = id.key.split("*")[0];
    console.log(id_key);
    this.setState({
      todoMenu: false,
      completeMenu: true,
      allTaskMenu: false,
      createTeamMenu: false,
      joinTeamMenu: false,
      createTaskMenu: false,
    });
    this.setState({ currTeam: id });

    this.getTeamTasks(id_key);
    this.getTeamMembersById(id_key);
  };

  selectCreateTeamTask = (id) => {
    let id_key = id.key.split("+")[0];
    console.log(id_key);
    this.setState({
      todoMenu: false,
      completeMenu: false,
      allTaskMenu: false,
      createTeamMenu: false,
      joinTeamMenu: false,
      createTaskMenu: true,
    });
    this.setState({ currTeam: id_key });

    this.getTeamMembersById(id_key);
  };

  renderAllTask = (team) => {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;

    return (
      <Menu.Item key={team._id} onClick={this.selectTeam}>
        {" "}
        {team.name}{" "}
      </Menu.Item>
    );
  };

  renderTodoTask = (team) => {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    return (
      <Menu.Item key={team._id + "/"} onClick={this.selectTeamTodo}>
        {" "}
        {team.name}{" "}
      </Menu.Item>
    );
  };

  renderCompletedTask = (team) => {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    return (
      <Menu.Item key={team._id + "*"} onClick={this.selectTeamComplete}>
        {" "}
        {team.name}{" "}
      </Menu.Item>
    );
  };

  renderCreateTask = (team) => {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    return (
      <Menu.Item key={team._id + "+"} onClick={this.selectCreateTeamTask}>
        {" "}
        {team.name}{" "}
      </Menu.Item>
    );
  };

  render() {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;

    const onLogout = () => {
      this.setState({ logout: true });
    };

    if (this.state.logout === true || this.state.user === undefined) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <div>
        <Layout>
          <Header className="header">
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="0">
                <img onClick={() => window.location.reload(false)} src={Logo} />
              </Menu.Item>
              <Button
                type="primary"
                onClick={onLogout}
                style={{ float: "right", marginTop: "15px" }}
              >
                Log Out
              </Button>
            </Menu>
          </Header>

          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultOpenKeys={["alltask"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu
                  key="createTeamMeanu"
                  icon={<TeamOutlined />}
                  title="Join Team"
                >
                  <Menu.Item
                    key="createTeam"
                    onClick={() =>
                      this.setState({
                        createTeamMenu: true,
                        joinTeamMenu: false,
                        createTaskMenu: false,
                        allTaskMenu: false,
                        todoMenu: false,
                        completeMenu: false,
                      })
                    }
                  >
                    {" "}
                    Create Team{" "}
                  </Menu.Item>

                  <Menu.Item
                    key="joinTeam"
                    onClick={() =>
                      this.setState({
                        createTeamMenu: false,
                        joinTeamMenu: true,
                        createTaskMenu: false,
                        allTaskMenu: false,
                        todoMenu: false,
                        completeMenu: false,
                      })
                    }
                  >
                    {" "}
                    Join Team{" "}
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="createTask"
                  icon={<PlusOutlined />}
                  title="Create Task"
                >
                  {this.state.teams.map(this.renderCreateTask)}
                </SubMenu>
                <SubMenu
                  key="alltask"
                  icon={<CodeOutlined />}
                  title="All Tasks"
                >
                  {this.state.teams.map(this.renderAllTask)}
                </SubMenu>
                <SubMenu
                  key="todo"
                  icon={<LaptopOutlined />}
                  title="Todo Tasks"
                >
                  {this.state.teams.map(this.renderTodoTask)}
                </SubMenu>
                <SubMenu
                  key="completed"
                  icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                  title="Completed Tasks"
                >
                  {this.state.teams.map(this.renderCompletedTask)}
                </SubMenu>
              </Menu>
            </Sider>

            <Layout style={{ padding: "0 24px 24px" }}>
              {this.renderCondition()}
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }

  renderCondition = () => {
    if (this.state.createTaskMenu === true) {
      console.log("createTask Condition");
      return this.renderCreateTaskCard(this.state.currTeam);
    } else if (this.state.createTeamMenu === true) {
      console.log("create team Condition");

      return this.renderCreateTeam();
    } else if (this.state.joinTeamMenu === true) {
      console.log("Join team Condition");
      console.log(this.state.teamsByCompany);
      if(this.state.teamsByCompany !== undefined){
        return this.state.teamsByCompany.map(this.renderJoinTeam);
      }
      else{
        return(<div></div>)
      }
      
    } else {
      console.log("in render Condition");
      return this.state.allTeamTasks.map(this.renderTasks);
    }
  };
}
export default Dashboard;
