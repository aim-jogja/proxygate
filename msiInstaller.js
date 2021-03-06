// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64", 
const APP_DIR = path.resolve(__dirname, './release-builds-proxyGate/proxyGate-win32-ia32');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './ProxyGate_windows_installer');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'Versi beta untuk update app versi pertama',
    exe: 'proxyGate',
    name: 'ProxyGate 1.2',
    manufacturer: 'Cupit Kretek',
    version: '1.2.0',
    appIconPath: path.resolve(__dirname,'./assets/icons/win/icon.ico'),

    // Configure installer User Interface
    ui: {
        chooseDirectory: true,

    },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){

    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});