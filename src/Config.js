const prod = {
    BASE_URL : "http://10.172.207.166:3001"
}

const dev = {
    BASE_URL : "http://10.172.207.166:3001"
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod