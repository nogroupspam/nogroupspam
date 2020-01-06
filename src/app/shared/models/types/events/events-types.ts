import { Types } from '../types';

export class EventTypes extends Types {
  public readonly gaming: string = 'gaming';
  public readonly hiking: string = 'hiking';
  public readonly generic: string = 'generic';

  public readonly languaje: {
    [type: string]: string;
  } = {
    [this.gaming]: 'Juegos',
    [this.hiking]: 'Senderismo',
    [this.generic]: 'Generico',
  };

  public getTypes(): string[] {
    return [
      this.gaming,
      this.hiking,
      this.generic
    ];
  }
}
