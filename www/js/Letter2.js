/**
 * Letter2 toolkit 
 */
var Letter2 = (function () {
    // private static
    var nextId = 1;
    var images = [ { img: '1.jpg', pieces : ['1a.png', '1b.png', '1c.png', '1d.png'], offset : [[11, 497] , [100, 623], [130, 630], [182, 492]] } ];

    // constructor
    var cls = function (e) {

        for (var i = images[0].pieces.length - 1; i >= 0; i--) {
            var p = images[0].pieces[i];
            var randomTop = Math.ceil(Math.random()*70); /* Pick random number between 1 and 2 */
            var randomLeft = Math.ceil(Math.random()*70); /* Pick random number between 1 and 2 */

            $(e).append('<div class="piece' + i +'target" style="position:absolute;top:'+ images[0].offset[i][0] +'px;left:'+ images[0].offset[i][1] +'px"><img src="img/' + p + '"></div>');
            $(e).append('<div class="piece' + i +'" style="position:absolute;top: ' + randomTop + '%;left:'+ randomLeft + '%"><img src="img/' + p + '"></div>');

            $('.piece'+ i + 'target').fadeTo(0, 0.3);
            $('.piece' + i ).draggable();
            $('.piece' + i + 'target').droppable({tolerance: "intersect" , accept : '.piece' + i,
                drop: function( event, ui ) {
                    var draggable = $(ui.draggable);
                    var droppable = $(event.target);
                    var y = draggable.position().top - droppable.position().top;
                    var x = draggable.position().left - droppable.position().left;
                    draggable.transition({  x: -x + 'px', y: -y + 'px'})
                    draggable.draggable( 'disable' );
                    draggable.css('z-index', -3000);
                    droppable.css('z-index', -3000);
                }   
            });
            $('.piece' + i + 'target').css('z-index', -2000)

            $('.piece' + i).click(function() {
                alert(JSON.stringify($(this).position()));
            });
        };

    };

    cls.fillEdge = function(data, width) {
        for(var i = 0; i < data.length; i += 4) {
          if ( !data[i + 3] && (data[i + 7] || data[i + width*4 + 3] )) { // heighlight image
            data[i] = 255;            // red
            data[i + 1] = 0;          // green
            data[i + 2] = 0;          // blue  
            data[i + 3] = 255;
          }
        }
        for(var i = data.length - 4; i > 0; i -= 4) {
          if ( !data[i + 3] && data[i - 1] ) { // heighlight image
            data[i] = 255;            // red
            data[i + 1] = 0;          // green
            data[i + 2] = 0;          // blue  
            data[i + 3] = 255;
          }
        }
        return data;
    }

    // public static
    cls.get_nextId = function () {
        return nextId;
    };

    return cls;
})();


