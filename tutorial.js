// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
highlightedWords = ["irrelevantone", "irrelevanttwo", "irrelevantthree"]


tutorialText = ["Press the Next button to proceed to the tutorial. Remember that you can highlight and un-highlight words by clicking on them.", "Highlight the following words: RelevantOne, RelevantTwo, RelevantThree. Un-highlight the following words: IrrelevantOne, IrrelevantTwo, IrrelevantThree."]
textPos = 0;

$(document).ready(function() {
  // Process words into spans for clicking/tracking highlights
  function splitWords() {
    var words = $( "#clickable" ).first().text().split( /([^a-zA-Z\']+)/ );
    // console.log(words)
    var text = words.join( "</span><span class=\"word\">" );
    // console.log(text)
    $( "p" ).first().html( "<span class=\"word\">" + text + "</span>" );
  }

  document.getElementById("clickable").innerText = tutorialText[textPos]
  document.getElementById("prevButton").disabled = true

  function highlight() {
    // Highlight initial words
    words = document.querySelectorAll(".word")
    for (var i = 0; i < words.length; i++) {
      // console.log("Word: " + words[i].innerText.toLowerCase())
      if (highlightedWords.includes(words[i].innerText.toLowerCase())) {
        words[i].style.backgroundColor = "#FF1100";
      }
    }

    // Handle clicking on words
    $( "span" ).on( "click", function() {
      // Check that clicked on span is an actual word and not whitespace, punctuation, or numerical
      if(this.innerText.match(/[^a-zA-Z\']/) == null) {
        // If already highlighted, unhighlight and remove from word list
        // console.log(this.innerText)
        // console.log("Word: " + this.innerText)
        if(highlightedWords.includes(this.innerText.toLowerCase())) {
          // Un-highlight word
          this.style.backgroundColor = "transparent"
          // $( this ).css( "background-color", "transparent" );

          // Un-highlight other copies of word
          words = document.querySelectorAll(".word")
          for (var i = 0; i < words.length; i++) {
            if (words[i].innerText.toLowerCase() == this.innerText.toLowerCase()) {
              words[i].style.backgroundColor = "transparent";
            }
          }

          // Remove from word list
          position = highlightedWords.indexOf(this.innerText.toLowerCase())
          if (~position) { highlightedWords.splice(position, 1) }
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
          }

          // Add to word list
          highlightedWords.push(this.innerText.toLowerCase())
          // console.log(highlightedWords)
        }
      }
    });
  }

  prevB = document.getElementById("prevButton")
  nextB = document.getElementById("nextButton")
  prevB.disabled = true

  nextB.onclick = function(){
    prevB.disabled = false
    // console.log(prevB.disabled)
    if (textPos >= tutorialText.length - 1) {
      // Check highlights
      if (highlightedWords.sort().join() == ["relevantone", "relevanttwo", "relevantthree"].sort().join()) {
        // alert(highlightedWords.sort())
        window.location.href = "sure.html"
      }
      else {
        alert("Please make the highlighted words be \"RelevantOne\", \"RelevantTwo\", and \"RelevantThree\" and no other words.")
      }

    }
    else {
      textPos++
      document.getElementById("clickable").innerText = tutorialText[textPos]
      if (textPos == tutorialText.length - 1) {
        splitWords()
        highlight()
      }
    }
  }

  prevB.onclick = function() {
    if (prevB.disabled == false) {
      textPos--
      if (textPos == 0) {
        prevB.disabled = true
      }
      document.getElementById("clickable").innerText = tutorialText[textPos]
    }
    else {
      window.location.href = "instructions.html"
    }
  }


});
