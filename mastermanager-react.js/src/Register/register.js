import React, { Component } from "react";
import Logo from "../Login/logo.png";
import IconLogo from "../Login/iconlogo.png";
import "./register.css";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, AutoComplete } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BankOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import Axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      user: [],
      auth: false,
    };
  }

  axios = require("axios").default;

  componentDidMount() {
    this.getCompanies();
  }

  getCompanies = async () => {
    await fetch(`http://localhost:4040/api/companies`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ companies: [] });
        res.data.map((v) => this.state.companies.push({ value: v }));
      })
      .catch((err) => console.error(err));

    console.log(this.state.companies);
  };

  createUser = (user) => {
    Axios.post("http://localhost:4040/api/user", {
      email: user.email,
      password: user.password,
      name: user.name,
      company: user.company,
    }).then((response) => {
      console.log(response.data);
      this.setState({ auth: response.data.success });
    });
    console.log(this.state.auth);
  };

  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
      this.setState({ user: values });
      console.log(this.state.user);
      this.createUser(values);
    };
    if (this.state.auth === true) {
      console.log("in redirect", this.state.auth);
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <div>
        <div style={{ backgroundColor: "dodgerblue", width: "100wh" }}>
          <img src={Logo} />
        </div>

        <div>
          <img
            src={IconLogo}
            style={{
              paddingBottom: "2rem",
              position: "absolute",
              right: "43%",
            }}
          />

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            style={{
              maxWidth: "500px",
              position: "absolute",
              top: "40%",
              right: "42%",
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                prefix={<FontColorsOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              name="company"
              rules={[
                { required: true, message: "Please input your employer!" },
              ]}
            >
              {/* <Input prefix={<BankOutlined  className="site-form-item-icon" />} placeholder="Employer" /> */}
              <AutoComplete
                options={this.state.companies}
                prefix={<BankOutlined className="site-form-item-icon" />}
                placeholder="Employer"
                filterOption={(inputValue, option) =>
                  option.value
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Register;
