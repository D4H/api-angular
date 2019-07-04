import { Region, Version, clientDefaultConfig } from 'bindings/lib/providers';

describe('Client Providers', () => {
  describe('clientDefaultConfig', () => {
    it('should match the comparison configuration', () => {
      const comparisonConfig = {
        version: Version.V2
      };

      expect(clientDefaultConfig).toEqual(comparisonConfig);
    });
  });
});
