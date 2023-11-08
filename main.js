// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
highlightedWords = ["sections", "home", "largest", "different"]

tutorialText = ["When you see a system error, you can correct it in two different ways: correcting the classification and correcting the relevant words.", "If the system prediction is incorrect, press the \"I Disagree\" button.\n\n", "If you disagree with a highlighted word being highly relevant to distinguish between the topics, un-highlight it by clicking on it. If there is an un-highlighted word that you think is highly relevant to the topic, highlight it by clicking on it.", "The system will highlight the top five most relevant words used for its prediction. For your feedback you are not restricted to exactly five words, but are limited to having between three and seven words.", "Remember, there is not necessarily a \"correct\" set of relevant words. We ask you to use your personal judgement to determine what words you would use to decide whether the sample is about History or Computer Science.", "Highlight the following words: RelevantOne, RelevantTwo, RelevantThree. Un-highlight the following words: IrrelevantOne, IrrelevantTwo, IrrelevantThree."]
textPos = 0;

currentPosition = 1
//File list and words
//Filename,Correct,Word1,Word2,Word3,Word4,Word5,Word6,Word7,Word8,Word9,
//Filename,Correct,Word1,Word2,Word3,Word4,Word5,Word6,Word7,Word8,Word9
fileList1 = [
['HS9.txt','Correct','first','program','space','failed','killed','died','human','without','fire'],
['CS9.txt','Wrong','instructions','hardware','architecture','first','left','another','third','assembly','related'],
['HS21.txt','Correct','president','became','first','time','state','power','took','part','remained'],
['CS4.txt','Correct','chapter','computer','first','software','words','technology','basic','components','integrated'],
['HS19.txt','Correct','international','took','came','result','diplomatic','ties','provide','team','currency'],
['CS16.txt','Correct','processor','language','using','single','written','version','processors','core','allows'],
['CS10.txt','Correct','program','code','memory','machine','using','shows','compiler','even','power'],
['CS14.txt','Correct','memory','data','code','machine','first','called','shows','stack','need'],
['CS2.txt','Correct','address','page','system','must','operating','user','process','tables','space'],
['CS23.txt','Correct','used','computers','three','following','understanding','sites','find','important','digital'],
['CS8.txt','Wrong','hardware','instruction','first','three','last','field','half','fields','type'],
['HS6.txt','Correct','communist','countries','leader','century','large','troops','right','border','result'],
['CS20.txt','Correct','section','compiler','program','language','machine','level','high','function','understand'],
['CS11.txt','Correct','memory','computer','data','programs','code','program','used','write','also'],
['CS22.txt','Wrong','instruction','architecture','number','become','programs','language','viable','distributed','increases']
]
fileList2 = [
['CS12.txt','Wrong','first','election','presidential','found','traditional','mass','media','news','services'],
['CS15.txt','Correct','memory','single','following','string','faster','like','name','half','takes'],
['HS15.txt','Correct','first','world','time','years','poor','called','among','number','former'],
['HS3.txt','Correct','also','became','political','world','military','nations','nation','king','death'],
['HS17.txt','Correct','government','became','state','power','economy','time','early','trade','system'],
['CS21.txt','Wrong','instruction','architecture','effect','possible','causes','exception','specifies','defines','NA'],
['HS18.txt','Correct','government','years','would','leader','minister','nuclear','prime','within','well'],
['HS8.txt','Correct','many','first','forces','made','including','human','become','brought','space'],
['HS20.txt','Correct','became','political','social','including','continued','number','house','schools','poor'],
['HS10.txt','Correct','political','military','movement','students','came','found','result','action','student'],
['HS7.txt','Correct','would','world','many','called','early','nation','century','great','lead'],
['CS1.txt','Correct','data','address','page','also','system','process','access','table','change'],
['CS7.txt','Correct','computer','performance','software','interface','many','cost','designers','level','systems'],
['CS17.txt','Wrong','hardware','architecture','found','include','language','close','limited','longer','creator'],
['CS19.txt','Correct','memory','example','loop','many','access','often','execute','optimization','statement'],
]

fileList3 = [
['HS4.txt','Correct','military','also','government','forces','would','declared','position','peaceful','argued'],
['CS18.txt','Correct','program','used','using','code','library','version','even','large','loads'],
['HS5.txt','Correct','became','first','union','percent','minister','nation','prime','held','three'],
['HS1.txt','Correct','nations','treaty','communist','well','cold','continued','trade','number','member'],
['HS13.txt','Correct','first','national','members','took','part','several','court','federal','organizations'],
['CS13.txt','Wrong','large','could','found','quickly','cities','place','industry','half','main'],
['HS16.txt','Correct','many','began','also','world','years','early','work','life','number'],
['HS12.txt','Correct','people','also','president','economic','army','economy','killed','region','front'],
['HS11.txt','Correct','political','first','rights','movement','civil','major','organization','left','created'],
['HS14.txt','Correct','began','death','forced','science','close','accepted','study','approach','research'],
['CS3.txt','Correct','data','used','different','since','process','cache','occur','running','problems'],
['HS2.txt','Correct','also','nations','treaty','would','support','took','conference','signed','result'],
['CS5.txt','Wrong','hardware','program','high','programs','language','level','resulting','forms','basis'],
['HS22.txt','Correct','women','became','first','president','movement','party','world','major','although'],
['CS6.txt','Correct','number','computers','processors','embedded','compare','every','desktop','count','based']
]

if (localStorage.getItem("round") == null) {
  localStorage.setItem("round", '1')
  if (localStorage.getItem("rndCond") == "0") {
    fileList = fileList1
  }
  else if (localStorage.getItem("rndCond") == "1") {
    fileList = fileList1
  }
  else if (localStorage.getItem("rndCond") == "2") {
    fileList = fileList2
  }
  else if (localStorage.getItem("rndCond") == "3") {
    fileList = fileList2
  }
  else if (localStorage.getItem("rndCond") == "4") {
    fileList = fileList3
  }
  else if (localStorage.getItem("rndCond") == "5") {
    fileList = fileList3
  }
  else {
    fileList = fileList1
  }

  userHighlights = []
  userAgree = []
  userRelevant = []
}
else if (localStorage.getItem("round") == "1") {
  if (localStorage.getItem("rndCond") == "0") {
    fileList = fileList1
  }
  else if (localStorage.getItem("rndCond") == "1") {
    fileList = fileList1
  }
  else if (localStorage.getItem("rndCond") == "2") {
    fileList = fileList2
  }
  else if (localStorage.getItem("rndCond") == "3") {
    fileList = fileList2
  }
  else if (localStorage.getItem("rndCond") == "4") {
    fileList = fileList3
  }
  else if (localStorage.getItem("rndCond") == "5") {
    fileList = fileList3
  }
  else {
    fileList = fileList1
  }
  userHighlights = []
  userAgree = []
  userRelevant = []
}
else if (localStorage.getItem("round") == "2") {
  if (localStorage.getItem("rndCond") == "0") {
    fileList = fileList2
  }
  else if (localStorage.getItem("rndCond") == "1") {
    fileList = fileList3
  }
  else if (localStorage.getItem("rndCond") == "2") {
    fileList = fileList1
  }
  else if (localStorage.getItem("rndCond") == "3") {
    fileList = fileList3
  }
  else if (localStorage.getItem("rndCond") == "4") {
    fileList = fileList1
  }
  else if (localStorage.getItem("rndCond") == "5") {
    fileList = fileList2
  }
  else {
    fileList = fileList2
  }
  userHighlights = JSON.parse(localStorage.getItem("userHighlights"))
  userAgree = JSON.parse(localStorage.getItem("userAgree"))
  userRelevant = JSON.parse(localStorage.getItem("userRelevant"))
}
else if (localStorage.getItem("round") == "3") {
  if (localStorage.getItem("rndCond") == "0") {
    fileList = fileList3
  }
  else if (localStorage.getItem("rndCond") == "1") {
    fileList = fileList2
  }
  else if (localStorage.getItem("rndCond") == "2") {
    fileList = fileList3
  }
  else if (localStorage.getItem("rndCond") == "3") {
    fileList = fileList1
  }
  else if (localStorage.getItem("rndCond") == "4") {
    fileList = fileList2
  }
  else if (localStorage.getItem("rndCond") == "5") {
    fileList = fileList1
  }
  else {
    fileList = fileList3
  }
  userHighlights = JSON.parse(localStorage.getItem("userHighlights"))
  userAgree = JSON.parse(localStorage.getItem("userAgree"))
  userRelevant = JSON.parse(localStorage.getItem("userRelevant"))
}


stubWords =
[
['processor', 'processors'],
['compile', 'compiled', 'compiler', 'compilers'],
['archeology', 'archeological'],
['field', 'fields'],
['program', 'programs'],
['string', 'strings'],
['catholic', 'catholicism'],
['student', 'students'],
['baptist', 'baptists'],
['denomination', 'denominational', 'denominations'],
['table', 'tables'],
['implementation', 'implementations'],
['loop', 'loops'],
['japan', 'japanese'],
['base', 'bases'],
['segregate', 'segregated', 'segregation'],
['korea', 'korean'],
['indonesia', 'indonesian'],
['organization', 'organizations'],
['democracy', 'democratic'],
['america', 'american'],
['address', 'addressed'],
['china', 'chinese'],
['woman', 'women'],
['astronaut', 'astronauts']
]

withStubs = []
stubLoc = []

for (var i = 0; i < stubWords.length; i++) {
  for (var j = 0; j < stubWords[i].length; j++) {
    withStubs.push(stubWords[i][j])
    stubLoc.push(i)
  }
}


// stubWords == array of arrays that contain equivalent words
// withStubs == array of words that have equivalent words
// stubLoc == parallel array with withStubs that has the index of array in stubWords that the word in withStubs fits into


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.getElementById("clickable").innerText = allText
                // Make this change the text inside the box

            }
        }
    }
    rawFile.send(null);
}



$(document).ready(function() {
  $(document).ready(function() {
    // Process words into spans for clicking/tracking highlights
    function splitWords() {
      var words = $( "#clickable" ).first().text().split( /([^a-zA-Z\']+)/ );
      // console.log(words)
      var text = words.join( "</span><span class=\"word\">" );
      // console.log(text)
      $( "p" ).first().html( "<span class=\"word\">" + text + "</span>" );
    }

    readTextFile("./Data/Segments/All/" + fileList[textPos][0])

    if (fileList[textPos][1] == "Correct") {
      if (fileList[textPos][0].charAt(0) == "H") {
        document.getElementById("mPred").innerText = "History"
      }
      else {
        document.getElementById("mPred").innerText = "Computer Science"
      }
    }
    if (fileList[textPos][1] == "Wrong") {
      if (fileList[textPos][0].charAt(0) == "C") {
        document.getElementById("mPred").innerText = "History"
      }
      else {
        document.getElementById("mPred").innerText = "Computer Science"
      }
    }

    document.getElementById("word1").innerText = fileList[textPos][2]
    document.getElementById("word2").innerText = fileList[textPos][3]
    document.getElementById("word3").innerText = fileList[textPos][4]
    document.getElementById("word4").innerText = fileList[textPos][5]
    document.getElementById("word5").innerText = fileList[textPos][6]

    document.getElementById("yword1").innerText = fileList[textPos][2]
    document.getElementById("yword2").innerText = fileList[textPos][3]
    document.getElementById("yword3").innerText = fileList[textPos][4]
    document.getElementById("yword4").innerText = fileList[textPos][5]
    document.getElementById("yword5").innerText = fileList[textPos][6]

    function highlight() {
      // Highlight initial words
      words = document.querySelectorAll(".word")
      highlightedWords = fileList[textPos].slice(2, 7)
      for (var i = 0; i < words.length; i++) {
        // console.log("Word: " + words[i].innerText.toLowerCase())
        if (highlightedWords.includes(words[i].innerText.toLowerCase())) {
          words[i].style.backgroundColor = "#FF1100";
        }
      }




      // Handle clicking on words
      $( "span" ).on( "click", function() {
        // Check that clicked on span is an actual word and not whitespace, punctuation, or numerical
        if(this.innerText.match(/[^a-zA-Z\']/) == null && this.innerText.length >1) {
          // If already highlighted, unhighlight and remove from word list
          // console.log(this.innerText)
          // console.log("Word: " + this.innerText)
          // Check if a stub exists
          isStub = false
          if(withStubs.includes(this.innerText.toLowerCase())) {
            stubPos = stubLoc[withStubs.indexOf(this.innerText.toLowerCase())]
            if (stubWords[stubPos].includes(this.innerText.toLowerCase())) {
              for (var i = 0; i < stubWords[stubPos].length; i++) {
                if (highlightedWords.includes(stubWords[stubPos][i])) {
                  isStub = true
                }
              }
            }
          }
          if(highlightedWords.includes(this.innerText.toLowerCase()) || isStub) {
            // Un-highlight word
            this.style.backgroundColor = "transparent"
            // $( this ).css( "background-color", "transparent" );

            // Un-highlight other copies of word
            words = document.querySelectorAll(".word")
            for (var i = 0; i < words.length; i++) {
              // Check identical words
              if (words[i].innerText.toLowerCase() == this.innerText.toLowerCase()) {
                words[i].style.backgroundColor = "transparent";
              }
              // Check stub words
              if (withStubs.includes(words[i].innerText.toLowerCase())) {
                stubPos = stubLoc[withStubs.indexOf(words[i].innerText.toLowerCase())]
                if (stubWords[stubPos].includes(words[i].innerText.toLowerCase()) && stubWords[stubPos].includes(this.innerText.toLowerCase())) {
                  words[i].style.backgroundColor = "transparent";
                }
              }
            }

            // Remove from word list
            if (withStubs.includes(this.innerText.toLowerCase())) {
              stubPos = stubLoc[withStubs.indexOf(this.innerText.toLowerCase())]
              console.log(stubWords[stubPos])
              for (var i = 0; i < stubWords[stubPos].length; i++) {
                if (highlightedWords.indexOf(stubWords[stubPos][i])) {
                  position = highlightedWords.indexOf(stubWords[stubPos][i])
                  if (~position) { highlightedWords.splice(position, 1) }
                }
              }
            }
            else {
              if (highlightedWords.includes(this.innerText.toLowerCase())) {
                position = highlightedWords.indexOf(this.innerText.toLowerCase())
                if (~position) { highlightedWords.splice(position, 1) }
              }
            }

            console.log(highlightedWords)
            // if (~position) { highlightedWords.splice(position, 1) }
            // console.log(highlightedWords)
          }
          // Else, highlight and add to word list
          else {
            // Highlight word
            this.style.backgroundColor = "#FF1100"
            // $( this ).css( "background-color", "red" );

            // Highlight other copies of word
            words = document.querySelectorAll(".word")
            for (var i = 0; i < words.length; i++) {
              if (words[i].innerText.toLowerCase() == this.innerText.toLowerCase()) {
                words[i].style.backgroundColor = "#FF1100";
              }
              // Check stub words
              if (withStubs.includes(words[i].innerText.toLowerCase())) {
                stubPos = stubLoc[withStubs.indexOf(words[i].innerText.toLowerCase())]
                if (stubWords[stubPos].includes(this.innerText.toLowerCase())) {
                  words[i].style.backgroundColor = "#FF1100";
                }
              }
            }

            // Add to word list
            highlightedWords.push(this.innerText.toLowerCase())
            console.log(highlightedWords)
          }

          // Update top words
          document.getElementById("yourTop").innerHTML = ""
          for (var i = 0; i < highlightedWords.length; i++) {
            document.getElementById("yourTop").innerHTML += ('<li>' + highlightedWords[i] + '</li>')
          }

        }
      });
    }



    nextB = document.getElementById("nextButton")
    splitWords()
    highlight()

    nextB.onclick = function(){
      // Check that options are selected
      var ADSelected = false
      var RSelected = false
      var ADOpt = document.getElementsByName('ADOptions')
      var ROpt = document.getElementsByName('ROptions')
      for (var i = 0; i < ADOpt.length; i++) {
        if (ADOpt[i].type == 'radio' && ADOpt[i].checked) {
          var ADSelected = true
        }
      }
      for (var i = 0; i < ROpt.length; i++) {
        if (ROpt[i].type == 'radio' && ROpt[i].checked) {
          var RSelected = true
        }
      }

      if (ADSelected == false || RSelected == false) {
        alert("You must answer all questions before continuing")
      }
      else if (highlightedWords.length < 2 || highlightedWords.length > 8) {
        alert("You must highlight between 2 and 8 words")
      }
      else {
        // Update count
        currentPosition += 1
        document.getElementById("sampleCount").innerText = "Round " + localStorage.getItem("round") + "/3: Sample " + currentPosition + "/15"
        // Record user responses
        userHighlights.push(highlightedWords)
        userAgree.push(document.querySelector('input[name="ADOptions"]:checked').value)
        userRelevant.push(document.querySelector('input[name="ROptions"]:checked').value)

        console.log(userHighlights)
        console.log(userAgree)
        console.log(userRelevant)


        if (textPos >= fileList.length - 1) {
          // Move to middle page
          localStorage.setItem("userHighlights", JSON.stringify(userHighlights))
          localStorage.setItem("userAgree", JSON.stringify(userAgree))
          localStorage.setItem("userRelevant", JSON.stringify(userRelevant))
          window.location.href = "questionnaire.html"
          splitWords()
          highlight()

        }
        else {
          textPos++
          readTextFile("./Data/Segments/All/" + fileList[textPos][0])
          splitWords()
          highlight()

          if (fileList[textPos][1] == "Correct") {
            if (fileList[textPos][0].charAt(0) == "H") {
              document.getElementById("mPred").innerText = "History"
            }
            else {
              document.getElementById("mPred").innerText = "Computer Science"
            }
          }
          if (fileList[textPos][1] == "Wrong") {
            if (fileList[textPos][0].charAt(0) == "C") {
              document.getElementById("mPred").innerText = "History"
            }
            else {
              document.getElementById("mPred").innerText = "Computer Science"
            }
          }

          document.getElementById("word1").innerText = fileList[textPos][2]
          document.getElementById("word2").innerText = fileList[textPos][3]
          document.getElementById("word3").innerText = fileList[textPos][4]
          document.getElementById("word4").innerText = fileList[textPos][5]
          document.getElementById("word5").innerText = fileList[textPos][6]

          document.getElementById("yourTop").innerHTML = ""
          for (var i = 2; i < 7; i++) {
            document.getElementById("yourTop").innerHTML += ('<li>' + fileList[textPos][i] + '</li>')
          }

          var ADradio = document.querySelector('input[type=radio][name=ADOptions]:checked');
          ADradio.checked = false;
          var Rradio = document.querySelector('input[type=radio][name=ROptions]:checked');
          Rradio.checked = false;

        }
      }
    }




});
});
