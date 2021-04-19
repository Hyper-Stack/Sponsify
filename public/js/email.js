
var C = $('#container'),
    A = $('#open'),
    L = $('#letter'),
    B = $('.button.con'),
    H = $('#letter hgroup h2'),
    F = $('.front'),
    W = $('#wrapper'),
    P = $('#perspective'),
    closed = true;
$(function () {
    // Handler for .ready() called.
    $("textarea").text("");
});

F.click(function () {
    C.css({
        'transition': 'all 1s',
        'transform': 'rotateY(180deg)',
    });
    A.css({
        'transition': 'all 1s .5s',
        'transform': 'rotateX(180deg)',
        'z-index': '0'
    });
    W.css({
        'visibility': 'visible'
    });
});

// open/close and spin
W.click(function () {
    var message = $.trim($('textarea').val());
    if (message.length > 0) {//they wrote something in the message
        var r = confirm("You have not sent your message, would you still like to close the form?");
        if (r == false)//they don't want to close
        {
            return;
        }
        else //they do want to close. clear message
        {
            document.getElementById("myform").reset();
        }
    }
    if (closed === false) {
        L.css({
            'transition': 'all .7s',
            'top': '3px',
            'height': '200px'
        });
        P.css({
            'transform': 'translateY(0px)'
        });
        F.css({
            'transform': 'rotateZ(0deg)'
        });
        H.css({
            'transition': 'all .5s',
            'transform': 'rotateZ(0deg)'
        });
        C.css({
            'transition': 'all 1.2s .95s'
        });
        A.css({
            'transition': 'all 1.2s .7s'
        });
        H.css({
            'transition': 'all .5s'
        });
        // document.getElementById("info").innerHTML = "P:62321s111";
        closed = true;
    }
    else {
        C.css({
            'transition': 'all 1s .5s',
        });
        A.css({
            'transition': 'all .5s',
        });
        closed = false;
    }
    C.css({
        'transform': 'rotateY(0deg) rotate(3deg)'
    });
    A.css({
        'transform': 'rotateX(0deg)',
        'z-index': '10'
    });
    W.css({
        //'transition':'all .5s',
        'visibility': 'hidden'
    });
});
// Open letter
B.click(function () {

    L.css({
        'transition': 'all .5s 1s',
        'top': '-600px',
        'height': '550px'
    });
    P.css({
        'transition': 'all 1s',
        'transform': 'translateY(450px)'
    });
    H.css({
        'transition': 'all 1s',
        'transform': 'rotateZ(180deg)'
    });
    document.getElementById("info").innerHTML = "Contact Manager!";
});
