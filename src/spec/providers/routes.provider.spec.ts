import * as faker from 'faker';
import traverse from 'traverse';
import { InjectionToken } from '@angular/core';

import {
  AuthenticatedRoute,
  RouteConfig,
  TokenType,
  authenticatedRoutes,
  routes
} from '../../lib/providers';

describe('API Routes', () => {
  describe('routes', () => {
    it('comparison routes should match configuration', () => {
      const id: number = faker.random.number();

      /*
       * On traversal: Function comparison is /really/ hard in JavaScript. The
       * easiest way to accomplish a deep routing comparison for the project is
       * to just resolve the function and use the return value. Others I have to
       * check prototypes and arity and outputs, and that's harder than result
       * comparsion, which is the same effect.
       */

      const resolvedRouteConfig = traverse(routes).map(
        function(value: any): void {
          if (typeof value === 'function') {
            /* tslint:disable-next-line no-invalid-this */
            this.update(value(id));
          }
        }
      );

      const comparisonRouteConfig = {
        account: {
          authenticate: '/account/authenticate',
          memberships: '/account/memberships',
          username: '/account/username'
        },
        team: {
          image: '/team/image',
          settings: '/team/settings',
          show: `/team/teams/${id}`,
          activities: {
            index: '/team/activities',
            show: `/team/activities/${id}`
          },
          attendances: {
            index: '/team/attendance',
            show: `/team/attendance/${id}`,
            update: `/team/attendance/${id}`,
            destroy: `/team/attendance/${id}`
          },
          brands: {
            image: `/team/equipment/brands/${id}/image`
          },
          duties: {
            index: '/team/duties',
            show: `/team/duties/${id}`,
            update: `/team/duties/${id}`,
            destroy: `/team/duties/${id}`
          },
          equipment: {
            image: `/team/equipment/${id}/image`
          },
          groups: {
            index: '/team/groups',
            show: `/team/groups/${id}`
          },
          members: {
            index: '/team/members',
            labels: '/team/members/status-labels',
            emergency: `/team/members/${id}/emergency`,
            groups: `/team/members/${id}/groups`,
            image: `/team/members/${id}/image`,
            show: `/team/members/${id}`,
            update: `/team/members/${id}`
          },
          models: {
            image: `/team/equipment/models/${id}/image`
          },
          notes: {
            index: '/team/whiteboard',
            show: `/team/whiteboard/${id}`,
            update: `/team/whiteboard/${id}`,
            destroy: `/team/whiteboard/${id}`
          },
          roles: {
            index: '/team/roles',
            show: `/team/roles/${id}`
          },
          suppliers: {
            image: `/team/equipment/suppliers/${id}/image`
          }
        }
      };

      expect(resolvedRouteConfig).toEqual(comparisonRouteConfig);
    });
  });

  describe('authenticatedRoutes', () => {
    it('authenticated routes should match', () => {
      const comparisonAuthenticatedRoutes: Array<AuthenticatedRoute> = [
        {
          match: /^\/account\/memberships/,
          token: TokenType.Account
        },
        {
          match: /^\/organisation/,
          token: TokenType.Organisation
        },
        {
          match: /^\/team/,
          token: TokenType.Team
        }
      ];

      expect(authenticatedRoutes).toEqual(comparisonAuthenticatedRoutes);
    });
  });

  describe('TokenType', () => {
    enum ComparisonRegions {
      Account = 'account',
      Team = 'team',
      Organisation = 'organisation'
    }

    it('should equal the comparison enumerable object', () => {
      expect(Object.keys(TokenType)).toEqual(Object.keys(ComparisonRegions));

      Object.keys(ComparisonRegions).forEach(key => {
        expect(TokenType[key]).toEqual(ComparisonRegions[key]);
      });
    });
  });
});
