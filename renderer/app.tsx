import { Routes, Route, useNavigate, useLocation } from 'react-router';

import { Layout, Menu } from 'antd';

import { ReportDrawer } from './components/report-drawer';
import { AnimatePage } from './routes/animate';
import { AVPage } from './routes/av';
import { SettingsPage } from './routes/settings';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className="app-layout">
      <Layout.Sider>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          items={[
            {
              label: 'A',
              key: '/animate',
            },
            {
              label: 'V',
              key: '/av',
            },
            {
              label: '设置',
              key: '/settings',
            },
          ]}
          onSelect={(info) => {
            navigate(info.key);
          }}
        />
      </Layout.Sider>
      <Layout className="main-layout">
        <Routes>
          <Route path="/animate" element={<AnimatePage />} />
          <Route path="/av" element={<AVPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <ReportDrawer />
      </Layout>
    </Layout>
  );
};
