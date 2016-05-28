# PageLoader

Simple and clean solution for page loader using javascript and css animations. 

## How it works

The html contains the parent container `<div class="o-page-loader">` which is set to `display: fixed` so as to occupy the entire browser screen and also has `opacity: 1` - this opacity is animated using css via `transition: opacity .5s`.

The loader `<div class="o-page-loader--spinner"></div>` will continue to animate up until `display: none` is applied on the parent container.

```html
<div class="o-page-loader">
    <div class="o-page-loader--content">
        <div class="o-page-loader--spinner"></div>
        <div class="o-page-loader--message">
            <span>Loading...</span>
        </div>
    </div>
</div>
```

This component is affected when one of two window events occur: **(1)** load or **(2)** beforeunload. 

### 1. Window Load Event

When an html page is loaded, the loader component is the first html loaded inside the `<body></body>` tags. As such, the loader will continue to animate until it is hidden in the DOM. When the window load event fires, the loader component is hidden.

### 2. Window Beforeunload Event

When the user requests a new page, the window `beforeunload` event fires and the loader component has `display: block` applied. Note that we do not care about the opacity transition since most page redirects happen too quickly for a css transition of even 1 second to fully complete.

Overall, this gives the impression to the user that the loading transition was seamless. See the gifs below for more details.

### Additional Information

The javascript responsible for handling these two window events is placed at the bottom of the page. Placing javascript at the bottom of the page ensures that DOM tree is completely loaded and ready. Note that images and stylesheets may still be loading even after the DOM has loaded. 

Since we are interested for both the DOM and assets to be completely loaded before hiding the loader, the PageLoader javascript uses `window.addEventListener('load', function() {});`. This means that you can place the PageLoader javascript anywhere on the page and the loader will still only dissapear when both the DOM and assets are completly loaded.

In the html examples above, the javascript is placed at the bottom of the page due to personal preference. Depending on your situation, you may only care that the DOM tree is ready in order to hide the loader, at which point you can rewrite the javascript code to contain a listener for `document.addEventListener('DOMContentLoaded', function() {});`.

If you'd like to learn more about window, body, and document loading events then read these two comments on StackOverflow:
* http://stackoverflow.com/a/9899701/1727232.
* http://stackoverflow.com/a/7371558/1727232
 
## Examples

https://cdn.rawgit.com/puiu91/PageLoader/master/page.html

## Notes

Sometimes pages load extremely fast, so inside `deactivateLoader()` we have a `setTimeout()` of one second to ensure that if the window load event fires extremely quickly, then the loader animation gets a chance to play. This number can be changed as needed, but one second feels the best for me.

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
