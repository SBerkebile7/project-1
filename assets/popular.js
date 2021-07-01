function popularArticles() {
    // var period = document.querySelector() NOTE - NEED VARIABLE FROM SPENCER ON TRIP DURATION TO CREATE IF THEN FOR PERIOD VARIABLE
    // var travel = document.querySelector('#mode').value;
    // Create a variable to hold the value of rating
    // var topic = document.querySelector('#topic').value;


    fetch(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
        'begin_date=20210101' +
        '&end_date=20210630' +
        '&sort=newest' +
        '&api-key=MwmqPsibE3r4OXyWACc0BbT3BiaQj3Jk'
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        var urlReturned = res.response.docs[0].web_url;
        var articleName = res.response.docs[0].headline.main
        console.log(res.response.docs[0].web_url);
        console.log(res.response.docs[0].headline.main);
        $('#popular-test').append('<div id="url-return"></div>');
        $("#url-return").append(`<a href="${urlReturned}" target="_blank">${articleName}</a>`);


        // console.log(response.docs[0].web_url);
        // var responseContainerEl = document.querySelector('#response-container');
        // responseContainerEl.innerHTML = '';
        // var gifImg = document.createElement('img');
        // gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
        // responseContainerEl.appendChild(gifImg);
      });
  }