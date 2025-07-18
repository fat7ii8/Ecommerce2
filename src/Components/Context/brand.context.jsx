import { createContext, useState } from "react";
import axios from "axios";
export const BrandContext = createContext(null);
export default function BrandProvider({ children }) {
  const [brands, setbrands] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getAllbrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setbrands(data.data);
    console.log(data.data);
  }

  async function GetbrandSpacifice(id) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "Get",
    };
    const { data } = await axios.request(options);
    console.log(data.data);
    setSelectedBrand(data.data);
    return data.data;
  }

  return (
    <BrandContext.Provider
      value={{
        brands,
        getAllbrands,
        GetbrandSpacifice,
        selectedBrand,
        setSelectedBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}
