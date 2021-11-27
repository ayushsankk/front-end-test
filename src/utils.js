export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};
