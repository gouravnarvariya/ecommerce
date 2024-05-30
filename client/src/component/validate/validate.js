export const ValidateLogin = (obj) => {
    const errors = {};
    // Check if all fields are present and not empty
    if (!obj.email) {
        errors.email = "Please provide a email.";
    }
    if (!obj.password) {
        errors.password = "Please provide a password.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export const ValidateRegiseter = (obj) => {
    const errors = {};
    // Check if all fields are present and not empty
    if (!obj.name) {
        errors.username = "Please provide a username.";
    }
    if (!obj.email) {
        errors.email = "Please provide a email.";
    }else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(obj.email)) {
            errors.email = "Invalid email address.";
        }
    }
    if (!obj.address) {
        errors.address = "Please provide a address.";
    }
    if (!obj.phone_number) {
        errors.phone_number = "Please provide a phone_number.";
    } else if (obj.phone_number.length < 10) {
        errors.phone_number = "Please enter a valid phone number.";
    }
    
    if (!obj.password) {
        errors.password = "Please provide a password.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}



export const ValidateUpdateData = (obj) => {
    // console.log(obj)
    const errors = {};

    if (!obj.name) {
        errors.name = "Please provide your first name.";
    }
    if (!obj.address) {
        errors.address = "Please provide your address.";
    }
    if (!obj.email) {
        errors.email = "Email is required.";
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(obj.email)) {
            errors.email = "Invalid email address.";
        }
    }
    if (!obj.phone_number) {
        errors.phone_number = "Phone number is required.";
    } else if (obj.phone_number.length < 10) {
        errors.phone_number = "Please enter a valid phone number.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}