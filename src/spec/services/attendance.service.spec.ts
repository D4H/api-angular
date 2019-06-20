import faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { TestBed } from '@angular/core/testing';

import { ClientConfig, routes } from '../../lib/providers';
import { ConfigureApiModule } from '../../test';
import { Factory } from '../factories';
import { Attendance, AttendanceStatus } from '../../lib/models';
import { AttendanceService } from '../../lib/services';
import { Attendances } from '../../lib/routes';
import { ApiUrl, sample } from '../utilities';

describe('AttendanceService', () => {
  const config: ClientConfig = Factory.build<ClientConfig>('ClientConfig');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: AttendanceService;

  beforeEach(() => {
    ConfigureApiModule(TestBed, config);
    http = TestBed.get(HttpTestingController);
    service = TestBed.get(AttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('AttendanceService#index', () => {
    const path: string = routes.team.attendances.index;
    let search: Attendances.Search;
    let attendances: Array<Attendance>;
    let url: string;

    beforeEach(() => {
      attendances = Factory.buildList<Attendance>('Attendance', 7);
    });

    it('should have #index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of Attendances', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Attendance>) => expect(res).toEqual(attendances));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: attendances });
    });

    // ATTENDANCE: Testing the correctness of search parameters against the API is
    // beyond the scope of this test, given the lack of an API testing backend
    // which the developer-or anyone else-can run.

    it('should accept optional search parameters and return an array of Attendances', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Attendance>) => expect(res).toEqual(attendances));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: attendances });
    });

    it('should return 400 Bad Request with an invalid search', () => {
      search = { limit: 'moo' } as any;
      url = ApiUrl(config, path, search);

      service.index(search).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(BAD_REQUEST); }
      );

      req = http.expectOne({ url, method: 'GET' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });

  describe('AttendanceService#show', () => {
    const path: (id: number) => string = routes.team.attendances.show;
    let attendance: Attendance;
    let url: string;

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');
      url = ApiUrl(config, path(attendance.id));
    });

    it('should have #show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Attendance', () => {
      service.show(attendance.id).subscribe((res: Attendance) => expect(res).toEqual(attendance));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: attendance });
    });

    it('should return 404 Not Found with nonexistent attendance', () => {
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

  describe('AttendanceService#create', () => {
    const path: string = routes.team.attendances.index;
    let attributes: Attendances.New;
    let attendance: Attendance;
    let url: string;

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');
      url = ApiUrl(config, path);

      attributes = {
        activity_id: attendance.activity.id,
        date: attendance.date,
        enddate: attendance.enddate,
        member: attendance.member.id,
        role_id: attendance.role,
        status: attendance.status
      };
    });

    it('should have #create accessor', () => {
      expect(typeof service.create).toBe('function');
      expect(service.create.length).toBe(1);
    });

    it('should return a newly-created Attendance', () => {
      service.create(attributes).subscribe((res: Attendance) => expect(res).toEqual(attendance));
      req = http.expectOne({ url, method: 'POST' });
      req.flush({ data: attendance });
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
      service.create({ enddate: 'moo' } as any).subscribe(
        () => {},
        error => {
          expect(error.constructor).toBe(HttpErrorResponse);
          expect(error.status).toBe(BAD_REQUEST);
        }
      );

      req = http.expectOne({ url, method: 'POST' });

      req.flush({}, {
        status: BAD_REQUEST,
        statusText: getStatusText(BAD_REQUEST)
      });
    });
  });

  describe('AttendanceService#update', () => {
    const path: (id: number) => string = routes.team.attendances.update;
    let attributes: Attendances.Change;
    let attendance: Attendance;
    let updatedAttendance: Attendance;
    let url: string;

    it('should have #create accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(2);
    });

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');
      url = ApiUrl(config, path(attendance.id));

      attributes = {
        date: attendance.date,
        enddate: attendance.enddate,
        role_id: faker.random.number(),
        status: sample(AttendanceStatus)
      };

      updatedAttendance = {
        ...attendance,
        date: attributes.date as string,
        enddate: attributes.enddate as string,
        role: attributes.role_id,
        status: attributes.status
      };
    });

    it('should return an updated Attendance', () => {
      service.update(attendance.id, attributes)
        .subscribe((res: Attendance) => expect(res).toEqual(updatedAttendance));

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedAttendance });
    });

    it('should return 400 Bad Request without a body', () => {
      service.update(attendance.id, undefined).subscribe(() => {}, error => {
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
      service.update(attendance.id, { enddate: 'moo' } as any).subscribe(() => {}, error => {
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

  describe('AttendanceService#destroy', () => {
    const path: (id: number) => string = routes.team.attendances.destroy;
    let attendance: Attendance;
    let url: string;

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');
      url = ApiUrl(config, path(attendance.id));
    });

    it('should have #destroy accessor', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the identifier of the attendance', () => {
      service.destroy(attendance.id)
        .subscribe((res: number) => expect(res).toEqual(attendance.id));

      req = http.expectOne({ url, method: 'DELETE' });
      req.flush({});
    });
  });
});
