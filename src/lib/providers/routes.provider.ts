import { InjectionToken } from '@angular/core';

import { DestinationType } from '../models';
import { EntityType } from '../models';

/**
 * API Routing Configuration
 * =============================================================================
 */

export interface RouteConfig {
  account: {
    authenticate: string;
    memberships: string;
    username: string;
  };

  organisation: {
    settings: string;
  };

  team: {
    activities: {
      index: string;
      show(id: number): string;
    };

    attendances: {
      index: string;
      show(id: number): string;
      update(id: number): string;
      destroy(id: number): string;
    };

    brands: {
      image(id: number): string;
    };

    categories: {
      index: string;
      show(id: number): string;
      update(id: number): string;
      destroy(id: number): string;
    };

    customFields: {
      index: string;
      indexEntity(type: EntityType, id: number | string): string;
      show(id: number): string;
      update(id: number): string;
      destroy(id: number): string;
    };

    duties: {
      index: string;
      show(id: number): string;
      update(id: number): string;
      destroy(id: number): string;
    };

    equipment: {
      index: string;
      show(id: number): string;
      barcode(barcode: string): string;
      move(id: number, destinationType: DestinationType, destinationId: number): string;
      ref(ref: string): string;
      update(id: number): string;
      image(id: number): string;
    };

    groups: {
      index: string;
      show(id: number): string;
    };

    inspections: {
      index: string;
      show(id: number): string;
      update(id: number): string;
    };

    kinds: {
      index: string;
      show(id: number): string;
      update(id: number): string;
      destroy(id: number): string;
    };

    locations: {
      index: string;
      show(id: number): string;
      destroy(id: number): string;
    };

    members: {
      index: string;
      labels: string;
      emergency(id: number | 'me'): string;
      groups(id: number | 'me'): string;
      image(id: number | 'me'): string;
      show(id: number | 'me'): string;
      update(id: number | 'me'): string;
    };

    models: {
      image(id: number): string;
    };

    notes: {
      index: string;
      show(id: number): string;
      update(id: number): string;
      destroy(id: number): string;
    };

    repairs: {
      index: string;
      show(id: number): string;
      update(id: number): string;
    };

    results: {
      index: string;
      show(id: number): string;
      update(id: number): string;
    };

    roles: {
      index: string;
      show(id: number): string;
    };

    suppliers: {
      image(id: number): string;
    }

    image: string;
    search: string;
    settings: string;
    show: string;
  };
}

export const routes: RouteConfig = {
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
    search: '/team/search',
    settings: '/team/settings',
    show: '/team',

    activities: {
      index: '/team/activities',
      show: (id: number): string => `/team/activities/${id}`
    },

    attendances: {
      index: '/team/attendance',
      show: (id: number): string => `/team/attendance/${id}`,
      update: (id: number): string => `/team/attendance/${id}`,
      destroy: (id: number): string => `/team/attendance/${id}`
    },

    brands: {
      image: (id: number) => `/team/equipment/brands/${id}/image`
    },

    categories: {
      index: '/team/equipment/categories',
      show: (id: number): string => `/team/equipment/categories/${id}`,
      update: (id: number): string => `/team/equipment/categories/${id}`,
      destroy: (id: number): string => `/team/equipment/categories/${id}`
    },

    customFields: {
      index: '/team/custom-fields',
      indexEntity: (entity: EntityType, id: number | string): string => `/team/custom-fields/${entity}/${id}`,
      show: (id: number) => `/team/custom-fields/${id}`,
      update: (id: number) => `/team/custom-fields/${id}`,
      destroy: (id: number) => `/team/custom-fields/${id}`
    },

    duties: {
      index: '/team/duties',
      show: (id: number): string => `/team/duties/${id}`,
      update: (id: number): string => `/team/duties/${id}`,
      destroy: (id: number): string => `/team/duties/${id}`
    },

    equipment: {
      index: '/team/equipment',
      show: (id: number): string => `/team/equipment/${id}`,
      barcode: (barcode: string): string => `/team/equipment/barcode/${barcode}`,
      ref: (ref: string): string => `/team/equipment/ref/${ref}`,
      update: (id: number): string => `/team/equipment/${id}`,
      move: (id, destinationType, destinationId) => `/team/equipment/${id}/${destinationType}/${destinationId}`,
      image: (id: number) => `/team/equipment/${id}/image`
    },

    groups: {
      index: '/team/groups',
      show: (id: number): string => `/team/groups/${id}`
    },

    inspections: {
      index: '/team/inspections',
      show: (id: number): string => `/team/inspections/${id}`,
      update: (id: number): string => `/team/inspections/${id}`
    },

    kinds: {
      index: '/team/equipment/kinds',
      show: (id: number): string => `/team/equipment/kinds/${id}`,
      update: (id: number): string => `/team/equipment/kinds/${id}`,
      destroy: (id: number): string => `/team/equipment/kinds/${id}`
    },

    locations: {
      index: '/team/locations',
      show: (id: number): string => `/team/locations/${id}`,
      destroy: (id: number): string => `/team/locations/${id}`
    },

    members: {
      index: '/team/members',
      labels: '/team/members/status-labels',
      emergency: (id: number | 'me'): string => `/team/members/${id}/emergency`,
      groups: (id: number | 'me'): string => `/team/members/${id}/groups`,
      image: (id: number | 'me'): string => `/team/members/${id}/image`,
      show: (id: number | 'me'): string => `/team/members/${id}`,
      update: (id: number | 'me'): string => `/team/members/${id}`
    },

    models: {
      image: (id: number) => `/team/equipment/models/${id}/image`
    },

    notes: {
      index: '/team/whiteboard',
      show: (id: number): string => `/team/whiteboard/${id}`,
      update: (id: number): string => `/team/whiteboard/${id}`,
      destroy: (id: number): string => `/team/whiteboard/${id}`
    },

    repairs: {
      index: '/team/repairs',
      show: (id: number): string => `/team/repairs/${id}`,
      update: (id: number): string => `/team/repairs/${id}`
    },

    results: {
      index: '/team/inspection-results',
      show: (id: number) => `/team/inspection-results/${id}`,
      update: (id: number) => `/team/inspection-results/${id}`
    },

    roles: {
      index: '/team/roles',
      show: (id: number): string => `/team/roles/${id}`
    },

    suppliers: {
      image: (id: number) => `/team/equipment/suppliers/${id}/image`
    }
  }
};

export const API_ROUTES = new InjectionToken<RouteConfig>(
  'API_ROUTES'
);

/**
 * API Authenticated Routes and Authorization
 * =============================================================================
 * The D4H V2 API is protected by one of three kinds of token, one for account
 * resources, one for team resources and one for organisation resources.
 *
 * The easiest approach to authentication is to just declare a route match and
 * kind of token it requires.
 *
 * @example
 *
 *   const memberships: AuthenticatedRoute = {
 *     match: /^\/account\/memberships/,
 *     token: TokenType.Account
 *   };
 *
 *   const members: AuthenticatedRoute = {
 *     match: /^\/team\/members/,
 *     token: TokenType.Team
 *   };
 */

export enum TokenType {
  Account = 'account',
  Organisation = 'organisation',
  Team = 'team'
}

export interface AuthenticatedRoute {
  match: RegExp;
  token: TokenType;
}

export const API_AUTHENTICATED_ROUTES = new InjectionToken<Array<AuthenticatedRoute>>(
  'API_AUTHENTICATED_ROUTES'
);

export const authenticatedRoutes: Array<AuthenticatedRoute> = [
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
