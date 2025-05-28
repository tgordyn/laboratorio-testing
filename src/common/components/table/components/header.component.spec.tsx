import * as React from 'react';
import { HeaderGroup } from '@tanstack/react-table';
import { render } from '@testing-library/react';
import { Table } from '@mui/material';
import { HeaderComponent } from './header.component';
//import { vi } from 'vitest';

describe('common/table/HeaderComponent', () => {
  it('should be rendered as expected passing required properties', () => {
    const props = {
      headerGroups: [
        {
          id: '1',
          headers: [
            {
              id: 'header-1',
              column: {
                columnDef: {
                  header: 'Test label',
                },
              },
              getContext: vi.fn(),
            },
          ],
        },
      ] as unknown as HeaderGroup<any>[],
    };

    const { getByText } = render(
      <Table>
        <HeaderComponent {...props} />
      </Table>
    );

    expect(getByText('Test label')).toBeInTheDocument();
  });

  it('should render two columns passing two columns', () => {
    const props = {
      headerGroups: [
        {
          id: '1',
          headers: [
            {
              id: 'header-1',
              column: {
                columnDef: {
                  header: 'Test label 1',
                },
              },
              getContext: vi.fn(),
            },
          ],
        },
        {
          id: '2',
          headers: [
            {
              id: 'header-2',
              column: {
                columnDef: {
                  header: 'Test label 2',
                },
              },
              getContext: vi.fn(),
            },
          ],
        },
      ] as unknown as HeaderGroup<any>[],
    };

    const { getByText } = render(
      <Table>
        <HeaderComponent {...props} />
      </Table>
    );

    expect(getByText('Test label 1')).toBeInTheDocument();
    expect(getByText('Test label 2')).toBeInTheDocument();
  });
});
