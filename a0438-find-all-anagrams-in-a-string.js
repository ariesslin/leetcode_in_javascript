//https://leetcode.com/problems/find-all-anagrams-in-a-string/

function findAnagrams(source, target) {
    const defaultReturn = [];

    if (!target || !source || target.length > source.length)
        return defaultReturn;

    let windowChars = new Map();
    let requiredChars = new Map();
    for (let char of target) {
        requiredChars.set(char, (requiredChars.get(char) || 0) + 1);
    }

    let validCharCount = 0;
    let collection = [];

    let left = 0,
        right = 0;

    for (; right < source.length; right++) {
        let rightChar = source[right];
        if (requiredChars.has(rightChar)) {
            windowChars.set(rightChar, (windowChars.get(rightChar) || 0) + 1);
            if (windowChars.get(rightChar) === requiredChars.get(rightChar)) {
                validCharCount++;
            }
        }

        while (validCharCount === requiredChars.size) {
            if (right - left + 1 === target.length) {
                collection.push(left);
            }

            let leftChar = source[left];
            left++;

            if (requiredChars.has(leftChar)) {
                if (windowChars.get(leftChar) === requiredChars.get(leftChar)) {
                    validCharCount--;
                }
                windowChars.set(leftChar, windowChars.get(leftChar) - 1);
            }
        }
    }

    return collection.length === 0 ? defaultReturn : collection;
}

describe("438. Find All Anagrams in a String", () => {
    test("should output [0,6] from cbaebabacd, abc", () => {
        const result = findAnagrams("cbaebabacd", "abc");
        expect(result).toEqual([0, 6]);
    });

    test("should output [0,1,2] from abab, ab", () => {
        const result = findAnagrams("abab", "ab");
        expect(result).toEqual([0, 1, 2]);
    });
});
