const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert/"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url/"),
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    vm: require.resolve("vm-browserify"),

    // Disable modules that don't make sense in browser:
    fs: false,
    "fs/promises": false,
    net: false,
    tls: false,
  });

  config.resolve.fallback = fallback;

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: { fullySpecified: false },
  });

  return config;
};
