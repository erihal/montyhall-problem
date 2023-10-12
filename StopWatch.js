export const StopWatch = {
    start: () => {
        const state = {
            startTime: performance.now(),
            stopTime: 0
        }
        return {
            get elapsed() {
                return performance.now() - state.startTime
            },
            stop: () => state.stopTime = performance.now()
        }
    }
}