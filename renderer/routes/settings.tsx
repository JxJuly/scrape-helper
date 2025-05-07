import { useLayoutEffect } from 'react';

import { Collapse, Form, Input, Button } from 'antd';

export const SettingsPage = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    window.fileApi.saveSettings(form.getFieldsValue());
  };

  useLayoutEffect(() => {
    window.fileApi.loadSettings().then((data) => {
      form.setFieldsValue(data);
    });
  }, []);

  return (
    <Form layout="vertical" form={form}>
      <Collapse defaultActiveKey={['TMDB']} bordered={false}>
        <Collapse.Panel header="TMDB" key="TMDB">
          <Form.Item label="Token" name={['TMDB', 'Token']}>
            <Input.TextArea />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
      <Collapse defaultActiveKey={['Bangumi']} bordered={false}>
        <Collapse.Panel header="Bangumi" key="Bangumi">
          <Form.Item label="Token" name={['Bangumi', 'Token']}>
            <Input.TextArea />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
      <Button onClick={handleSave}>保存</Button>
    </Form>
  );
};
