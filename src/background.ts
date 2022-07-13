'use strict';

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  switch (request.type) {
    case 'FETCH':
      fetch(request.input, request.init)
        .then((response) => {
          return response.json();
        })
        .then(sendResponse);
    default:
  }
  return true;
});
