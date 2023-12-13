declare function binder<T>(target: T, paramList: string[], thisArg: ?T): T

export default binder
