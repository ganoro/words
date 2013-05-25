/**
 * Letter2 toolkit 
 */
var Letter2 = (function () {
    // private static
    var nextId = 1;
    var images = [ { pieces : ['letter2-1.png', 'letter2-2.png'], 
                    offset : [[393, 658] , [367, 291]], 
                    size : [[167, 167] , [167, 167]] } ];

    // constructor
    var cls = function (e) {

        for (var i = images[0].pieces.length - 1; i >= 0; i--) {
            var p = images[0].pieces[i];
            $(e).append('<div class="piece' + i +'" style="position:absolute;top:'+ images[0].offset[i][0] +'px;left:'+ images[0].offset[i][1] +'px"><img style="width:'+ images[0].size[i][1] +'px;height:'+ images[0].size[i][1] +'px" src="img/' + p + '"></div>');

            $('.piece' + i).bind('touchend', function() {
                $(this).css({ transformOrigin: '20px 60px' })
                        .transition({ rotate: '10deg' }).transition({ rotate: '0deg' }).transition({ rotate: '10deg' }).transition({ rotate: '0deg' });
            });
        };

    };

    return cls;
})();


