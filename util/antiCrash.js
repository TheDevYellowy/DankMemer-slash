module.exports = () => {
    console.log(' [AntiCrash] >> Initialized');

    process.on('unhandledRejection', (reason, p) => {
        console.log(' [Anti Crash] >>  Unhandled Rejeciton/Catch');
        console.log(reason, p)
    })

    process.on('uncaughtException', (e, o) => {
        console.log(' [Anti Crash] >>  Uncaught Exception/Catch');
        console.log(e, o)
    })

    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [AntiCrash] >>  Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });

    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [AntiCrash] >>  Multiple Resolves');
        console.log(type, promise, reason);
    });
}