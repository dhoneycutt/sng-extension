#install.packages("readtext")
library(readtext)

setwd("D:/UF/HITL Trust Text/Data/Computer_Science")
CS <- readtext::readtext("./*.txt")

setwd("D:/UF/HITL Trust Text/Data/History")
HST <- readtext::readtext("./*.txt")

setwd("D:/UF/HITL Trust Text/Data/Maths")
MTH <- readtext::readtext("./*.txt")

CSText <- paste(CS)


# Obtaining frequent words in a text and graphing results.

library(dplyr) # Data wrangling & manipulation
library(tidytext) # For unnest_tokens
library(stringr) # For managing text
library(ggplot2) # For data visualizations & graphs
library(stopwords) # For removing stopwords

CSText <- paste(CSText, collapse = " ")
CSText <- str_replace_all(CSText, pattern = '\"', replacement = "") # Remove slashes
CSText <- str_replace_all(CSText, pattern = '\n', replacement = "") # Remove \n
CSText <- str_replace_all(CSText, pattern = '\u0092', replacement = "'") #Replace with quote
CSText <- str_replace_all(CSText, pattern = '\u0091', replacement = "'") #Replace with quote

CS_df <- tibble(Text = CSText)
CS_words <- CS_df %>%
  unnest_tokens(output = word, input = Text)

stop_words <- stopwords::stopwords("en")
SW_df <- tibble(Text = stop_words)

#Remove stopwords
#CS_words <- CS_words %>%
#  anti_join(stop_words)

CS_truecounts <- CS_words %>% count(word, sort = TRUE)
CS_wordcounts <- CS_truecounts[!(CS_truecounts$word %in% SW_df$Text),]
