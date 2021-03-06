import React from 'react';
import { Cell } from 'rsuite-table';

export const CommitsCell = ({ rowData, dataKey, ...props }) => {

  const commits = (rowData.payload && rowData.payload.commits) || [];
  const link = commits.length > 0 ? <a href={commits[0].url}> {commits[0].message} </a> : '--';

  return (
    <Cell {...props}>
      {link}
    </Cell>
  );
};
