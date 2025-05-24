type Nullable<T> = T | null;

type SyncOrAsync<T> = Promise<T> | T;

// type RemoveUndefined<T> = {
//     [K in keyof T as undefined extends T[K] ? never : K]: T[K]
// }