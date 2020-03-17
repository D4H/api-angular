import faker from 'faker';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Membership, SettingData, Team, TeamSetting } from '../../lib/models';
import { TeamService, PhotoService } from '../../lib/services';
import { Teams } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('TeamService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let photoService: any;
  let result$: Observable<any>;
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        TeamService,
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
    service = TestBed.get<TeamService>(TeamService);
    photoService = TestBed.get<PhotoService>(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    const path: string = routes.team.show;
    let membership: Membership;
    let team: Team;

    beforeEach(() => {
      membership = Factory.build<Membership>('Membership');
      team = Factory.build<Team>('Team');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return team information', () => {
      http.get.and.returnValue(of({ data: team }));
      result$ = hot('(a|)', { a: team });
      expect(service.show(membership)).toBeObservable(result$);

      expect(http.get).toHaveBeenCalledWith(
        path,
        { headers: { Authorization: `Bearer ${membership.token}` } }
      );
    });

    it('should return NOT_FOUND with nonexistent membership', () => {
      error = { ...error, status: NOT_FOUND };
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(membership)).toBeObservable(result$);

      expect(http.get).toHaveBeenCalledWith(
        path,
        { headers: { Authorization: `Bearer ${membership.token}` } }
      );
    });
  });

  describe('image', () => {
    const path: string = routes.team.image;
    let membership: Membership;
    let image: SafeUrl;

    beforeEach(() => {
      image = Factory.build<SafeUrl>('SafeUrl');
      membership = Factory.build<Membership>('Membership');
    });

    it('should be a function', () => {
      expect(typeof service.image).toBe('function');
    });

    it('should call photoService.get and return a SafeUrl', () => {
      photoService.get.and.returnValue(of(image));
      result$ = hot('(a|)', { a: image });
      expect(service.image(membership)).toBeObservable(result$);

      expect(photoService.get).toHaveBeenCalledWith(path, {
        params: {
          version: new Date(Number(membership.unit.id) * 1000000).toISOString()
        },
        headers: { Authorization: `Bearer ${membership.token}` }
      });
    });
  });

  describe('settings', () => {
    const path: string = routes.team.settings;
    let membership: Membership;
    let setting: TeamSetting;
    let settingData: SettingData;

    beforeEach(() => {
      membership = Factory.build<Membership>('Membership');
      setting = 'MODULE_LOST_BEHAVIOUR';
      settingData = { module_name: setting, value: faker.random.boolean() };
    });

    it('should be a function', () => {
      expect(typeof service.settings).toBe('function');
    });

    it('should call http.get and return team setting information', () => {
      http.get.and.returnValue(of({ data: settingData }));
      result$ = hot('(a|)', { a: settingData });
      expect(service.settings(membership, setting)).toBeObservable(result$);

      expect(http.get).toHaveBeenCalledWith(path, {
        headers: { Authorization: `Bearer ${membership.token}` },
        params: { setting }
      });
    });

    it('should throw BAD_REQUEST with no setting parameter', () => {
      error = { ...error, status: BAD_REQUEST };
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.settings(membership, undefined)).toBeObservable(result$);

      expect(http.get).toHaveBeenCalledWith(path, {
        headers: { Authorization: `Bearer ${membership.token}` },
        params: { setting: undefined }
      });
    });
  });
});
