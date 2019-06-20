
/**
 * Team Information Object
 * =============================================================================
 * Returned from GET /team/teams/:id
 */

export interface Team {
  calendar_dashboard_activities: number;
  count_members: number;
  count_operational: number;
  country: string;
  default_duty: number;
  id: number;
  lat: number;
  lng: number;
  organisation_id: number;
  required_oncall: number;
  subdomain: string;
  title: string;

  timezone: {
    location: string;
    offset: string;
  };

  units: {
    currency: string;

    distance: {
      name: string;
      symbol: string;
    };

    weight: {
      name: string;
      units: string;
    };
  };
}
