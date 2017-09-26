import axios from 'axios'
import { GET_DATA_URL } from './config'
import { getQueryString } from './helpers'


const keyID = getQueryString('KeyID')
const type = getQueryString('Type')

export const getData = () => {
    const url = GET_DATA_URL + '?KeyID=' + keyID
    return axios.get(url)
        .then(res => {
            return JSON.parse(res.data)
        })
}