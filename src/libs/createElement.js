const createElement = (name, classes = [], attributes = {}, content = '') => {
  const element = document.createElement(name);
  const allAttributes = Object.entries(attributes);
  allAttributes.forEach(([tag, value]) => {
    element.setAttribute(tag, value);
  });
  element.classList.add(...classes);
  element.textContent = content;
  return element;
};
export default createElement;
