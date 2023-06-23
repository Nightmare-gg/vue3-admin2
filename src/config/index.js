// 环境配置文件
// 一般在企业级项目里面有三个环境
// 开发环境
// 测试环境
// 线上环境
// 当前环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/8a4485f55f137f12bae3aff51f1d35b1/api',
    },
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/8a4485f55f137f12bae3aff51f1d35b1/api',
    },
    pro: {
        baseApi: '//future.com/api',
        mockApi: 'https://www.fastmock.site/mock/8a4485f55f137f12bae3aff51f1d35b1/api',
    }
}

export default {
    env,
    // mock的总开关，
    mock: true,
    ...EnvConfig[env]
}