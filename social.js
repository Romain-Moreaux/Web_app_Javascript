var SocialPopup = function() {

  var popupCenter = function (url, title, width, height){
    var popupWidth =  width || 640;
    var popupHeight = height || 320;
    var windowLeft = window.screenLeft || window.screenX;
    var windowTop = window.screenTop || window.screenY;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2;
    var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
    var popup = window.open(url, title, 'scrollbars=yes, width='+ popupWidth +', height='+ popupHeight +', top=' + popupTop +', left=' + popupLeft +'');
    popup.focus();
    return true;
  }

  var elTwitter = document.querySelector('.share-twitter');
  if (elTwitter) {
  elTwitter.addEventListener('click', function(e){
    e.preventDefault();
    var url = this.getAttribute('data-url');
    var shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) + "&via=informatique_75" +
    "&url=" + encodeURIComponent(url);
    popupCenter(shareUrl, "Partager sur Twitter");
  });
}

  var elFacebook = document.querySelector('.share-facebook');
  if (elFacebook) {
  elFacebook.addEventListener('click', function(e){
    e.preventDefault();
    var url = this.getAttribute('data-url');
    var shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    popupCenter(shareUrl, "Partager sur Facebook");
  });
}
}();
