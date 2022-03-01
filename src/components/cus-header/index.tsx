import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Avatar, Modal } from "antd";
import { useLocation, useHistory, Link } from "react-router-dom";
import { observer, useLocalStore } from "mobx-react";
import { GlobalModel } from "@/stores";
import { getPreurl } from "@/utils";
import {
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./index.less";

const CusHeader = observer(() => {
  const location = useLocation();
  const history = useHistory();
  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const model = useLocalStore(() => GlobalModel);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = getPreurl("login");
  };

  const Menudom = (
    <Menu style={{ width: "130px" }}>
      <Menu.Item key="0">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Divider className="cus-key-item" />
      <Menu.Item key="3" onClick={logout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    console.log("location：", location);
    console.log("history", history);
  });

  return (
    <div className="lay-header">
      <div className="header-left">
        <div className="logo">
          <h1>warehouse</h1>
        </div>
      </div>
      <div className="header-right">
        <Dropdown overlay={Menudom} trigger={["click"]}>
          <span className="userwrap">
            <Avatar>D</Avatar>
            &nbsp; {model.userInfo?.username || "管理员"}
          </span>
        </Dropdown>
      </div>
      <Modal
        title="预标记"
        width={500}
        destroyOnClose
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      ></Modal>
    </div>
  );
});

export default CusHeader;
