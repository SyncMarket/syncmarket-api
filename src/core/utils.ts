import { SearchByProperty } from '@core/interfaces';

export class Utils {
    static sortByProperty<T>(array: T[], property: keyof T): T[] {
        return array.sort((a, b) => {
            if (a[property] < b[property]) {
                return -1;
            }

            if (a[property] > b[property]) {
                return 1;
            }

            return 0;
        });
    }

    static searchByProperty<T>({
        items,
        property,
        target,
    }: SearchByProperty<T>): T | null {
        const sortedItems = Utils.sortByProperty(items, property);

        let left = 0;
        let right = sortedItems.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (sortedItems[mid][property] === target) {
                return sortedItems[mid];
            } else if (sortedItems[mid][property] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return null;
    }
}
