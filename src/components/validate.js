function enableValidation(validationParams) {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(validationParams.fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, validationParams);
    });
  });
}

function setEventListeners(formElement, validationParams) {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
  toggleButtonState({ inputList, buttonElement, validationParams });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity({ formElement, inputElement, validationParams });
      toggleButtonState({ inputList, buttonElement, validationParams });
    });
  });
}

function toggleButtonState({ inputList, buttonElement, validationParams }) {
  if (hasInvalidInput(inputList)) {
    disableButton({ buttonElement, inactiveButtonClass: validationParams.inactiveButtonClass });
  } else {
    buttonElement.classList.remove(validationParams.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableButton({ buttonElement, inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

function checkInputValidity(params) {
  if (!params.inputElement.validity.valid) {
    if (params.inputElement.validity.patternMismatch) {
      params.inputElement.setCustomValidity(params.inputElement.dataset.errorMessage);
    } else {
      params.inputElement.setCustomValidity('');
    }
    showInputError(params);
  } else {
    hideInputError(params);
  }
}

function showInputError({ formElement, inputElement, validationParams }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParams.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationParams.activeInputErrorClass);
}

function hideInputError({ formElement, inputElement, validationParams }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.classList.remove(validationParams.activeInputErrorClass);
  errorElement.textContent = '';
}

function checkFormValidity(formElement, validationParams) {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  if (inputList.length > 0) {
    const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
    inputList.forEach((inputElement) => {
      checkInputValidity({ formElement, inputElement, validationParams });
    });
    toggleButtonState({ inputList, buttonElement, validationParams });
  }
}

function disableButtonInElement({ element, buttonSelector, inactiveButtonClass }) {
  const buttonElement = element.querySelector(buttonSelector);
  disableButton({ buttonElement, inactiveButtonClass });
}

export { enableValidation, checkFormValidity, disableButtonInElement };
