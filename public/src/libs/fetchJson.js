export default function fetchJson(option) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: option.type || 'GET',
            url: option.url,
            data: option.data || {},
            dataType: 'json',
            success: (msg)=> {
                if (msg.code === 302) {
                    //Session过期
                    if (msg.data.hasOwnProperty('redirectUrl')) {
                        setTimeout(function () {
                            location.href = msg.data.redirectUrl;
                        }, 100);
                    }
                } else {
                    resolve(msg);
                }
            },
            error: (msg)=> {
                //console.error(msg.responseText);
                reject(msg.responseText);
            }
        });
    });
}