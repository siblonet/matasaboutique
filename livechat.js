let sockectState = false;
let myLive = "";
const socket = io(tunalS);
/*function generateUUID() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

socket.on('connect', () => {
    myLive = generateUUID();
    sockectState = true;

});


socket.on('disconnect', () => {
    sockectState = false;
});*/