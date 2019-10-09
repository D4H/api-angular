import { InjectionToken } from '@angular/core';

import {
  CLIENT_CONFIG,
  CLIENT_DEFAULT_CONFIG,
  CLIENT_NAME,
  CLIENT_VERSION,
  Version,
  defaultConfig
} from '../../lib/providers';

describe('Config Providers', () => {
  describe('CLIENT_VERSION', () => {
    it('should be a semantic version', () => {
      expect(CLIENT_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('CLIENT_NAME', () => {
    it('should be "D4H API CLIENT"', () => {
      expect(CLIENT_NAME).toBe('D4H API CLIENT');
    });
  });

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
          name: CLIENT_NAME,
          version: CLIENT_VERSION
        }
      };

      expect(defaultConfig).toEqual(comparisonConfig);
    });
  });
});
