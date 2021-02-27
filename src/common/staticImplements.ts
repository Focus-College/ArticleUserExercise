//Forces a class to implement another.
//In here, we've used it to enforce that Article and User implement
//<IStorable<Article>> and <Istorable<User>>
//U and T are decided when writing the decorator.
export function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}