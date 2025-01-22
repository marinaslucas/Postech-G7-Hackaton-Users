import { HashProvider } from '../hash-provider';
import { compare, hash } from 'bcryptjs';

export namespace HashProviderImplementation {
  export class BcryptHashProvider implements HashProvider {
    private readonly SALT_ROUNDS = 6;

    async generateHash(payload: string): Promise<string> {
      return hash(payload, this.SALT_ROUNDS);
    }

    async compareHash(payload: string, hash: string): Promise<boolean> {
      return compare(payload, hash);
    }
  }
}
