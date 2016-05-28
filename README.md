# PageLoader

Simple and clean solution for page loader using javascript and css animations. 

## How it works

The html container below, particularily `<div class="o-page-loader">` is set to display of fixed occupying the entire user screen and has an opacity of one. The component will show up until it has its display set to none. We animate the opacity in the css.

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

This component is affected when one of two window events occur: (i) load or (ii) beforeunload. The javascript responsible for handling these two window events is placed at the bottom of the page, right before the `</body>` tag which ensures that the entire page and its assets have completely loaded prior to loader being hidden. You can alternatively use some javascript of `document.ready. If you'd like to learn more about this, read this thorough comment on StackOverflow at http://stackoverflow.com/a/9899701/1727232.

### Window Load Event

When an html page is loaded, the loader component will be the first html loaded inside the `<body></body>` tags, as such the loader will continue to animate until hidden in the DOM. When the window load event fires, the loader component can be hidden.

### Window Beforeunload Event

When the user requests a new page, the window `beforeunload` event fires and the loader component has its display set to block. Note that we do not care about the opacity transition since most page redirects happen too quickly for even an css transition of 1 second to fully complete.

Overall, this gives the impression to the user that the loading transition was seamless. See the gifs below for more details.
 
## Example

https://cdn.rawgit.com/puiu91/PageLoader/master/page.html

## Notes

Sometimes pages load extremely fast, so inside `deactivateLoader()` we have a `setTimeout()` of one second to ensure that if the window load event fires extremely quickly, then the loader has time to run a little bit on window load event. This number can be changed if needed.

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
