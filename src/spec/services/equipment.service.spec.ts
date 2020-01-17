import faker from 'faker';
import { Factory, sample } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { DestinationType, Equipment } from '../../lib/models';
import { EquipmentService, PhotoService } from '../../lib/services';
import { Search } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('EquipmentService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let photoService: any;
  let result$: Observable<any>;
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        EquipmentService,
        {
          provide: PhotoService,
          useValue: jasmine.createSpyObj('photoService', ['get'])
        },
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get<EquipmentService>(EquipmentService);
    photoService = TestBed.get<PhotoService>(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.equipment.index;
    let equipment: Array<Equipment>;
    let search: Search;

    beforeEach(() => {
      equipment = Factory.buildList<Equipment>('Equipment');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of equipment', () => {
      http.get.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
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
    const path: (id: number) => string = routes.team.equipment.show;
    let equipment: Equipment;

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return an equipment', () => {
      http.get.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
      expect(service.show(equipment.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(equipment.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.show(equipment.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(equipment.id));
    });
  });

  describe('update', () => {
    const path: (id: number) => string = routes.team.equipment.update;
    let attributes: Partial<Equipment>;
    let equipment: Equipment;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');

      attributes = {
        barcode: equipment.barcode,
        is_critical: true,
        is_monitor: false
      };
    });

    it('should call http.put and return a equipment', () => {
      http.put.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
      expect(service.update(equipment.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(equipment.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.update(equipment.id)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(equipment.id), {});
    });
  });

  describe('move', () => {
    const path = routes.team.equipment.move;
    let equipment: Equipment;
    let id: number;
    let type: DestinationType;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
      type = sample<DestinationType>(DestinationType);
      id = faker.random.number();
    });

    it('should call http.put and return a equipment', () => {
      http.put.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
      expect(service.move(equipment.id, type, id )).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(equipment.id, type, id), null);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.move(equipment.id, type, id )).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(equipment.id, type, id), null);
    });
  });

  describe('ref', () => {
    const path: (ref: string) => string = routes.team.equipment.ref;
    let equipment: Equipment;

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
    });

    it('should be a function', () => {
      expect(typeof service.ref).toBe('function');
    });

    it('should call http.get and return an equipment', () => {
      http.get.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
      expect(service.ref(equipment.ref)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(equipment.ref));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.ref(equipment.ref)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(equipment.ref));
    });
  });

  describe('barcode', () => {
    const path: (barcode: string) => string = routes.team.equipment.barcode;
    let equipment: Equipment;

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
    });

    it('should be a function', () => {
      expect(typeof service.barcode).toBe('function');
    });

    it('should call http.get and return an equipment', () => {
      http.get.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
      expect(service.barcode(equipment.barcode)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(equipment.barcode));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', null, error);
      expect(service.barcode(equipment.barcode)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(equipment.barcode));
    });
  });

  describe('image', () => {
    const path: (id: number) => string = routes.team.equipment.image;
    let equipment: Equipment;
    let image: SafeUrl;

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
      image = Factory.build<SafeUrl>('SafeUrl');
    });

    it('should be a function', () => {
      expect(typeof service.image).toBe('function');
    });

    it('should call photoService.get and return a SafeUrl', () => {
      photoService.get.and.returnValue(of(image));
      result$ = hot('(a|)', { a: image });
      expect(service.image(equipment.id)).toBeObservable(result$);
      expect(photoService.get).toHaveBeenCalledWith(path(equipment.id), { params: {} });
    });

    it('should call photoService.get and return null when image does not exist', () => {
      error = { ...error, status: NOT_FOUND };
      photoService.get.and.returnValue(of(null));
      result$ = hot('(a|)', { a: null });
      expect(service.image(equipment.id)).toBeObservable(result$);
      expect(photoService.get).toHaveBeenCalledWith(path(equipment.id), { params: {} });
    });
  });

  describe('search', () => {
    const path: string = routes.team.equipment.index;
    let equipment: Array<Equipment>;
    let search: Search;
    let query: string;

    beforeEach(() => {
      equipment = Factory.buildList<Equipment>('Equipment');
      search = { limit: 5, offset: 15 };
      query = faker.random.uuid();
    });

    it('should be a function', () => {
      expect(typeof service.search).toBe('function');
    });

    it('should call http.get and return an array of members', () => {
      http.get.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
      expect(service.search(query, search)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { barcode: query, ...search } });
      expect(http.get).toHaveBeenCalledWith(path, { params: { ref: query, ...search } });
    });

    it('should call http.get with {} by default for params', () => {
      http.get.and.returnValue(of({ data: equipment }));
      result$ = hot('(a|)', { a: equipment });
      expect(service.search(query)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path, { params: { barcode: query } });
      expect(http.get).toHaveBeenCalledWith(path, { params: { ref: query } });
    });
  });
});
