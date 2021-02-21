module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://report_backend:3000/:path*', // Proxy to Backend
            },
        ]
    },
    webpackDevMiddleware: (config) => {
        // Solve compiling problem via vagrant
        config.watchOptions = {
            poll: 1000, // Check for changes every second
            aggregateTimeout: 300, // delay before rebuilding
        }
        return config
    },
}
