import { useEffect, useState } from 'react';

import { Drawer, Typography, FloatButton, Button } from 'antd';

export const ReportDrawer = () => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrapeApi.onReport((value: any) => {
      setMessages((prev) => {
        return prev.concat(value);
      });
    });
  }, []);

  return (
    <>
      <FloatButton onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        placement="bottom"
        title="日志"
        extra={
          <Button size="small" onClick={() => setMessages([])}>
            清空
          </Button>
        }
        onClose={() => setOpen(false)}
      >
        {messages.map((log) => (
          <Typography.Paragraph type="success">{log.msg}</Typography.Paragraph>
        ))}
      </Drawer>
    </>
  );
};
