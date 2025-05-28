import * as React from 'react';
import { Row } from '@tanstack/react-table';
import { render } from '@testing-library/react';
import { Table } from '@mui/material';
import { BodyComponent } from './body.component';
import { RowComponent } from './row.component';
import { CellComponent } from './cell.component';
import { RowRendererProps } from '../table.vm';

interface TestRow {
  testRow: number;
}

describe('common/table/BodyComponent', () => {
  it('should render as expected', () => {
    // Arrange
    const props = {
      rows: [
        { id: '1', original: { testRow: 1 } },
        { id: '2', original: { testRow: 2 } },
        { id: '3', original: { testRow: 3 } },
      ] as unknown as Row<TestRow>[],
      rowRenderer: (props: RowRendererProps<TestRow>) => (
        <RowComponent>
          <CellComponent>{props.row.testRow}</CellComponent>
        </RowComponent>
      ),
    };

    // Act
    const { getByText } = render(
      <Table>
        <BodyComponent<TestRow> {...props} />
      </Table>
    );

    // Assert
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });
});
