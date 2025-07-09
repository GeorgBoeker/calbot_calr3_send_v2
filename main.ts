let ntx = 0
let MR = 0
let ML = 0
let laenge = 0
let y = 0
let x = 0
radio.setGroup(1)
datalogger.setColumnTitles(
"x",
"y",
"ML",
"MR",
"ntx"
)
datalogger.mirrorToSerial(false)
basic.forever(function () {
    x = Math.constrain(input.rotation(Rotation.Pitch), -60, 60)
    y = Math.constrain(input.rotation(Rotation.Roll), -60, 60)
    laenge = Math.constrain(Math.sqrt(x * x + y * y), 0, 60)
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
    ntx = (ML + 101) * 1000 + (MR + 101)
    radio.sendString(convertToText(ntx))
    basic.pause(100)
    datalogger.log(
    datalogger.createCV("ntx", ntx),
    datalogger.createCV("ML", ML),
    datalogger.createCV("MR", MR),
    datalogger.createCV("x", x),
    datalogger.createCV("y", y)
    )
})
