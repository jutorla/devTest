const BASE_URL = "https://itx-frontend-test.onrender.com/api/";

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}product/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}product/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

export const postCart = async (id, colorCode, storageCode) => {
  try {
    const response = await fetch(`${BASE_URL}cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        colorCode,
        storageCode,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to post to cart:', error);
    return null;
  }
};