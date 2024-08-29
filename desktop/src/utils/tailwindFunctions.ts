export const tw = (
    strings: readonly string[] | ArrayLike<string>,
    ...values: string[]
) => String.raw({ raw: strings }, ...values);
