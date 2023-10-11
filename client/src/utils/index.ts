import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";

//字符串首字母大写
export function capitalizeFirstLetter(str: string): string
{
    if (str?.length > 0) {
        return str[0].toUpperCase() + str.slice(1);
    }
    else {
        return str;
    }
}

//数组转十六进制字符串
export function getHexStringByArray(arr: Array<number>): string
{
    return arr.map((value) => {
        return value.toString(16).toUpperCase().padStart(2, "0");
    }).join(" ");
}

//数字转十六进制字符串
export function getHexStringByNumber(value: Number): string
{
    return `0x${value.toString(16).toUpperCase()}`;
}

//获取参数类型对应的字节长度
export function getLengthByParamType(type: string): number
{
    switch (type) {
        case "byte": return 1;
        case "word": return 2;
        case "dword": return 4;
        case "pointer": return 4;
        default: return 0;
    }
}

//字节数组转数字
export function getValueByByteArray(arr: Buffer)
{
    return arr.reduce((res, byte, i) => {
        return res + byte * Math.pow(0x100, i);
    }, 0);
}

//根据键名筛选对象
export function filterObjectKeys(obj: any, handler: any)
{
    return Object.keys(obj).filter(handler).reduce((res, key) => {
        return (res[key] = obj[key], res);
    }, {});
}

//获取项目配置
export function getConfiguration(uri: string)
{
    const filename = ".pm3genrc";
    const exts = ["yaml", "yml", "json"];

    let dir = path.dirname(uri);
    let ext;

    while (!exts.some((e) => {
        ext = e;
        return fs.existsSync(path.join(dir, `${filename}.${e}`));
    })) {
        const parentDir = path.join(dir, "../");
        if (parentDir === dir) {
            return {
                conf: {},
                dir: null
            };
        }
        dir = parentDir;
    }

    const file = fs.readFileSync(path.join(dir, `${filename}.${ext}`));
    const text = file.toString();

    const conf = {
        yaml: () => YAML.parse(text),
        yml: () => YAML.parse(text),
        json: () => JSON.parse(text)
    }[ext]();

    return {
        conf,
        dir
    };
}