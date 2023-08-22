import Axios from 'axios'

// Use in react component
const ClientAxios = Axios.create({
    baseURL: '/api'
})

// Use in getServerSideProps
const SystemAxios = Axios.create({
    baseURL: 'http://localhost:3000/api'
})

export { ClientAxios, SystemAxios }
