import { Injectable } from '@angular/core';

import {
  Destination,
  DestinationType,
  Equipment,
  EquipmentType,
  Member,
  Location
} from '../models';

import { ClientModule } from '../client.module';

/**
 * Convert Equipment/Location/Member Records to Destination
 * =============================================================================
 */

@Injectable({ providedIn: ClientModule })
export class DestinationBuilder {
  equipment(equipment: Equipment): Destination {
    return {
      description: `#${equipment.ref}`,
      entity: { id: equipment.id, type: DestinationType.Equipment },
      id: `${DestinationType.Equipment}-${equipment.id}`,
      parent: { id: undefined, type: undefined },
      title: equipment.title,
      unassignable: equipment.type === EquipmentType.Supply
    };
  }

  location(location: Location): Destination {
    return {
      description: location.bundle,
      entity: { id: location.id, type: DestinationType.Location },
      id: `${DestinationType.Location}-${location.id}`,
      parent: { id: undefined, type: undefined },
      title: location.title,
      unassignable: false
    };
  }

  member(member: Member): Destination {
    return {
      description: member.position,
      entity: { id: member.id, type: DestinationType.Member },
      id: `${DestinationType.Member}-${member.id}`,
      parent: { id: undefined, type: undefined },
      title: member.name,
      unassignable: false
    };
  }
}
