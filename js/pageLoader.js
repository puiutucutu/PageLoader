(function() {

  var loader = document.getElementsByClassName('o-page-loader')[0];

  window.addEventListener('beforeunload', function(e) {
    activateLoader();
  });

  window.addEventListener('load', function(e) {
    deactivateLoader();
  });

  function activateLoader() {
    loader.style.display = 'block';
    loader.style.opacity = 1;
  }

  function deactivateLoader() {
    /**
     * ensures that the loading animation plays for at least a second to give the appearance of seamlessly loading on
     * pages that execute and load extremely quickly (i.e., intranet pages)
     */
    setTimeout(function() {
      deactivate();
    }, 1000);

    function deactivate() {
      loader.style.opacity = 0;
      loader.addEventListener('transitionend', function() {
        loader.style.display = 'none';
      }, false);
    }
  }

})();