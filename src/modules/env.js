const env = {
    // 测试环境
    dev: {
        // 官网
        INDEX: {
            login: '"dspd.youxuanyun.com/#/login/login"',
            registere: '"dspd.youxuanyun.com/#/login/registere"'
        }
    },

    // 生产环境
    prod: {
        // 官网
        INDEX: {
            login: '"dsp.youxuanyun.com/#/login/login"',
            registere: '"dsp.youxuanyun.com/#/login/registere"'
        }
    }
}

module.exports = env