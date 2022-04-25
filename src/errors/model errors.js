//handling mongoose errors for user model 
const handleUserErrors = (error) => {
    const userFriendlyError = {}, errors = error.errors, errorCode = error.code;
    if(errorCode === 11000){
        userFriendlyError.email = 'email must be unique';
        return userFriendlyError
    }

    if(error.message.includes('user validation failed')){        
        const errorPaths = Object.keys(errors);
        errorPaths.forEach(errorPath => {
            userFriendlyError[errorPath] = errors[errorPath].message;
        });
        return userFriendlyError
    }  
}

//exporting section
module.exports = handleUserErrors;