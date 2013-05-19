/**
 * Sound toolkit 
 */
var Sound = (function () {
    // private static
    var nextId = 1;

    // constructor
    var cls = function () {

        // get references to the canvas element as well as the 2D drawing context
        var sigCanvas = document.getElementById("canvasSignature");
        var context = sigCanvas.getContext("2d");
        context.strokeStyle = 'Red';
        // create a drawer which tracks touch movements
        var drawer = {
           isDrawing: false,
           touchstart: function (coors) {
              context.beginPath();
              context.moveTo(coors.x, coors.y);
              this.isDrawing = true;
           },
           touchmove: function (coors) {
              if (this.isDrawing) {
                 context.lineTo(coors.x, coors.y);
                 context.stroke();
              }
           },
           touchend: function (coors) {
              if (this.isDrawing) {
                 this.touchmove(coors);
                 this.isDrawing = false;
              }
           }
        };

        // create a function to pass touch events and coordinates to drawer
        function draw(event) {

           // get the touch coordinates.  Using the first touch in case of multi-touch
           var coors = {
              x: event.targetTouches[0].pageX,
              y: event.targetTouches[0].pageY
           };

           // Now we need to get the offset of the canvas location
           var obj = sigCanvas;

           if (obj.offsetParent) {
              // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
              do {
                 coors.x -= obj.offsetLeft;
                 coors.y -= obj.offsetTop;
              }
              // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
              // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
              while ((obj = obj.offsetParent) != null);
           }

           // pass the coordinates to the appropriate handler
           drawer[event.type](coors);
        }

        // attach the touchstart, touchmove, touchend event listeners.
        sigCanvas.addEventListener('touchstart', draw, false);
        sigCanvas.addEventListener('touchmove', draw, false);
        sigCanvas.addEventListener('touchend', draw, false);        
    };

    return cls;
})();


