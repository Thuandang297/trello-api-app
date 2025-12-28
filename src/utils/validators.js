export const OBJECT_ID_RULE = /^[a-fA-F0-9]{24}$/
export const OBJECT_ID_RULE_MESSAGE ='Your string false to match the Object Id pattern'

export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid. (example@company.com)'

export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'Password must include at least 1 letter, a number, and at least 8 characters.'