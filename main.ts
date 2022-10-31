let analogValue = 0
let strip: neopixel.Strip = null
let IDLE = 0
let SELECTTIME = 1
let TOASTING = 2
let FINISHED = 3
let state = IDLE
let toasttime = 0


input.onButtonPressed(Button.A, function () {
    if (state == IDLE) {
        state = SELECTTIME
        }
    return state
})


input.onButtonPressed(Button.AB, function () {
    if (state == SELECTTIME) {
        state = TOASTING
    }
    else if (state == TOASTING) {
        state = IDLE
    }
    return state
})

function readTemperature () {
    analogValue = pins.analogReadPin(AnalogPin.P0)
    return Math.map(analogValue, 0, 1023, -10, 80)
}
function microwaveOff () {
    strip.showColor(neopixel.rgb(0, 0, 0))
    strip.show()
}
function microwaveOn () {
    strip.showColor(neopixel.rgb(255, 194, 0))
    strip.show()
}
function notoast () {
    pins.digitalWritePin(DigitalPin.P1, 0)
}
function toast () {
    pins.digitalWritePin(DigitalPin.P1, 1)
}
function reactToState (state: number) {
    if (state == IDLE) {
        microwaveOff()
        notoast()
        basic.clearScreen()
    } else if (state == SELECTTIME) {
        basic.showNumber(toasttime)
        pause(1)

    } else if (state == TOASTING) {
        microwaveOn()
        toast()
    }
    else{

    }
}

strip = neopixel.create(DigitalPin.P4, 8, NeoPixelMode.RGB)
basic.forever(function () {
    reactToState(state)
})
