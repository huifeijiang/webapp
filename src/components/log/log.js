/*
/!**
 * Created by Administrator on 2017/7/11 0011.
 *!/
import vuelogger from 'vuelogger'

export const cwLogger = {};

let MyLogger = vuelogger.MyLogger;
cwLogger.logger  = new MyLogger();

cwLogger.logger.setLevel(vuelogger.LoggerType.WARN)

cwLogger.logger.moduleFlag = ["yshLog"];

cwLogger.yshLog = "yshLog";

cwLogger.debug = function (logInfo) {
    console.log(logInfo)
    cwLogger.logger.info("555")
    cwLogger.logger.getMoudle(cwLogger.yshLog).log(logInfo)
};

cwLogger.error = function (logInfo) {
    cwLogger.logger.getMoudle(cwLogger.yshLog).error(logInfo)
};

cwLogger.info = function (logInfo) {
    console.log(logInfo)
    // cwLogger.logger.getMoudle(cwLogger.yshLog).log(logInfo)
};


*/
