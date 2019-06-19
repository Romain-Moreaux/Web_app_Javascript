"use strict"
class VideoPlayer{

  constructor(element, options = {}){
    this.container = document.getElementById(element);
    this.options = Object.assign({}, {
      videoType: '',
      src: '',
      poster: '',
      loop: false,
      autoplay: false,
      fullscreenOnPlay: false,
      allowFullscreen: false,
      aspectRatio: 0,
      hideOnMobile: false,
      mobileBreakpoint: '',
      controls: []
    }, options);
    
    if(this.options.mobileBreakpoint === "smartphone"){
      this.portraitWidth = 600,
      this.landscapeWidth = 850;
    }else if (this.options.mobileBreakpoint === "tablet"){
      this.portraitWidth = 1050,
      this.landscapeWidth = 1400;
    }
    
    this.securityCheck();

    this.root =  this.createElementWithClass('div', 'video__player');
    if(this.options.videoType === "html")
      this.root.style.paddingTop = this.options.aspectRatio + "%";
    else if (this.options.videoType === "iframe")
      this.root.style.paddingTop = "56.25%"; // Iframe looks better in 16/9 as it will be dependent of platform source.

    this.playerBuilder();
    this.root.appendChild(this.videoTag);
    this.container.appendChild(this.root);

//     if (this.options.videoType === "iframe"){
//       this.videoTag.width = this.root.offsetWidth;
//       this.videoTag.height = this.root.offsetHeight;
//     }
    console.log(this);
    }

    playerBuilder(){
      // construction du lecteur html
    	if (this.options.videoType === "html"){
        this.videoTag =  this.createElementWithClass('video', 'video__window');
        this.videoTag.requestFullscreen = this.videoTag.requestFullscreen || this.videoTag.mozRequestFullscreen
          || this.videoTag.msRequestFullscreen || this.videoTag.webkitRequestFullscreen;
        this.sourceTag = this.createElementWithClass('source');

        this.options.poster !== '' ? this.videoTag.setAttribute('poster', this.options.poster) : false;
        this.sourceTag.setAttribute('type', 'video/mp4');
        this.sourceTag.setAttribute('src', this.options.src);

        this.videoTag.appendChild(this.sourceTag);

        this.videoTag.loop = this.options.loop ? true : false;
        this.videoTag.autoplay = this.options.autoplay ? true : false;

        this.options.controls.forEach(function(option){
          if(option === "native"){
            this.videoTag.controls = true;
            this.videoTag.addEventListener('play', this.controlInput.bind(this, option));
          }
          else if(option === "volume"){
            let btn = this.createElementWithClass('input', `video__button-${option}`);
            btn.setAttribute('type', 'range');
            btn.setAttribute('min', '0');
            btn.setAttribute('max', '100');
            btn.setAttribute('value', '50');
            this.root.appendChild(btn);
            btn.addEventListener('change', this.controlInput.bind(this, option));
          }
          else{
            let btn = this.createElementWithClass('button', `video__button-${option}`);
            this.root.appendChild(btn);
            btn.addEventListener('click', this.controlInput.bind(this, option));
          }
        }, this);
      }

      // construction de l'iframe html
    	else if (this.options.videoType === "iframe"){
      	this.videoTag =  this.createElementWithClass('iframe', 'video__window');
        this.iframeAllow = '';
        this.videoId = this.options.src.substr(this.options.src.lastIndexOf('/') + 1);
        this.options.src = this.options.loop ? this.options.src + "?loop=1&playlist=" + this.videoId : this.options.src + "?loop=0";
        this.options.src = this.options.autoplay ? this.options.src + "&autoplay=1" : this.options.src + "&autoplay=0";
        this.videoTag.setAttribute('src', this.options.src);
        this.iframeAllow += this.options.allowFullscreen ? this.iframeAllow += "fullscreen;" : '';
        this.iframeAllow += this.options.autoplay ? this.iframeAllow += "autoplay;" : '';
        this.iframeAllow !== '' ? this.videoTag.setAttribute('allow', this.iframeAllow) : null;
      }
      
      window.addEventListener('resize', this.securityCheck.bind(this));
    
    }

   // this method create HTML element
   // @params {string} {string}
  //  @return {HTML element} 
  createElementWithClass(htmlTag, className){
    var element = document.createElement(htmlTag);
    if(!! className)
       element.setAttribute('class', className);

    return element;
  }

  // this method handle custom player controls 
  // @param {object}    
  controlInput(option){
    if(option === "fullscreen"){
      this.videoTag.requestFullscreen();
    }
    
    if(option === "volume"){
      this.videoTag.volume = event.target.value / 100;
    }
   
    if(option === "play"){
      if(!! this.videoTag.paused){
        this.videoTag.play();
        if(!! this.options.fullscreenOnPlay){
          this.videoTag.requestFullscreen();
        }
      }else{
        this.videoTag.pause();
      }
    }
    if(option === "native"){
      if(!!this.options.fullscreenOnPlay){
        this.videoTag.addEventListener('play', function(){
          this.videoTag.requestFullscreen();
        }.bind(this));
      }
    }
  }

  // this method check for Mobile state
  // @return {boolean}   
  isMobileBreakpoint(portraitWidth = 600, landscapeWidth = 850 ){
    return ( /Mobi/i.test(navigator.userAgent) &&
			( (window.innerWidth < portraitWidth && window.matchMedia("(orientation: portrait)").matches) ||
       (window.innerWidth < landscapeWidth && window.matchMedia("(orientation: landscape)").matches) ));
  }

  // this method handle the errors in the console
  securityCheck(){
  	if (this.options.src === "")
      throw new Error('The source option is required');
    if (this.container === undefined)
      throw new Error('The first parameter of the class instancation is required');
    if (this.isMobileBreakpoint(this.portraitWidth, this.landscapeWidth) && !!this.options.hideOnMobile){
      this.container.style.display = "none";
			throw new Error('The configuration do not allow that instance on mobile');  
    }else{
      this.container.style.display = "block";
    }
  }

}
