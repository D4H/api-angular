import faker from 'faker';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  API_PHOTO_URL_REGEX,
  ApiUrl,
  ClientTestModule,
  Factory,
  sample
} from '../../testing';

import { Config, routes } from '../../lib/providers';
import { Equipment, EquipmentStatus } from '../../lib/models';
import { EquipmentService } from '../../lib/services';
import { Gear } from '../../lib/resources';

describe('EquipmentService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientTestModule.forRoot(config)]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(EquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.gear.index;
    let search: Gear.Search;
    let equipment: Array<Equipment>;
    let url: string;

    beforeEach(() => {
      equipment = Factory.buildList<Equipment>('Equipment', 7);
    });

    it('should have index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(0);
    });

    it('should return an array of Gear', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Equipment>) => expect(res).toEqual(equipment));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: equipment });
    });

    // ATTENDANCE: Testing the correctness of search parameters against the API is
    // beyond the scope of this test, given the lack of an API testing backend
    // which the developer-or anyone else-can run.

    it('should accept optional search parameters and return an array of Gear', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Equipment>) => expect(res).toEqual(equipment));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: equipment });
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

  describe('show', () => {
    const path: (id: number) => string = routes.team.gear.show;
    let equipment: Equipment;
    let url: string;

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
      url = ApiUrl(config, path(equipment.id));
    });

    it('should have show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Equipment', () => {
      service.show(equipment.id).subscribe((res: Equipment) => expect(res).toEqual(equipment));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: equipment });
    });

    it('should return 404 Not Found with nonexistent gear', () => {
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

  describe('update', () => {
    const path: (id: number) => string = routes.team.gear.update;
    let attributes: Gear.Change;
    let equipment: Equipment;
    let updatedEquipment: Equipment;
    let url: string;

    it('should have create accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(1);
    });

    beforeEach(() => {
      equipment = Factory.build<Equipment>('Equipment');
      url = ApiUrl(config, path(equipment.id));

      attributes = {
        is_critical: faker.random.boolean(),
        is_monitor: faker.random.boolean(),
        barcode: faker.random.uuid()
      };

      updatedEquipment = {
        ...equipment,
        ...attributes
      };
    });

    it('should return an updated Equipment', () => {
      service.update(equipment.id, attributes)
        .subscribe((res: Equipment) => expect(res).toEqual(updatedEquipment));

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedEquipment });
    });

    it('should return 400 Bad Request without a body', () => {
      service.update(equipment.id, undefined).subscribe(() => {}, error => {
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
      service.update(equipment.id, { enddate: 'moo' } as any).subscribe(() => {}, error => {
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

  describe('image', () => {
    let blob: Blob;
    let equipmentId: number;
    let path: string;
    let safeUrl: SafeUrl;
    let sanitizer: DomSanitizer;
    let url: string;

    beforeEach(() => {
      blob = Factory.build<Blob>('Photo');
      equipmentId = faker.random.number();
      path = routes.team.members.image(equipmentId);
      sanitizer = TestBed.get(DomSanitizer);
      safeUrl = sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
      url = ApiUrl(config, path);
    });

    it('should have image accessor', () => {
      expect(typeof service.image).toBe('function');
      expect(service.image.length).toBe(1);
    });

    it('should return a SafeUrl when given a valid URL', () => {
      service.image(equipmentId).subscribe((res: any) => {
        expect(res.hasOwnProperty('changingThisBreaksApplicationSecurity')).toBe(true);
        expect(API_PHOTO_URL_REGEX.test(res.changingThisBreaksApplicationSecurity)).toBe(true);
      });

      req = http.expectOne({ url, method: 'GET' });
      req.flush(blob);
    });

    it('should return 404 Not Found with nonexistent Gear ID', () => {
      url = ApiUrl(config, routes.team.members.image(Number.MAX_SAFE_INTEGER));

      service.image(Number.MAX_SAFE_INTEGER).subscribe(() => {}, error => {
        expect(error.constructor).toBe(HttpErrorResponse);
        expect(error.status).toBe(NOT_FOUND);
      });

      req = http.expectOne({ url, method: 'GET' });

      req.flush(blob, {
        status: NOT_FOUND,
        statusText: getStatusText(NOT_FOUND)
      });
    });
  });
});
