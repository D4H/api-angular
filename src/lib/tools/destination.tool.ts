import { Injectable } from '@angular/core';

import {
  Destination,
  DestinationType,
  Equipment,
  Member,
  Location
} from '../models';

import { ClientModule } from '../client.module';

/**
 * Convert Source Records to Destination
 * =============================================================================
 */

@Injectable({ providedIn: ClientModule })
export class DestinationBuilder {
  equipment(equipment: Equipment): Destination {
    return {
      description: equipment.ref,
      id: equipment.id,
      title: equipment.title,
      type: DestinationType.Equipment
    };
  }

  equipmentContext(
    destination: Partial<Destination>
  ): (equipment: Equipment) => Destination {
    const context = (({ id, type }) => ({ id, type }))(destination);

    return (equipment: Equipment): Destination => ({
      context,
      description: equipment.ref,
      id: equipment.id,
      title: equipment.title,
      type: DestinationType.Equipment
    });
  }

  location(location: Location): Destination {
    return {
      description: location.bundle,
      id: location.id,
      title: location.title,
      type: DestinationType.Location
    };
  }

  member(member: Member): Destination {
    return {
      description: member.position,
      id: member.id,
      title: member.name,
      type: DestinationType.Member
    };
  }

  // GET /team/equipment and PUT /team/equipment/:id have identical attribute names.
  payload(destination: Partial<Destination>): object {
    switch (destination.type) {
      case DestinationType.Equipment:
        return { parent_id: destination.id };
      case DestinationType.Location:
        return { location_id: destination.id };
      case DestinationType.Member:
        return { member: destination.id };
      default:
        return {};
    }
  }
}
