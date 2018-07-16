'use strict';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDEJRKRDL4KuesnMkxDzlgAgx2gfiznIGI',
    q: `${searchTerm} in:name`,
    pages: 1,
    per_page: 2
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
//    .fail(showErr);
}

function renderResult(result) {
  return `
    <div class='searchBox'>
      <img src=${result.snippet.thumbnails.default.url} alt=${result.snippet.title}>
      <p>${result.snippet.title}</p>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  console.log(results);
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

function showErr(err) {
  const outputElem = $('.js-output');
  
  const errMsg = (
    `<p>We couldn't find anything on YouTube that matched your entry.`
  );
    
  outputElem
    .prop('hidden', false)
    .html(errMsg);
}

$(watchSubmit);
