/**
 * Memory toolkit 
 */
var Memory = (function () {
    
    var images = [ 'img/1.jpg', 'img/1.jpg']
    var boards = [ [ 2, 2 ], [ 2, 3 ], [ 4, 3 ], [ 4, 4 ] ];
    var board = [];
    var boardLevel = 0;
    var boardLetters = [];
    var maxLetter = 2;
    var minLetter = 1;
    var previousTap = null;
    var matching = false;

    // constructor
    cls = function() {
        cls.gameExecute('rand', null);
    };

    cls.gameExecute = function(status, arguments) {
        if (status == 'rand') {
            boardLetters = [];
            var cols = boards[boardLevel][0];
            var rows = boards[boardLevel][1];
            while (boardLetters.length != rows * cols) {
                var letter = images[Math.ceil(Math.random() * (maxLetter - minLetter + 1))];
                if ($.inArray(letter, boardLetters) == -1) {
                    boardLetters.push(letter);
                    boardLetters.push(letter);
                }
            }
            boardLetters = cls.shuffle(boardLetters);
            board = cls.listToMatrix(boardLetters, rows, cols);
            cls.gameExecute('render');

        } else if (status == 'render') {
            // reset
            $('#board-game').html("");

            var rows = boards[boardLevel][1];
            var flipSounds = [];
            $.each(board, function(indX, row) {
                var iX = indX;
                $.each(row, function(iY, e) {
                    var l = $("<div/>").appendTo('#board-game');
                    l.addClass("black-letter-medium");
                    l.css('right', -15 + (iX + 1) * 2 * (100 / (2 * board.length + 1)) + '%');
                    l.html("&nbsp;");
                    l.css('top', '85%');

                    $(l).transition({
                        y : -400 - (iY) * 400 / (board[iX].length - 1),
                        delay : ((iX + 1) * rows + iY) * 200
                    }, 800, 'ease', function() {
                        flipSounds[(iX + 1) * row + iY] = cls.playAudio("flip.wav");
                    }).transition({
                        y : '+=50',
                    }, 300, 'ease', function() {
                        setTimeout(function() {
                            // flipSounds[(iX + 1) * row + iY].release();
                        }, 2000);
                    });

                    l.bind('touchend', function() {
                        cls.gameExecute('tap', {
                            'clicked' : l,
                            'x' : iX,
                            'y' : iY
                        });
                    });
                });
            });

        } else if (status == 'tap') {
            if (matching || !$(arguments.clicked).hasClass('black-letter-medium')) {
                return;
            }

            cls.queuePlayAudio("flip.wav", 1000);
            var i = messages.letters.indexOf(board[arguments.x][arguments.y]) + 1;
            cls.queuePlayAudio("letters/" + i + ".wav", 3000);

            if (previousTap == null) {
                previousTap = arguments;
                revealLetter(arguments.clicked, board[arguments.x][arguments.y]);
            } else {
                if (previousTap.x == arguments.x && previousTap.y == arguments.y) {
                    return;
                }
                matching = true;
                var selected = board[arguments.x][arguments.y];
                revealLetter(arguments.clicked, selected);
                if (selected != board[previousTap.x][previousTap.y]) {
                    hideLetter(arguments.clicked, function() {
                        hideLetter(previousTap.clicked);
                        gameExecute('result', {
                            result : false
                        });
                        // fail sound
                        cls.queuePlayAudio("fail.wav", 1000);
                    });
                } else {
                    cls.queuePlayAudio("twinkle.wav", 5000);
                    cls.gameExecute('result', {
                        result : true
                    });
                }
            }

        } else if (status == 'result') {
            previousTap = null;
            matching = false;
            if (arguments.result) {
                // carrot sound?
                boardLetters.pop();
                boardLetters.pop();
                if (boardLetters.length == 0) {
                    cls.queuePlayAudio("cheers.wav", 5000);
                    m = new Messi("<div style='text-align:center'><h1>" + "<br/>!!!" +messages.congrat_text1 + "<br/>" +"<br/>" + messages.congrat_text2 +"<br/>"+"<br/>" + "</h1></div>");
                    setTimeout(function() {
                        m.unload();
                        m = null; 
                        boardLevel = (boardLevel + 1) % (boards.length);
                        cls.gameExecute('rand');
                    }, 5000);
                }
            } else {
                // stick sound?
            }
        }
        ;
    }

    cls.listToMatrix = function(arr, rows, cols) {
        var matrix = [];
        if (rows * cols === arr.length) {
            for ( var i = 0; i < arr.length; i += cols) {
                matrix.push(arr.slice(i, cols + i));
            }
        }
        return matrix;
    };

    cls.playAudio = function() {

    };

    cls.shuffle = function(arr) {
        for ( var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x)
            ;
        return arr;
    };

    return cls;
})();


