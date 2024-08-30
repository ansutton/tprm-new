export function truncate(
    field: number | string | null | undefined,
    maxLength: number,
) {
    if (field && typeof field !== 'number') {
        return field?.length <= maxLength
            ? field
            : `${field?.slice(0, maxLength)}...`;
    }
    return null;
}
