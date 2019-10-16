import faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiUrl } from '../../lib/tools';
import { ClientTestModule } from '../client-test.module';
import { Config, routes } from '../../lib/providers';
import { Factory } from '../../lib/factories';
import { Inspection } from '../../lib/models';
import { InspectionService } from '../../lib/services';
import { Inspections } from '../../lib/api';

describe('InspectionService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: InspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule.forRoot(config)
      ],
      providers: [
        InspectionService
      ]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(InspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.inspections.index;
    let inspections: Array<Inspection>;
    let search: Inspections.Search;
    let url: string;

    beforeEach(() => {
      inspections = Factory.buildList<Inspection>('Inspection', 7);
    });

    it('should have index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(0);
    });

    it('should return an array of Inspections', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Inspection>) => expect(res).toEqual(inspections));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: inspections });
    });

    it('should accept optional search parameters and return an array of Inspections', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Inspection>) => expect(res).toEqual(inspections));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: inspections });
    });

    it('should return BAD_REQUEST with an invalid search', () => {
      search = { limit: 'moo' } as any;
      url = ApiUrl(config, path, search);

      service.index(search).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.inspections.show;
    let inspection: Inspection;
    let url: string;

    beforeEach(() => {
      inspection = Factory.build<Inspection>('Inspection');
      url = ApiUrl(config, path(inspection.id));
    });

    it('should have show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Inspection', () => {
      service.show(inspection.id).subscribe((res: Inspection) => expect(res).toEqual(inspection));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: inspection });
    });

    it('should return NOT_FOUND with nonexistent inspection', () => {
      url = ApiUrl(config, path(Number.MAX_SAFE_INTEGER));

      service.show(Number.MAX_SAFE_INTEGER).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(NOT_FOUND);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.inspections.update;
    let attributes: Inspections.Change;
    let inspection: Inspection;
    let updatedInspection: Inspection;
    let url: string;

    it('should have create accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(1);
    });

    beforeEach(() => {
      inspection = Factory.build<Inspection>('Inspection');
      url = ApiUrl(config, path(inspection.id));

      attributes = {
        all_kinds: faker.random.boolean(),
        description: faker.lorem.paragraph(),
        title: faker.lorem.sentence()
      };

      updatedInspection = {
        ...inspection,
        ...attributes
      };
    });

    it('should return an updated Inspection', () => {
      service.update(inspection.id, attributes)
        .subscribe((res: Inspection) => expect(res).toEqual(updatedInspection));

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedInspection });
    });

    it('should return BAD_REQUEST without a body', () => {
      service.update(inspection.id, undefined).subscribe(
        () => {},
        error => {
          expect(error.constructor).toBe(HttpErrorResponse);
          expect(error.status).toBe(BAD_REQUEST);
        }
      );

      req = http.expectOne({ url, method: 'PUT' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });

    it('should return BAD_REQUEST with invalid attributes', () => {
      service.update(inspection.id, { enddate: 'moo' } as any).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'PUT' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });
});
