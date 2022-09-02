export const responseFor = (input) => {
    let msg = input.toLowerCase();
    let res = "";
    switch (msg) {
        case 'hi':
            res = "Hello there!";
            break;

        case 'chat id':
            res = "Your chat ID is ";
            break;

        default:
            res = "I can not recognise the command.";
    }

    return res;
};