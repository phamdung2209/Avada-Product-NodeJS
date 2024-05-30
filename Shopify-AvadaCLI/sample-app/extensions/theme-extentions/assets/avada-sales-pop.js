;(async () => {
    const BASE_URL = 'http://localhost:5000/scripttag'

    const scriptElement = document.createElement('script')
    scriptElement.type = 'text/javascript'
    scriptElement.async = true
    scriptElement.src = `${BASE_URL}/index.min.js?v=${new Date().getTime()}`
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(scriptElement, firstScript)
})()
