
//Set up Image Carousel
function setImg() {
  var container = $('#img-container'),
    nav = $('#product-img').find('nav'),
    imgList = Object,
    current = 0,
    swipeEnabled = false;
  
  function buildGallery() {
    container.html('<div id="img-list"><ul /></div>');
    imgList = $('#img-list');
    nav.find('li:first').addClass('active');
    
    var arr = '';
    
    //For Each Navigation Link
    nav.find('a').each(function() {
      var $this = $(this),
        href = $this.attr('href');
        
      //Prepare list item with image source in data attribute
      arr += '<li data-imgsrc="'+href+'"></li>';
    });
    
    //Append to #img-list
    imgList.find('ul').append(arr);
    
    //Nav Thumbnail Click
    nav.on('click','a',function(e) {
      var pos = $(this).parent().index();
      e.preventDefault();
      loadImg(pos);
      if(swipeEnabled) {
        mySwipe.slide(pos,300);
      }
      updateNav(pos);
    });
    
    Modernizr.load({
      test: Modernizr.touch && Modernizr.csstransitions,
      yep : 'scripts/swipe.js',
      complete : function() {
        if(w.Swipe) {
          swipeEnabled = true;
          buildSwipe();
        }
      }
    });
    loadImg(0); //Load initial image
  }
  
  //Build Swipe Carousel
  function buildSwipe() {
    //Initialize Swipe.js
    var imgList = document.getElementById('img-list');
    w.mySwipe = new Swipe(imgList, {
      callback: function(event, index, elem) {
        updateNav(index);
        loadImg(index+1);
      } 
    });
    imgList.addEventListener('touchstart', function(event) {
      loadImg(w.mySwipe.getPos()+1);
    }, false);
  }
  
  //Dynamically Load Images
  function loadImg(index) {
    var lis = imgList.find('li'),
      li = lis.eq(index),
      imgSrc = li.attr('data-imgsrc');
    if(!swipeEnabled) {
      lis.hide();
      li.show();
    }
    
    if(li.html() === "") { //If li is empty
      var img = new Image();
      imgList.addClass('loading');
      $(img).load(function () { //Load image
        $(this).hide();
        li.removeClass('loading');
        $(this).fadeIn();
      }).error(function () {
        // notify the user that the image could not be loaded
      }).attr('src', imgSrc);
      $('<img />').attr('src',imgSrc).appendTo(li);
    }
  }
  
  //Update Image Thumbnail Navigation
  function updateNav(pos) {
    nav.find('li').removeClass('active');
    nav.find('li:eq('+pos+')').addClass('active');
  }
  
  buildGallery();
}