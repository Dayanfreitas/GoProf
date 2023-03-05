export default function Navigator() {
    const HTTP_STATUS = {
        NOT_FOUND: 404,
        FORBIDDEN: 403
    }

    const TYPES = {
        error: 'error'
    }

    const go = (name) => {
        window.location.replace(name)
    }

    const validateRouter = (response) => {
        const { data, status } = response
        const { type } = data

        if (type === TYPES.error && status === HTTP_STATUS.NOT_FOUND)
            go('/not-found')

        if (type === TYPES.error && status === HTTP_STATUS.FORBIDDEN)
            go('/forbbiden')
        
        return true
    }

    return {
        go,
        validateRouter
    }
}