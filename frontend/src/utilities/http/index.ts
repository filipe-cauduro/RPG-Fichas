import axios from 'axios';

export const config = () => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
}

export const post = async (url: string, data?: any) => {
    const res = await axios({
        method: 'POST',
        url,
        data
    });

    const dataResult = {data: res.data, status: res.status};
    if (dataResult) return dataResult;
}

export const get = async (url: string) => {
    const res = await axios({
        method: 'GET',
        url
    });

    const dataResult = JSON.parse(res.data);
    if (dataResult) return dataResult;
}
