export const request = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return checkResponse(res);
  } catch (err) {
    throw new Error(`Ошибка ${err.message}`);
  }
}

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Не удалось загрузить даные, так как код ответа сервера вершул ошибку`);
}
