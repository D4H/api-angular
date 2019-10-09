import { TestBed } from '@angular/core/testing';

import { CLIENT_PERMISSIONS, Operation } from '../../lib/providers';
import { Can, UnknownPermissionError } from '../../lib/tools';
import { Factory } from '../../lib/factories';
import { Member, Repair } from '../../lib/models';
import { inspections, repairs } from '../../lib/permissions';

describe('Can', () => {
  let can: Can;
  let member: Member;
  let record: Repair;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Can,
        {
          provide: CLIENT_PERMISSIONS,
          useValue: { repairs },
          multi: true
        },
        {
          provide: CLIENT_PERMISSIONS,
          useValue: { inspections },
          multi: true
        }
      ]
    });

    can = TestBed.get(Can);
    member = Factory.build('Member');
    record = Factory.build('Repair');
  });

  it('should be created', () => {
    expect(can).toBeTruthy();
  });

  describe('permissions', () => {
    it('should be an object', () => {
      expect(typeof can.permissions).toBe('object');
      expect(can.permissions).toBeTruthy();
    });

    it('should have all multi-token permissions', () => {
      expect(Object.keys(can.permissions)).toEqual(['repairs', 'inspections']);
    });
  });

  describe('action', () => {
    beforeEach(() => {
      spyOn(can.permissions, 'repairs');
    });

    it('should be a function', () => {
      expect(typeof can.action).toBe('function');
    });

    it('should call the permissions method if it is a function', () => {
      can.action(member, 'repairs', Operation.Read);
      expect(can.permissions.repairs).toHaveBeenCalledWith(member, Operation.Read, undefined);
    });

    it('should pass Operation.Read by default', () => {
      can.action(member, 'repairs');
      expect(can.permissions.repairs).toHaveBeenCalledWith(member, Operation.Read, undefined);
    });

    it('should pass the record', () => {
      can.action(member, 'repairs', Operation.Read, record);
      expect(can.permissions.repairs).toHaveBeenCalledWith(member, Operation.Read, record);
    });

    it('should throw UnknownPermissionError with unknown permissions', () => {
      expect(() => can.action(member, 'goose')).toThrow(new UnknownPermissionError('goose'));
    });
  });

  describe('create', () => {
    beforeEach(() => {
      spyOn(can, 'action');
    });

    it('should be a function', () => {
      expect(typeof can.read).toBe('function');
    });

    it('should call can.action with given arguments', () => {
      can.create(member, 'repairs');
      expect(can.action).toHaveBeenCalledWith(member, 'repairs', Operation.Create);
    });
  });

  describe('read', () => {
    beforeEach(() => {
      spyOn(can, 'action');
    });

    it('should be a function', () => {
      expect(typeof can.read).toBe('function');
    });

    it('should call can.action with given arguments', () => {
      can.read(member, 'repairs');
      expect(can.action).toHaveBeenCalledWith(member, 'repairs', Operation.Read, undefined);
    });

    it('should pass given record', () => {
      can.read(member, 'repairs', record);
      expect(can.action).toHaveBeenCalledWith(member, 'repairs', Operation.Read, record);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      spyOn(can, 'action');
    });

    it('should be a function', () => {
      expect(typeof can.update).toBe('function');
    });

    it('should call can.action without a record', () => {
      can.update(member, 'repairs');
      expect(can.action).toHaveBeenCalledWith(member, 'repairs', Operation.Update, undefined);
    });

    it('should call can.action with a record', () => {
      can.update(member, 'repairs', record);
      expect(can.action).toHaveBeenCalledWith(member, 'repairs', Operation.Update, record);
    });
  });

  describe('destroy', () => {
    beforeEach(() => {
      spyOn(can, 'action');
    });

    it('should be a function', () => {
      expect(typeof can.destroy).toBe('function');
    });

    it('should call can.action without a record', () => {
      can.destroy(member, 'repairs');
      expect(can.action).toHaveBeenCalledWith(member, 'repairs', Operation.Destroy, undefined);
    });

    it('should call can.action with a record', () => {
      can.destroy(member, 'repairs', record);
      expect(can.action).toHaveBeenCalledWith(member, 'repairs', Operation.Destroy, record);
    });
  });
});
