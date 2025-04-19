import { type IEsmUtility } from '@infrastructures/interfaces/IEsmUtility.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export class EsmUtility implements IEsmUtility {
    public GetDirName(metaUrl: string): string {
        return dirname(this.GetFileName(metaUrl));
    }

    public GetFileName(metaUrl: string): string {
        return fileURLToPath(metaUrl);
    }
}