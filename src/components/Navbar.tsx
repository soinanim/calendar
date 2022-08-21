import React, { FC } from 'react';
import { Layout, Menu, MenuProps, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
  const { logout } = useActions();

  const navigate = useNavigate();
  const { isAuth, user } = useTypedSelector((state) => state.auth);

  const items1: MenuProps['items'] = [
    {
      key: 1,
      label: 'Выйти',
      onClick: logout,
    },
  ];

  const items2: MenuProps['items'] = [
    { key: 1, label: 'Логин', onClick: () => navigate(RouteNames.LOGIN) },
  ];

  return (
    <Layout.Header>
      <Row justify='end'>
        {isAuth ? (
          <>
            <div style={{ color: 'white' }}>{user.username}</div>
            <Menu
              theme='dark'
              mode='horizontal'
              selectable={false}
              items={items1}></Menu>
          </>
        ) : (
          <Menu
            theme='dark'
            mode='horizontal'
            selectable={false}
            items={items2}></Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
