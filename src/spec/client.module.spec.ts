import { Provider } from '@angular/core';

import { CLIENT_CONFIG, defaultConfig } from '../lib/providers';
import { ClientModule } from '../lib/client.module';

describe('ClientModule', () => {
  describe('forFeature', () => {
    it('should be a function', () => {
      expect(typeof ClientModule.forFeature).toBe('function');
    });

    it('should return shit', () => {
      const provider = {
        provide: CLIENT_CONFIG,
        useValue: defaultConfig
      };

      expect(ClientModule.forFeature(provider)).toEqual({
        ngModule: ClientModule,
        providers: [provider]
      });
    });
  });
});
