module.exports = {
    title: 'Merry 前端总结',
    description: 'merrylmr 前端',
    configureWebpack: {},
    themeConfig: {
        nav: [
            {
                text: '前端',
                link: '/front/',
                items: [
                    {text: 'Vue', link: '/front/vue/'},
                    {text: '插件', link: '/plugins/'},
                    {text: '打包', link: '/webpack/'},
                    {text: 'http', link: '/http/'},
                    {text: 'canvas-svg', link: '/front/canvas/'},
                    {text: 'react', link: '/front/react/'},
                    {text: '正则表达式', link: '/regExp/frequence'},
                ]
            },
            {
                text: '服务端',
                link: '/server/',
                items: [
                    {text: 'node', link: '/server/node/'},
                    {text: 'docker', link: '/server/docker/'},
                ]
            },
            {
                text: '总结',
                link: '/summary/',
                items: [
                    {text: '产品', link: 'summary/product/'},
                    {text: '读书笔记', link: 'summary/booknote/'},
                    {text: '工作总结', link: 'summary/work/'},
                ]
            },
            {text: 'Github', link: 'https://github.com/merrylmr'},
        ],
        sidebarDepth: 2,
        sidebar: {
            collapsable: false,
            '/front/vue': ['/front/vue/', '/front/vue/one'],
            '/plugins/': [
                '',
                'calendar',
                'scrollAnchor',
                'svg',
                'crop',
                'baiduMp',
                'tinymce',
                'wow',
                'fullpage',
                'axios',
                'debug',
                'fabric',
                'geoJSON',
                'imgPress',
                'mescroll',
                'navmenu',
                'prerenderSpa',
                'tabWow',
                'uniApp',
                'three'],
            '/webpack/': ['', 'one', 'two', 'source', 'npm', 'npmVue', 'mulPage', 'babel', 'optimization', 'es6'],
            '/http/': ['', 'https', 'pageLoad', 'proxy', 'ua', 'xss', 'nginx'],
            '/regExp/': ['frequence', 'one'],
        }
    }
}
