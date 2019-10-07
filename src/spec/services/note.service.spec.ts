import faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BAD_REQUEST, NOT_FOUND, getStatusText } from 'http-status-codes';
import { TestBed } from '@angular/core/testing';

import { ApiUrl, Factory } from '../../testing';
import { ClientTestModule } from '../client-test.module';
import { Config, routes } from '../../lib/providers';
import { Note } from '../../lib/models';
import { NoteService } from '../../lib/services';
import { Notes } from '../../lib/resources';

describe('NoteService', () => {
  const config: Config = Factory.build<Config>('Config');
  let http: HttpTestingController;
  let req: TestRequest;
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClientTestModule.forRoot(config)
      ],
      providers: [
        NoteService
      ]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('index', () => {
    const path: string = routes.team.notes.index;
    let search: Notes.Search;
    let notes: Array<Note>;
    let url: string;

    beforeEach(() => {
      notes = Factory.buildList<Note>('Note', 7);
    });

    it('should have index accessor', () => {
      expect(typeof service.index).toBe('function');
      expect(service.index.length).toBe(1);
    });

    it('should return an array of Notes', () => {
      url = ApiUrl(config, path);

      service.index()
        .subscribe((res: Array<Note>) => expect(res).toEqual(notes));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: notes });
    });

    it('should accept optional search parameters and return an array of Notes', () => {
      search = { limit: 5, offset: 15 };
      url = ApiUrl(config, path, search);

      service.index(search)
        .subscribe((res: Array<Note>) => expect(res).toEqual(notes));

      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: notes });
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
    const path: (id: number) => string = routes.team.notes.show;
    let note: Note;
    let url: string;

    beforeEach(() => {
      note = Factory.build<Note>('Note');
      url = ApiUrl(config, path(note.id));
    });

    it('should have show accessor', () => {
      expect(typeof service.show).toBe('function');
      expect(service.show.length).toBe(1);
    });

    it('should return a single Note', () => {
      service.show(note.id).subscribe((res: Note) => expect(res).toEqual(note));
      req = http.expectOne({ url, method: 'GET' });
      req.flush({ data: note });
    });

    it('should return NOT_FOUND with nonexistent note', () => {
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
    const path: string = routes.team.notes.index;
    let attributes: Notes.New;
    let note: Note;
    let url: string;

    beforeEach(() => {
      note = Factory.build<Note>('Note');
      url = ApiUrl(config, path);

      attributes = {
        enddate: note.enddate,
        important: note.urgent,
        text: note.message
      };
    });

    it('should have create accessor', () => {
      expect(typeof service.create).toBe('function');
      expect(service.create.length).toBe(1);
    });

    it('should return a newly-created Note', () => {
      service.create(attributes).subscribe((res: Note) => expect(res).toEqual(note));
      req = http.expectOne({ url, method: 'POST' });
      req.flush({ data: note });
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
    const path: (id: number) => string = routes.team.notes.update;
    let attributes: Notes.Change;
    let note: Note;
    let updatedNote: Note;
    let url: string;

    it('should have create accessor', () => {
      expect(typeof service.update).toBe('function');
      expect(service.update.length).toBe(2);
    });

    beforeEach(() => {
      note = Factory.build<Note>('Note');
      url = ApiUrl(config, path(note.id));

      attributes = {
        text: faker.lorem.paragraph(),
        enddate: faker.date.future(),
        important: faker.random.boolean()
      };

      updatedNote = {
        ...note,
        message: attributes.text,
        urgent: attributes.important,
        enddate: attributes.enddate as string
      };
    });

    it('should return an updated Note', () => {
      service.update(note.id, attributes)
        .subscribe((res: Note) => expect(res).toEqual(updatedNote));

      req = http.expectOne({ url, method: 'PUT' });
      req.flush({ data: updatedNote });
    });

    it('should return BAD_REQUEST without a body', () => {
      service.update(note.id, undefined).subscribe(
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
      service.update(note.id, { enddate: 'moo' } as any).subscribe(() => {}, error => {
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

  describe('destroy', () => {
    const path: (id: number) => string = routes.team.notes.destroy;
    let note: Note;
    let url: string;

    beforeEach(() => {
      note = Factory.build<Note>('Note');
      url = ApiUrl(config, path(note.id));
    });

    it('should have destroy accessor', () => {
      expect(typeof service.destroy).toBe('function');
    });

    it('should return the identifier of the note', () => {
      service.destroy(note.id)
        .subscribe((res: number) => expect(res).toEqual(note.id));

      req = http.expectOne({ url, method: 'DELETE' });
      req.flush({});
    });
  });
});
