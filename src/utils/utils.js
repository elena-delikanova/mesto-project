function setEventHandler({objectToSet, event, handler}) {
  objectToSet.addEventListener(event, handler);
}

export { setEventHandler };
