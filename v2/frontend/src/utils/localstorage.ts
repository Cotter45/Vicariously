
export const localStore = (field: string, value: string) => {
  if (typeof window === "undefined") return;
  
  const date = new Date();
  localStorage.setItem(field, date.valueOf() + "&&" + value);
}

export const checkLocalStore = (field: string) => {
  if (typeof window === "undefined") return;
  const date = new Date();

  const localStorageValue = localStorage.getItem(field);
  if (!localStorageValue) return "";

  const [localDate, localValue] = localStorageValue.split("&&");
  
  // if local date is older than 1 hour, delete localStorage
  if (date.valueOf() - parseInt(localDate) > 3600000) {
    localStorage.removeItem(field);
    return "";
  }
  return localValue;
}

export const checkLocalImageStore = (field: string, action: Function) => {
  if (typeof window === "undefined") return;
  const date = new Date();

  const localStorageValue = localStorage.getItem(field);
  if (!localStorageValue) return "";

  const [localDate, localValue] = localStorageValue.split("&&");
  const localUrls = JSON.parse(localValue);

  // if local date is older than 1 hour, delete localStorage
  if (date.valueOf() - parseInt(localDate) > 3600000) {
    localStorage.removeItem(field);
    return "";
  }
  return action(localUrls);
}
