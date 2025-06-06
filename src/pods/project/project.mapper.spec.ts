import {
  mapEmployeeSummaryFromApiToVm,
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('project.mapper', () => {
  // Testea el map correcto de un solo EmployeeSummary desde API a VM
  it('should map EmployeeSummary from API to VM correctly', () => {
    const apiEmployee: apiModel.EmployeeSummary = {
      id: '10',
      employeeName: 'Carlos Díaz',
      isAssigned: false,
    };

    const expected: viewModel.EmployeeSummary = {
      id: '10',
      employeeName: 'Carlos Díaz',
      isAssigned: false,
    };

    const result = mapEmployeeSummaryFromApiToVm(apiEmployee);

    expect(result).toEqual(expected);
  });

  // Testea el map correcto de una lista de EmployeeSummary desde API a VM
  it('should map EmployeeSummary list from API to VM correctly', () => {
    const apiList: apiModel.EmployeeSummary[] = [
      { id: '1', employeeName: 'Ana Torres', isAssigned: true },
      { id: '2', employeeName: 'Luis Gómez', isAssigned: false },
    ];

    const expected: viewModel.EmployeeSummary[] = [...apiList];

    const result = mapEmployeeSummaryListFromApiToVm(apiList);

    expect(result).toEqual(expected);
  });

  // Verifica que si la lista de empleados es null devuelva un array vacío
  it('should return an empty array if employee list is null', () => {
    const result = mapEmployeeSummaryListFromApiToVm(null);
    expect(result).toEqual([]);
  });

  // Verifica que si la lista de empleados es undefined devuelva un array vacío
  it('should return an empty array if employee list is undefined', () => {
    const result = mapEmployeeSummaryListFromApiToVm(undefined);
    expect(result).toEqual([]);
  });

  // Valida que un Project completo desde API se mapea correctamente a VM
  it('should map Project from API to VM correctly', () => {
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Proyecto A',
      externalId: 'EXT-001',
      comments: 'Sin comentarios',
      isActive: true,
      employees: [
        { id: '1', employeeName: 'Luis Gómez', isAssigned: true },
      ],
    };

    const expected: viewModel.Project = {
      ...apiProject,
    };

    const result = mapProjectFromApiToVm(apiProject);

    expect(result).toEqual(expected);
  });

  // Verifica que se devuelva un proyecto vacío si se pasa null
  it('should return empty Project when API project is null', () => {
    const result = mapProjectFromApiToVm(null);
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  // Verifica que se devuelva un proyecto vacío si se pasa undefined
  it('should return empty Project when API project is undefined', () => {
    const result = mapProjectFromApiToVm(undefined);
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  // Verifica que mapProjectFromApiToVm no tire errores y devuelva un objeto válido con el resto de las propiedades cuando el campo employees es null
  it('should handle null employees field correctly', () => {
    const nullEmployees: apiModel.Project = {
      id: '1',
      name: 'Test',
      isActive: true,
      comments: '',
      externalId: '',
      employees: null,
    };

    const result = mapProjectFromApiToVm(nullEmployees);

    expect(result.employees).toEqual([]);
    expect(result.id).toBe('1');
    expect(result.name).toBe('Test');
  });

  // Verifica que mapProjectFromApiToVm no tire errores y devuelva un objeto válido con el resto de las propiedades cuando el campo employees es undefined
  it('should handle undefined employees field correctly', () => {
    const undefinedEmployees: apiModel.Project = {
      id: '1',
      name: 'Test',
      isActive: true,
      comments: '',
      externalId: '',
      employees: undefined,
    };

    const result = mapProjectFromApiToVm(undefinedEmployees);

    expect(result.employees).toEqual([]);
    expect(result.isActive).toBe(true);
  });
});
