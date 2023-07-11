const { shareAll } = require('@angular-architects/module-federation/webpack');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "sidebar",
    publicPath: "auto",
    scriptType:'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        name: "sidebar",
        filename: "remoteEntry.js",
        exposes: {
          './Module': './src/app/app.module.ts',
          'SidebarComponent': './src/app/app.component.ts',
        },

        remotes: {
            "SidebarComponent": "http://localhost:4001/remoteEntry.js",

        },
        shared: {
          ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
        },

    }),
    sharedMappings.getPlugin()
  ],
};
