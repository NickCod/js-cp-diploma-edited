function sendRequest(requestBody, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    localStorage.setItem('sendRequest', sendRequest);
                    const jsonResponse = JSON.parse(xhr.responseText);
                    callback(jsonResponse);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };

    xhr.open('POST', 'https://jscp-diplom.netoserver.ru/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(requestBody);
}

window.sendRequest = sendRequest;

