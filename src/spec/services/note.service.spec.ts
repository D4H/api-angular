import faker from 'faker';
import { Factory } from '@d4h/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';

import { ApiHttpClient } from '../../lib/client';
import { ClientTestModule } from '../client-test.module';
import { Note } from '../../lib/models';
import { NoteService } from '../../lib/services';
import { Notes, Page } from '../../lib/api';
import { routes } from '../../lib/providers';

describe('NoteService', () => {
  let error: HttpErrorResponse;
  let http: any;
  let result$: Observable<any>;
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule
      ],
      providers: [
        NoteService,
        {
          provide: ApiHttpClient,
          useValue: jasmine.createSpyObj('http', ['get', 'post', 'put', 'delete'])
        }
      ]
    });

    error = Factory.build<HttpErrorResponse>('HttpError');
    http = TestBed.get<ApiHttpClient>(ApiHttpClient);
    service = TestBed.get(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.notes.index;
    let data: Array<Note>;
    let page: Page;
    let search: Notes.Search;

    beforeEach(() => {
      data = Factory.buildList('Note');
      page = Factory.build('Page');
      search = { limit: 5, offset: 15 };
    });

    it('should be a function', () => {
      expect(typeof service.index).toBe('function');
    });

    it('should call http.get and return an array of notes', () => {
      http.get.and.returnValue(of({ data, meta: page }));
      result$ = hot('(a|)', { a: { data, page } });
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
    const path: (id: number) => string = routes.team.notes.show;
    let note: Note;

    beforeEach(() => {
      note = Factory.build<Note>('Note');
    });

    it('should be a function', () => {
      expect(typeof service.show).toBe('function');
    });

    it('should call http.get and return a note', () => {
      http.get.and.returnValue(of({ data: note }));
      result$ = hot('(a|)', { a: note });
      expect(service.show(note.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(note.id));
    });

    it('should throw an error with any invalid request', () => {
      http.get.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.show(note.id)).toBeObservable(result$);
      expect(http.get).toHaveBeenCalledWith(path(note.id));
    });
  });

  describe('create', () => {
    const path: string = routes.team.notes.index;
    let attributes: Notes.New;
    let note: Note;

    beforeEach(() => {
      note = Factory.build<Note>('Note');

      attributes = {
        enddate: note.enddate,
        important: note.urgent,
        text: note.message
      };
    });

    it('should be a function', () => {
      expect(typeof service.create).toBe('function');
    });

    it('should call http.post and return a note', () => {
      http.post.and.returnValue(of({ data: note }));
      result$ = hot('(a|)', { a: note });
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
    const path: (id: number) => string = routes.team.notes.update;
    let attributes: Notes.Change;
    let note: Note;

    it('should be a function', () => {
      expect(typeof service.update).toBe('function');
    });

    beforeEach(() => {
      note = Factory.build<Note>('Note');

      attributes = {
        text: faker.lorem.paragraph(),
        enddate: faker.date.future(),
        important: faker.random.boolean()
      };
    });

    it('should call http.put and return a note', () => {
      http.put.and.returnValue(of({ data: note }));
      result$ = hot('(a|)', { a: note });
      expect(service.update(note.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(note.id), attributes);
    });

    it('should throw an error with any invalid request', () => {
      http.put.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.update(note.id, attributes)).toBeObservable(result$);
      expect(http.put).toHaveBeenCalledWith(path(note.id), attributes);
    });
  });

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.notes.destroy;
    let note: Note;

    beforeEach(() => {
      note = Factory.build<Note>('Note');
    });

    it('should be a function', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the ID  of the note', () => {
      http.delete.and.returnValue(of(undefined));
      result$ = hot('(a|)', { a: note.id });
      expect(service.destroy(note.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(note.id));
    });

    it('should throw an error with any invalid request', () => {
      http.delete.and.returnValue(throwError(error));
      result$ = hot('#', undefined, error);
      expect(service.destroy(note.id)).toBeObservable(result$);
      expect(http.delete).toHaveBeenCalledWith(path(note.id));
    });
  });
});
