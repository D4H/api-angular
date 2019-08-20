import { InjectionToken } from '@angular/core';

import {
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  Version,
  defaultConfig
} from '../../lib/providers';

describe('Config Providers', () => {
  describe('CLIENT_CONFIG', () => {
    it('should match the comparison token', () => {
      const token = new InjectionToken('CLIENT_CONFIGURATION');
      expect(CLIENT_CONFIG).toEqual(token);
    });
  });

  describe('CLIENT_DEFAULT_CONFIG', () => {
    it('should match the comparison token', () => {
      const token = new InjectionToken('CLIENT_DEFAULT_CONFIGURATION');
      expect(CLIENT_DEFAULT_CONFIG).toEqual(token);
    });
  });

  describe('defaultConfig', () => {
    it('should match the comparison configuration', () => {
      const comparisonConfig = {
        version: Version.V2,

        client: {
          name: '',
          version: ''
        }
      };

      expect(defaultConfig).toEqual(comparisonConfig);
    });
  });
});
