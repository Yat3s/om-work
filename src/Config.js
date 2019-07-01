const prod = {
    BASE_URL_DB : "http://10.172.207.166:3001",
    BASE_URL : "http://10.172.207.166:3000"
}

const dev = {
    BASE_URL_DB : "http://10.172.207.166:3001",
    BASE_URL : "http://10.172.207.166:3000"
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod