import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; //TODO: generate a random string
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
