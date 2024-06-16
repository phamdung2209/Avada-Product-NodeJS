/* eslint-disable require-jsdoc */
import React, { Component } from 'react'
import NotFound from '@assets/pages/NotFound/NotFound'
import * as PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { eventId: null }
        const { history } = this.props

        history.listen(() => {
            if (this.state.hasError) {
                this.setState({ hasError: false })
            }
        })
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <NotFound />
        } else {
            return this.props.children
        }
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(ErrorBoundary)

// import React, { Component } from 'react'
// import NotFound from '@assets/pages/NotFound/NotFound'
// import * as PropTypes from 'prop-types'
// import { useNavigate, useLocation } from 'react-router-dom' // Nhập hook

// class ErrorBoundary extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { hasError: false }
//     }

//     static getDerivedStateFromError() {
//         return { hasError: true }
//     }

//     componentDidCatch(error, errorInfo) {
//         console.error(error, errorInfo)
//     }

//     render() {
//         const navigate = useNavigate() // Sử dụng hook useNavigate
//         const location = useLocation() // Sử dụng hook useLocation

//         // ... (code tương tự như trước)

//         if (this.state.hasError) {
//             // Thay vì this.props.history.listen(...)
//             // Sử dụng useLocation để lắng nghe thay đổi URL
//             if (location.pathname !== this.previousPath) {
//                 this.setState({ hasError: false })
//             }
//             this.previousPath = location.pathname // Lưu lại đường dẫn hiện tại

//             return <NotFound />
//         } else {
//             return this.props.children
//         }
//     }
// }

// ErrorBoundary.propTypes = {
//     children: PropTypes.node.isRequired,
// }

// export default ErrorBoundary // Không cần withRouter nữa
