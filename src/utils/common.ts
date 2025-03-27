/** used in both build and dev comm */
import logError from './logError';
import { fileExists } from './file';
import path from 'path';

export const rootDir = path.join(process.cwd(), '/');

export function validateExistingSite() {}
