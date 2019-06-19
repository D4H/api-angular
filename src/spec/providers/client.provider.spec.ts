import { clientDefaultConfig, Region, Version } from '../../lib/providers';

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
