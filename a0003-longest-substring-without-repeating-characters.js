//https://leetcode.com/problems/longest-substring-without-repeating-characters/

function findLongestSubstringWithoutRepeatingChars(source) {
    const defaultReturn = 0;

    if (!source) return defaultReturn;

    let windowChars = new Map();

    let maxLength = 0;

    let left = 0,
        right = 0;

    for (; right < source.length; right++) {
        let rightChar = source[right];
        windowChars.set(rightChar, (windowChars.get(rightChar) || 0) + 1);

        while (windowChars.get(rightChar) > 1) {
            let leftChar = source[left];
            left++;

            windowChars.set(leftChar, windowChars.get(leftChar) - 1);
        }

        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
        }
    }

    return maxLength === 0 ? defaultReturn : maxLength;
}

describe("3. Longest Substring Without Repeating Characters", () => {
    test("should output 3 from abcabcbb", () => {
        const result = findLongestSubstringWithoutRepeatingChars("abcabcbb");
        expect(result).toBe(3);
    });

    test("should output 1 from bbbbb", () => {
        const result = findLongestSubstringWithoutRepeatingChars("bbbbb");
        expect(result).toBe(1);
    });

    test("should output 3 from pwwkew", () => {
        const result = findLongestSubstringWithoutRepeatingChars("pwwkew");
        expect(result).toBe(3);
    });
});
