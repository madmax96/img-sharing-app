export default function encodeImageFileAsURL(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((res) => {
    reader.onloadend = function onloadend() {
      res(reader.result);
    };
  });
}
