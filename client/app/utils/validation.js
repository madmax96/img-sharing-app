

export const isEmailValid = email => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
export const isPasswordValid = email => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(email);
export const isFullNameValid = (fullName) => {
  const [name, surname] = fullName.split(' ');
  return name && name.length > 2 && surname && surname.length > 2 && /[a-zA-Z]/.test(name) && /[a-zA-Z]/.test(surname);
};
