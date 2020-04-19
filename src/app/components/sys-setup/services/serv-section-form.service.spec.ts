import { TestBed } from "@angular/core/testing";

import { sectionServicesFormService } from "./serv-section-form.service ";

describe("PharmacologicalCategoriesFormService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: sectionServicesFormService = TestBed.get(
      sectionServicesFormService
    );
    expect(service).toBeTruthy();
  });
});
