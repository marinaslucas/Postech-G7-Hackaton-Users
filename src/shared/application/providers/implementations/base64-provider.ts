import { ConflictError } from 'src/shared/domain/errors/conflict-error';
import { Base64ProviderInterface } from '../base64-provider-interface';
import { BadRequestError } from '../../errors/bad-request-error';
import * as jwt from 'jsonwebtoken';

export class Base64Provider implements Base64ProviderInterface {
  decode(token: string): { id: string; email: string } {
    if (!token) {
      throw new BadRequestError('Token not provided');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
    };

    return decodedToken;
  }
}
