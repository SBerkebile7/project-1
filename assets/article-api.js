var today = moment().format("YYYYMMDD");

var yesterday = moment().add(-1, 'days').format("YYYYMMDD");

var durationArticleRatio = 

console.log(today);
console.log(yesterday);

function popularArticles() {
    // var period = document.querySelector() NOTE - NEED VARIABLE FROM SPENCER ON TRIP DURATION TO CREATE IF THEN FOR PERIOD VARIABLE
    // var travel = document.querySelector('#mode').value;
    // Create a variable to hold the value of rating
    // var topic = document.querySelector('#topic').value;


    fetch(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
        'begin_date=' + yesterday +
        '&end_date=' + today +
        '&sort=newest' +
        '&api-key=MwmqPsibE3r4OXyWACc0BbT3BiaQj3Jk'
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        // console.log(res.response);

        displayArticles(res.response);


      });
  }

  function displayArticles(data) {
    var urlReturned = data.docs[0].web_url;
    var articleName = data.docs[0].headline.main
    // console.log(res.response.docs[0].web_url);
    // console.log(res.response.docs[0].headline.main);
    $('#popular-test').append('<div id="url-return"></div>');
    $("#url-return").append(`<a href="${urlReturned}" target="_blank">${articleName}</a>`);

    
  }