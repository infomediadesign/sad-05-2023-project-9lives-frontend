export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

export function checkWin(correct, lives, word) {
    let status = 'win';

    word.split('').forEach(letter => {
        if(!correct.includes(letter)){
            status = '';
        }
    });

    if(lives === 0) status= 'lose';
    return status;
}