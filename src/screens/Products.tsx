import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Products() {
  const [list, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      axios.get('http://localhost:8001/products').then(async (resp) => {
        setProducts(await resp.data.data);
      });
    })();
  }, []);

  return (
    <div>
      <ul>
        {list.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
