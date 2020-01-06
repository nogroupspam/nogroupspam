export abstract class FireBaseRTDBApiRest {

  private readonly tokenMethod = '?auth=';
  private readonly extension = '.json';

  constructor(private token: string) {
    this.token = this.tokenMethod + this.token;
  }

  public setToken(token: string): void {
    this.token = this.tokenMethod + token;
  }

  public getToken(): string {
    return this.token;
  }

  public getExtension(): string {
    return this.extension;
  }
}
