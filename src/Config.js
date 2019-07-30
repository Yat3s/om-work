const prod = {
    BASE_URL_DB : "http://0.0.0.0:3001",
}

const dev = {
    BASE_URL_DB : "http://0.0.0.0:3001",
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod
