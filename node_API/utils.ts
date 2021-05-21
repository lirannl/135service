// Given an array which may contain nulls, returns a version of that array with the nulls removed, with a type that cannot be null
export function withoutNulls<T>(arrWithNulls: (T | null)[]) : T[]
{
    return arrWithNulls.filter(e => e != null) as unknown as T[];
}