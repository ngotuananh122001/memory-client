// Format form-control theo dinh dang error
// Hien thi error-message
function showError(input, message) {
    const formControl = input.parentElement;
    const errElement = formControl.querySelector('small');

    formControl.classList.add('error');
    errElement.innerText = message;
}

// valid input value
function showSuccess(input) {
    const formControl = input.parentElement;
    const errElement = formControl.querySelector('small');

    formControl.classList.remove('error');
    errElement.innerText = '';
}

/*
    + Ham kiem tra input co bi bo trong hay trong
    + Tra ve true or false
    + sideeffect: format form-control theo dinh dang error
     (neu input bi bo trong)
*/
function checkEmptyErr(input) {
    let hasError = false;

    input.value = input.value.trim(); // Loai bo space
    if (!input.value) {
        showError(input, 'Khong duoc bo trong');
        hasError = true;
    }

    return hasError;
}

/*
    + Ham kiem tra input có thuộc dải cho phép (min <= value <= max)
    + Tra ve true or false
    + sideeffect: format form-control theo dinh dang error
     (neu erro)
*/
function checkLengthErr(input, min, max) {
    let hasError = false;
    input.value = input.value.trim();
    let len = input.value.length;

    if (len < min) {
        showError(input, 'Phai co it nhat 3 ky tu');
        hasError = true;
    }

    if (len > max) {
        showError(input, 'Toi da 10 ky tu');
        hasError = true;
    }

    return hasError;
}

// Validate email
function checkEmailErr(input) {
    // Bieu thuc chinh quy
    const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    input.value = input.value.trim();

    // Neu test khong khop => hasError = true;
    let hasError = !regexEmail.test(input.value);
    if (hasError) {
        showError(input, 'Email khong hop le');
    }

    return hasError;
}

function checkMatchPassword(password, confirmPassword) {
    let hasError = false;
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Mat khau khong khop');
        hasError = true;
    } else {
        showSuccess(confirmPassword);
    }

    return hasError;
}

function validateUserName(username) {
    username.onblur = (e) => {
        checkEmptyErr(e.target) || checkLengthErr(e.target, 3, 10);
    };

    username.onfocus = (e) => {
        showSuccess(e.target);
    };
}

function validateEmail(email) {
    email.onblur = (e) => {
        checkEmptyErr(e.target) || checkEmailErr(email);
    };

    email.onfocus = (e) => {
        showSuccess(e.target);
    };
}

function validatePassword(password, confirmPassword) {
    if (!confirmPassword) {
        password.onfocus = (e) => {
            showSuccess(e.target);
        };

        password.onblur = (e) => {
            checkEmptyErr(e.target) || checkLengthErr(password, 3, 20);
        };
        return;
    }

    password.onblur = (e) => {
        checkEmptyErr(e.target) || checkLengthErr(password, 3, 20);
        if (confirmPassword.value) {
            checkMatchPassword(password, confirmPassword);
        }
    };

    password.onfocus = (e) => {
        showSuccess(e.target);
    };

    confirmPassword.onblur = (e) => {
        checkEmptyErr(e.target) ||
            checkMatchPassword(password, confirmPassword);
    };

    confirmPassword.onfocus = (e) => {
        showSuccess(e.target);
    };
}

const Validator = (
    form,
    { username, email, password, confirmPassword },
    onSubmitForm
) => {
    username && validateUserName(username);
    email && validateEmail(email);
    password &&
        (confirmPassword ?? true) &&
        validatePassword(password, confirmPassword);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Kiem tra xem cac field co loi hay khong

        let userErr =
            username &&
            (checkEmptyErr(username) || checkLengthErr(username, 3, 10));

        let emailErr = email && (checkEmailErr(email) || checkEmailErr(email));
        let passwordErr =
            password &&
            (checkEmptyErr(password) || checkLengthErr(password, 3, 20));

        let confirmErr =
            password &&
            confirmPassword &&
            (checkEmptyErr(confirmPassword) ||
                checkMatchPassword(password, confirmPassword));

        // Form hop le neu khong co loi o bat ky field nao
        let formValid =
            (username ? !userErr : true) &&
            (email ? !emailErr : true) &&
            (password ? !passwordErr : true) &&
            (confirmPassword ? !confirmErr : true);

        if (formValid) {
            onSubmitForm(form);
        }
    });
};

export default Validator;
