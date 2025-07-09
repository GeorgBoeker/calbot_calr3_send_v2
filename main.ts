function zeigeV () {
    if (0 <= laenge && laenge <= 5) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (5 < laenge && laenge <= 20) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
    } else if (20 < laenge && laenge <= 40) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            `)
    } else if (40 < laenge && laenge <= 60) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (60 < laenge && laenge <= 80) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (80 < laenge && laenge <= 90) {
        basic.showLeds(`
            . . . . .
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (90 < laenge && laenge <= 95) {
        basic.showLeds(`
            # # . . .
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
}
let ntx = 0
let MR = 0
let ML = 0
let y = 0
let x = 0
let laenge = 0
radio.setGroup(200)
radio.setTransmitPower(7)
datalogger.setColumnTitles(
"x",
"y",
"laenge",
"ML",
"MR",
"ntx"
)
basic.forever(function () {
    x = Math.constrain(input.rotation(Rotation.Pitch), -60, 60)
    y = Math.constrain(input.rotation(Rotation.Roll), -60, 60)
    laenge = Math.constrain(Math.sqrt(x * x + y * y), 0, 60)
    if (laenge < 5) {
        ML = 0
        MR = 0
    } else {
        ML = Math.round(laenge / 60 * 100)
        MR = ML
        if (y < -5) {
            ML = Math.round(ML - y / -60 * ML)
        } else if (y > 5) {
            MR = Math.round(MR - y / 60 * MR)
        }
        if (x < 0) {
            MR = -1 * MR
            ML = -1 * ML
        }
    }
    ntx = Math.round((ML + 101) * 1000 + (MR + 101))
    radio.sendString(convertToText(ntx))
    datalogger.log(
    datalogger.createCV("laenge", laenge),
    datalogger.createCV("x", x),
    datalogger.createCV("y", y),
    datalogger.createCV("ML", ML),
    datalogger.createCV("MR", MR),
    datalogger.createCV("ntx", ntx)
    )
    zeigeV()
    basic.pause(50)
})
