export default function enableValidation(validationParams) {
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

function toggleButtonState(params) {
  if (hasInvalidInput(params.inputList)) {
    params.buttonElement.classList.add(params.validationParams.inactiveButtonClass);
    params.buttonElement.disabled = true;
  } else {
    params.buttonElement.classList.remove(params.validationParams.inactiveButtonClass);
    params.buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    if (!inputElement.validity.valid) {
      console.log(inputElement.validity);
    }
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(params) {
  if (!params.inputElement.validity.valid) {
    if (params.inputElement.validity.patternMismatch) {
      params.inputElement.setCustomValidity(params.inputElement.dataset.errorMessage);
    } else {
      params.inputElement.setCustomValidity('');
    }
    showInputError({
      formElement: params.formElement,
      inputElement: params.inputElement,
      errorMessage: params.inputElement.validationMessage,
      validationParams: params.validationParams,
    });
  } else {
    hideInputError({
      formElement: params.formElement,
      inputElement: params.inputElement,
      validationParams: params.validationParams,
    });
  }
}

function showInputError(params) {
  const errorElement = params.formElement.querySelector(`.${params.inputElement.id}-error`);
  params.inputElement.classList.add(params.validationParams.inputErrorClass);
  errorElement.textContent = params.errorMessage;
  errorElement.classList.add(params.validationParams.activeInputErrorClass);
}

function hideInputError(params) {
  const errorElement = params.formElement.querySelector(`.${params.inputElement.id}-error`);
  params.inputElement.classList.remove(params.validationParams.inputErrorClass);
  errorElement.classList.remove(params.validationParams.activeInputErrorClass);
  errorElement.textContent = '';
}
