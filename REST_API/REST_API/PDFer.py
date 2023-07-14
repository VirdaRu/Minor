import os
import fitz
import PyPDF2
import re
import sys




PageNr = 0
userID = sys.argv[1]
userInput = sys.argv[2]
filePath = os.getcwd() + f"\\PDF-testopslag\\{userID}.pdf"
CensoredData = []



reader = PyPDF2.PdfReader(filePath)
information = reader.pages[PageNr].extract_text()

#print(information)
document = fitz.open(filePath)
page = document[PageNr]
black= (0,0,0)
rl = []

d = page.get_text("dict")
blocks = d["blocks"]
imgblocks = [b for b in blocks if b["type"] == 1]

#Returns all Coordinates of an image. index = index of Array.
def getImageCoordinates(index):
    rectanglecoordinates =[]

    IMGCoordinates = imgblocks[index]['bbox']
    for co in IMGCoordinates:
        rectanglecoordinates.append(co)
        
    return rectanglecoordinates

#Gets Images from PDF File and redacts them
def getImageFromPDF():
    for index in range(len(imgblocks)):
        if index:
            x = getImageCoordinates(index)          
            rl.append(fitz.fitz.Rect(x[0], x[1], x[2], x[3]))
    for rect in rl:

        page.add_redact_annot(rect, fill = black)

#Find Dates and recact them from the document, using regex
def findDates():
    regex = "([0-9]{1,2} ?- ?[0-9]{1,2} ?- ?[0-9]{4})"
    regex2 = "(([0-9] ?){4})"
    x = re.findall(regex2,information)
    x2 = re.findall(regex,information)
    for match in x:
        CensoredData.append(match[0])
        CensorData()
    for match in x2:
        CensoredData.append(match)
        CensorData()

#Find all text matches using and regular expression (regex)
def RedactWithRegex(regex):
    x = re.findall(regex,information)
    for match in x:
        match = match.rstrip()  #To remove any trailing characters
        CensoredData.append(match[0])
        CensorData()

#Redact a certain word(s)/sentence
def RedactWords(Word):
    CensoredData.append(Word)
    CensorData()        

#Redact the information
def CensorData():
    for data in CensoredData:
        if data == "":
            continue
        rl = page.search_for(f"{data}")
    
    for rect in rl:
        page.add_redact_annot(rect, fill = black)

#Gets and Redacts Education info of Applicant
def getEducation():
    x = re.findall(",(.*College.*)|,(.*University.*)|,(.*School.*)",information)
    for match in x:
        fullString = ""
        for a in match:
            fullString += a
        CensoredData.append(fullString)
        CensorData()


def redactUserInput(userInfo):

    myList = userInfo.split(",")
    
    for info in myList:
        #print(info)
        CensoredData.append(info)
        CensorData()

def getNameAndMail():
    textArr = information.split('\n')
    #Redact Name from file
    RedactWords(textArr[0])
    
    #search for emailaddresses
    for text in textArr:
        if "@" in text:
            CensoredData.append(text)
    CensorData()

for i in range(len(reader.pages)):
    information = reader.pages[PageNr].extract_text()
    redactUserInput(userInput)
    page = document[PageNr]
    if i == 0:
        getNameAndMail()

    getEducation()
    findDates()
    getImageFromPDF()
    page.apply_redactions()
    PageNr = PageNr + 1

#Save the redacted file as another pdf
document.save((os.getcwd() + f"\\PDF-testopslag\\Censored{userID}.pdf"))
print("Document successfully redacted")


