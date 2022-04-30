import React, { useState, useEffect } from 'react';

const useIngredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const url = 'https://norma.nomoreparties.space/api/ingredients';

    useEffect(() => {
        getData(url);
    }, []);

    const getData = async (url) => {
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            setIngredients(json.data);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    return ingredients;
};

export default useIngredients;
