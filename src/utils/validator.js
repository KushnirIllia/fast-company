export const validator = (data, config) => {
  const errors = {}
  const validate = (obj, field, config) => {
    let status
    switch (obj) {
      case 'isRequired':
        if (typeof (field) === 'boolean') {
          status = !field
        } else {
          status = field.trim() === ''
        }
        break
      case 'isEmail':
        const emailRegExp = /^\S+@\S+\.\S+$/g
        status = !emailRegExp.test(field)
        break
      case 'isCapitalSymbol':
        const passRegExp = /[A-Z]+/g
        status = !passRegExp.test(field)
        break
      case 'isNumber':
        const numberRegExp = /\d+/g
        status = !numberRegExp.test(field)
        break
      case 'min':
        status = field.length < config.value
        break
    }
    if (status) {
      return config.message
    }
  }
  /*  validatorConfig = {
    email: {
      isRequired:
        { message: 'Email is required' }
    },
    password: {
      isRequired:
        { message: 'Password is required' }
    }
  }
  data = { email: '', password: '' } */
  for (const fieldName in data) {
    for (const configObject in config[fieldName]) {
      const error = validate(configObject, data[fieldName], config[fieldName][configObject])
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}