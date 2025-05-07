import { Tag, Typography } from 'antd';

export const TableCellText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Typography.Paragraph
      style={{ margin: 0, fontSize: '12px' }}
      ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
    >
      {text}
    </Typography.Paragraph>
  );
};

export const TableCellTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return tags.map((tag) => <Tag style={{ fontSize: '12px' }}>{tag}</Tag>);
};
