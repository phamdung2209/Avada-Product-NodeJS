const ReactCompilerConfig = {
    /* ... */
}

module.exports = function(api) {
    // Cache based on the NODE_ENV environment variable
    api.cache(() => process.env.NODE_ENV)

    return {
        plugins: [
            ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
            // Add other plugins here
        ],
    }
}
