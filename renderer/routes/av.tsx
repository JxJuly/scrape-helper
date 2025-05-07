import { useState } from 'react';

import { Button, Space, Table, Typography, Divider, Tag, Image } from 'antd';

import type { TableColumnsType } from 'antd';

const cellStringRender = (value: string) => (
  <Typography.Paragraph
    style={{ margin: 0, fontSize: '12px' }}
    ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
  >
    {value}
  </Typography.Paragraph>
);
const cellTagRender = (items: string[]) => items.map((tag) => <Tag style={{ fontSize: '12px' }}>{tag}</Tag>);

const ScrapeButton: React.FC<{ filePath: string }> = ({ filePath }) => {
  const [loading, setLoading] = useState(false);
  const handleScrape = async () => {
    try {
      setLoading(true);
      await window.scrapeApi.av(filePath);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button loading={loading} onClick={handleScrape}>
      刮削
    </Button>
  );
};

const colums: TableColumnsType = [
  {
    title: '文件路径',
    dataIndex: 'relativeFilePath',
    width: 240,
    render: cellStringRender,
  },
  {
    title: '封面',
    dataIndex: 'poster',
    width: 140,
    render: (url) => {
      return url ? <Image src={url} /> : '没有数据嗷~';
    },
  },
  {
    title: '标题',
    dataIndex: 'metaData',
    width: 240,
    render: (metaData, info) => {
      let title: string | undefined;
      if (info.type === 'movie') {
        title = metaData.movie?.title;
      } else {
        title = metaData.episodedetails?.showtitle || metaData.tvshow?.title;
      }
      return cellStringRender(title || '没有数据嗷~');
    },
  },
  {
    title: '简介',
    dataIndex: 'metaData',
    width: 240,
    render: (metaData, info) => {
      let description: string | undefined;
      if (info.type === 'movie') {
        description = metaData.movie?.plot;
      } else {
        description = metaData.episodedetails?.plot || metaData.tvshow?.plot;
      }
      return cellStringRender(description || '没有数据嗷~');
    },
  },
  {
    title: '评分',
    dataIndex: 'metaData',
    width: 80,
    render: (metaData, info) => {
      const rating = info.type === 'movie' ? metaData.movie?.rating : metaData.tvshow?.rating;
      return rating;
    },
  },
  {
    title: '标签',
    dataIndex: 'metaData',
    width: 240,
    render: (metaData, info) => {
      const tags = info.type === 'movie' ? metaData.movie?.tag : metaData.tvshow?.tag;
      return cellTagRender(tags || []);
    },
  },
  {
    title: '工作室',
    dataIndex: 'metaData',
    width: 140,
    render: (metaData, info) => {
      const studios = info.type === 'movie' ? metaData.movie?.studio : metaData.tvshow?.studio;
      return cellTagRender(studios || []);
    },
  },
  {
    title: '操作',
    fixed: 'right',
    dataIndex: 'filePath',
    render: (filePath) => {
      return <ScrapeButton filePath={filePath} />;
    },
  },
];

export const AVPage = () => {
  const [directoryPath, setDirectoryPath] = useState<string | undefined>();
  const [data, setData] = useState([]);
  const handleSelectDirectory = async () => {
    const dir = await window.fileApi.selectDirectory();
    setDirectoryPath(dir);
  };
  const handleFind = async () => {
    const next = await window.fileApi.findMedia(directoryPath);
    setData(next);
  };
  return (
    <div>
      <Space>
        <Button onClick={handleSelectDirectory}>选择文件夹</Button>
        <Button disabled={!directoryPath} onClick={handleFind}>
          检索
        </Button>
        {directoryPath && <Typography.Text>检索路径：{directoryPath}</Typography.Text>}
      </Space>
      <Divider />
      <Table dataSource={data} columns={colums} size="small" />
    </div>
  );
};
