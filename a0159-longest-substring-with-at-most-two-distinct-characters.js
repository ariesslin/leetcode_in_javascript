function findLongestSubstringWithAtMostTwoDistinctCharacters(source) {
    let maxLength = 0;

    if (!source) return maxLength;

    let windowChars = new Map();

    let left = 0,
        right = 0;

    for (; right < source.length; right++) {
        let rightChar = source[right];

        windowChars.set(rightChar, (windowChars.get(rightChar) || 0) + 1);

        while (windowChars.size > 2) {
            let leftChar = source[left];
            left++;

            if (windowChars.get(leftChar) === 1) {
                windowChars.delete(leftChar);
            } else {
                windowChars.set(leftChar, windowChars.get(leftChar) - 1);
            }
        }

        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
        }
    }

    return maxLength;
}

describe("159. Longest Substring with At Most Two Distinct Characters", () => {
    test("should output 3 from eceba", () => {
        const result =
            findLongestSubstringWithAtMostTwoDistinctCharacters("eceba");
        expect(result).toBe(3);
    });

    test("should output 5 from ccaabbb", () => {
        const result =
            findLongestSubstringWithAtMostTwoDistinctCharacters("ccaabbb");
        expect(result).toBe(5);
    });
});
