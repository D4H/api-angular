import { Region, Version } from '../../lib/providers';

describe('Region Providers', () => {
  describe('Region', () => {
    enum ComparisonRegions {
      America = 'api.d4h.org',
      Canada = 'api.ca.d4h.org',
      Europe = 'api.eu.d4h.org',
      Pacific = 'api.ap.d4h.org',
      Staging = 'api.st.d4h.org'
    }

    it('should equal the comparison enumerable object', () => {
      expect(Object.keys(Region)).toEqual(Object.keys(ComparisonRegions));

      Object.keys(ComparisonRegions).forEach(key => {
        expect(Region[key]).toEqual(ComparisonRegions[key]);
      });
    });
  });

  describe('Version', () => {
    enum ComparisonVersions {
      V1 = 'v1',
      V2 = 'v2',
      V3 = 'v3'
    }

    it('should equal the comparison enumerable object', () => {
      expect(Object.keys(Version)).toEqual(Object.keys(ComparisonVersions));

      Object.keys(ComparisonVersions).forEach(key => {
        expect(Version[key]).toEqual(ComparisonVersions[key]);
      });
    });
  });
});
