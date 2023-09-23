//https://leetcode.com/problems/substring-with-concatenation-of-all-words/

function findConcatenationOfAllWords(source, target) {
    let collection = [];

    if (!target || !source || target.length === 0) return collection;

    let wordLength = target[0].length;
    let wordCount = target.length;
    let requiredTotalLength = wordLength * wordCount;

    if (source.length < requiredTotalLength) return collection;

    let requiredWordsTmpl = new Map();
    for (let word of target) {
        requiredWordsTmpl.set(word, (requiredWordsTmpl.get(word) || 0) + 1);
    }

    let left = 0,
        right = 0;

    for (; right < source.length; right++) {
        if (right - left + 1 < requiredTotalLength) {
            continue;
        }

        let wordStr = source.substring(left, right + 1);
        let requiredWords = new Map(requiredWordsTmpl);

        let validCount = 0;
        for (let i = 0; i < wordCount; i++) {
            let startIndex = wordLength * i;
            let word = wordStr.slice(startIndex, startIndex + wordLength);

            if (requiredWords.get(word) > 0) {
                requiredWords.set(word, requiredWords.get(word) - 1);
                validCount++;
            } else {
                break;
            }
        }

        if (validCount === wordCount) {
            collection.push(left);
        }

        left++;
    }

    return collection;
}

describe("30. Substring with Concatenation of All Words", () => {
    test("should output [0,9] from barfoothefoobarman, [foo,bar]", () => {
        const result = findConcatenationOfAllWords("barfoothefoobarman", [
            "foo",
            "bar",
        ]);
        expect(result).toEqual([0, 9]);
    });

    test("should output [] from wordgoodgoodgoodbestword, [bar,foo,the]", () => {
        const result = findConcatenationOfAllWords("wordgoodgoodgoodbestword", [
            "bar",
            "foo",
            "the",
        ]);
        expect(result).toEqual([]);
    });

    test("should output [6, 9, 12] from barfoofoobarthefoobarman, [bar,foo,the]", () => {
        const result = findConcatenationOfAllWords("barfoofoobarthefoobarman", [
            "bar",
            "foo",
            "the",
        ]);
        expect(result).toEqual([6, 9, 12]);
    });

    test("should output [8] from wordgoodgoodgoodbestword, [word,good,best,good]", () => {
        const result = findConcatenationOfAllWords("wordgoodgoodgoodbestword", [
            "word",
            "good",
            "best",
            "good",
        ]);
        expect(result).toEqual([8]);
    });
});
