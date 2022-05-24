kaboom({
    global: true,
    height: 480,
    width: 640,
    scale: 1
});

//debug.inspect = true;

loadSprite('pillar', 'assets/images/environment/pillar.png');
loadSprite('statue', 'assets/images/environment/statue.png');
loadSprite('stoneBench', 'assets/images/environment/stonebench.png');
loadSprite('stoneBH', 'assets/images/environment/stoneBH.png');
loadSprite('stoneBHI', 'assets/images/environment/stioneBHI.png');
loadSprite('grass', 'assets/images/environment/grass2.png');
loadSprite('bush', 'assets/images/environment/bush.png');
loadSprite('tree', 'assets/images/environment/tree.png');
loadSprite('house', 'assets/images/environment/house.png');
loadSprite('house2', 'assets/images/environment/house2.png');
loadSprite('wallH', 'assets/images/environment/wallH.html.png');
loadSprite('wall1', 'assets/images/environment/wall1.png');
loadSprite('wall2', 'assets/images/environment/wall2.png');
loadSprite('well', 'assets/images/environment/well.png');
loadSprite('stairs', 'assets/images/environment/stairs.png');

loadSprite('npc1', 'assets/images/cat.png', {
    sliceX: 5,
    sliceY: 4,

    anims: {
        moveX: {
            from: 1,
            to: 5
        },
        moveY: {
            from: 0,
            to: 8
        }
    }
});

loadSprite('p1', 'assets/images/player-1.png', {
    sliceX: 10, //9 plaer1
    sliceY: 3, //2.2 player1

    anims: {
        idle: {
            from: 0,
            to: 1
        },
        leftIdle: {
            from: 14,
            to: 14
        },
        rightIdle: {
            from: 14,
            to: 14
        },
        upIdle: {
            from: 8,
            to: 8
        },
        downIdle: {
            from: 2,
            to: 2
        },
        runDown: {
            from: 2,
            to: 7
        },
        runUp: {
            from: 8,
            to: 13
        },
        runLeft: {
            from: 14,
            to: 17
        },
        runRight: {
            from: 0,
            to: 0
        }
    }
});

scene('level1', () => {

    layers([
        "bg",
        "ui",
        "tree",
        "game",
        "tree",
    ], "game");

    addSprite('grass', {
        width: width(),
        height: height(),
        tiled: true,
        layer: ("bg"),
        scale: 3
    });

    const PLAYER = addSprite('p1', {
        pos: vec2(636, 260),
        scale: 3,
        solid: true,
        //layer: ("char")
    });

    const house = addSprite('house', {
        pos: vec2(19, 69),
        scale: 2,
        solid: true,
        //layer: ("char")
    });



    const npc1 = addSprite('npc1', {
        pos: vec2(280, 210),
        scale: 1,
        solid: true,
    });

    let moveX = 50;
    let moveY = 0;
    npc1.action(() => {
        npc1.pushOutAll();
        npc1.move(moveX);
        npc1.play('moveX');
    });

    const npc2 = addSprite('npc1', {
        pos: vec2(280, 210),
        scale: 1,
        solid: true,
    });

    let x = 90;
    let y = 0;
    npc1.action(() => {
        npc2.pushOutAll();
        npc2.move(x);
        npc2.play('moveX');
    });

    npc2.action(() => {
        npc2.pushOutAll();
        npc2.move(y);
        //npc1.play("moveY");
    });

    npc1.collides(() => {
        console.log('Blocked1');
    });

    const LEVELS = [
        [
            //note: / IS BUSH , = IS WALL1,- IS WELL,* IS TREE, .WALL HORIZNTAL 
            "+==================+",
            ".     ))           *.",
            ".                  *.",
            ".  * ^  $ *        *.",
            ".           /      *.",
            ".    ^  $          *.",
            ".                  *.",
            ".    +  +          *.",
            ".                  *.",
            ".     -            *.",
            ".***               *.",
            ".*                 *.",
            "+*******************.",
            "+==================+.",
        ]
    ];

    addLevel(LEVELS[0], {
        width: 100,
        height: 100,
        pos: vec2(0, 0),
        "=": [
            sprite('wall1',),
            scale(1),
            area(),
            solid(),
            // layer("wall")

        ],
        ".": [
            sprite('wallH',),
            scale(3),
            area(),
            solid(),

        ],
        "*": [
            sprite('tree',),
            scale(2),
            area(),
            solid(),
            layer("tree")
        ],
        "-": [
            sprite('well',),
            scale(2),
            area(100, 100),
            layer("bg")
        ],
        "/": [
            sprite('bush',),
            scale(2),
            area()
        ],
        "#": [
            sprite('stoneBench',),
            scale(2),
            area(),
            solid()
        ],
        "^": [
            sprite('stoneBH',),
            scale(2),
            area(),
            solid()
        ],
        "$": [
            sprite('stoneBHI',),
            scale(2),
            area(),
            solid()
        ],
        "+": [
            sprite('pillar',),
            scale(2),
            area(),
            solid()
        ],
        ")": [
            sprite('statue',),
            scale(2),
            area(),
            solid()
        ]
    });

    // function setArea(posX, posY, sizX, sizY) {
    //     let area = (posX, posY, sizX, sizY);
    //     PLAYER.area.p1.x = posX;
    //         PLAYER.area.p1.y = posY;
    //         PLAYER.area.p2.x = sizX;
    //         PLAYER.area.p2.y = sizY;
    //         house.area.p1.x = posX;
    //         house.area.p1.y = posY;
    //     }
//             PLAYER.area.p1.x = posX;
        //     PLAYER.area.p1.y = posY;
        //     PLAYER.area.p2.x = sizX;
        //     PLAYER.area.p2.y = sizY;
        //     house.area.p1.x = posX;
        //     house.area.p1.y = posY;

        let setArea = (posX, posY, sizX, sizY) => {
            PLAYER.area.p1.x = posX;
            PLAYER.area.p1.y = posY;
            PLAYER.area.p2.x = sizX;
            PLAYER.area.p2.y = sizY;
            house.area.p1.x = posX;
            house.area.p1.y = posY;
        };
        
        
    
    setArea(11, 28, 5, 9);

    const house2 = addSprite('house2', {
        pos: vec2(1263, 314),
        scale: 2,
        solid: true,
       

        //layer: ("char")
        //house2.setArea(11,28,5,2);
    });

    PLAYER.action(() => {
        PLAYER.pushOutAll();
    });

    PLAYER.action(() => {
        camPos(PLAYER.pos);

    });

    const MOVE_SPEED = 300;

    // LEFT KEY START
    keyDown('left', () => {
        PLAYER.move(-MOVE_SPEED, 0)
    });
    keyPress('left', () => {
        PLAYER.play('runLeft');
        PLAYER.flipX(false);
    });
    keyRelease('left', () => {
        PLAYER.play('leftIdle');
    });
    // LEFT KEY END
    /////////////////////////////////
    // RIGHT KEY START
    keyDown('right', () => {
        PLAYER.move(MOVE_SPEED, 0);
        PLAYER.flipX(true);
    });

    keyPress('right', () => {
        PLAYER.play('runLeft');
        // PLAYER.flipX(true);
    });
    keyRelease('right', () => {
        PLAYER.play('rightIdle');
    });
    // RIGHT KEY END
    ///////////////////////////////////
    //UP KEY START
    keyDown('up', () => {
        PLAYER.move(0, -MOVE_SPEED); //when clcking up character go front or up
    });
    keyPress('up', () => {
        PLAYER.play('runUp'); //plays wlaking front animations
    });
    keyRelease('up', () => {    //plays idle animations
        PLAYER.play('upIdle');
    });
    //UP KEY END
    ///////////////////////////////////
    // DOWN KEY START
    keyDown('down', () => {
        PLAYER.move(0, MOVE_SPEED);
    });
    keyPress('down', () => {
        PLAYER.play('runDown');
    });
    keyRelease('down', () => {
        PLAYER.play('downIdle');
    });
    // DOWN KEY END
    ////////////////////////////////////
    //F KEY START
    // keyPress("f", () => {
    //     fullscreen(!fullscreen());
    // });
    //F KEY END
    addText("Adventure of Baji", 18, {
        pos: vec2(20, 20)
    });

});

go('level1');