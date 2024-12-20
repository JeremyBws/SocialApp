const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
 const config = getDefaultConfig(__dirname);
 return {
   ...config,
   resolver: {
     ...config.resolver, 
     assetExts: [
       ...config.resolver.assetExts,
       'jpg',
       'png',
       'jpeg',
     ],
     sourceExts: [
       ...config.resolver.sourceExts,
       'js',
       'jsx',
       'ts',
       'tsx', // Assurez-vous que TypeScript est pris en charge
     ],
     extraNodeModules: new Proxy(
       {
         '@': path.resolve(__dirname, 'src'),
         '@assets': path.resolve(__dirname, 'assets'),
       },
       {
         get: (target, name) => {
           return (
             target[name] || path.join(process.cwd(), `node_modules/${name}`)
           );
         },
       }
     ),
   },
   watchFolders: [
     path.resolve(__dirname, 'assets'),
   ],
 };
})();