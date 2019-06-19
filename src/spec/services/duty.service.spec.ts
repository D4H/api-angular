import * as faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { TestBed } from '@angular/core/testing';

import { ClientConfig, routes } from '../../lib/providers';
import { ConfigureApiModule } from '../../test';
import { Duties } from '../../lib/routes';
import { Duty } from '../../lib/models';
import { DutyService } from '../../lib/services';
import { Factory } from '../factories';
import { ApiUrl } from '../utilities';

describe('DutyService', () => {
  const config: ClientConfig = Factory.build<ClientConfig>('ClientConfig');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: DutyService;

  beforeEach(() => {
    ConfigureApiModule(TestBed, config);
    http = TestBed.get(HttpTestingController);
    service = TestBed.get(DutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('DutyService#index', () => {
    const path: string = routes.team.duties.index;
    let duties: Array<Duty>;
    let search: Duties.Search;
    let url: string;

    beforeEach(() => {
      duties = Factory.buildList<Duty>('Duty', 7);
    });

    it('should have #index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of Duties', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Duty>) => expect(res).toEqual(duties));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: duties });
    });

    // DUTY: Testing the correctness of search parameters against the API is
    // beyond the scope of this test, given the lack of an API testing backend
    // which the developer-or anyone else-can run.

    it('should accept optional search parameters and return an array of Duties', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Duty>) => expect(res).toEqual(duties));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: duties });
    });

    it('should return 400 Bad Request with an invalid search', () => {
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

  describe('DutyService#show', () => {
    const path: (id: number) => string = routes.team.duties.show;
    let duty: Duty;
    let url: string;

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');
      url = ApiUrl(config, path(duty.id));
    });

    it('should have #show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Duty', () => {
      service.show(duty.id).subscribe((res: Duty) => expect(res).toEqual(duty));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: duty });
    });

    it('should return 404 Not Found with nonexistent duty', () => {
      url = ApiUrl(config, path(Number.MAX_SAFE_INTEGER));

      service.show(Number.MAX_SAFE_INTEGER).subscribe(
        () => {},
        error => {
          expect(error.constructor).toBe(HttpErrorResponse);
          expect(error.status).toBe(NOT_FOUND);
        }
      );

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });
  });

  describe('DutyService#create', () => {
    const path: string = routes.team.duties.index;
    let attributes: Duties.New;
    let duty: Duty;
    let url: string;

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');
      url = ApiUrl(config, path);

      attributes = {
        end_date: duty.enddate,
        member: duty.member_id,
        notes: duty.notes,
        role_id: duty.role.id,
        start_date: duty.date,
        type: duty.type
      };
    });

    it('should have #create accessor', () => {
      expect(typeof service.create).toBe('function');
      expect(service.create.length).toBe(1);
    });

    it('should return a newly-created Duty', () => {
      service.create(attributes).subscribe((res: Duty) => expect(res).toEqual(duty));
      req = http.expectOne({ url, method: 'POST' });
      req.flush({ data: duty });
    });

    it('should return 400 Bad Request without a body', () => {
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

    it('should return 400 Bad Request with invalid attributes', () => {
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

  describe('DutyService#update', () => {
    const path: (id: number) => string = routes.team.duties.update;
    let attributes: Duties.Change;
    let duty: Duty;
    let updatedDuty: Duty;
    let url: string;

    it('should have #create accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(2);
    });

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');
      url = ApiUrl(config, path(duty.id));

      attributes = {
        end_date: faker.date.future().toISOString(),
        start_date: faker.date.future().toISOString(),
        notes: faker.lorem.paragraph()
      };

      updatedDuty = {
        ...duty,
        date: attributes.start_date as string,
        enddate: attributes.end_date as string,
        notes: attributes.notes
      };
    });

    it('should return an updated Duty', () => {
      service.update(duty.id, attributes)
        .subscribe((res: Duty) => expect(res).toEqual(updatedDuty));

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedDuty });
    });

    it('should return 400 Bad Request without a body', () => {
      service.update(duty.id, undefined).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST);
      });

      req = http.expectOne({ url, method: 'PUT' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });

    it('should return 400 Bad Request with invalid attributes', () => {
      service.update(duty.id, { enddate: 'moo' } as any).subscribe(() => {}, error => {
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

  describe('DutyService#destroy', () => {
    const path: (id: number) => string = routes.team.duties.destroy;
    let duty: Duty;
    let url: string;

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');
      url = ApiUrl(config, path(duty.id));
    });

    it('should have #destroy accessor', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the identifier of the duty', () => {
      service.destroy(duty.id)
        .subscribe((res: number) => expect(res).toEqual(duty.id));

      req = http.expectOne({ url, method: 'DELETE' });
      req.flush({});
    });
  });
});
