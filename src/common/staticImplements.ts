
export function staticImplements<T>() {
    // paramater constructor uses "U" which is an extension of T
    // returns the constructor 
    return <U extends T>(constructor: U) => {constructor};
}