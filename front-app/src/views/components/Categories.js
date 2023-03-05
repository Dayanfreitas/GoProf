import React, { useState, useEffect } from 'react';
import { Flex, Select } from '@chakra-ui/react'
import CategoriesActions from '../../actions/Categories';

function Categories(props) {  
  const [categories, setCategories] = useState([]);

  async function loadCategories() {
    const categoriesActions = CategoriesActions();
    const response = await categoriesActions.getAll();
    const dataCategories = response.data.categories
    setCategories(dataCategories)
  }

  useEffect(() => {
    loadCategories()
    props.setCategorie(props?.value || '')
  }, []);


  return (
    <Flex>
      <Select placeholder='Selecione Categoria' value={props?.value} onChange={(e) => {props.setCategorie(e.target.value)}}>
        {
          categories.map((item) => {
            return (
              <option key={item.id} value={item.id}>{item?.description || ''} - {item.type}</option>
            )
          })
        }
      </Select>
    </Flex>
  );
}

export default Categories;
