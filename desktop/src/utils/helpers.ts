export function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
}

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
