import logo from '../logo.svg'

export default {
	baseUrl: 'http://192.168.1.6:9999/',
    api: {
        userLogin: `auth/login`,
        userSignUp: `auth/signup`,
        userInfo: `user`,
    },
    footerText: '数据之道 © 2018 Pear',
    logo: logo
}