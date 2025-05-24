export interface IAjaxCallbackOptions<TData = unknown> {
    onSuccess?: (obj: TData) => SyncOrAsync<any>,
    onError?: (err: Error) => SyncOrAsync<any>
}