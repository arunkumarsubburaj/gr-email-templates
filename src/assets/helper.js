export const createFormData = data => {
  let formData = new FormData();
  for (let key in data) {
    if (typeof data[key] === "object") {
      for (let subKey in data[key]) {
        formData.append(`${key}[${subKey}]`, data[key][subKey]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
