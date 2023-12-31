 
export const textIsValid = text => !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(text)

export const emailIsValid = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase())

export const passwordIsValid = password => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)

export const permissionsAreValid = permissions => permissions.length > 0