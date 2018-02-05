import "babel-polyfill";

export default function fetchJson(option) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: option.type || 'GET',
            url: option.url,
            data: option.data || {},
            dataType: 'json',
            success: (msg)=> {
                resolve(msg);
            },
            error: (msg)=> {
                //console.error(msg.responseText);
                reject(msg.responseText);
            }
        });
    });
}