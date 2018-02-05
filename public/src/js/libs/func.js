export function copyText(text, callback) {
    let textarea = document.createElement('textarea');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);

    try {
        document.execCommand('copy');
        if (callback) {
            callback();
        }
    } catch (err) {
        alert('您使用的浏览器不支持此复制功能，请更换chrome浏览器!');
    }
}