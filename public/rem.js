(function(doc, win) {
    var u = navigator.userAgent
    var isIosApp = u.indexOf("app/iOS") != -1
    var isAndroidApp = u.indexOf("app/Android") != -1
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        clientWidth = 0,
        clientHeight = 0,
        recalc = function() {
            var width = docEl.clientWidth > 750 ? 750 : docEl.clientWidth;
            if(clientWidth == width) return;
            clientWidth = width
            clientHeight = docEl.clientHeight > 750 ? 750 : docEl.clientHeight
  
            if (!clientWidth) return
            if (!clientHeight) return
            if (clientWidth < clientHeight) {
              docEl.style.fontSize = 50 * (clientWidth / 375) + 'px'
            } else {
              docEl.style.fontSize = 50 * (clientHeight / 375) + 'px'
            }
        }
  
    if (!doc.addEventListener) return
  
    if(!isIosApp && !isAndroidApp) {
      win.addEventListener(resizeEvt, recalc, false)
    }
  
    doc.addEventListener('DOMContentLoaded', recalc, false)
  })(document, window)