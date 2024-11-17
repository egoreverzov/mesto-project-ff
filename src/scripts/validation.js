const enableValidation = (validationElements) => {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationElements);
  });
};

const setEventListeners = (formElement, validationElements) => {
  const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
  const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationElements);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else if (inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorLink);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const showInputError = (formElement, inputElement, errorMessage, validationElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(validationElements.inputErrorClass);
};

const hideInputError = (formElement, inputElement, validationElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(validationElements.inputErrorClass);
};


const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

function clearValidation(formElement, validationClear) {
  const buttonElement = formElement.querySelector(validationClear.submitButton);
  
  const errorsList = Array.from(formElement.querySelectorAll(validationClear.errorClass));
  errorsList.forEach(error => {
    error.textContent = '';
  });

  const inputList = Array.from(formElement.querySelectorAll(validationClear.inputSelector));
  inputList.forEach(input => {
    input.classList.remove(validationClear.inputErrorClass);
    checkInputValidity(formElement, input, validationClear);
  });

  toggleButtonState(inputList, buttonElement);
}

export { enableValidation, clearValidation }