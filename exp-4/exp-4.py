def edit_distance(word1, word2):
    m = len(word1)
    n = len(word2)

    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i

    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                cost = 0
            else:
                cost = 1

            dp[i][j] = min(
                dp[i - 1][j] + 1,       # Deletion
                dp[i][j - 1] + 1,       # Insertion
                dp[i - 1][j - 1] + cost # Substitution
            )

    return dp[m][n]


word = "speling"

dictionary = ["spelling", "selling", "spring", "spoiling"]

print("Misspelled word:", word)

for candidate in dictionary:
    print(candidate, ":", edit_distance(word, candidate))

correct_word = min(dictionary, key=lambda w: edit_distance(word, w))

print("Corrected word:", correct_word)
print("Distance between kitten and sitting:",
      edit_distance("kitten", "sitting"))