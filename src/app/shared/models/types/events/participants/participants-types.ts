import { Types } from '../../types';

export class ParticipantTypes extends Types {
  public readonly enrolled: string = 'enrolled';
  public readonly reserves: string = 'reserves';
  public readonly maybe: string = 'maybe';

  public readonly languaje: {
    [type: string]: string;
  } = {
    [this.enrolled]: 'Participantes',
    [this.reserves]: 'Reservas',
    [this.maybe]: 'Quizás asistan',
  };

  public getTypes(): string[] {
    return [
      this.enrolled,
      this.reserves,
      this.maybe
    ];
  }
}
