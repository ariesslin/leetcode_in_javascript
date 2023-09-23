//https://leetcode.com/problems/permutation-in-string/description/

function findPermutationInString(target, source) {
    if (!target || !source || target.length > source.length) return false;

    let windowChars = new Map();
    let requiredChars = new Map();
    for (let char of target) {
        requiredChars.set(char, (requiredChars.get(char) || 0) + 1);
    }

    let validCharCount = 0;

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
                return true;
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

    return false;
}

describe("567. Permutation in String", () => {
    test("should output true from ab, eidbaooo", () => {
        const result = findPermutationInString("ab", "eidbaooo");
        expect(result).toBe(true);
    });

    test("should output false from ab, eidboaoo", () => {
        const result = findPermutationInString("ab", "eidboaoo");
        expect(result).toBe(false);
    });
});
