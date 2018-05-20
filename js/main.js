(function () {
  let btnSubmit = $('.search-submit')
  let userInput = document.querySelector('.search-input')
  btnSubmit.on('click', function () {
    let result = document.querySelector('.result')
    let userInputValue = userInput.value
    if (!userInputValue) {
      alert('Please Enter Keywords!')
      userInput.focus()
      return
    }
    const queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ userInputValue +"&format=json&limit=10"
    $.ajax({
      url: queryURL,
      dataType: 'jsonp',
      success: function (data) {
        response = data
      }
    }).done(function (response) {
      let len = response[1].length
      let obj = {}
      let html = ''
      for (let i = 0; i < len; i++) {
        html += `
        <div class="result-container">
          <a href="${response[3][i]}" target="blank">
            <div class="result-title">${response[1][i]}</div>
            <div class="result-body">
              ${response[2][i]}
            </div>
          </a>
        </div>
        `
      }
      result.innerHTML += html
    })
  })
  userInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      btnSubmit.click()
    }
  })
})()