function buttonDown() {
    this.tweenOut.onComplete.active = true;
    this.tween.start();
}

function buttonUp() {
    this.tween.start();
}

function clickButton(button, callback, state) {
    var s = button.scale;
    if (mobile) {
        var tweenTime = 80;
    } else {
        var tweenTime = 30;
    }
    var tweenIn = button.game.add.tween(s).to({
        x: s.x * 0.85,
        y: s.y * 0.85
    }, tweenTime, Phaser.Easing.Linear.None, false);

    var tweenOut = button.game.add.tween(s).to({x: s.x, y: s.y}, tweenTime, Phaser.Easing.Linear.None, false);

    // onComplete signal fired when this tween is complete
    // onComplete.add(eventListenerCallback, context, priority, args)
    tweenOut.onComplete.add(function () {
            // Call the callback function to start the appropriate state (singlePlayer or multiPlayer) when the tweens
            // complete and not running.
            if (!tweenOut.isRunning && !tweenIn.isRunning) {
                callback.call(this);
            }
        } // state will be the 'this'
        , state);

    // button is in an over state. -- hover
    button.onInputOver.add(function () {
        tweenOut.onComplete.active = true;
    });


    // button in an out state
    button.onInputOut.add(function () {
        tweenOut.onComplete.active = false;
    });

    button.onInputDown.add(buttonDown, {
        tween: tweenIn,
        tweenOut: tweenOut
    });

    button.onInputUp.add(buttonUp, {
        tween: tweenOut
    });
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffleArray(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function iap() {
    if (Cocoon.Store.canPurchase()) {
        Cocoon.Store.purchase("curvatron_unlock");
    }
}

function initIAP() {
    if (Cocoon.Store.canPurchase()) {
        Cocoon.Store.initialize();
        Cocoon.Store.on("load", {
            success: function (products) {
                Cocoon.Store.addProduct("curvatron_unlock");
                console.log("ayy lmao:" + Cocoon.Store.isProductPurchased("curvatron_unlock"));
                restoreIAP();
            },
            error: function () {
                console.log("Error loading store", arguments)
            },
        });
        Cocoon.Store.loadProducts(["curvatron_unlock"]);
    }
}

function restoreIAP() {
    Cocoon.Store.on("purchase", {
        started: function (productId) {
            console.log("purchase start", productId)
        },
        success: function (purchaseInfo) {
            iapDone = true;
            console.log("purchase success", purchaseInfo)
        },
        error: function (productId, err) {
            console.log("purchase error", productId)
        }
    });


    Cocoon.Store.on("restore", {
        success: function () {
            console.log("----SUCESSO NA RESTAURACAO------");
        },
        error: function () {
            Console.log("Purchase restore error: ", arguments)
        }
    });
    Cocoon.Store.restore();
}

function socialInit() {
    switch (platform) {
        case "android":
            var gp = Cocoon.Social.GooglePlayGames;
            gp.init({});
            socialService = gp.getSocialInterface();
            break;
        case "ios":
            var gc = Cocoon.Social.GameCenter;
            socialService = gc.getSocialInterface();
            break;
    }
}


