import axios from 'axios';

const getItem = async () => {
    return new Promise(function (resolve, reject) {
        axios.get('https://app.mhc.asia/test/photos.json')
            .then(result => {
                resolve(result.data);
            })
            .catch(_ => {
                var errorMessage = 'Failed to get data.';
                reject(errorMessage);
            });
    });
}

export { getItem };