// làm chức năng đăng nhập bằng facebook cho firebase (lấy data user từ facebook và lưu vào firebase)

import { FacebookAuthProvider } from 'firebase/auth'

const provider = new FacebookAuthProvider({
    scopes: ['public_profile', 'email'],
    customParameters: {
        // Forces password re-entry.
        auth_type: 'reauthenticate',
    },
})
