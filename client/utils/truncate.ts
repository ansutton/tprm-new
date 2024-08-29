export function truncate(
    field: string | null | undefined,
    maxLength: number,
): string | null {
    if (field) {
        return field?.length <= maxLength
            ? field
            : `${field?.slice(0, maxLength)}...`;
    }
    return null;
}
