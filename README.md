# PageLoader

Simple and clean solution for page loader using javascript and css animations. 

It works by displaying a loader when `beforeunload` window event fires and then also displays a loader when the window event `load` fires, that is when the requested page loads. This gives the impression to the user that the loading transition was seamless.
 
## Example

https://cdn.rawgit.com/puiu91/PageLoader/master/page.html

## Notes

Sometimes pages load extremely fast, so inside `deactivateLoader()` we have a `setTimeout()` of one second to ensure that the loader has time to display on window load event. This number can be changed if needed.

```js

  function deactivateLoader() {
    /**
     * ensures that the loading animation plays for at least a second to give the 
     * appearance of seamlessly loading on pages that execute and load extremely 
     * quickly (i.e., intranet pages)
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

```
## Credits

Thanks to https://github.com/tobiasahlin/SpinKit for creating the CSS animations.
