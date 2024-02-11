import {persistentAtom} from '@nanostores/persistent';

import {User} from '../types';

export const $user = persistentAtom<User | null>('user', null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
