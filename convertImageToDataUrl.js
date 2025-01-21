async function ConvertImageToDataUrl(image, type) {
  if(type === 'URL') {
    const blob = await fetch(image).then((r) => r.blob());

    const dataUrl = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    return dataUrl;
  }

  const dataUrl = await new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(image);
  });
  return dataUrl;
}