import axios from 'axios';
import React, { useEffect, useState } from 'react';

type PropsProducts = {
  id: string;
  name: string;
  keywords: string;
  visible: 'visible' | 'invisible';
};

function Products() {
  const [list, setProducts] = useState<PropsProducts[]>([]);

  useEffect(() => {
    (async () => {
      axios.get('http://localhost:8001/products').then(async (resp) => {
        setProducts(await resp.data.data);
      });
    })();
  }, []);

  return (
    <div>
      <ul className="flex flex-col">
        {list.map((item) => (
          <li className="flex flex-row gap-5">
            <span>a</span>
            <span>a</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
