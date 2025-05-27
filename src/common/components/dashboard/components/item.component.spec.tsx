import React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '#common/test';
import { Route } from 'react-router-dom';
import { ItemComponent, ClassesProps } from './item.component';
import { DashboardItemProps } from '../dashboard.vm';

describe('common/dashboard/ItemComponent', () => {
  it('should be render as expected passing required properties', () => {
    // Arrange
    const props = {
      item: {
        icon: PeopleAltIcon,
        title: 'test name',
        linkTo: '/test-link',
      } as DashboardItemProps,
      dataTestId: 'test-item',
    };

    // Act
    const { getByText } = renderWithRouter(
      null,
      <>
        <Route path="/" element={<ItemComponent {...props} />} />
        <Route
          path={props.item.linkTo}
          element={<h1>Test route destination</h1>}
        />
      </>
    );

    // Debug
    // screen.debug(); // Descomenta para inspeccionar el DOM si falla

    // Assert
    expect(getByText(props.item.title)).toBeInTheDocument();
  });

  it('should be render as expected passing required and optional properties', () => {
    // Arrange
    const props = {
      item: {
        icon: PeopleAltIcon,
        title: 'test name',
        linkTo: '/test-link',
        subtitle: 'test subtitle',
      } as DashboardItemProps,
      classes: {
        root: 'test-root-class',
        icon: 'test-icon-class',
        title: 'test-name-class',
        subtitle: 'test-subtitle-class',
      } as ClassesProps,
      dataTestId: 'test-item',
    };

    // Act
    const { getByTestId } = renderWithRouter(
      null,
      <>
        <Route path="/" element={<ItemComponent {...props} />} />
        <Route
          path={props.item.linkTo}
          element={<h1>Test route destination</h1>}
        />
      </>
    );

    // Debug
    // screen.debug();

    // Assert
    const element = getByTestId(props.dataTestId);
    expect(element).toHaveClass(props.classes.root);
    const titleElement = screen.getByText(props.item.title);
    expect(titleElement).toHaveClass(props.classes.title);
    const subtitleElement = screen.getByText(props.item.subtitle);
    expect(subtitleElement).toHaveClass(props.classes.subtitle);
  });

  it('should navigate to route when click on item component', () => {
    // Arrange
    const props = {
      item: {
        icon: PeopleAltIcon,
        title: 'test name',
        linkTo: '/test-link',
        subtitle: 'test subtitle',
      } as DashboardItemProps,
      classes: {
        root: 'test-root-class',
        icon: 'test-icon-class',
        title: 'test-name-class',
        subtitle: 'test-subtitle-class',
      } as ClassesProps,
      dataTestId: 'test-item',
    };

    // Act
    const { getByTestId, getByText } = renderWithRouter(
      null,
      <>
        <Route path="/" element={<ItemComponent {...props} />} />
        <Route
          path={props.item.linkTo}
          element={<h1>Test route destination</h1>}
        />
      </>
    );

    const element = getByTestId(props.dataTestId);
    fireEvent.click(element);

    // Assert
    expect(getByText('Test route destination')).toBeInTheDocument();
  });
});
