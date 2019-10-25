import faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { TestBed } from '@angular/core/testing';

import { ApiUrl } from '../../lib/tools';
import { ClientTestModule } from '../client-test.module';
import { Config, routes } from '../../lib/providers';
import { Factory } from '../../lib/factories';
import { Repair } from '../../lib/models';
import { RepairService } from '../../lib/services';
import { Repairs } from '../../lib/api';

describe('RepairService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: RepairService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule.forRoot(config)
      ],
      providers: [
        RepairService
      ]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(RepairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.repairs.index;
    let search: Repairs.Search;
    let repairs: Array<Repair>;
    let url: string;

    beforeEach(() => {
      repairs = Factory.buildList<Repair>('Repair');
    });

    it('should have index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(0);
    });

    it('should return an array of Repairs', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Repair>) => expect(res).toEqual(repairs));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: repairs });
    });

    it('should accept optional search parameters and return an array of Repairs', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Repair>) => expect(res).toEqual(repairs));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: repairs });
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
    const path: (id: number) => string = routes.team.repairs.show;
    let repair: Repair;
    let url: string;

    beforeEach(() => {
      repair = Factory.build<Repair>('Repair');
      url = ApiUrl(config, path(repair.id));
    });

    it('should have show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Repair', () => {
      service.show(repair.id).subscribe((res: Repair) => expect(res).toEqual(repair));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: repair });
    });

    it('should return NOT_FOUND with nonexistent repair', () => {
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

  describe('create', () => {
    const path: string = routes.team.repairs.index;
    let attributes: Repairs.New;
    let repair: Repair;
    let url: string;

    beforeEach(() => {
      repair = Factory.build<Repair>('Repair');
      url = ApiUrl(config, path);

      attributes = {
        date_due: faker.date.future().toISOString(),
        description: faker.lorem.paragraph(),
        equipment_id: faker.random.number(),
        title: faker.commerce.productName()
      };
    });

    it('should have create accessor', () => {
      expect(typeof service.create).toBe('function');
      expect(service.create.length).toBe(1);
    });

    it('should return a newly-created Repair', () => {
      service.create(attributes).subscribe((res: Repair) => expect(res).toEqual(repair));
      req = http.expectOne({ url, method: 'POST' });
      req.flush({ data: repair });
    });

    it('should return BAD_REQUEST without a body', () => {
      service.create(undefined).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'POST' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });

    it('should return BAD_REQUEST with invalid attributes', () => {
      service.create({ enddate: 'moo' } as any).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'POST' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.repairs.update;
    let attributes: Repairs.Change;
    let repair: Repair;
    let updatedRepair: Repair;
    let url: string;

    it('should have create accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(1);
    });

    beforeEach(() => {
      repair = Factory.build<Repair>('Repair');
      url = ApiUrl(config, path(repair.id));

      attributes = {
        description: faker.lorem.paragraph(),
        date_due: faker.date.future().toISOString()
      };

      updatedRepair = {
        ...repair,
        description: attributes.description,
        date_due: attributes.date_due as string
      };
    });

    it('should return an updated Repair', () => {
      service.update(repair.id, attributes)
        .subscribe((res: Repair) => expect(res).toEqual(updatedRepair));

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedRepair });
    });

    it('should return BAD_REQUEST without a body', () => {
      service.update(repair.id, undefined).subscribe(
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
      service.update(repair.id, { enddate: 'moo' } as any).subscribe(() => {}, error => {
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
