IDLE = 0
SELECT_TIME = 1
TOASTING = 2
COMPLETE = 3
state = IDLE
Time = 0
On = False
Toaster = True
def evaluateState(state2: number):
    if Toaster == False and On == False:
        return IDLE
    elif Toaster == False and On == True:
        return SELECT_TIME
    elif Toaster == True and On == True:
        return TOASTING
    else:
        return state2