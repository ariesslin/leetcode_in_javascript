function findMinWindow(source, target) {
    const MAX_LENGTH = Number.POSITIVE_INFINITY;

    let windowChars = new Map();
    let requiredChars = new Map();
    for (let char of target) {
        requiredChars.set(char, (requiredChars.get(char) || 0) + 1);
    }

    let validCharCount = 0;
    let startIndex = 0;
    let minLength = MAX_LENGTH;

    let left = 0,
        right = 0;

    for (; right < source.length; right++) {
        let rightChar = source[right];
        windowChars.set(rightChar, (windowChars.get(rightChar) || 0) + 1);
        if (windowChars.get(rightChar) === requiredChars.get(rightChar)) {
            validCharCount++;
        }

        while (validCharCount === requiredChars.size) {
            if (right - left < minLength) {
                startIndex = left;
                minLength = right - left;
            }

            let leftChar = source[left];
            left++;
            if (windowChars.get(leftChar) === requiredChars.get(leftChar)) {
                validCharCount--;
            }
            windowChars.set(leftChar, windowChars.get(leftChar) - 1);
        }
    }

    return minLength === MAX_LENGTH
        ? ""
        : source.substring(startIndex, startIndex + minLength + 1);
}

describe("76. Minimum Window Substring", () => {
    test("should output BANC from ADOBECODEBANC, ABC", () => {
        const result = findMinWindow("ADOBECODEBANC", "ABC");
        expect(result).toBe("BANC");
    });

    test("should output a from a, a", () => {
        const result = findMinWindow("a", "a");
        expect(result).toBe("a");
    });

    test("should output empty strong from a, aa", () => {
        const result = findMinWindow("a", "aa");
        expect(result).toBe("");
    });
});
