/**
 * Letter2 toolkit 
 */
var Letter2 = (function () {
    // private static
    var nextId = 1;
    var images = [ { pieces : ['letter2-1.png', 'letter2-2.png'], offset : [[500, 497] , [700, 623]] } ];

    // constructor
    var cls = function (e) {

        for (var i = images[0].pieces.length - 1; i >= 0; i--) {
            var p = images[0].pieces[i];
            $(e).append('<div class="piece' + i +'target" style="position:absolute;top:'+ images[0].offset[i][0] +'px;left:'+ images[0].offset[i][1] +'px"><img src="img/' + p + '"></div>');

            $('.piece' + i).click(function() {
                alert(JSON.stringify($(this).position()));
            });
        };

    };

    return cls;
})();


