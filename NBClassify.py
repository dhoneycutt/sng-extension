# Read in conditional probabilities
import re
import os
import nltk
from nltk.corpus import stopwords
import numpy as np
import csv
from csv import reader
import math

# First element is wordlist, the rest are classes in order
condProbs = []
wordlist = []

thisVar = 0
# open file in read mode
with open('./Model/NBValsP.csv', 'r') as read_obj:
    # pass the file object to reader() to get the reader object
    csv_reader = reader(read_obj)
    # Iterate over each row in the csv using reader object
    for row in csv_reader:
        # row variable is a list that represents a row in csv
        if thisVar == 0:
            wordlist = row
            thisVar = 1
        else:
            condProbs.append(row)

with open("./Model/NBExp.csv", "w", newline="") as o:
    writer = csv.writer(o)
    # writer.writerow(classPriors)
    writer.writerow(["Filename", "Correct", "Word1", "Word2", "Word3", "Word4", "Word5", "Word6", "Word7", "Word8", "Word9", "Word10"])
    # Run on test set
    numCorrect = 0
    total = 0
    # directories = [r'./Data/test/Computer_Science', r'./Data/test/History']
    directories = [r'./Data/Segments/Computer_Science', r'./Data/Segments/History']
    dirPos = -1
    for directory in directories:
        dirPos += 1
        for filename in os.listdir(directory):
            # opening the text file
            relevance = [[0] * len(wordlist), [0] * len(wordlist)]
            thisRow = [""] * 12
            nextRow = [0] * 12
            dirFilename = directory + "/" + filename
            with open(dirFilename,'r', encoding="utf-8") as file:
                wordFreq = [0] * len(wordlist)
                # reading each line
                for line in file:
                    # reading each word
                    for word in re.split('[^a-zA-Z\']', line):
                        if word.lower() not in stopwords.words('english'):
                            # Add to frequency of file
                            if (wordlist.count(word)):
                                wordFreq[wordlist.index(word)] += 1
                # Word frequencies now complete, calculate likelihood for each class
                probClass = [0] * len(condProbs)
                for classA in range(len(condProbs)):
                    # Initialize assuming equal # of data points per class (which it will be)
                    probClass[classA] = np.log(1 / (len(condProbs)))
                    # Add the probabilities for the remaining wordlist
                    for wordPos in range(len(wordlist)):
                        # print(condProbs[classA][wordPos])
                        if (condProbs[classA][wordPos] != '' and len(wordlist[wordPos]) > 3):
                            relevance[classA][wordPos] = float(wordFreq[wordPos]) * float(condProbs[classA][wordPos])
                            probClass[classA] += np.log(float(1 + wordFreq[wordPos])) * np.log(float(condProbs[classA][wordPos]))
                total += 1
                thisRow[0] = filename
                if probClass.index(max(probClass)) == dirPos:
                    numCorrect += 1
                    thisRow[1] = "Correct"
                else:
                    thisRow[1] = "Wrong"
                    print(filename)
                for i in range(2, 11):
                    if (probClass.index(max(probClass)) == 0):
                        max_index = relevance[0].index(max(relevance[0]))
                        nextRow[i] = max(relevance[0])
                        relevance[0][max_index] = -math.inf
                    else:
                        max_index = relevance[1].index(max(relevance[1]))
                        nextRow[i] = max(relevance[1])
                        relevance[1][max_index] = -math.inf
                    thisRow[i] = wordlist[max_index]


                writer.writerow(thisRow)
                # Uncomment the below line of code to include weights, results in CSV that does not work with the interface
                # writer.writerow(nextRow)

    print(float(numCorrect / total))

# Run on individual file and output the top 5 words
