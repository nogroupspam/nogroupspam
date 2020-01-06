export abstract class Types {

  public getTypes(): string[] {
    return [];
  }

  public isValid(type: string) {
    return this.getTypes().indexOf(type) >= 0;
  }
}