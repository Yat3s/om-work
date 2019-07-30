const prod = {
    BASE_URL_DB : "http://10.190.190.100:3001",
    BASE_URL : "http://10.190.190.100:3000"
}

const dev = {
    BASE_URL_DB : "http://10.190.190.100:3001",
    BASE_URL : "http://10.190.190.100:3000"
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod
