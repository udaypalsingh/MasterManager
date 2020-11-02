import React, { Component } from "react";
import Logo from "./logo.png";
import IconLogo from "./iconlogo.png";
import { Link, Redirect } from "react-router-dom";
import "./login.css";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userByEmail: [],
      auth: undefined,
    };
  }

  getUserByEmail = async (email) => {
    await fetch(`http://localhost:4040/api/userByEmail/${email}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ userByEmail: res.data });
      })
      .catch((err) => console.error(err));
    this.auth();
    console.log(this.state.userByEmail);
  };

  auth() {
    if (
      this.state.userByEmail !== undefined &&
      this.state.email === this.state.userByEmail.email &&
      this.state.password === this.state.userByEmail.password
    ) {
      this.setState({ auth: true });
    } else {
      this.setState({ auth: false });
    }
  }

  credentailFeedback() {
    if (this.state.auth === false) {
      return (
        <p className="" style={{ color: "red" }}>
          <ExclamationCircleOutlined /> Incorrect email or password!
        </p>
      );
    }
  }

  render() {
    const onFinish = (values) => {
      this.setState({ email: values.email });
      this.setState({ password: values.password });
      console.log(
        "Received values of form: ",
        this.state.email,
        this.state.password
      );
      this.getUserByEmail(values.email);
    };

    if (this.state.auth == true) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: {
              user: this.state.userByEmail,
            },
          }}
        />
      );
    }
    return (
      <div
        style={{
          backgroundColor: "dodgerblue",
          width: "100wh",
        }}
      >
        <img src={Logo} />

        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            style={{
              maxWidth: "300px",
              position: "absolute",
              top: "20%",
              left: "43%",
            }}
            onFinish={onFinish}
          >
            <img src={IconLogo} style={{ paddingBottom: "2rem" }} />
            {this.credentailFeedback()}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              hasFeedback
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
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <p
                style={{ paddingLeft: "2px", fontSize: "14px", color: "Grey" }}
              >
                Not a member? <a href="/register">register now!</a>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default LogIn;
