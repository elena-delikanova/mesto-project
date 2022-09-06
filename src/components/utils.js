function setEventHandler(params) {
  params.objectToSet.addEventListener(params.event, params.handler);
}

function disableButtonInElement({ element, buttonSelector, inactiveButtonClass }) {
  const buttonElement = element.querySelector(buttonSelector);
  disableButton({ buttonElement, inactiveButtonClass });
}

function disableButton({ buttonElement, inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

export { setEventHandler, disableButton, disableButtonInElement };
