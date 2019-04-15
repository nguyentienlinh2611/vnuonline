import axios from 'axios';

export const DetectionAPI = async (images, aligned, folder) => {
    return axios({
        url: 'http://vnuonline_openface:9000/detection',
        method: 'POST',
        data: {images, aligned, folder},
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const RecognizeAPI = async (faces) => {
    return axios({
        url: 'http://vnuonline_openface:5000/recognize',
        method: 'POST',
        data: {faces},
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const ConfirmAPI = async (images) => {
    return axios({
        url: 'http://vnuonline_openface:5000/confirm',
        method: 'POST',
        data: {images},
        headers: {
            'Content-Type': 'application/json'
        }
    })
};
