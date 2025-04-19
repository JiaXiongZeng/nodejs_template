export interface IEsmUtility {
    /**
     * Get the directory name from the meta url
     * @param metaUrl The meta url
     */
    GetDirName(metaUrl: string): string;

    /**
     * Get the file name from the meta url
     * @param metaUrl The meta url
     */
    GetFileName(metaUrl: string): string;
}