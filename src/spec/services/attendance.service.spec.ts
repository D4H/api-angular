import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { Attendance } from '../../lib/models';
import { AttendanceService } from '../../lib/services';
import { Attendances } from '../../lib/api';
import { ClientTestModule } from '../client-test.module';
import { routes } from '../../lib/providers';

describe('AttendanceService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: AttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        AttendanceService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(AttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.attendances.index;
    let attendances: Array<Attendance>;
    let search: Attendances.Search;

    beforeEach(() => {
      attendances = Factory.buildList<Attendance>('Attendance');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of attendances', () => {
      http.get.and.returnValue(of({ data: attendances }));
      result$ = hot('(a|)', { a: attendances });
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.attendances.show;
    let attendance: Attendance;

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a attendance', () => {
      http.get.and.returnValue(of({ data: attendance }));
      result$ = hot('(a|)', { a: attendance });
      expect(service.show(attendance.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(attendance.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(attendance.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(attendance.id));
    });
  });

  describe('create', () => {
    const path: string = routes.team.attendances.index;
    let attendance: Attendance;
    let attributes: Attendances.New;

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');

      attributes = {
        activity_id: attendance.activity.id,
        member: attendance.member.id,
        status: attendance.status
      };
    });

    it('should be a function', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should call http.post and return a attendance', () => {
      http.post.and.returnValue(of({ data: attendance }));
      result$ = hot('(a|)', { a: attendance });
      expect(service.create(attributes)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.post.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.create(attributes)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, attributes);
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.attendances.update;
    let attendance: Attendance;
    let attributes: Attendances.Change;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');

      attributes = {
        date: attendance.date,
        enddate: attendance.enddate,
        status: attendance.status
      };
    });

    it('should call http.put and return a attendance', () => {
      http.put.and.returnValue(of({ data: attendance }));
      result$ = hot('(a|)', { a: attendance });
      expect(service.update(attendance.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(attendance.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(attendance.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(attendance.id), attributes);
    });
  });

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.attendances.destroy;
    let attendance: Attendance;

    beforeEach(() => {
      attendance = Factory.build<Attendance>('Attendance');
    });

    it('should be a function', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the ID  of the attendance', () => {
      http.delete.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: attendance.id });
      expect(service.destroy(attendance.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(attendance.id));
    });

    it('should throw an error with any invalid request', () => {
      http.delete.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.destroy(attendance.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(attendance.id));
    });
  });
});
