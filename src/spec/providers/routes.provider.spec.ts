import faker from 'faker';
import { InjectionToken } from '@angular/core';
import { map } from 'traverse';

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

      const resolvedRouteConfig = map(routes, function(value: any): void {
        if (typeof value === 'function') {
          /* tslint:disable-next-line no-invalid-this */
          this.update(value(id, id));
        }
      });

      const comparisonRouteConfig = {
        account: {
          authenticate: '/account/authenticate',
          memberships: '/account/memberships',
          username: '/account/username'
        },
        organisation: {
          settings: '/organisation/settings'
        },
        team: {
          image: '/team/image',
          settings: '/team/settings',
          show: '/team',
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
            index: '/team/equipment',
            show: `/team/equipment/${id}`,
            barcode: `/team/equipment/barcode/${id}`,
            ref: `/team/equipment/ref/${id}`,
            update: `/team/equipment/${id}`,
            image: `/team/equipment/${id}/image`
          },
          groups: {
            index: '/team/groups',
            show: `/team/groups/${id}`
          },
          inspections: {
            index: '/team/inspections',
            show: `/team/inspections/${id}`,
            update: `/team/inspections/${id}`
          },
          locations: {
            index: '/team/locations',
            show: `/team/locations/${id}`,
            destroy: `/team/locations/${id}`
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
          repairs: {
            index: '/team/repairs',
            show: `/team/repairs/${id}`,
            update: `/team/repairs/${id}`
          },
          results: {
            index: `/team/inspections/${id}/items`,
            show: `/team/inspections/${id}/items/${id}`,
            update: `/team/inspections/${id}/items/${id}`
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

    describe('/account', () => {
      it('should not authenticate "/account/username"', () => {
        expect(authenticatedRoutes.find(route => route.match.test(routes.account.username)))
          .toEqual(undefined);
      });

      it('should not authenticate "/account/authenticate"', () => {
        expect(authenticatedRoutes.find(route => route.match.test(routes.account.authenticate)))
          .toEqual(undefined);
      });

      it('should authenticate "/account/memberships"', () => {
        expect(authenticatedRoutes.find(route => route.match.test(routes.account.memberships)))
          .toEqual({ match: /^\/account\/memberships/, token: TokenType.Account });
      });
    });

    describe('/organisation', () => {
      it('should authenticate "/organisation" namespace', () => {
        expect(authenticatedRoutes.find(route => route.match.test('/organisation')))
          .toEqual({ match: /^\/organisation/, token: TokenType.Organisation });
      });
    });

    describe('/team/', () => {
      it('should authenticate "/team" namespace', () => {
        expect(authenticatedRoutes.find(route => route.match.test(routes.team.image)))
          .toEqual({ match: /^\/team/, token: TokenType.Team });
      });
    });
  });

  describe('TokenType', () => {
    it('should have keys "Account", "Organisation", and "Team"', () => {
      expect(Object.keys(TokenType)).toEqual(['Account', 'Organisation', 'Team']);
    });

    it('should have values "account", "organisation", and "team"', () => {
      expect(Object.values(TokenType)).toEqual(['account', 'organisation', 'team']);
    });
  });
});
