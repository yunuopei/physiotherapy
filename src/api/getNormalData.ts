import axios from "axios";
import {JSEncrypt} from "jsencrypt";
// import forge from "node-forge";
const publicKeyPem = import.meta.env.VITE_PublicKey


export const encryptedData = (data: Object) => {
    var encryptor = new JSEncrypt()  // 创建加密对象实例
    //之前生成的公钥，复制的时候要小心不要有空格(此处把密钥省略了，自己写的时候可把自己生成的公钥粘到对应位置)
    var pubKey = publicKeyPem
    encryptor.setPublicKey(pubKey)//设置公钥
    // 对内容进行加密
    return encryptor.encrypt(JSON.stringify(data))
}
export const encryptedString = (data: string) => {
    var encryptor = new JSEncrypt()  // 创建加密对象实例
    //之前生成的公钥，复制的时候要小心不要有空格(此处把密钥省略了，自己写的时候可把自己生成的公钥粘到对应位置)
    var pubKey = publicKeyPem
    encryptor.setPublicKey(pubKey)//设置公钥
    // 对内容进行加密
    return encryptor.encrypt(data)
}
export const getServiceTypes = async () => {
    let res = await axios.get('/system/typeServe/list')
    return res.data.rows
}

export interface Position {
    lat: number;
    lng: number;
}

export const calculateDistance = (position1: Position, position2: Position) => {
    const earthRadius = 6371; // 地球的半径，单位为千米

    // 将经纬度从度转换为弧度
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const dLat = toRadians(position2.lat - position1.lat);
    const dLng = toRadians(position2.lng - position1.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(position1.lat)) * Math.cos(toRadians(position2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // 计算距离
    const distance = earthRadius * c;

    return distance;
}
export const Sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
