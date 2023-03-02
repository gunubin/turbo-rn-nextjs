// import * as envNames from '@env';

// type Env = typeof envNames;

export class EnvironmentService {
  static instance: EnvironmentService;

  static create(context?: any) {
    if (EnvironmentService.instance) {
      return EnvironmentService.instance;
    }
    return (EnvironmentService.instance = new EnvironmentService(context));
  }

  constructor(private context?: any) {}

  get(name: keyof any) {
    if (!this.context) {
      throw Error('Env context does not exists');
    }
    return this.context[name];
  }
}
