import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductSnap from '../ProductSnap';
import { expect } from 'vitest';
import '@testing-library/jest-dom';

describe('ProductSnap', () => {
  const product = {
    id: '1',
    imgUrl: 'testUrl',
    brand: 'Test Brand',
    model: 'Test Model',
    price: 100,
  };

  it('renders correctly', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <ProductSnap product={product} />
      </BrowserRouter>
    );

    expect(getByAltText(product.model)).toBeInTheDocument();
    expect(getByText(product.brand)).toBeInTheDocument();
    expect(getByText(product.model)).toBeInTheDocument();
    expect(getByText(`${product.price} €`)).toBeInTheDocument();
  });

  it('renders TBD when price is not available', () => {
    const productWithoutPrice = { ...product, price: null };
    const { getByText } = render(
      <BrowserRouter>
        <ProductSnap product={productWithoutPrice} />
      </BrowserRouter>
    );

    expect(getByText('TBD')).toBeInTheDocument();
  });
});