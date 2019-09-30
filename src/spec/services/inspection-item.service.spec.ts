import faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiUrl, ClientTestModule, Factory } from '../../testing';
import { Config, routes } from '../../lib/providers';
import { Inspection, InspectionItem } from '../../lib/models';
import { InspectionItemService } from '../../lib/services';
import { InspectionItems } from '../../lib/resources';

describe('InspectionItemService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let inspection: Inspection;
  let req: TestRequest;
  let service: InspectionItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule.forRoot(config)
      ],
      providers: [
        InspectionItemService
      ]
    });

    http = TestBed.get(HttpTestingController);
    inspection = Factory.build<Inspection>('Inspection');
    service = TestBed.get(InspectionItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    let items: Array<InspectionItem>;
    let path: string;
    let search: InspectionItems.Search;
    let url: string;

    beforeEach(() => {
      items = Factory.buildList<InspectionItem>('InspectionItem', 7, { inspection_id: inspection.id });
      path = routes.team.inspectionItems.index(inspection.id);
    });

    it('should have index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of InspectionItems', () => {
      url = ApiUrl(config, path);

      service.index(inspection.id)
        .subscribe((res: Array<InspectionItem>) => expect(res).toEqual(items));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: items });
    });

    it('should accept optional search parameters and return an array of InspectionItems', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(inspection.id, search).subscribe((res: Array<InspectionItem>) => {
        expect(res).toEqual(items);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: items });
    });

    it('should return BAD_REQUEST with an invalid search', () => {
      search = { limit: 'moo' } as any;
      url = ApiUrl(config, path, search);

      service.index(inspection.id, search).subscribe(() => {}, error => {
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
    let item: InspectionItem;
    let path: string;
    let url: string;

    beforeEach(() => {
      item = Factory.build<InspectionItem>('InspectionItem');
      path = routes.team.inspectionItems.show(inspection.id, item.id);
      url = ApiUrl(config, path);
    });

    it('should have show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(2);
    });

    it('should return a single InspectionItem', () => {
      service.show(inspection.id, item.id).subscribe((res: InspectionItem) => {
        expect(res).toEqual(item);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: item });
    });

    it('should return NOT_FOUND with nonexistent inspection', () => {
      url = ApiUrl(config, path);

      service.show(inspection.id, item.id).subscribe(() => {}, error => {
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
    let attributes: InspectionItems.Change;
    let item: InspectionItem;
    let path: string;
    let updatedItem: InspectionItem;
    let url: string;

    it('should have create accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(2);
    });

    beforeEach(() => {
      item = Factory.build<InspectionItem>('InspectionItem');
      path = routes.team.inspectionItems.update(inspection.id, item.id);
      url = ApiUrl(config, path);

      attributes = {
        date_completed: faker.date.past().toISOString(),
        description: faker.lorem.paragraph()
      };

      updatedItem = {
        ...item,
        date_completed: attributes.date_completed as string,
        description: attributes.description
      };
    });

    it('should return an updated InspectionItem', () => {
      service.update(inspection.id, item.id, attributes).subscribe((res: InspectionItem) => {
        expect(res).toEqual(updatedItem);
      });

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedItem });
    });

    it('should return BAD_REQUEST without a body', () => {
      service.update(inspection.id, item.id, undefined).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'PUT' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });

    it('should return BAD_REQUEST with invalid attributes', () => {
      service.update(inspection.id, item.id, { enddate: 'moo' } as any).subscribe(() => {}, error => {
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
