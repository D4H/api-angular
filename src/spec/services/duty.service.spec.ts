import faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Duties } from '../../lib/api';
import { Duty } from '../../lib/models';
import { DutyService } from '../../lib/services';
import { Factory } from '../../lib/factories';
import { routes } from '../../lib/providers';

describe('DutyService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: DutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        DutyService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(DutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.duties.index;
    let duties: Array<Duty>;
    let search: Duties.Search;

    beforeEach(() => {
      duties = Factory.buildList<Duty>('Duty');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of duties', () => {
      http.get.and.returnValue(of({ data: duties }));
      result$ = hot('(a|)', { a: duties });
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.duties.show;
    let duty: Duty;

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a duty', () => {
      http.get.and.returnValue(of({ data: duty }));
      result$ = hot('(a|)', { a: duty });
      expect(service.show(duty.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(duty.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.show(duty.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(duty.id));
    });
  });

  describe('create', () => {
    const path: string = routes.team.duties.index;
    let attributes: Duties.New;
    let duty: Duty;

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');

      attributes = {
        end_date: duty.enddate,
        member: duty.member_id,
        notes: duty.notes,
        role_id: duty.role.id,
        start_date: duty.date,
        type: duty.type
      };
    });

    it('should be a function', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should call http.post and return a duty', () => {
      http.post.and.returnValue(of({ data: duty }));
      result$ = hot('(a|)', { a: duty });
      expect(service.create(attributes)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, attributes);
    });

    it('should call http.post and return undefined when res.data.id is not a number', () => {
      duty.id = null;
      http.post.and.returnValue(of({ data: duty }));
      result$ = hot('(a|)', { a: undefined });
      expect(service.create(attributes)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.post.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.create(attributes)).toBeObservable(result$);
      expect(http.post).toHaveBeenCalledWith(path, attributes);
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.duties.update;
    let attributes: Duties.Change;
    let duty: Duty;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');

      attributes = {
        end_date: faker.date.future(),
        start_date: faker.date.future(),
        notes: faker.lorem.paragraph()
      };
    });

    it('should call http.put and return a duty', () => {
      http.put.and.returnValue(of({ data: duty }));
      result$ = hot('(a|)', { a: duty });
      expect(service.update(duty.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(duty.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.update(duty.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(duty.id), attributes);
    });
  });

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.duties.destroy;
    let duty: Duty;

    beforeEach(() => {
      duty = Factory.build<Duty>('Duty');
    });

    it('should be a function', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the ID  of the duty', () => {
      http.delete.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: duty.id });
      expect(service.destroy(duty.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(duty.id));
    });

    it('should throw an error with any invalid request', () => {
      http.delete.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.destroy(duty.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(duty.id));
    });
  });
});
