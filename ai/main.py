from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
import spacy
from nltk.corpus import wordnet
import uvicorn

app = FastAPI()

# Adding CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins. Change this to the specific domain in production.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


summarizer = LsaSummarizer()

# Function to find antonyms of a word using WordNet
def antonyms(word):
    synonyms = []
    antonyms_set = []
    for syn in wordnet.synsets(word):
        for l in syn.lemmas():
            synonyms.append(l.name())
            if l.antonyms():
                antonyms_set.append(l.antonyms()[0].name())
    return set(antonyms_set)

def summarize_article(article_text):
    try:
        parser = PlaintextParser.from_string(article_text, Tokenizer("english"))
        summary = summarizer(parser.document, 2)
        summarized_text = ''
        for sentence in summary:
            summarized_text += str(sentence) + '\n'
        return summarized_text
    except Exception as e:
        return str(e)

# Function to process sentences and detect contradictions
def detect_contradictions(sent1, sent2):
    nlp = spacy.load("en_core_web_sm")
    doc1 = nlp(sent1)
    doc2 = nlp(sent2)
    antonyms_set = set()
    negdoc1 = 0
    negdoc2 = 0
    antonym_tracker = 0
    contr_tracker = 0
    num_contr_tracker = 0
    verb1 = ""
    verb2 = ""
    contradictions = []

    # Processing sentence 1
    for token in doc1:
        if token.dep_ == "neg":
            negdoc1 = 1
            verb1 += "NOT "
        if token.pos_ == "VERB" and token.dep_ == "ROOT":
            verb1 += token.lemma_
            antonyms_set = antonyms_set.union(antonyms(token.lemma_))
            if token.lemma_ in antonyms_set:
                antonym_tracker = 1

    # Processing Sentence 2
    for token in doc2:
        if token.dep_ == "neg":
            negdoc2 = 1
            verb2 += "NOT "
        if token.pos_ == "VERB" and token.dep_ == "ROOT":
            verb2 += token.lemma_
            if token.lemma_ in antonyms_set:
                antonym_tracker = 1

    if (negdoc1 + negdoc2 + antonym_tracker) % 2 != 0 and (negdoc1 + negdoc2 + antonym_tracker) < 3:
        contr_tracker = 1
        contradictions.append("Antonymity/Negation contradiction")
        contradictions.append(f"{verb1.upper()} and {verb2.upper()} can't happen simultaneously.")

    # Finding numerical mismatch
    x1 = check_words(doc1)
    y1 = check_words(doc2)
    number_contr_tracker = check_values(x1, y1)
    if number_contr_tracker == 'Contradiction':
        num_contr_tracker = 1
        contradictions.append("Numeric Mismatch contradiction")

    return contr_tracker, num_contr_tracker, contradictions

# Function to process tokens and extract numerical values
def check_words(doc):
    merged_word = ""
    WordNum = len(doc)
    for i in range(WordNum):
        if (doc[i].ent_type_ == "CARDINAL" or doc[i].pos_ == "NUM"):
            merged_word = doc[i].text
        if ((doc[i].ent_type_ == "CARDINAL" or doc[i].pos_ == "NUM") and str.isdigit(doc[i].text)):
            if (not (str.isdigit(doc[i - 1].text))):
                if (not (str.isdigit(doc[i - 2].text))):
                    merged_word = doc[i - 2].text + ' ' + doc[i - 1].text + ' ' + doc[i].text
    return merged_word

# Function to check for numerical mismatches
def check_values(t1, t2):
    for phrase in ['more than', 'greater than', 'above']:
        if (t1.find(phrase) != -1 and t2.find(phrase) == -1):
            num1 = t1.replace(phrase, '')
            num2 = [int(s) for s in str.split(t2) if s.isdigit()]
            num2 = num2[0]
            if int(num1) > num2:
                return 'Contradiction'
            else:
                return "No Contradiction"
    for phrase in ['less than', 'lesser than', 'below']:
        if (t1.find(phrase) != -1 and t2.find(phrase) == -1):
            num1 = t1.replace(phrase, '')
            num2 = [int(s) for s in str.split(t2) if s.isdigit()]
            num2 = num2[0]
            if int(num1) < num2:
                return 'Contradiction'
            else:
                return "No Contradiction"
    if t1 != t2:
        return 'Contradiction'
    return 'No Contradiction'

class ArticlesRequest(BaseModel):
    article1: str
    article2: str

# FastAPI route to detect contradictions
@app.post("/summarize_and_detect")
async def summarize_and_detect(articles: ArticlesRequest):
    article1_text = articles.article1
    article2_text = articles.article2
    if article1_text and article2_text:
        article1_summary = summarize_article(article1_text)
        article2_summary = summarize_article(article2_text)
    contradiction, num_mismatch, contradictions = detect_contradictions(article1_summary, article2_summary)
    output = {
        'article1_summary': article1_summary,
        'article2_summary': article2_summary,
        'contradictions': contradictions,
        'contradiction_detected': bool(contradiction),
        'numeric_mismatch': bool(num_mismatch)
    }
    return output

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
