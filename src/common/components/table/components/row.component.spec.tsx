import * as React from 'react';
import { render } from '@testing-library/react';
import { Table, TableBody } from '@mui/material';
import { RowComponent } from './row.component';

describe('common/table/RowComponent', () => {
  it('should render as expected passing required properties', () => {
    // Arrange
    const props = {
      className: 'test-className',
      'data-testid': 'test-row',
    };

    // Act
    const { getByText, getByTestId } = render(
      <Table>
        <TableBody>
          <RowComponent {...props}>
            <td>{'Test rowData'}</td>
          </RowComponent>
        </TableBody>
      </Table>
    );

    // Assert
    expect(getByTestId(props['data-testid'])).toHaveClass(props.className);
    expect(getByText('Test rowData')).toBeInTheDocument();
  });

  it('should render a row component with two cells', () => {
    // Arrange
    const props = {
      className: 'test-className',
    };

    // Act
    const { getByText } = render(
      <Table>
        <TableBody>
          <RowComponent {...props}>
            <td>{'Test rowData 1'}</td>
            <td>{'Test rowData 2'}</td>
          </RowComponent>
        </TableBody>
      </Table>
    );

    // Assert
    expect(getByText('Test rowData 1')).toBeInTheDocument();
    expect(getByText('Test rowData 2')).toBeInTheDocument();
  });
});
