var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.load, false);
        document.addEventListener('online', this.online, false);
        document.addEventListener('touchmove', this.touchmove, false);
        document.addEventListener('pause', this.pause, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.devicereadyEvent();
    },
    // load Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    load: function() {
        alert('load');
    },
    // online Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    online: function() {
        app.onlineEvent();
    },

    touchmove : function(e) {
        e.preventDefault();
    },

    pause : function() {
        alert("pause");
        document.location.href='#/screen/1';
    },

    onlineEvent : function () {},
    offlineEvent : function() {},

    devicereadyEvent : function() {
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        this.home = this.loadAssetFile('home.txt');
        this.screen1 = this.loadAssetFile('screen1.txt');
        this.letter2 = this.loadAssetFile('letter2.txt');
        this.screen3 = this.loadAssetFile('screen3.txt');
        this.screen4 = this.loadAssetFile('screen4.txt');
        this.screen5 = this.loadAssetFile('screen5.txt');
        this.screen6 = this.loadAssetFile('screen6.txt');
        this.screen7 = this.loadAssetFile('screen7.txt');
        
        this.bodyImages = [ 'img/flower.jpg', 'img/back2.jpg', 'img/flower.jpg', 'img/flower.jpg', 'img/flower.jpg', 'img/flower.jpg',  'img/flower.jpg' ];
        this.letterBodyImages = [ 'img/flower.jpg', 'img/back2.jpg', 'img/flower.jpg', 'img/flower.jpg', 'img/flower.jpg', 'img/flower.jpg',  'img/flower.jpg' ];

        page('#/letter/:id', app.letterShow);
        page('#/screen/:id', app.screenShow);
        page('#/screen/1');

    },

    screenShow : function(ctx, next) {

        var raw = eval('app.screen' + ctx.params.id);
        var compiled = _.template(raw);

        var messages = { }, config = { };
        var content = compiled($.extend({}, messages, config));
        
        $('body').css('background', 'url(' + app.bodyImages[ctx.params.id - 1] + ') no-repeat');
        $('body').css('-webkit-background-size', 'cover');
        $('#mainpage').html(content);

        // if it's not the welcome page - add the home button
        if (ctx.params.id > 1) {
            $('#mainpage').prepend(app.home);
        }

        // clickable links
        $("div[class*='clickable-']").bind('touchend', function() {
            cs = $(this).attr("class").split(/\s+/);
            $.each(cs, function(index, item) {
                cn = item.split("-");
                if (cn[0] == "clickable") {
                    page('#/screen/' + cn[1]);
                }
            });
        });


        // letterable links
        $("div[class*='letterable-']").bind('touchend', function() {
            cs = $(this).attr("class").split(/\s+/);
            $.each(cs, function(index, item) {
                cn = item.split("-");
                if (cn[0] == "letterable") {
                    page('#/letter/' + cn[1]);
                }
            });
        });


        switch(parseInt(ctx.params.id)) {
            case 2 :
                app.letter2();
                break;
            case 3 :
                app.paitingPage(); 
                break;
            case 4 :
                app.memoryPage(); 
                break;
            case 5 :
                app.soundPage(); 
                break;

        }
    },

    letterShow : function(ctx, next) {

        var raw = eval('app.letter' + ctx.params.id);
        var compiled = _.template(raw);

        var messages = { }, config = { };
        var content = compiled($.extend({}, messages, config));
        
        $('body').css('background', 'url(' + app.letterBodyImages[ctx.params.id - 1] + ') no-repeat');
        $('body').css('-webkit-background-size', 'cover');
        $('#mainpage').html(content);

        // if it's not the welcome page - add the home button
        if (ctx.params.id > 1) {
            $('#mainpage').prepend(app.home);
        }

        // clickable links
        $("div[class*='clickable-']").bind('touchend', function() {
            cs = $(this).attr("class").split(/\s+/);
            $.each(cs, function(index, item) {
                cn = item.split("-");
                if (cn[0] == "clickable") {
                    page('#/screen/' + cn[1]);
                }
            });
        });

        // letterable links
        $("div[class*='letterable-']").bind('touchend', function() {
            cs = $(this).attr("class").split(/\s+/);
            $.each(cs, function(index, item) {
                cn = item.split("-");
                if (cn[0] == "letterable") {
                    page('#/letter/' + cn[1]);
                }
            });
        });

        var raw = eval('app.executeLetter' + ctx.params.id + '()');
    },


    executeLetter2 : function() {
        var p = new B($(".letter2"));
    },

    paitingPage : function() {
        var p = new Painting();
    },

    memoryPage : function() {
        var p = new Memory();
    },

    soundPage : function() {
        // var p = new Sound();
    },

    loadAssetFile : function(filename) {
         var strUrl = "js/" + filename, strReturn = "";
          jQuery.ajax({ url: strUrl, async:false, dataType: "text", 
            success: function(html) {
              strReturn = html;
            },
            error: function() {
              strReturn = "error reading file";
            }
          });
          return strReturn;
    },
};
