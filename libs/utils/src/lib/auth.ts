import { compareSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { Admin } from '../../../../apps/apollo-server/src/admin/admin.model';
import { SALT_OR_ROUNDS, SECRET_KEY } from './constants';

export function createJwtToken({ email, name, _id, role }: Admin) {
  return sign({ email, name, _id, role }, SECRET_KEY);
}

export function hashPassword(password: string) {
  return hashSync(password, SALT_OR_ROUNDS);
}

export function comparePassword({ plainTextPassword, hashedPassword }: { plainTextPassword: string, hashedPassword: string}) {
  return compareSync(plainTextPassword, hashedPassword);
}
