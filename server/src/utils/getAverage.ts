export function getLivePerformanceAverage (currentAverage: number, newValue: number, count: number) {
    return Math.floor(((currentAverage * (count - 1)) + newValue) / count);
}
