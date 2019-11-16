import faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Factory } from '../../lib/factories';
import { Repair } from '../../lib/models';
import { RepairService } from '../../lib/services';
import { Repairs } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('RepairService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: RepairService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        RepairService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(RepairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.repairs.index;
    let repairs: Array<Repair>;
    let search: Repairs.Search;

    beforeEach(() => {
      repairs = Factory.buildList<Repair>('Repair');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of repairs', () => {
      http.get.and.returnValue(of({ data: repairs }));
      result$ = hot('(a|)', { a: repairs });
      expect(service.index(search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: search });
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.index()).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: {} });
    });
  });

  describe('show', () => {
    const path: (id: number) => string = routes.team.repairs.show;
    let repair: Repair;

    beforeEach(() => {
      repair = Factory.build<Repair>('Repair');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a repair', () => {
      http.get.and.returnValue(of({ data: repair }));
      result$ = hot('(a|)', { a: repair });
      expect(service.show(repair.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(repair.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.show(repair.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(repair.id));
    });
  });

  describe('create', () => {
    const path: string = routes.team.repairs.index;
    let attributes: Repairs.New;
    let repair: Repair;

    beforeEach(() => {
      repair = Factory.build<Repair>('Repair');

      attributes = {
        description: repair.description,
        equipment_id: repair.equipment_id,
        member_id: repair.assigned_to.id,
        title: repair.title
      };
    });

    it('should be a function', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should call http.post and return a repair', () => {
      http.post.and.returnValue(of({ data: repair }));
      result$ = hot('(a|)', { a: repair });
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
    const path: (id: number) => string = routes.team.repairs.update;
    let attributes: Repairs.Change;
    let repair: Repair;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      repair = Factory.build<Repair>('Repair');

      attributes = {
        description: repair.description,
        member_id: repair.assigned_to.id,
        title: repair.title
      };
    });

    it('should call http.put and return a repair', () => {
      http.put.and.returnValue(of({ data: repair }));
      result$ = hot('(a|)', { a: repair });
      expect(service.update(repair.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(repair.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.update(repair.id)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(repair.id), {});
    });
  });
});
