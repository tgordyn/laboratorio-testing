import {
  mapEmployeeSummaryFromApiToVm,
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from "./project.mapper";
import * as apiModel from "./api/project.api-model";
import * as viewModel from "./project.vm";
import { mockEmployeeSummaryList, mockProject } from "./api/project.mock-data";

import { mapToCollection } from "#common/mappers";

vi.mock("#common/mappers", () => ({
  mapToCollection: vi.fn((array, mapper) => array.map(mapper)),
}));

describe("project.mapper", () => {
  it("should map EmployeeSummary from API to VM correctly", () => {
    // Arrange
    const employeeSummary: apiModel.EmployeeSummary =
      mockEmployeeSummaryList[0];
    const expected: viewModel.EmployeeSummary = {
      id: "1",
      employeeName: "Daniel Perez",
      isAssigned: true,
    };

    // Act
    const result = mapEmployeeSummaryFromApiToVm(employeeSummary);

    // Assert
    expect(result).toEqual(expected);
  });

  it("should map EmployeeSummary list from API to VM correctly", () => {
    // Arrange
    const employeeSummaryList: apiModel.EmployeeSummary[] =
      mockEmployeeSummaryList;
    const expected: viewModel.EmployeeSummary[] = mockEmployeeSummaryList;

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(employeeSummaryList);

    // Assert
    expect(result).toEqual(expected);

    expect(vi.mocked(mapToCollection)).toHaveBeenCalledWith(
      employeeSummaryList,
      expect.any(Function)
    );
  });

  it("should map Project from API to VM correctly", () => {
    // Arrange
    const project: apiModel.Project = mockProject;
    const expected: viewModel.Project = {
      id: "1",
      name: "Nombre",
      externalId: "1234",
      comments: "Comentario",
      isActive: true,
      employees: mockEmployeeSummaryList,
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expected);
  });

  it("should return empty Project when API project is null or undefined", () => {
    // Arrange
    const expected = viewModel.createEmptyProject();

    // Act
    const result1 = mapProjectFromApiToVm(null);
    const result2 = mapProjectFromApiToVm(undefined);

    // Assert
    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });
});
