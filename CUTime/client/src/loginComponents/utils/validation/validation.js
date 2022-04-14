export const isEmpty = value =>{
    if (!value) return true
    return false
}

export const isEmail = email =>{
    const regex = /^[0-9]{10}@link.cuhk.edu.hk$/
    //const regex = /.*/
    return regex.test(email);
}

export const isLength = password =>{
    if (password.length < 8) return true
    return false
}


export const isMatch = (password, cf_password) =>{
    if (password == cf_password) return true
    return false
}