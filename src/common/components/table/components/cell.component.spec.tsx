import * as React from 'react';
import { render } from '@testing-library/react';
import { Table, TableBody, TableRow } from '@mui/material';
import { CellComponent } from './cell.component';

describe('common/table/CellComponent', () => {
  it('should render as expected passing required properties', () => {
    // Arrange

    // Act
    const { getByText } = render(
      <Table>
        <TableBody>
          <TableRow>
            <CellComponent>
              <h1>Test content</h1>
            </CellComponent>
          </TableRow>
        </TableBody>
      </Table>
    );

    // Assert
    expect(getByText('Test content')).toBeInTheDocument();
  });
});
