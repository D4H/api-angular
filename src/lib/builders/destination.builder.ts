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
      assignable: equipment.type !== EquipmentType.Supply,
      description: `#${equipment.ref}`,
      id: equipment.id,
      title: equipment.title,
      type: DestinationType.Equipment
    };
  }

  equipmentContext(
    { id, type }: { id: number, type: DestinationType }
  ): (equipment: Equipment) => Destination {
    return (equipment: Equipment): Destination => ({
      ...this.equipment(equipment),
      context: { id: Number(id), type }
    });
  }

  location(location: Location): Destination {
    return {
      assignable: true,
      description: location.bundle,
      id: location.id,
      title: location.title,
      type: DestinationType.Location
    };
  }

  member(member: Member): Destination {
    return {
      assignable: true,
      description: member.position,
      id: member.id,
      title: member.name,
      type: DestinationType.Member
    };
  }
}
