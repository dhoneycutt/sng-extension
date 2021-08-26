import re
import os
import nltk
from nltk.corpus import stopwords
import numpy as np
import csv

# Parallel arrays of words and current counts for each class
wordlist = []

# 0: CS; 1: History; 2: Maths; 3: Accounts; 4: Bio; 5: Geo; 6: Physics
# counts = [[], [], [], [], [], [], []]
# directories = [r'./Data/test/Computer_Science', r'./Data/test/History', r'./Data/test/Maths', r'./Data/test/accounts', r'./Data/test/biology', r'./Data/test/geography', r'./Data/test/physics']
# # directories = [r'./Data/Computer_Science', r'./Data/History', r'./Data/Maths', r'./Data/accounts', r'./Data/biology', r'./Data/geography', r'./Data/physics']
# numDocs = [0, 0, 0, 0, 0, 0, 0]


counts = [[], []]
condProbs = [[], []]
directories = [r'./Data/Computer_Science', r'./Data/History']
numDocs = [0, 0]
totalWords = 0

dirPos = -1
for directory in directories:
    dirPos += 1
    for filename in os.listdir(directory):
        print(filename)
        # opening the text file
        dirFilename = directory + "/" + filename
        # Increment document count
        numDocs[dirPos] += 1
        with open(dirFilename,'r', encoding="utf-8") as file:

            # reading each line
            for line in file:

                # reading each word
                for word in re.split('[^a-zA-Z\']', line):
                    totalWords += 1
                    # Check if word is in wordlist
                    if word.lower() in stopwords.words('english'):
                        i=1
                    elif word.lower() in wordlist:
                        # Get position of word in list
                        position = wordlist.index(word.lower())
                        # Increment word count for the document's topic (TODO: replace with actual topic not test)
                        counts[dirPos][position] += 1

                    else:
                        # Add word to wordlist and append 1 to the relevant class
                        # TODO: make not just be test
                        wordlist.append(word.lower())
                        tempDirPos = -1
                        for array in counts:
                            tempDirPos += 1
                            if tempDirPos == dirPos:
                                counts[tempDirPos].append(1)
                            else:
                                counts[tempDirPos].append(0)

# np.savetxt('./Model/NBVals.csv', wordlist + counts, delimiter=',')
# print(counts[0])
# print(wordlist[0])
# with open("./Model/NBVals.csv", "w", newline="") as f:
#     writer = csv.writer(f)
#     writer.writerow(wordlist)
#     for i in counts:
#         writer.writerow(i)



# Calculate priors (raw probability of each class)
totalDocs = 0
for docCount in numDocs:
    totalDocs += docCount

classPriors = []
for docCount in numDocs:
    classPriors.append(docCount/totalDocs)

# Calculate total number of each word
totalWords = []
for word in range(len(wordlist)):
    tempWords = 0
    for count in counts:
        tempWords += count[word]
    totalWords.append(tempWords)

# Calculate conditional probability of each word for each class
# using condProbs
alpha = 0.001
for word in range(len(wordlist)):
    for classA in range(len(condProbs)):
        condProbs[classA].append((counts[classA][word] + alpha) / (totalWords[word] + len(wordlist) + 1))

with open("./Model/NBVals.csv", "w", newline="") as f:
    writer = csv.writer(f)
    # writer.writerow(classPriors)
    writer.writerow(wordlist)
    for i in condProbs:
        writer.writerow(i)
