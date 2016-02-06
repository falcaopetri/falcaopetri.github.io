/*
 * Adds support to ~~strikethrough~~ when processing HTML.
 * Temporary solution while kramdown doesn't support it by default.
 *
 * Source: http://stackoverflow.com/a/35200642
 */
(function() {
  function strikethrough(){
    document.body.innerHTML = document.body.innerHTML.replace(
      /\~\~(.+?)\~\~/gim,
      '<del>$1</del>'
    );
  }
  strikethrough();
})();
