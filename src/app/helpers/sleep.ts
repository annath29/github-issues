// realentizar intencionalmente la aplicacion
export const sleep = async (ms:number) =>{
    return new Promise(resolve => setTimeout(resolve, ms))
}